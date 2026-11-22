# Hamlet's Breakfast and Brunch — Website Test Report

**Test date:** November 22, 2026  
**Website:** `index.html`, `menu.html`, `order.html`  
**Method:** Automated static checks of HTML/CSS/assets, `node --check` JavaScript syntax validation, and isolated JavaScript logic tests using Node.js. **Interactive browser verification was attempted but could not complete:** Chromium blocked both local HTTP and `file://` navigation (`ERR_BLOCKED_BY_ADMINISTRATOR`). Accordingly, browser-only checks below are not reported as passed.

| Requirement | What I tested | What happened | Fixes made / remaining work |
|---|---|---|---|
| 1. Navigation | Inspected Home, Menu, and Order navigation links on each of the three pages, and checked local target files. | **PASS (static):** Each navigation menu links to `index.html`, `menu.html`, and `order.html`, and all three files exist. **Not verified by clicking:** Browser navigation was blocked. | No broken references were found. Manually click all three links from every page in Chrome/Edge. |
| 2. Images | Checked image file integrity, referenced image paths, and `alt` attributes of HTML `<img>` tags. Also checked the CSS hero background image path. | **PASS (file-level):** `breakfast.jpg` and `pancakes.jpg` decode successfully. The Home page's `<img>` has meaningful alt text; other pages have no HTML `<img>` elements. The pancake hero is a CSS background, so it does not require an HTML `alt` attribute. | No file-level fixes needed. Visually confirm images render in the browser. |
| 3. JavaScript | Checked JS syntax; tested all nine menu items and category totals (All 9, Savory 4, Sweet 3, Drinks 2); cart addition, quantity removal, corrupted-cart fallback, and price formatting. Reviewed theme toggle, FAQ, and checkout code. | **PASS (isolated logic):** Syntax and six independent Node.js tests passed. **Not yet browser-verified:** Filter clicks, light/dark toggles, FAQ open/close, checkout invalid/valid/empty-cart states. | No fixes required by isolated tests. Run the complete interaction checklist below in a browser. |
| 4. Responsive layout | Checked viewport meta tags on all pages and CSS media queries at 750px and 480px. | **PASS (structure):** Responsive rules and mobile viewport tags exist. **Visual verification pending:** Actual desktop and phone layout, overlap, and horizontal scrolling could not be measured in the blocked browser. | Test desktop at ~1440px and Chrome/Edge device toolbar at 390px (plus optional 320px). |
| 5. Console | Performed JavaScript syntax check and attempted Chromium runtime test. | **PASS (syntax), NOT VERIFIED (console):** No syntax errors, but actual page-console inspection was blocked. | Open each page in Chrome/Edge and confirm zero red Console errors, including after using the features. |
| 6. Links and paths | Checked all HTML anchor targets (8 Home, 7 Menu, 6 Order), CSS/JS references, CSS image URL, and both JPEG files. | **PASS (static):** All referenced local files exist; no broken local relative links detected. **Not verified:** Network status codes and browser requests. | In DevTools Network tab, reload each page and confirm no 404 responses. |

## Manual browser test checklist (finish before submission)

- [ ] From **Home**, click Home, Menu, and Order.
- [ ] From **Menu**, click Home, Menu, and Order.
- [ ] From **Order**, click Home, Menu, and Order.
- [ ] Visually confirm the hero pancakes image and breakfast plate image display.
- [ ] Switch dark mode **on**, reload to check persistence, then switch it **off**.
- [ ] Expand and collapse an FAQ answer.
- [ ] On Menu, test **All**, **Savory**, **Sweet**, and **Drinks** category buttons.
- [ ] Add an item on Menu; open Order; confirm item and subtotal persist. Increase and decrease quantity, including to zero.
- [ ] With an **empty cart**, attempt a demo checkout: expect an add-item message.
- [ ] With an item in the cart, attempt checkout with a **missing/short name** and **invalid email**: expect validation to prevent submission.
- [ ] Enter a valid name and email: expect demo confirmation and emptied cart. No payment occurs.
- [ ] Check layout at desktop width (~1440px) and phone width (~390px), especially navigation, card columns, and cart; confirm no horizontal scrolling.
- [ ] On **each page**, open DevTools Console and confirm no errors.
- [ ] On **each page**, open DevTools Network, reload, and confirm no missing assets or 404s.

## Fixes made

**None were required by the static and isolated logic checks.** The test report and AI prompt log were updated. Browser-only test results have deliberately been left pending rather than invented.

## Submission checklist

- [ ] Push all website files to a **public or accessible GitHub repository** and paste the real URL into the assignment submission.
- [ ] (Optional) Enable GitHub Pages and paste the published live-site URL.
- [x] Include `AI_PROMPT_LOG.md`, identifying the AI tool and documenting features supported by the prompts.
- [x] Include this `TEST_REPORT.md`, and update its pending browser checks after testing.

**Note:** These results apply to the files in this ZIP archive; repeat browser checks on the deployed site after uploading to GitHub Pages.
