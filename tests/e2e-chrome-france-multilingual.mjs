import { spawn } from 'node:child_process';
import WebSocket from 'ws';
import assert from 'node:assert/strict';
import http from 'node:http';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://127.0.0.1:4321';

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
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(`Evaluation failed: ${JSON.stringify(res.exceptionDetails)}`);
    }
    return res.result ? res.result.value : undefined;
  }

  async navigate(url) {
    await this.send('Page.navigate', { url });
    await new Promise((resolve) => setTimeout(resolve, 800));
  }

  close() {
    this.ws.close();
  }
}

async function fetchRedirect(path) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      `${BASE_URL}${path}`,
      { method: 'GET', followRedirect: false },
      (res) => {
        resolve({
          statusCode: res.statusCode,
          location: res.headers.location,
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function runLiveE2ETests() {
  console.log('🚀 Launching Real Headless Chrome for Multilingual France Architecture Verification...');
  const remotePort = 9225;
  const chromeProcess = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      `--remote-debugging-port=${remotePort}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-background-networking',
      '--disable-gpu',
      'about:blank',
    ],
    { stdio: 'pipe' }
  );

  let browserWsUrl = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const resp = await fetch(`http://127.0.0.1:${remotePort}/json/version`);
      if (resp.ok) {
        const data = await resp.json();
        browserWsUrl = data.webSocketDebuggerUrl;
        break;
      }
    } catch (_) {}
  }

  if (!browserWsUrl) {
    chromeProcess.kill();
    throw new Error('Failed to connect to Chrome DevTools port ' + remotePort);
  }

  const browserClient = new CDPClient(browserWsUrl);
  await browserClient.connect();

  const target = await browserClient.send('Target.createTarget', { url: 'about:blank' });
  const pageWsUrl = `ws://127.0.0.1:${remotePort}/devtools/page/${target.targetId}`;
  const cdp = new CDPClient(pageWsUrl);
  await cdp.connect();

  await cdp.send('Page.enable');
  await cdp.send('DOM.enable');
  await cdp.send('Runtime.enable');

  console.log('✅ Connected to Page Target via CDP!');

  try {
    // TEST 1: Homepage France Country Card -> Lands on /countries/france/fr/
    console.log('\n--- TEST 1: Homepage France Card Click ---');
    await cdp.navigate(`${BASE_URL}/`);
    const franceHrefOnHome = await cdp.evaluate(`
      (() => {
        const link = document.querySelector('a[href*="/countries/france"]');
        return link ? link.getAttribute('href') : null;
      })()
    `);
    console.log('Homepage France link href:', franceHrefOnHome);
    assert.equal(franceHrefOnHome, '/countries/france/fr/', 'Homepage France card must link to /countries/france/fr/');

    await cdp.evaluate(`
      (() => {
        const link = document.querySelector('a[href="/countries/france/fr/"]');
        if (link) link.click();
      })()
    `);
    await new Promise((r) => setTimeout(r, 800));
    const currentUrl1 = await cdp.evaluate(`window.location.pathname`);
    console.log('Landed URL after clicking France card on Homepage:', currentUrl1);
    assert.equal(currentUrl1, '/countries/france/fr/', 'Must land on /countries/france/fr/');

    // TEST 2: /countries/ Directory France Card Click
    console.log('\n--- TEST 2: /countries/ Directory France Card Click ---');
    await cdp.navigate(`${BASE_URL}/countries/`);
    const franceHrefOnDirectory = await cdp.evaluate(`
      (() => {
        const link = document.querySelector('a[href*="/countries/france"]');
        return link ? link.getAttribute('href') : null;
      })()
    `);
    console.log('/countries/ France link href:', franceHrefOnDirectory);
    assert.equal(franceHrefOnDirectory, '/countries/france/fr/', 'Directory France card must link to /countries/france/fr/');

    await cdp.evaluate(`
      (() => {
        const link = document.querySelector('a[href="/countries/france/fr/"]');
        if (link) link.click();
      })()
    `);
    await new Promise((r) => setTimeout(r, 800));
    const currentUrl2 = await cdp.evaluate(`window.location.pathname`);
    console.log('Landed URL after clicking France on /countries/:', currentUrl2);
    assert.equal(currentUrl2, '/countries/france/fr/');

    // TEST 3: On /countries/france/fr/ -> Toggle to English
    console.log('\n--- TEST 3: French France Page -> Toggle English ---');
    await cdp.navigate(`${BASE_URL}/countries/france/fr/`);
    const h1Fr = await cdp.evaluate(`document.querySelector('h1')?.textContent?.trim()`);
    console.log('French page H1:', h1Fr);
    assert.ok(h1Fr.includes('Calculatrices') || h1Fr.includes('Simulateurs'), 'Visible H1 must be French');

    // Click language toggle
    await cdp.evaluate(`
      (() => {
        const toggle = document.getElementById('fac-france-lang-toggle');
        if (toggle) toggle.click();
      })()
    `);
    await new Promise((r) => setTimeout(r, 800));
    const currentUrlEn = await cdp.evaluate(`window.location.pathname`);
    console.log('Landed URL after clicking English toggle:', currentUrlEn);
    assert.equal(currentUrlEn, '/countries/france/en/', 'Must navigate to /countries/france/en/');

    const h1En = await cdp.evaluate(`document.querySelector('h1')?.textContent?.trim()`);
    console.log('English page H1:', h1En);
    assert.ok(h1En.includes('Calculators') || h1En.includes('France'), 'Visible H1 must be English');

    // TEST 4: On /countries/france/en/ -> Toggle back to French
    console.log('\n--- TEST 4: English France Page -> Toggle French ---');
    await cdp.evaluate(`
      (() => {
        const toggle = document.getElementById('fac-france-lang-toggle');
        if (toggle) toggle.click();
      })()
    `);
    await new Promise((r) => setTimeout(r, 800));
    const currentUrlFr = await cdp.evaluate(`window.location.pathname`);
    console.log('Landed URL after clicking French toggle:', currentUrlFr);
    assert.equal(currentUrlFr, '/countries/france/fr/', 'Must navigate back to /countries/france/fr/');

    // TEST 5: French Child Page -> English Child Page Preservation
    console.log('\n--- TEST 5: French Child Page (SIP) -> English Child Page Preservation ---');
    await cdp.navigate(`${BASE_URL}/countries/france/fr/finance/sip-calculator/`);
    const sipH1Fr = await cdp.evaluate(`document.querySelector('h1')?.textContent?.trim()`);
    console.log('French SIP Calculator H1:', sipH1Fr);

    await cdp.evaluate(`
      (() => {
        const toggle = document.getElementById('fac-france-lang-toggle');
        if (toggle) toggle.click();
      })()
    `);
    await new Promise((r) => setTimeout(r, 800));
    const sipUrlEn = await cdp.evaluate(`window.location.pathname`);
    console.log('Landed URL after clicking English toggle on SIP calculator:', sipUrlEn);
    assert.equal(sipUrlEn, '/countries/france/en/finance/sip-calculator/', 'Must preserve logical child path in English');

    // TEST 6: English Child Page (SIP) -> French Child Page Preservation
    console.log('\n--- TEST 6: English Child Page (SIP) -> French Child Page Preservation ---');
    await cdp.evaluate(`
      (() => {
        const toggle = document.getElementById('fac-france-lang-toggle');
        if (toggle) toggle.click();
      })()
    `);
    await new Promise((r) => setTimeout(r, 800));
    const sipUrlFr = await cdp.evaluate(`window.location.pathname`);
    console.log('Landed URL after clicking French toggle on SIP calculator:', sipUrlFr);
    assert.equal(sipUrlFr, '/countries/france/fr/finance/sip-calculator/', 'Must preserve logical child path in French');

    // TEST 7: Hard Refresh & Direct URL State
    console.log('\n--- TEST 7: Direct URL Access & Hard Refresh ---');
    await cdp.navigate(`${BASE_URL}/countries/france/en/finance/mortgage-calculator/`);
    await cdp.send('Page.reload', { ignoreCache: true });
    await new Promise((r) => setTimeout(r, 600));
    const mortgageUrl = await cdp.evaluate(`window.location.pathname`);
    assert.equal(mortgageUrl, '/countries/france/en/finance/mortgage-calculator/');

    // TEST 8: Mobile Viewports Test
    console.log('\n--- TEST 8: Mobile Viewports (320px, 375px, 390px, 414px) ---');
    const viewports = [320, 360, 375, 390, 414];
    for (const width of viewports) {
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width,
        height: 800,
        deviceScaleFactor: 2,
        mobile: true,
      });
      await cdp.navigate(`${BASE_URL}/countries/france/fr/`);
      const toggleVisible = await cdp.evaluate(`
        (() => {
          const btn = document.getElementById('fac-france-lang-toggle');
          if (!btn) return false;
          const rect = btn.getBoundingClientRect();
          return rect.width > 0 && rect.height >= 36;
        })()
      `);
      console.log(`Viewport ${width}px toggle visible & touch-accessible:`, toggleVisible);
      assert.equal(toggleVisible, true, `Language toggle must be usable at ${width}px`);
    }

    // TEST 9: Legacy Root 301 Redirect Check
    console.log('\n--- TEST 9: Legacy Root 301 Redirect ---');
    const redirectRes1 = await fetchRedirect('/countries/france/');
    console.log('/countries/france/ redirect response:', redirectRes1);
    assert.equal(redirectRes1.statusCode, 301);
    assert.equal(redirectRes1.location, '/countries/france/fr/');

    const redirectRes2 = await fetchRedirect('/countries/france');
    console.log('/countries/france redirect response:', redirectRes2);
    assert.equal(redirectRes2.statusCode, 301);
    assert.equal(redirectRes2.location, '/countries/france/fr/');

    // TEST 10: Non-France Country Pages Integrity
    console.log('\n--- TEST 10: Non-France Country Integrity ---');
    await cdp.send('Emulation.clearDeviceMetricsOverride');
    await cdp.navigate(`${BASE_URL}/countries/india/`);
    const inTitle = await cdp.evaluate(`document.title`);
    console.log('India page title:', inTitle);
    assert.ok(inTitle.includes('India'));

    await cdp.navigate(`${BASE_URL}/countries/united-states/`);
    const usTitle = await cdp.evaluate(`document.title`);
    console.log('US page title:', usTitle);
    assert.ok(usTitle.includes('United States'));

    console.log('\n🌟 ALL 10 BROWSER E2E LIVE USER JOURNEY TESTS PASSED PERFECTLY!');
    cdp.close();
    browserClient.close();
  } finally {
    chromeProcess.kill();
  }
}

runLiveE2ETests().catch((err) => {
  console.error('❌ E2E Browser Test Failed:', err);
  process.exit(1);
});
