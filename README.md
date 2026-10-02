# Paradise Nursery — e-plantShopping

A responsive educational plant-shopping application built with React, Redux Toolkit, and Vite. Based on the IBM Developer Skills Network `e-plantShopping` starter project. The completed implementation was prepared with AI assistance and should be reviewed and understood before any academic submission.

## Features

- Landing page with a bundled greenhouse background illustration, company description, and Get Started link.
- 18 unique plants in 3 categories, with 6 plants in each category.
- Each product includes a bundled SVG thumbnail, name, description, price, and Add to Cart button.
- Shared Home / Plants / Cart navigation, with a live cart quantity badge.
- Redux state for adding, deleting, and updating product quantities.
- Added products are disabled; deleting them or decrementing to zero enables re-adding them.
- Cart thumbnails, unit prices, quantities, item subtotals, total plant count, and total price.
- Checkout displays “Coming Soon”; no payment or ordering takes place.
- Continue Shopping returns to the catalog. Hash navigation supports Back/Forward on static hosting.

## Run locally

Requires Node.js 18 or newer (tested with Node.js 24).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. The project base path is `/e-plantShopping/`.

```sh
npm run check   # lint, automated tests, production build
npm run preview
```

## Files for the course rubric

| File | Responsibility |
| --- | --- |
| `README.md` | Project name and documentation |
| `src/AboutUs.jsx` | Company information |
| `src/App.css` | Landing background image and layout |
| `src/App.jsx` | Landing page and navigation state |
| `src/CartSlice.jsx` | Redux add/remove/update reducers |
| `src/ProductList.jsx` | Plant categories, cards, cart button state, shared navbar |
| `src/CartItem.jsx` | Quantities, subtotals, totals, deletion and checkout message |
| `src/store.js`, `src/main.jsx` | Redux store and Provider |

## Static hosting

`npm run build` generates `dist/`. A copy of the tested build can be published from the `docs/` folder using GitHub Pages: main branch, `/docs` directory. Regenerate this copy after changes to application code.

## Verification

The repository includes reducer tests and component interaction tests. They cover empty state, duplicate additions, invalid quantities, increment/decrement, decrement-to-zero, deletion, re-addition, totals, checkout, and cross-page cart retention. `evidence/checks.txt` records the actual aggregate test run. Browser visual testing is documented separately once a public deployment is verified.

## Limitations

This is an educational front-end demo. Cart state is held in memory and resets after a full reload. No backend, persistent accounts, or real checkout is provided. Plant descriptions are decorative catalog copy, not health or plant-care advice.

## Assets and attribution

The starter code is from IBM Developer Skills Network and retains its Apache 2.0 license. Plant thumbnails and the greenhouse background in `public/` are original bundled SVG illustrations created for this implementation. Starter third-party photo URLs were replaced to avoid broken remote images and to keep the site self-contained. Fonts fall back to system fonts if unavailable.
