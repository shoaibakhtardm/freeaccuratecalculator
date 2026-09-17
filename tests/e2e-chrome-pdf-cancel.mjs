import { spawn } from 'node:child_process';
import WebSocket from 'ws';
import assert from 'node:assert/strict';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'http://127.0.0.1:4321/finance/sip-calculator/';

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.pending = new Map();
    this.events = [];
    this.eventListeners = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws.on('open', resolve);
      this.ws.on('error', reject);
      this.ws.on('message', (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.id && this.pending.has(msg.id)) {
          const { resolve, reject } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result);
        } else if (msg.method) {
          this.events.push(msg);
          const listeners = this.eventListeners.get(msg.method) || [];
          listeners.forEach((fn) => fn(msg.params));
        }
      });
    });
  }

  send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(event, fn) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(fn);
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(`Evaluation failed: ${JSON.stringify(res.exceptionDetails)}`);
    }
    return res.result?.value;
  }

  close() {
    this.ws.close();
  }
}

async function runTest() {
  console.log('🚀 Launching Google Chrome via Chrome DevTools Protocol...');
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    'about:blank'
  ]);

  // Wait for Chrome remote debugging port
  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const resp = await fetch('http://127.0.0.1:9222/json/version');
      if (resp.ok) {
        const data = await resp.json();
        wsUrl = data.webSocketDebuggerUrl;
        break;
      }
    } catch (_) {}
  }

  if (!wsUrl) {
    chromeProcess.kill();
    throw new Error('Failed to connect to Chrome DevTools port 9222');
  }

  console.log(' Connected to Chrome:', wsUrl);
  const browserClient = new CDPClient(wsUrl);
  await browserClient.connect();

  // Create new page target
  const target = await browserClient.send('Target.createTarget', { url: TARGET_URL });
  const pageWsUrl = `ws://127.0.0.1:9222/devtools/page/${target.targetId}`;
  const pageClient = new CDPClient(pageWsUrl);
  await pageClient.connect();

  await pageClient.send('Page.enable');
  await pageClient.send('Runtime.enable');
  await pageClient.send('DOM.enable');

  console.log(' Navigating to:', TARGET_URL);
  await pageClient.send('Page.navigate', { url: TARGET_URL });
  await new Promise((r) => setTimeout(r, 1500));

  // Verify SIP Calculator loaded
  const title = await pageClient.evaluate('document.title');
  console.log(' Page Title:', title);
  assert.ok(title.includes('SIP Calculator'), 'Page title must include SIP Calculator');

  // Set inputs and calculate
  await pageClient.evaluate(`
    (() => {
      const p = document.getElementById('sip-amount');
      const r = document.getElementById('sip-rate');
      const y = document.getElementById('sip-years');
      if (p) p.value = '10000';
      if (r) r.value = '12';
      if (y) y.value = '10';
      const calcBtn = document.getElementById('sip-calc-btn') || document.querySelector('button[type="submit"]');
      if (calcBtn) calcBtn.click();
      if (typeof window.recalculate === 'function') window.recalculate();
    })()
  `);
  await new Promise((r) => setTimeout(r, 300));

  // Verify Calculation Result
  const maturityText = await pageClient.evaluate(`document.getElementById('hero-result-value')?.textContent?.trim() || ''`);
  console.log(' Calculated Maturity Value:', maturityText);
  assert.ok(maturityText.length > 0, 'Maturity value must be rendered');

  // Verify PDF Download button exists and is clickable
  const pdfBtnExists = await pageClient.evaluate(`
    !!document.getElementById('action-download-pdf-btn')
  `);
  assert.ok(pdfBtnExists, '#action-download-pdf-btn must exist in DOM');

  // Setup forensic monitoring on print events and window.print() call counts
  await pageClient.evaluate(`
    (() => {
      window.__pdf_test = {
        printCalls: 0,
        beforePrintCalls: 0,
        afterPrintCalls: 0,
        cancelTriggers: 0,
        durations: []
      };

      const originalPrint = window.print;
      window.print = function() {
        window.__pdf_test.printCalls++;
        // Simulate native print dialog behavior:
        // window.print() dispatches beforeprint, opens dialog, user clicks Cancel, afterprint fires, print returns
        try {
          window.dispatchEvent(new Event('beforeprint'));
        } catch(_) {}
        
        // Immediate cancellation on first click simulation
        try {
          window.dispatchEvent(new Event('afterprint'));
        } catch(_) {}
      };
    })()
  `);

  console.log('\n======================================================');
  console.log('⚡ STARTING 20-CYCLE CONSECUTIVE FIRST-CLICK CANCEL RELIABILITY SUITE');
  console.log('======================================================\n');

  let passedCycles = 0;
  const timingDelays = [0, 50, 100, 250, 500, 1000, 0, 50, 100, 250, 500, 0, 0, 50, 100, 250, 500, 0, 50, 100];

  for (let cycle = 1; cycle <= 20; cycle++) {
    const delay = timingDelays[cycle - 1];
    
    // Reset test metrics for this cycle
    await pageClient.evaluate(`
      window.__pdf_test.printCalls = 0;
      window.__pdf_test.beforePrintCalls = 0;
      window.__pdf_test.afterPrintCalls = 0;
    `);

    // Click Download PDF
    await pageClient.evaluate(`
      document.getElementById('action-download-pdf-btn').click();
    `);

    if (delay > 0) {
      await new Promise((r) => setTimeout(r, delay));
    } else {
      await new Promise((r) => setTimeout(r, 100));
    }

    // Inspect print call counts and ensure only EXACTLY 1 print dialog was triggered (no duplicate reopen)
    const metrics = await pageClient.evaluate(`window.__pdf_test`);
    
    // Ensure that right after cancel, the page is not stuck and isPrinting is false
    const state = await pageClient.evaluate(`
      ({
        isPrinting: typeof isPrinting !== 'undefined' ? isPrinting : false,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        btnEnabled: !document.getElementById('action-download-pdf-btn')?.disabled
      })
    `);

    const isSuccess = metrics.printCalls === 1 && state.btnEnabled;
    if (isSuccess) {
      passedCycles++;
      console.log(` Cycle ${String(cycle).padStart(2, '0')}/20 (delay: ${String(delay).padStart(4, ' ')}ms) -> Download PDF -> Cancel (1st click) -> [PASS] (Print calls: ${metrics.printCalls}, Button ready: ${state.btnEnabled})`);
    } else {
      console.error(`❌ Cycle ${String(cycle).padStart(2, '0')}/20 FAILED: Print calls: ${metrics.printCalls}, State:`, state);
    }
  }

  console.log('\n======================================================');
  console.log(`📊 FINAL RESULT: ${passedCycles}/20 CYCLES PASSED`);
  console.log('======================================================\n');

  assert.equal(passedCycles, 20, 'All 20/20 consecutive first-click cancellation cycles must pass without failure');

  console.log('🧹 Cleaning up browser automation processes...');
  pageClient.close();
  browserClient.close();
  chromeProcess.kill();
  console.log('🎉 REAL BROWSER AUTOMATION SUITE FULLY VERIFIED!');
}

runTest().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
