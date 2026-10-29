const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', (msg) => console.log('BROWSER_CONSOLE', msg.type(), msg.text()));
  page.on('pageerror', (err) => console.log('PAGEERROR', err.message));
  page.on('requestfailed', (req) => console.log('REQUESTFAILED', req.url(), req.failure()?.errorText));

  await page.goto('http://localhost:5175', { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(2000);

  const summary = await page.evaluate(() => {
    const items = [...document.querySelectorAll('.services-scrollspy__item')].map((el, i) => {
      const style = getComputedStyle(el);
      return {
        index: i,
        text: el.innerText.replace(/\s+/g, ' ').trim(),
        display: style.display,
        opacity: style.opacity,
        color: style.color,
        bg: style.backgroundColor,
        visibility: style.visibility,
        borderLeft: style.borderLeft,
      };
    });

    const card = document.querySelector('.service-preview-card');
    const cardContent = document.querySelector('.service-preview-card__content');
    const active = document.querySelector('.services-scrollspy__item.is-active');

    return {
      itemCount: items.length,
      items,
      cardExists: !!card,
      cardDisplay: card ? getComputedStyle(card).display : null,
      cardOpacity: card ? getComputedStyle(card).opacity : null,
      cardVisibility: card ? getComputedStyle(card).visibility : null,
      cardText: card ? card.innerText.replace(/\s+/g, ' ').trim() : null,
      cardContentExists: !!cardContent,
      cardContentText: cardContent ? cardContent.innerText.replace(/\s+/g, ' ').trim() : null,
      activeItemText: active ? active.innerText.replace(/\s+/g, ' ').trim() : null,
      activeItemColor: active ? getComputedStyle(active).color : null,
      activeItemBg: active ? getComputedStyle(active).backgroundColor : null,
      htmlSnippet: document.querySelector('.services-scrollspy') ? document.querySelector('.services-scrollspy').innerHTML.slice(0, 1200) : null,
    };
  });

  console.log(JSON.stringify(summary, null, 2));
  await browser.close();
})();
