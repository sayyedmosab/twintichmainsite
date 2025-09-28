import { test } from '@playwright/test';

test('inspect header outerHTML and inline styles', async ({ page }) => {
  const base = 'http://localhost:3102';
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForSelector('header');

  const html = await page.evaluate(() => {
    const header = document.querySelector('header');
    const flag = document.querySelector('header img.flag-img');
    const auth = document.querySelector('header img.auth-img');
    const logo = document.querySelector('header img.logo-img');
    return {
      headerOuter: header ? header.outerHTML.slice(0, 2000) : null,
      flagInline: flag ? flag.getAttribute('style') : null,
      authInline: auth ? auth.getAttribute('style') : null,
      logoInline: logo ? logo.getAttribute('style') : null,
    };
  });

  // eslint-disable-next-line no-console
  console.log('HEADER_OUTER_HTML_SNIPPET:', html.headerOuter);
  // eslint-disable-next-line no-console
  console.log('FLAG_INLINE_STYLE:', html.flagInline);
  // eslint-disable-next-line no-console
  console.log('AUTH_INLINE_STYLE:', html.authInline);
  // eslint-disable-next-line no-console
  console.log('LOGO_INLINE_STYLE:', html.logoInline);
});
