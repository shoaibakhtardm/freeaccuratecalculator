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

async function runFeatureSuite() {
  console.log('🚀 Launching Google Chrome for SIP Feature & Mobile Audit...');
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    'about:blank'
  ]);

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

  const browserClient = new CDPClient(wsUrl);
  await browserClient.connect();

  const target = await browserClient.send('Target.createTarget', { url: TARGET_URL });
  const pageWsUrl = `ws://127.0.0.1:9222/devtools/page/${target.targetId}`;
  const pageClient = new CDPClient(pageWsUrl);
  await pageClient.connect();

  await pageClient.send('Page.enable');
  await pageClient.send('Runtime.enable');
  await pageClient.send('DOM.enable');

  console.log('🌐 Navigating to:', TARGET_URL);
  await pageClient.send('Page.navigate', { url: TARGET_URL });
  await new Promise((r) => setTimeout(r, 1500));

  console.log('\n======================================================');
  console.log('🧪 TESTING SIP ULTRA-ELITE FINTECH ENGINE INTERACTIONS');
  console.log('======================================================\n');

  // Test 1: Baseline Regular SIP (₹10,000 / 12% / 10Y)
  const baselineCorpus = await pageClient.evaluate(`document.getElementById('hero-result-value')?.textContent?.trim()`);
  console.log('✓ 1. Default Baseline Corpus (₹10k/12%/10Y):', baselineCorpus);
  assert.equal(baselineCorpus, '23,23,391', 'Baseline Annuity Due calculation must equal 23,23,391');

  // Test 2: Step-Up SIP Simulation (+10% Annual Increase)
  await pageClient.evaluate(`
    (() => {
      const select = document.getElementById('sip-stepup-select');
      if (select) {
        select.value = '10';
        select.dispatchEvent(new Event('change'));
      }
    })()
  `);
  await new Promise((r) => setTimeout(r, 200));
  const stepUpCorpus = await pageClient.evaluate(`document.getElementById('hero-result-value')?.textContent?.trim()`);
  console.log('✓ 2. Step-Up SIP (+10% annual increase):', stepUpCorpus);
  assert.equal(stepUpCorpus, '33,74,326', '10% Step-Up SIP corpus must equal 33,74,326');

  // Test 3: Inflation-Adjusted Real Value (at 6% Inflation)
  await pageClient.evaluate(`
    (() => {
      const select = document.getElementById('sip-inflation-select');
      if (select) {
        select.value = '6';
        select.dispatchEvent(new Event('change'));
      }
    })()
  `);
  await new Promise((r) => setTimeout(r, 200));
  const realCorpus = await pageClient.evaluate(`document.getElementById('hero-result-value')?.textContent?.trim()`);
  console.log('✓ 3. Real Purchasing Power (Today\'s Money at 6% Inflation):', realCorpus);
  assert.ok(realCorpus.length > 0 && realCorpus !== stepUpCorpus, 'Inflation adjustment must calculate real purchasing power');

  // Reset Step-Up and Inflation back to normal
  await pageClient.evaluate(`
    (() => {
      const su = document.getElementById('sip-stepup-select');
      const inf = document.getElementById('sip-inflation-select');
      if (su) su.value = '0';
      if (inf) inf.value = '0';
      su?.dispatchEvent(new Event('change'));
      inf?.dispatchEvent(new Event('change'));
    })()
  `);
  await new Promise((r) => setTimeout(r, 200));

  // Test 4: Goal Planner Mode (Target ₹1 Crore)
  await pageClient.evaluate(`document.getElementById('sip-mode-goal')?.click()`);
  await new Promise((r) => setTimeout(r, 200));
  const goalMonthlySIP = await pageClient.evaluate(`document.getElementById('hero-result-value')?.textContent?.trim()`);
  console.log('✓ 4. Goal Planner Mode (Required SIP for ₹1 Crore in 10Y at 12%):', goalMonthlySIP);
  assert.ok(goalMonthlySIP.includes('/ mo'), 'Goal mode must show required monthly SIP');

  // Switch back to Regular Wealth Accumulator
  await pageClient.evaluate(`document.getElementById('sip-mode-regular')?.click()`);
  await new Promise((r) => setTimeout(r, 200));

  // Test 5: 3-Scenario Sensitivity Analysis Check
  const consVal = await pageClient.evaluate(`document.getElementById('scenario-cons-val')?.textContent?.trim()`);
  const baseVal = await pageClient.evaluate(`document.getElementById('scenario-base-val')?.textContent?.trim()`);
  const aggrVal = await pageClient.evaluate(`document.getElementById('scenario-aggr-val')?.textContent?.trim()`);
  console.log('✓ 5. 3-Scenario Matrix -> Conservative (8%):', consVal, '| Base (12%):', baseVal, '| Aggressive (15%):', aggrVal);
  assert.equal(consVal, '₹ 18,41,657', 'Conservative 8% scenario must be ₹ 18,41,657');
  assert.equal(baseVal, '₹ 23,23,391', 'Base 12% scenario must be ₹ 23,23,391');
  assert.equal(aggrVal, '₹ 27,86,573', 'Aggressive 15% scenario must be ₹ 27,86,573');

  // Test 6: Cost of Delay Estimator Check
  const delay1y = await pageClient.evaluate(`document.getElementById('delay-1y-loss')?.textContent?.trim()`);
  const delay3y = await pageClient.evaluate(`document.getElementById('delay-3y-loss')?.textContent?.trim()`);
  const delay5y = await pageClient.evaluate(`document.getElementById('delay-5y-loss')?.textContent?.trim()`);
  console.log('✓ 6. Cost of Delay -> 1Y Loss:', delay1y, '| 3Y Loss:', delay3y, '| 5Y Loss:', delay5y);
  assert.ok(delay1y.startsWith('-₹'), 'Cost of delay must indicate negative wealth loss');

  // Test 7: Milestone Roadmap Check
  const time10l = await pageClient.evaluate(`document.getElementById('milestone-10l')?.textContent?.trim()`);
  const time1cr = await pageClient.evaluate(`document.getElementById('milestone-1cr')?.textContent?.trim()`);
  console.log('✓ 7. Milestone Roadmap -> Time to ₹10L:', time10l, '| Time to ₹1Cr:', time1cr);
  assert.ok(time10l.includes('Years'), 'Milestone must calculate years to goal');

  // Test 8: Mobile Viewport 375px (iPhone) Zero Horizontal Overflow Audit
  await pageClient.send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 3,
    mobile: true
  });
  await new Promise((r) => setTimeout(r, 300));
  const scrollWidth = await pageClient.evaluate(`document.documentElement.scrollWidth`);
  const clientWidth = await pageClient.evaluate(`document.documentElement.clientWidth`);
  console.log('✓ 8. Mobile Viewport 375px Overflow Check -> scrollWidth:', scrollWidth, 'clientWidth:', clientWidth);
  assert.equal(scrollWidth <= clientWidth, true, 'There must be ZERO horizontal overflow on mobile viewports');

  // Test 9: Reset Button Verification
  await pageClient.evaluate(`document.getElementById('action-reset-btn')?.click()`);
  await new Promise((r) => setTimeout(r, 200));
  const resetVal = await pageClient.evaluate(`document.getElementById('sip-primary-amount')?.value`);
  console.log('✓ 9. Reset Button Action -> Amount:', resetVal);
  assert.equal(resetVal, '10000', 'Reset button must restore default 10,000');

  console.log('\n======================================================');
  console.log('🎉 ALL 9 ADVANCED SIP PRODUCT & UX VERIFICATIONS PASSED 100%!');
  console.log('======================================================\n');

  pageClient.close();
  browserClient.close();
  chromeProcess.kill();
}

runFeatureSuite().catch((err) => {
  console.error('Feature test failed with error:', err);
  process.exit(1);
});
