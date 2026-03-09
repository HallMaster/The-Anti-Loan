# The Anti-Loan

> **Everyone can cash flow.**

A proof-of-concept web app that simulates investing a lump sum and collecting a monthly income from it — sustainably, potentially forever.

Instead of borrowing money and paying interest, you invest money and *receive* interest. Set your withdrawal rate below your expected market return, and your portfolio can pay you indefinitely.

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
