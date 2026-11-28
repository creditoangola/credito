// Formulário passo a passo. O passo 1 recolhe o contacto (com consentimento) e cada "Continuar" grava as respostas,
// por isso, mesmo que a pessoa desista, ficamos com o contacto e os dados dos passos já preenchidos.
import { payment, fmtKz, fmtNum, fmtPrazo } from '../lib/finance';

const TOTAL = 5;
const STORE = 'credito-ao:pedido';

const CFG: Record<string, { prazos: number[]; chips: number[] }> = {
  pessoal: { prazos: [6, 12, 24, 36, 48, 60], chips: [500000, 1000000, 3000000, 5000000, 10000000] },
  automovel: { prazos: [12, 24, 36, 48, 60, 72, 84], chips: [3000000, 5000000, 8000000, 12000000, 20000000] },
  habitacao: { prazos: [60, 120, 180, 240, 300, 360], chips: [15000000, 30000000, 50000000, 80000000, 120000000] },
};
const NOMES: Record<string, string> = {
  pessoal: 'crédito pessoal',
  automovel: 'crédito automóvel',
  habitacao: 'crédito habitação',
};

type Data = Record<string, string | number | boolean | null>;

function uid(): string {
  try {
    if (crypto && 'randomUUID' in crypto) return crypto.randomUUID();
  } catch {
    /* ignore */
  }
  return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const phoneNorm = (raw: string) => raw.replace(/[\s\-().]/g, '').replace(/^(\+?244)/, '');

export function initWizard(root: HTMLElement): void {
  const form = root.querySelector<HTMLFormElement>('[data-form]')!;
  const success = root.querySelector<HTMLElement>('[data-success]')!;
  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
  const fill = root.querySelector<HTMLElement>('[data-fill]')!;
  const bar = root.querySelector<HTMLElement>('[role="progressbar"]')!;
  const label = root.querySelector<HTMLElement>('[data-progress-label]')!;
  const back = root.querySelector<HTMLButtonElement>('[data-back]')!;
  const next = root.querySelector<HTMLButtonElement>('[data-next]')!;
  const note = root.querySelector<HTMLElement>('[data-resumed]')!;

  const endpoint = root.dataset.endpoint || '';
  const whatsapp = root.dataset.whatsapp || '';
  const cfg: Record<string, { taxa: number; valor: number; prazo: number }> = JSON.parse(root.dataset.config || '{}');

  let current = 1;
  const touched = { valor: false, prazo: false };
  let id = uid();
  let done = false;
  let dirty = false;
  let contactOk = false; // contacto validado e consentimento dado (passo 1 concluído)

  const el = (name: string) => form.elements.namedItem(name) as any;
  const val = (name: string): string => {
    const e = el(name);
    if (!e) return '';
    if (e instanceof RadioNodeList) return e.value || '';
    return String(e.value ?? '').trim();
  };
  const produto = () => val('produto') || root.dataset.produto || 'pessoal';

  /* ---------- Produto: finalidade, prazos, valores rápidos ---------- */
  function applyProduto(): void {
    const p = produto();
    root.querySelectorAll<HTMLElement>('[data-for]').forEach((box) => {
      const match = box.dataset.for === p;
      box.hidden = !match;
      const input = box.querySelector<HTMLInputElement>('input');
      if (input && !match) input.checked = false;
    });
    const sel = el('prazo') as HTMLSelectElement;
    const keep = sel.value;
    sel.innerHTML = '';
    CFG[p].prazos.forEach((m) => {
      const o = document.createElement('option');
      o.value = String(m);
      o.textContent = fmtPrazo(m);
      sel.appendChild(o);
    });
    const wanted =
      touched.prazo && keep && CFG[p].prazos.includes(Number(keep)) ? keep : String(cfg[p]?.prazo ?? CFG[p].prazos[0]);
    sel.value = CFG[p].prazos.includes(Number(wanted)) ? wanted : String(CFG[p].prazos[0]);

    const chips = root.querySelector<HTMLElement>('[data-chips]')!;
    chips.innerHTML = '';
    CFG[p].chips.forEach((v) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = fmtKz(v);
      b.addEventListener('click', () => {
        touched.valor = true;
        (el('valor') as HTMLInputElement).value = String(v);
        estimate();
        dirty = true;
      });
      chips.appendChild(b);
    });
    const valor = el('valor') as HTMLInputElement;
    if (!touched.valor || !valor.value) valor.value = String(cfg[p]?.valor ?? 5000000);
    estimate();
  }

  function estimate(): void {
    const p = produto();
    const valor = Number(val('valor'));
    const prazo = Number(val('prazo'));
    const box = root.querySelector<HTMLElement>('[data-estimate]')!;
    const out = root.querySelector<HTMLElement>('[data-estimate-value]')!;
    if (valor >= 50000 && prazo > 0) {
      out.textContent = fmtNum(payment(valor, cfg[p]?.taxa ?? 22, prazo)) + ' Kz por mês';
      box.hidden = false;
    } else {
      box.hidden = true;
    }
  }

  /* ---------- Recolha, validação e gravação ---------- */
  function collect(final: boolean): Data {
    const d: Data = {
      id,
      estado: final ? 'completo' : 'parcial',
      etapa: current,
      produto: produto(),
      finalidade: val('finalidade'),
      valor: val('valor') ? Number(val('valor')) : null,
      prazo: val('prazo') ? Number(val('prazo')) : null,
      urgencia: val('urgencia'),
      situacao: val('situacao'),
      rendimento: val('rendimento'),
      creditos: val('creditos'),
      prestacaoAtual: val('prestacaoAtual') ? Number(val('prestacaoAtual')) : null,
      historico: val('historico'),
      pagina: location.pathname,
      data: new Date().toISOString(),
    };
    const q = new URLSearchParams(location.search);
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach((k) => {
      if (q.get(k)) d[k] = q.get(k);
    });
    if (final || contactOk) {
      d.nome = val('nome');
      d.email = val('email');
      d.telefone = '+244' + phoneNorm(val('telefone'));
      d.provincia = val('provincia');
      d.consentimento = true;
    }
    return d;
  }

  function save(step: number): void {
    try {
      localStorage.setItem(STORE, JSON.stringify({ id, step, ts: Date.now(), data: collect(false) }));
    } catch {
      /* sem armazenamento: continua */
    }
  }

  async function send(payload: Data): Promise<boolean> {
    if (!endpoint) return false;
    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      return true;
    } catch {
      return false;
    }
  }

  function setError(name: string, msg: string | null): void {
    const p = root.querySelector<HTMLElement>(`[data-error="${name}"]`);
    if (p) {
      p.textContent = msg ?? '';
      p.hidden = !msg;
    }
    const input = form.querySelector<HTMLElement>(`[name="${name}"]`);
    if (input) {
      if (msg) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    }
  }

  function validate(step: number): boolean {
    let ok = true;
    const need = (name: string, cond: boolean, msg: string) => {
      setError(name, cond ? null : msg);
      if (!cond) ok = false;
    };
    if (step === 1) {
      need('nome', val('nome').length >= 3, 'Indique o seu nome completo.');
      need('email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val('email')), 'Indique um email válido, por exemplo nome@exemplo.com.');
      need('telefone', /^9\d{8}$/.test(phoneNorm(val('telefone'))), 'Indique um telemóvel com 9 dígitos, a começar por 9.');
      const c = el('consentimento') as HTMLInputElement;
      need('consentimento', !!c?.checked, 'Precisamos da sua autorização para o contactar sobre o pedido.');
    } else if (step === 2) {
      need('produto', !!val('produto'), 'Escolha o tipo de crédito.');
      need('finalidade', !!val('finalidade'), 'Escolha para que precisa do crédito.');
    } else if (step === 3) {
      const v = Number(val('valor'));
      need('valor', Number.isFinite(v) && v >= 50000, 'Indique um valor a partir de 50 000 Kz.');
      need('prazo', !!val('prazo'), 'Escolha o prazo.');
    } else if (step === 4) {
      need('urgencia', !!val('urgencia'), 'Escolha uma opção.');
    } else if (step === 5) {
      need('situacao', !!val('situacao'), 'Escolha a sua situação profissional.');
      need('rendimento', !!val('rendimento'), 'Escolha uma faixa de rendimento ou "Prefiro não dizer".');
      need('creditos', !!val('creditos'), 'Diga se já tem créditos em curso.');
      need('historico', !!val('historico'), 'Escolha uma opção.');
    }
    return ok;
  }

  /* ---------- Navegação ---------- */
  function show(n: number, focus = true): void {
    current = Math.min(Math.max(n, 1), TOTAL);
    steps.forEach((s) => (s.hidden = Number(s.dataset.step) !== current));
    fill.style.width = (current / TOTAL) * 100 + '%';
    bar.setAttribute('aria-valuenow', String(current));
    label.textContent = `Passo ${current} de ${TOTAL}`;
    back.hidden = current === 1;
    next.textContent = current === TOTAL ? 'Enviar o meu pedido' : 'Continuar';
    if (focus) {
      const legend = steps[current - 1].querySelector<HTMLElement>('legend');
      if (legend) {
        legend.setAttribute('tabindex', '-1');
        legend.focus({ preventScroll: true });
      }
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function summary(): void {
    const p = produto();
    const box = root.querySelector<HTMLElement>('[data-summary]');
    if (!box) return;
    const valor = Number(val('valor'));
    const prazo = Number(val('prazo'));
    const pmt = valor && prazo ? fmtNum(payment(valor, cfg[p]?.taxa ?? 22, prazo)) + ' Kz por mês' : '';
    box.textContent =
      `${(NOMES[p] || 'crédito').replace(/^./, (c) => c.toUpperCase())} de ${fmtKz(valor)} a ${fmtPrazo(prazo)}` +
      (pmt ? `. Prestação estimada: ${pmt}.` : '.');
  }

  async function onNext(): Promise<void> {
    if (!validate(current)) {
      (form.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
      return;
    }
    if (current === 1) {
      if (val('website')) return; // anti-spam
      contactOk = true;
    }
    if (current < TOTAL) {
      dirty = true;
      save(current + 1);
      void send(collect(false));
      dirty = false;
      show(current + 1);
      return;
    }
    // Último passo: enviar o pedido completo
    next.disabled = true;
    next.textContent = 'A enviar…';
    const payload = collect(true);
    const sent = await send(payload);
    done = true;
    try {
      localStorage.removeItem(STORE);
    } catch {
      /* ignore */
    }
    const p = produto();
    const msg =
      `Olá! Pedi ${NOMES[p] || 'crédito'} no ${root.dataset.site || 'Crédito.ao'}.\n` +
      `Nome: ${payload.nome}\nValor: ${fmtKz(Number(payload.valor))}\nPrazo: ${payload.prazo} meses\nProvíncia: ${payload.provincia}`;
    const wa = success.querySelector<HTMLAnchorElement>('[data-wa]')!;
    wa.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
    const title = success.querySelector<HTMLElement>('[data-success-title]')!;
    const text = success.querySelector<HTMLElement>('[data-success-text]')!;
    if (sent) {
      title.textContent = 'Recebemos o seu pedido';
      text.textContent = `Vamos contactá-lo por telefone ou WhatsApp para confirmar os dados e dizer-lhe os próximos passos. Enviámos um email de confirmação para ${payload.email}. Se não o vir, procure no spam.`;
    } else {
      title.textContent = 'Falta um passo: envie a mensagem no WhatsApp';
      text.textContent = 'Toque no botão e envie a mensagem já preparada para o pedido nos chegar.';
    }
    form.hidden = true;
    root.querySelector<HTMLElement>('[data-progress]')!.hidden = true;
    success.hidden = false;
    success.setAttribute('tabindex', '-1');
    success.focus();
  }

  /* ---------- Eventos ---------- */
  next.addEventListener('click', () => void onNext());
  back.addEventListener('click', () => show(current - 1));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    void onNext();
  });
  form.querySelectorAll('input[name="produto"]').forEach((r) =>
    r.addEventListener('change', () => {
      applyProduto();
      dirty = true;
    }),
  );
  ['valor', 'prazo'].forEach((n) => {
    el(n).addEventListener('input', () => {
      touched[n as 'valor' | 'prazo'] = true;
      estimate();
      dirty = true;
    });
    el(n).addEventListener('change', estimate);
  });
  form.addEventListener('change', () => (dirty = true));
  // Limpa o aviso de erro assim que a pessoa corrige o campo
  const clearErr = (ev: Event) => {
    const t = ev.target as HTMLInputElement | null;
    if (t && t.name) setError(t.name, null);
  };
  form.addEventListener('input', clearErr);
  form.addEventListener('change', clearErr);
  form.querySelectorAll('input[name="creditos"]').forEach((r) =>
    r.addEventListener('change', () => {
      const box = root.querySelector<HTMLElement>('[data-prestacao]')!;
      box.hidden = val('creditos') !== 'sim';
    }),
  );

  // Se a pessoa sair a meio, enviamos o que já respondeu (o contacto já foi dado e autorizado no passo 1).
  const flush = () => {
    if (done || !endpoint || !dirty || !contactOk) return;
    try {
      navigator.sendBeacon(endpoint, new Blob([JSON.stringify(collect(false))], { type: 'text/plain;charset=utf-8' }));
      dirty = false;
    } catch {
      /* ignore */
    }
  };
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
  window.addEventListener('pagehide', flush);

  /* ---------- Arranque: URL e retoma ---------- */
  const q = new URLSearchParams(location.search);
  const urlProduto = q.get('produto');
  let saved: Data | null = null;
  let resumedStep = 0;
  try {
    const raw = localStorage.getItem(STORE);
    if (raw) {
      const s = JSON.parse(raw);
      if (s && s.data && Date.now() - s.ts < 48 * 3600 * 1000) {
        id = s.id || id;
        resumedStep = Number(s.step) || 0;
        saved = s.data as Data;
      }
    }
  } catch {
    /* ignore */
  }
  const prod = urlProduto || (saved && String(saved.produto)) || root.dataset.produto || 'pessoal';
  const radio = form.querySelector<HTMLInputElement>(`input[name="produto"][value="${prod}"]`);
  if (radio) radio.checked = true;
  applyProduto();
  if (saved && !urlProduto) {
    ['nome', 'email', 'telefone', 'provincia', 'finalidade', 'urgencia', 'situacao', 'rendimento', 'creditos', 'historico', 'prestacaoAtual', 'valor', 'prazo'].forEach((k) => {
      const v = saved![k];
      const e = el(k);
      if (e && v !== null && v !== undefined && v !== '') {
        e.value = k === 'telefone' ? phoneNorm(String(v)) : String(v);
        if (k === 'valor' || k === 'prazo') touched[k] = true;
      }
    });
  }
  if (q.get('valor') && Number(q.get('valor'))) {
    (el('valor') as HTMLInputElement).value = String(Number(q.get('valor')));
    touched.valor = true;
  }
  if (q.get('prazo') && CFG[produto()].prazos.includes(Number(q.get('prazo')))) {
    (el('prazo') as HTMLSelectElement).value = String(q.get('prazo'));
    touched.prazo = true;
  }
  if (saved && saved.consentimento && !urlProduto) {
    (el('consentimento') as HTMLInputElement).checked = true;
    contactOk = resumedStep > 1;
  }
  if (val('creditos') === 'sim') root.querySelector<HTMLElement>('[data-prestacao]')!.hidden = false;
  estimate();
  if (resumedStep > 1 && resumedStep <= TOTAL && !urlProduto) {
    note.hidden = false;
    show(resumedStep, false);
  } else {
    show(1, false);
  }
}

export function initAllWizards(): void {
  document.querySelectorAll<HTMLElement>('[data-wizard]').forEach(initWizard);
}
