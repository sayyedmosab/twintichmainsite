import { test } from '@playwright/test';

test('inspect header/footer on /twinscience and /', async ({ page }) => {
  const base = 'http://localhost:3102';

  for (const path of ['/twinscience', '/']) {
    const url = base + path;
    await page.goto(url, { waitUntil: 'networkidle' });
    // wait a little for fixed elements to render
    await page.waitForTimeout(300);

    const report = await page.evaluate(() => {
      function describeEl(selector: string) {
        const el = document.querySelector(selector) as HTMLElement | null;
        if (!el) return { exists: false };
        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          exists: true,
          tag: el.tagName,
          classList: Array.from(el.classList),
          display: cs.getPropertyValue('display'),
          visibility: cs.getPropertyValue('visibility'),
          zIndex: cs.getPropertyValue('z-index'),
          position: cs.getPropertyValue('position'),
          top: cs.getPropertyValue('top'),
          paddingTop: cs.getPropertyValue('padding-top'),
          paddingBottom: cs.getPropertyValue('padding-bottom'),
          boxSizing: cs.getPropertyValue('box-sizing'),
          rect: { top: rect.top, bottom: rect.bottom, height: rect.height }
        };
      }

      return {
        path: location.pathname,
        header: describeEl('header'),
        footer: describeEl('footer'),
        headerGrid: describeEl('.header-grid')
      };
    });

    // eslint-disable-next-line no-console
    console.log('PAGE_INSPECT:', JSON.stringify(report, null, 2));
  }
});
