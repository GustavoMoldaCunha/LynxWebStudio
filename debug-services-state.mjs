import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

page.on('console', msg => console.log('BROWSER_CONSOLE', msg.type(), msg.text()));
page.on('pageerror', err => console.log('PAGEERROR', err.message));
page.on('requestfailed', req => console.log('REQUESTFAILED', req.url(), req.failure()?.errorText || 'unknown'));

await page.goto('http://localhost:4173', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1200);

const initial = await page.evaluate(() => {
  const outer = document.querySelector('.services-scrollspy');
  const inner = document.querySelector('.services-scrollspy__inner');
  const card = document.querySelector('.service-preview-card');

  const items = [...document.querySelectorAll('.services-scrollspy__item')].map((el, i) => ({
    i,
    text: el.innerText.replace(/\s+/g, ' ').trim(),
    isActive: el.classList.contains('is-active'),
    ariaSelected: el.getAttribute('aria-selected'),
  }));

  const cardTitle = document.querySelector('.service-preview-card .service-title')?.textContent.trim() || null;
  const cardCount = document.querySelectorAll('.service-preview-card').length;
  const targets = [...document.querySelectorAll('.services-scrollspy__target')].map((el, i) => ({
    i,
    top: Math.round(el.getBoundingClientRect().top),
    height: Math.round(el.getBoundingClientRect().height),
  }));

  return {
    stageCount: items.length,
    items,
    cardTitle,
    cardCount,
    targets,
    outerHeight: outer ? getComputedStyle(outer).height : null,
    innerPosition: inner ? getComputedStyle(inner).position : null,
    innerTop: inner ? getComputedStyle(inner).top : null,
    cardPosition: card ? getComputedStyle(card).position : null,
    cardTop: card ? getComputedStyle(card).top : null,
  };
});

console.log('INITIAL_STATE');
console.log(JSON.stringify(initial, null, 2));

for (const targetIndex of [0, 1, 2]) {
  await page.evaluate((idx) => {
    const targets = [...document.querySelectorAll('.services-scrollspy__target')];
    const el = targets[idx];
    if (el) {
      el.scrollIntoView({ block: 'center', inline: 'nearest' });
    }
  }, targetIndex);

  await page.waitForTimeout(1000);

  const state = await page.evaluate((idx) => {
    const items = [...document.querySelectorAll('.services-scrollspy__item')].map((el, i) => ({
      i,
      text: el.innerText.replace(/\s+/g, ' ').trim(),
      isActive: el.classList.contains('is-active'),
      ariaSelected: el.getAttribute('aria-selected'),
    }));

    const activeIndex = items.findIndex(item => item.isActive);
    const activeIndexByAttr = [...document.querySelectorAll('.services-scrollspy__item')].findIndex(el => el.getAttribute('aria-selected') === 'true');
    const cardTitle = document.querySelector('.service-preview-card .service-title')?.textContent.trim() || null;
    const cardExists = !!document.querySelector('.service-preview-card');
    const cardContent = document.querySelector('.service-preview-card__content')?.innerText.slice(0, 200).replace(/\s+/g, ' ').trim();

    return {
      targetIndex: idx,
      activeIndex,
      activeIndexByAttr,
      items,
      cardTitle,
      cardExists,
      cardContent,
      pageScrollY: window.scrollY,
    };
  }, targetIndex);

  console.log(`SCROLLED_TARGET_${targetIndex}`);
  console.log(JSON.stringify(state, null, 2));
}

await browser.close();
