'use strict';

const Utils = {

  fmt(n, dec = 2) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    }).format(n || 0);
  },

  fmtCompact(n) {
    if (Math.abs(n) >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
    if (Math.abs(n) >= 1_000)     return '$' + (n / 1_000).toFixed(1) + 'k';
    return this.fmt(n);
  },

  fmtDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  },

  fmtPct(n, dec = 2) {
    return parseFloat(n).toFixed(dec) + '%';
  },

  toast(msg, type = 'info') {
    let el = document.getElementById('_toast');
    if (!el) {
      el = document.createElement('div');
      el.id = '_toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    const colors = { success: 'var(--green)', error: 'var(--red)', info: 'var(--accent)' };
    el.style.borderLeftColor = colors[type] || colors.info;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 3200);
  },

  openModal(id) {
    document.getElementById(id)?.classList.add('open');
  },

  closeModal(id) {
    document.getElementById(id)?.classList.remove('open');
  },

  // Redirect to index if no app state exists
  guardSetup() {
    if (!AppState.get()) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  },
};
