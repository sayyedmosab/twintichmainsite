import { test } from '@playwright/test';

test('debug header image computed styles', async ({ page }) => {
  const base = 'http://localhost:3102';
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForSelector('header');

  const results = await page.evaluate(() => {
    const out: any = {};
    const flag = document.querySelector('header img.flag-img') as HTMLImageElement | null;
    const auth = document.querySelector('header img.auth-img') as HTMLImageElement | null;
    const logo = document.querySelector('header img.logo-img') as HTMLImageElement | null;

    function describe(el: HTMLImageElement | null) {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tagName: el.tagName,
        src: el.getAttribute('src'),
        width_attr: el.getAttribute('width'),
        height_attr: el.getAttribute('height'),
        naturalWidth: (el as HTMLImageElement).naturalWidth || null,
        naturalHeight: (el as HTMLImageElement).naturalHeight || null,
        classList: Array.from(el.classList),
        inlineStyle: el.getAttribute('style'),
        computed: {
          width: cs.getPropertyValue('width'),
          height: cs.getPropertyValue('height'),
          maxWidth: cs.getPropertyValue('max-width'),
          objectFit: cs.getPropertyValue('object-fit'),
        },
        rect: { width: rect.width, height: rect.height, top: rect.top, left: rect.left },
        parent: el.parentElement ? { tag: el.parentElement.tagName, classList: Array.from(el.parentElement.classList), inlineStyle: el.parentElement.getAttribute('style') } : null
      };
    }

    out.flag = describe(flag);
    out.auth = describe(auth);
    out.logo = describe(logo);

    const header = document.querySelector('header');
    if (header) {
      const hcs = window.getComputedStyle(header);
      const hrect = header.getBoundingClientRect();
      out.header = { classList: Array.from(header.classList), height: hcs.getPropertyValue('height'), display: hcs.getPropertyValue('display'), rect: { width: hrect.width, height: hrect.height } };
    }

    // Inspect header grid and its three children
    const grid = document.querySelector('.header-grid');
    if (grid) {
      const gcs = window.getComputedStyle(grid as Element);
      const rect = (grid as Element).getBoundingClientRect();
      out.grid = { classList: Array.from((grid as Element).classList), display: gcs.getPropertyValue('display'), gridTemplateColumns: gcs.getPropertyValue('grid-template-columns'), width: rect.width };

      const left = document.querySelector('.header-left');
      const center = document.querySelector('.header-center');
      const right = document.querySelector('.header-right');
      function describeBox(el: Element | null) {
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return { tag: el.tagName, classList: Array.from(el.classList), display: cs.getPropertyValue('display'), width: r.width, height: r.height, flexDirection: cs.getPropertyValue('flex-direction') };
      }
      out.gridChildren = { left: describeBox(left), center: describeBox(center), right: describeBox(right) };
    }

    return out;
  });

  // Print to stdout so runTests captures it
  // eslint-disable-next-line no-console
  console.log('HEADER_IMAGE_DEBUG:', JSON.stringify(results, null, 2));

  const offending = await page.evaluate(() => {
    const found: any[] = [];
    for (const ss of Array.from(document.styleSheets)) {
      let href = (ss as CSSStyleSheet).href || 'inline';
      try {
        const rules = (ss as CSSStyleSheet).cssRules || [];
        for (const r of Array.from(rules)) {
          // @ts-ignore
          const sel = r.selectorText || '';
          // @ts-ignore
          const cssText = r.cssText || '';
          if (/img|\.flag-img|\.auth-img|header/.test(sel) && /width|max-width|object-fit/i.test(cssText)) {
            found.push({ href, selector: sel, cssText });
          }
        }
      } catch (e) {
        // cross-origin stylesheets will throw; ignore
      }
    }
    return found;
  });

  // eslint-disable-next-line no-console
  console.log('HEADER_IMAGE_CSS_RULES:', JSON.stringify(offending, null, 2));

  const sheetSummary = await page.evaluate(() => {
    return Array.from(document.styleSheets).map((ss: any) => {
      let href = ss.href || 'inline';
      let count = 0;
      let sample = '';
      try {
        const rules = ss.cssRules || [];
        count = rules.length;
        for (let i = Math.max(0, rules.length - 10); i < rules.length; i++) {
          sample += rules[i].cssText + '\n';
        }
      } catch (e) {
        sample = 'CORS/ACCESS DENIED';
      }
      return { href, count, sample };
    });
  });

  // eslint-disable-next-line no-console
  console.log('STYLESHEET_SUMMARY:', JSON.stringify(sheetSummary, null, 2));

  const styleTags = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('style')).map(s => ({ text: s.textContent?.slice(0,200) || '', len: s.textContent?.length || 0 }));
  });
  // eslint-disable-next-line no-console
  console.log('STYLE_TAGS_COUNT:', styleTags.length);
  // eslint-disable-next-line no-console
  console.log('STYLE_TAGS_SAMPLE:', JSON.stringify(styleTags.slice(0,5), null, 2));
});
