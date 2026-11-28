// Cálculos do simulador. Usados no browser (Simulator, LeadWizard) e no build (tabelas de exemplo).

export function payment(principal: number, annualPct: number, months: number): number {
  const r = annualPct / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

/** TAEG estimada: taxa anual efetiva que iguala o valor recebido (líquido de encargos iniciais) às prestações. */
export function taeg(principal: number, pmt: number, months: number, feePct: number): number {
  const net = principal * (1 - feePct / 100);
  let lo = 0;
  let hi = 1;
  for (let k = 0; k < 100; k++) {
    const mid = (lo + hi) / 2;
    const pv = mid === 0 ? pmt * months : (pmt * (1 - Math.pow(1 + mid, -months))) / mid;
    if (pv > net) lo = mid;
    else hi = mid;
  }
  const i = (lo + hi) / 2;
  return (Math.pow(1 + i, 12) - 1) * 100;
}

export const fmtNum = (n: number): string => Math.round(n).toLocaleString('pt-PT');
export const fmtKz = (n: number): string => fmtNum(n) + ' Kz';
export const fmtPct = (n: number): string =>
  n.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + '%';

export function fmtPrazo(months: number): string {
  if (months >= 24 && months % 12 === 0) return `${months} meses (${months / 12} anos)`;
  return `${months} meses`;
}
