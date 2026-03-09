'use strict';

const STATE_KEY = 'antiloan_v1';

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

const AppState = {
  get() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  save(state) {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  },

  init({ deposit, withdrawalRate, annualReturn }) {
    const dep = parseFloat(deposit);
    const wr  = parseFloat(withdrawalRate);
    const ar  = parseFloat(annualReturn);
    const now = new Date().toISOString();

    const state = {
      version: 1,
      setup: {
        withdrawalRate: wr,
        annualReturn: ar,
        startDate: now,
      },
      portfolio: {
        value: dep,
        totalDeposited: dep,
        totalWithdrawn: 0,
      },
      workingBalance: 0,
      simulatedMonths: 0,
      transactions: [
        {
          id: genId(),
          date: now,
          type: 'deposit',
          amount: dep,
          description: 'Initial deposit',
          portfolioValueAfter: dep,
          workingBalanceAfter: 0,
        },
      ],
    };

    this.save(state);
    return state;
  },

  reset() {
    localStorage.removeItem(STATE_KEY);
  },
};
