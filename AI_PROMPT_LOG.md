# Hamlet's Breakfast and Brunch — AI Prompt Log

FULL CHAT LOG: https://chatgpt.com/share/6b02a0ff-ef44-83e9-8550-948e07692687

## Prompt 1 — November 18, 2026

> Generate an HTML website for a fictional restaurant called Hamlet's Breakfast and Brunch. This website needs to have at least 3 major sections; probably a home/about, order page, menu page. There needs to be a navigation menu that links all the pages together. The website will need at least 2 images that can be AI-generated. There needs to be consistent visuals across all pages using a CSS file. There needs to be at least 1 interactive feature using JavaScript. These examples include but are not limited to: an image gallery or slideshow, a contact or feedback form with validation, a dark/light mode toggle, an expandable FAQ section. The site must be responsive for both desktop and mobile screens. Please keep track of all of my prompts; I will need all of them, including this one, when I am done with this project.

**Context supplied:** Project 1 grading rubric image (Content & structure, Design & CSS, JavaScript feature, Code quality, AI workflow & reflection; each 20 points).

**AI assistance:** Initial HTML/CSS/JavaScript website, three linked pages, responsive styling, interactive menu filtering, cart, demo checkout form, theme toggle, FAQ, and AI-generated imagery.

**Review/corrections made by student:** [Fill in after testing and customizing.]

## Future prompts

Append each new prompt verbatim, with its date, the AI response or change, and what you accepted, modified, or rejected.

## Prompt 2 — November 22, 2026 — Testing and submission

**Tool:** ChatGPT (GPT-6 for this testing/review interaction; initial-generation model version not independently recorded).

> **Check the following to make sure that the Hamlet's Breakfast and Brunch website follows these tests:**
>
> Test your website and submit a short test report covering at least the items below. For each item, state what you tested, what happened, and any fixes you made:
>
> 1. **Navigation:** click every link in the nav menu on every page — all pages load and link to each other
> 2. **Images:** all images load correctly, and every `<img>` tag has alt text
> 3. **JavaScript feature:** your interactive feature behaves as expected (test every state — e.g., toggle on and off, valid and invalid form input)
> 4. **Responsive layout:** the site displays correctly at desktop width and on a phone-sized screen. In Chrome or Edge, press F12, click the device toolbar icon, and select a phone-sized device to check
> 5. **Console:** no errors in the browser console (F12 → Console tab) on any page
> 6. **Links and paths:** no broken links, missing files, or 404s in the Network tab
>
> **Submission checklist**
>
> Submit the following:
>
> - A link to your GitHub repository containing all website files
> - (Optional but encouraged) A link to the live site via GitHub Pages
> - Your prompt log for at least three features, noting which LLM(s) you used
> - Your test report

**AI response/work performed:** Audited all local HTML links, images, CSS/JS references, and responsive breakpoints; ran JavaScript syntax and isolated menu/cart tests; wrote a six-category test report. Tried browser testing, but Chromium blocked local navigation, so browser results were left pending.

### Feature-by-feature AI workflow records

These are **feature records**, not additional fictional user prompts. The actual user prompts are transcribed above and under Prompt 1.

| Feature | Actual prompt source | AI tool | AI-generated implementation | Student review / corrections |
|---|---|---|---|---|
| Shared navigation and three pages | Prompt 1 (Nov. 18) | ChatGPT (initial model version not recorded) | `index.html`, `menu.html`, `order.html` with shared navigation and stylesheet | Navigation target files pass static tests; record manual click results here. |
| Responsive styling and imagery | Prompt 1 (Nov. 18) | ChatGPT (initial model version not recorded); AI image generation used during website creation | Shared `style.css`, two JPEG image assets, mobile media queries | Image files and paths pass file checks; record device-toolbar visual results here. |
| Interactive menu and order form | Prompt 1 (Nov. 18); Prompt 2 testing request | ChatGPT (GPT-6 review) | Category filters, cart quantity controls, demo checkout validation, dark mode, FAQ | Isolated logic tests pass; record valid/invalid browser form tests and any fixes here. |

**Ownership/reflection prompts:** Which generated feature did you change or improve yourself? What did you discover during Chrome/Edge testing? Which AI suggestions did you reject or correct, and why? Write specific details from your own testing rather than claiming corrections that did not happen.

## Prompt 3 — November 22, 2026 — Cart persistence bug fix

**Tool:** ChatGPT (GPT-6).

> There is an issue where on the menu screen, if I add an item to my cart and then press "Review My Order" or "Order", my cart gets reset. Can you fix this issue?

**Issue identified:** The site used `localStorage` for cart persistence. Browsers can isolate storage between separate `file://` HTML pages, so opening the files directly can lose cart state when navigating. This problem may not occur over an HTTP server.

**AI-generated correction:** Updated `script.js` to transfer validated cart quantities between internal pages through a temporary URL query parameter when opened through `file://`. On the destination page, the cart is restored and the query parameter is removed where browser history operations are permitted. Normal hosted pages continue using localStorage unchanged.

**Verification:** JavaScript syntax and static link checks passed. Simulated tests passed for Menu → Order with multiple items, Order → Menu after changing quantity, and removal of the temporary query parameter. Browser testing is still recommended.

**Student review / corrections:** [Describe your own confirmation of the fixed cart behavior in Chrome or Edge.]
