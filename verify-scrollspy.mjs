import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

await page.goto('http://localhost:4173', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1200);

const initial = await page.evaluate(() => {
  const servicesScrollspy = document.querySelector('.services-scrollspy');
  const inner = document.querySelector('.services-scrollspy__inner');
  const card = document.querySelector('.service-preview-card');

  return {
    outerHeight: servicesScrollspy ? getComputedStyle(servicesScrollspy).height : null,
    innerPosition: inner ? getComputedStyle(inner).position : null,
    innerTop: inner ? getComputedStyle(inner).top : null,
    cardPosition: card ? getComputedStyle(card).position : null,
    cardTop: card ? getComputedStyle(card).top : null,
    list: [...document.querySelectorAll('.services-scrollspy__item')].map((el, i) => ({
      i,
      text: el.innerText.replace(/\s+/g, ' ').trim(),
      active: el.classList.contains('is-active'),
      ariaSelected: el.getAttribute('aria-selected')
    })),
    activeTitle: document.querySelector('.service-preview-card .service-title')?.textContent.trim() || null
  };
});

console.log('INITIAL_STATE');
console.log(JSON.stringify(initial, null, 2));

for (const targetIndex of [0, 1, 2]) {
  await page.evaluate((idx) => {
    const targets = [...document.querySelectorAll('.services-scrollspy__target')];
    const target = targets[idx];
    if (target) {
      target.scrollIntoView({ block: 'center', inline: 'nearest' });
    }
  }, targetIndex);

  await page.waitForTimeout(1200);

  const step = await page.evaluate(() => {
    const items = [...document.querySelectorAll('.services-scrollspy__item')].map((el, i) => ({
      i,
      text: el.innerText.replace(/\s+/g, ' ').trim(),
      active: el.classList.contains('is-active'),
      ariaSelected: el.getAttribute('aria-selected')
    }));

    const activeIndex = items.findIndex(item => item.active);
    const title = document.querySelector('.service-preview-card .service-title')?.textContent.trim() || null;
    const cardRect = document.querySelector('.service-preview-card')?.getBoundingClientRect();
    return {
      activeIndex,
      activeTitle: title,
      cardTop: cardRect ? Math.round(cardRect.top) : null,
      items
    };
  });

  console.log(`STEP_${targetIndex}`);
  console.log(JSON.stringify(step, null, 2));
}

await browser.close();
