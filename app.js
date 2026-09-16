function money(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(n);
}

function calc() {
  const target = Number(document.getElementById('target').value || 0);
  const expenses = Number(document.getElementById('expenses').value || 0);
  const buffer = Number(document.getElementById('buffer').value || 0) / 100;
  const weeks = Number(document.getElementById('weeks').value || 0);
  const hours = Number(document.getElementById('hours').value || 0);
  const nonbill = Number(document.getElementById('nonbill').value || 0) / 100;

  const billable = weeks * hours * (1 - nonbill);

  if (!target || !weeks || !hours || billable <= 0) {
    document.getElementById('out').innerHTML =
      'Enter the example inputs above to see a planning estimate.';
    return;
  }

  const grossNeed = (target + expenses) / (1 - buffer);
  const hourly = grossNeed / billable;
  const day = hourly * 8;
  const project = hourly * 10;

  document.getElementById('out').innerHTML = `
    <strong>Planning estimate:</strong><br>
    Approx. hourly floor: <strong>${money(hourly)}/hr</strong><br>
    Approx. 8-hour day equivalent: <strong>${money(day)}</strong><br>
    Example 10-hour project equivalent: <strong>${money(project)}</strong><br><br>
    <span class="small">
      These are planning estimates only. They are not tax, legal,
      accounting, or pricing advice. Your actual taxes, expenses,
      utilization, and market rate may differ.
    </span>
  `;
}

window.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('#calculator input')
    .forEach(input => input.addEventListener('input', calc));
});
