# The Anti-Loan

This application along with this description were built with the assistance of Claude AI.

The application can be viewed here: https://hallmaster.github.io/The-Anti-Loan/

---

> **Everyone can cash flow.**

A proof-of-concept web app that simulates investing a lump sum and collecting a monthly income from it — sustainably, potentially forever.

This investment software is aimed primarily at high schoolers and younger adults who may not have learned good money principles. It is supposed to incentivize investing your money by clearly showing how invested money “pays” you. Instead of taking out loans to pay for things you might not need––like brand-new couches, expensive clothes, or even UberEats––invest that money and let it pay you!

---

## How it works

1. **Deposit** — Enter an initial amount to invest
2. **Configure** — Set your annual withdrawal rate (e.g. 4%) and expected market return (e.g. 7%)
3. **Simulate** — Step through months to watch your portfolio grow and your working balance fill up
4. **Spend** — Withdraw from your working balance at any time

The math: if your withdrawal rate is lower than your expected return, the portfolio grows faster than it's depleted — sustaining income indefinitely.

---

## Deploying to GitHub Pages

1. Create a new GitHub repository
2. Push all files to the `main` branch
3. Go to **Settings → Pages**
4. Set source to `main` branch, root folder `/`
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/`

---

## Demo data

The landing page includes a **"See Rachel's Demo"** button that pre-loads a realistic 3-year simulation:

- Started with **$5,000** in January 2023
- **11% annual return**, **7.5% annual withdrawal rate**
- Made 6 additional contributions over 3 years ($500 → $800 → $2,000 → $750 → $1,500 → $800)
- Spent from her working balance 5 times (weekend trip, laptop, holiday gifts, home repair, birthday dinner)
- Current portfolio: **$12,430** · Working balance: **$814** · Total income earned: **$2,214**

---

## File structure

```
├── index.html        Landing page + onboarding
├── dashboard.html    Main simulation dashboard
├── history.html      Transaction history log
├── css/
│   └── styles.css    Dark premium theme
└── js/
    ├── state.js      localStorage state management
    ├── simulation.js Financial simulation logic
    └── utils.js      Formatting and UI helpers
```

---

## Tech

- Vanilla HTML, CSS, JavaScript — no build step, no dependencies
- [Chart.js](https://www.chartjs.org/) for portfolio projection charts
- All data stored in `localStorage` — fully client-side, no backend needed

---

*This is a simulation only. No real money, bank accounts, or investment platforms are connected.*
