import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const BRAVE_PATH = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser";
const ARTIFACTS_DIR = "/Users/apuravagarwal/.gemini/antigravity-ide/brain/971256ea-fd54-4e31-a507-c5064ee3d519";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const browserProc = spawn(BRAVE_PATH, [
    "--headless",
    "--remote-debugging-port=9222",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    "--window-size=1600,1800",
  ]);

  browserProc.stderr.on("data", (d) => {});

  let wsEndpoint = null;
  for (let i = 0; i < 30; i++) {
    await sleep(200);
    try {
      const res = await fetch("http://localhost:9222/json/version");
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

  // Create new target / page
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
  await sendSession("Emulation.setDeviceMetricsOverride", {
    width: 1600,
    height: 1800,
    deviceScaleFactor: 1,
    mobile: false,
  });

  console.log("Waiting for loading screen to complete...");
  await sleep(3000);

  // Function to evaluate script in page
  async function evalInPage(expression) {
    const res = await sendSession("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return res.result?.value;
  }

  const widths = [480, 640, 900];

  for (const w of widths) {
    console.log(`\nTesting container width: ${w}px...`);

    const result = await evalInPage(`
      (() => {
        const rightCol = document.querySelector('.ov-right-col');
        if (!rightCol) return { error: 'No .ov-right-col found' };
        
        // Fix container width for testing
        rightCol.style.width = '${w}px';
        rightCol.style.maxWidth = '${w}px';
        rightCol.style.backgroundColor = 'var(--color-surface-base)';
        rightCol.style.position = 'relative';
        rightCol.style.zIndex = '10';
        
        // Scroll rightCol into view
        rightCol.scrollIntoView({ block: 'start' });

        // Check overflow
        const overflowElements = [];
        const all = rightCol.querySelectorAll('*');
        for (const el of all) {
          if (el.scrollWidth > el.clientWidth && el.clientWidth > 0) {
            // Check if overflow is hidden or visible
            const style = window.getComputedStyle(el);
            if (style.overflowX !== 'hidden' && style.overflowX !== 'clip') {
              overflowElements.push({
                tag: el.tagName,
                class: el.className,
                scrollWidth: el.scrollWidth,
                clientWidth: el.clientWidth,
              });
            }
          }
        }

        const rect = rightCol.getBoundingClientRect();
        return {
          width: rightCol.clientWidth,
          scrollWidth: rightCol.scrollWidth,
          hasHorizontalScroll: rightCol.scrollWidth > rightCol.clientWidth,
          overflowElements,
          rect: {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          }
        };
      })()
    `);

    console.log(`Result for ${w}px:`, JSON.stringify(result, null, 2));

    await sleep(500);

    // Capture screenshot of the rightCol element
    const screenshot = await sendSession("Page.captureScreenshot", {
      format: "png",
      clip: {
        x: result.rect.x,
        y: result.rect.y,
        width: result.rect.width,
        height: result.rect.height + 20,
        scale: 1,
      },
    });

    const outPath = path.join(ARTIFACTS_DIR, `overview-${w}px.png`);
    fs.writeFileSync(outPath, Buffer.from(screenshot.data, "base64"));
    console.log(`Saved screenshot to ${outPath}`);
  }

  ws.close();
  browserProc.kill();
  console.log("\nFinished testing and screenshots successfully.");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
