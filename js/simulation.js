'use strict';

const Simulation = {

  // Compound monthly growth rate from an annual % (e.g. 7 → 0.00565)
  monthlyGrowthRate(annualPct) {
    return Math.pow(1 + annualPct / 100, 1 / 12) - 1;
  },

  // Monthly payout amount based on withdrawal rate
  calcMonthlyPayout(portfolioValue, withdrawalRatePct) {
    return portfolioValue * (withdrawalRatePct / 100 / 12);
  },

  // Project portfolio value over N months (for chart)
  project(portfolioValue, annualReturn, withdrawalRate, months) {
    const mg  = this.monthlyGrowthRate(annualReturn);
    const mwr = withdrawalRate / 100 / 12;
    const result = [{ month: 0, value: portfolioValue }];
    let v = portfolioValue;
    for (let i = 1; i <= months; i++) {
      v = v * (1 + mg) * (1 - mwr);
      result.push({ month: i, value: Math.max(0, v) });
    }
    return result;
  },

  // Advance simulation by one month
  simulateMonth(state) {
    const { portfolio, workingBalance, setup, simulatedMonths } = state;

    const mg     = this.monthlyGrowthRate(setup.annualReturn);
    const payout = this.calcMonthlyPayout(portfolio.value, setup.withdrawalRate);

    const grownValue  = portfolio.value * (1 + mg);
    const newPortVal  = Math.max(0, grownValue - payout);
    const newWorkBal  = workingBalance + payout;
    const growth      = grownValue - portfolio.value;

    // Simulate a calendar date advancing month by month
    const simDate = new Date(setup.startDate);
    simDate.setMonth(simDate.getMonth() + simulatedMonths + 1);

    const tx = {
      id: genId(),
      date: simDate.toISOString(),
      type: 'payout',
      amount: payout,
      growth: growth,
      description: `Month ${simulatedMonths + 1} — payout`,
      portfolioValueAfter: newPortVal,
      workingBalanceAfter: newWorkBal,
    };

    const newState = {
      ...state,
      portfolio: {
        ...portfolio,
        value: newPortVal,
        totalWithdrawn: portfolio.totalWithdrawn + payout,
      },
      workingBalance: newWorkBal,
      simulatedMonths: simulatedMonths + 1,
      transactions: [...state.transactions, tx],
    };

    AppState.save(newState);
    return { newState, payout, growth };
  },

  // Add funds to portfolio
  deposit(state, amount) {
    const amt       = parseFloat(amount);
    const newPortVal = state.portfolio.value + amt;

    const tx = {
      id: genId(),
      date: new Date().toISOString(),
      type: 'deposit',
      amount: amt,
      description: 'Deposit to portfolio',
      portfolioValueAfter: newPortVal,
      workingBalanceAfter: state.workingBalance,
    };

    const newState = {
      ...state,
      portfolio: {
        ...state.portfolio,
        value: newPortVal,
        totalDeposited: state.portfolio.totalDeposited + amt,
      },
      transactions: [...state.transactions, tx],
    };

    AppState.save(newState);
    return newState;
  },

  // Spend from working balance
  spend(state, amount) {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0 || amt > state.workingBalance) return null;

    const newWorkBal = state.workingBalance - amt;

    const tx = {
      id: genId(),
      date: new Date().toISOString(),
      type: 'spend',
      amount: -amt,
      description: 'Withdrawal from working balance',
      portfolioValueAfter: state.portfolio.value,
      workingBalanceAfter: newWorkBal,
    };

    const newState = {
      ...state,
      workingBalance: newWorkBal,
      transactions: [...state.transactions, tx],
    };

    AppState.save(newState);
    return newState;
  },

  // Update withdrawal rate and expected return settings
  updateSettings(state, { withdrawalRate, annualReturn }) {
    const newState = {
      ...state,
      setup: {
        ...state.setup,
        withdrawalRate: parseFloat(withdrawalRate),
        annualReturn:   parseFloat(annualReturn),
      },
    };
    AppState.save(newState);
    return newState;
  },
};
