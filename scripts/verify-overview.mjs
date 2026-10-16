import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const BRAVE_PATH = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser";
const OUT_DIR = "/Users/apuravagarwal/.gemini/antigravity-ide/brain/2a86722c-7a63-4ffb-9a0e-d3ab3c588bb4";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const browserProc = spawn(BRAVE_PATH, [
    "--headless",
    "--remote-debugging-port=9224",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    "--window-size=1920,1080",
  ]);

  browserProc.stderr.on("data", () => {});

  let wsEndpoint = null;
  for (let i = 0; i < 30; i++) {
    await sleep(200);
    try {
      const res = await fetch("http://localhost:9224/json/version");
      const data = await res.json();
      if (data.webSocketDebuggerUrl) {
        wsEndpoint = data.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!wsEndpoint) {
    console.error("Failed to connect to Brave CDP");
    browserProc.kill();
    process.exit(1);
  }

  const ws = new WebSocket(wsEndpoint);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = rej;
  });

  let idCounter = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  function send(method, params = {}) {
    const id = idCounter++;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  const { targetId } = await send("Target.createTarget", { url: "http://localhost:3000" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });

  function sendSession(method, params = {}) {
    const id = idCounter++;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, sessionId, method, params }));
    });
  }

  await sendSession("Page.enable");
  await sendSession("DOM.enable");

  // Let loading screen complete
  console.log("Waiting 3.5s for loading screen...");
  await sleep(3500);

  const testViewports = [
    { width: 1366, height: 768, name: "1366x768" },
    { width: 1280, height: 720, name: "1280x720" },
    { width: 1920, height: 1080, name: "1920x1080" },
  ];

  for (const vp of testViewports) {
    console.log(`\n=== Testing Viewport ${vp.name} ===`);
    await sendSession("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(600);

    const metrics = await sendSession("Runtime.evaluate", {
      expression: `(() => {
        const sec = document.querySelector('#section-overview');
        const content = document.querySelector('.shell-content');
        const doc = document.documentElement;
        if (!sec) return { error: 'No #section-overview found' };

        return {
          window: { innerWidth: window.innerWidth, innerHeight: window.innerHeight },
          doc: { clientWidth: doc.clientWidth, scrollWidth: doc.scrollWidth },
          content: content ? {
            clientHeight: content.clientHeight,
            scrollHeight: content.scrollHeight,
            clientWidth: content.clientWidth,
            scrollWidth: content.scrollWidth,
          } : null,
          section: {
            clientHeight: sec.clientHeight,
            scrollHeight: sec.scrollHeight,
            clientWidth: sec.clientWidth,
            scrollWidth: sec.scrollWidth,
            rect: sec.getBoundingClientRect(),
          },
          hasSectionVerticalOverflow: sec.scrollHeight > sec.clientHeight,
          hasSectionHorizontalOverflow: sec.scrollWidth > sec.clientWidth,
          hasDocHorizontalOverflow: doc.scrollWidth > doc.clientWidth,
        };
      })()`,
      returnByValue: true,
      awaitPromise: true,
    });

    console.log("Metrics:", JSON.stringify(metrics.result?.value, null, 2));

    const shot = await sendSession("Page.captureScreenshot", { format: "png" });
    const outPath = path.join(OUT_DIR, `overview-test-${vp.name}.png`);
    fs.writeFileSync(outPath, Buffer.from(shot.data, "base64"));
    console.log(`Screenshot saved: ${outPath}`);
  }

  ws.close();
  browserProc.kill();
  console.log("\nFinished successfully.");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
