# Receber os pedidos (Google Sheets, sem servidor)

O formulário envia um JSON (como `text/plain`) a cada passo. O mesmo `id` repete-se
em todos os envios do mesmo visitante: guarde **uma linha por `id`** e atualize-a.
`estado` é `parcial` até ao último passo e passa a `completo` com nome e telefone.

## 1. Criar a folha
1. Crie uma folha no Google Sheets. Menu **Extensões > Apps Script**.
2. Cole o código abaixo e grave.
3. **Implementar > Nova implementação > Aplicação Web**: executar como *Eu*, acesso *Qualquer pessoa*.
4. Copie o URL e ponha-o em `PUBLIC_LEAD_ENDPOINT` (ficheiro `.env`). Volte a fazer o build.

```js
// ====== CONFIGURE ======
const EMAIL_EQUIPA = 'info@credito.ao';   // recebe o aviso de cada pedido
const NOME_SITE = 'Crédito.ao';
const AVISAR_CONTACTO_PARCIAL = false;    // true = também avisa quando alguém só preenche o passo 1
// =======================

const CAMPOS = ['id','estado','etapa','produto','finalidade','valor','prazo','urgencia',
  'situacao','rendimento','creditos','prestacaoAtual','historico','pagina','data',
  'utm_source','utm_medium','utm_campaign','nome','email','telefone','provincia','consentimento'];

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sh = SpreadsheetApp.getActiveSheet();
  if (sh.getLastRow() === 0) sh.appendRow(['recebido_em'].concat(CAMPOS));
  const ids = sh.getRange(2, 2, Math.max(sh.getLastRow() - 1, 1), 1).getValues().flat();
  const i = ids.indexOf(d.id);
  const linha = [new Date()].concat(CAMPOS.map(c => d[c] === undefined ? '' : d[c]));
  let estadoAntes = null;
  if (i >= 0) {
    const atual = sh.getRange(i + 2, 1, 1, linha.length).getValues()[0];
    estadoAntes = atual[2];
    // não apaga o que já tinha sido preenchido
    sh.getRange(i + 2, 1, 1, linha.length).setValues([linha.map((v, k) => v === '' ? atual[k] : v)]);
  } else sh.appendRow(linha);

  try {
    if (d.estado === 'completo' && estadoAntes !== 'completo') avisar(d, true);
    else if (AVISAR_CONTACTO_PARCIAL && i < 0 && d.email) avisar(d, false);
  } catch (err) { /* o pedido já ficou guardado; falha de email não o perde */ }
  return ContentService.createTextOutput('ok');
}

function kz(n) { return n ? Number(n).toLocaleString('pt-PT') + ' Kz' : '-'; }

function avisar(d, completo) {
  const resumo =
    'Produto: ' + d.produto + '\nFinalidade: ' + d.finalidade + '\nValor: ' + kz(d.valor) +
    '\nPrazo: ' + d.prazo + ' meses\nQuando precisa: ' + d.urgencia;
  // 1) Email para a equipa
  MailApp.sendEmail(EMAIL_EQUIPA,
    (completo ? 'Novo pedido: ' : 'Novo contacto (incompleto): ') + d.nome + ' - ' + d.produto,
    'Nome: ' + d.nome + '\nEmail: ' + d.email + '\nTelemóvel: ' + d.telefone + '\nProvíncia: ' + d.provincia +
    '\n\n' + resumo + '\nSituação: ' + d.situacao + '\nRendimento: ' + d.rendimento +
    '\nPágina: ' + d.pagina + '\nEstado: ' + d.estado);
  // 2) Email de confirmação para o cliente (só quando o pedido está completo)
  if (completo && d.email) {
    MailApp.sendEmail({
      to: d.email, replyTo: EMAIL_EQUIPA, name: NOME_SITE,
      subject: 'Recebemos o seu pedido de crédito',
      body: 'Olá ' + d.nome.split(' ')[0] + ',\n\nRecebemos o seu pedido no ' + NOME_SITE + '.\n\n' + resumo +
        '\n\nOs próximos passos:\n1. Falamos consigo por telefone ou WhatsApp para confirmar os dados.\n' +
        '2. Dizemos-lhe que documentos juntar.\n3. Levamos o pedido ao banco e informamos o resultado.\n\n' +
        'A aprovação e as condições finais são decididas pelo banco. Este email não é um contrato.\n\n' +
        'Pode responder a este email se precisar de ajuda.\n' + NOME_SITE
    });
  }
}
```

## 2. Como ler
- O passo 1 pede nome, email, telemóvel e província (com consentimento). Por isso **todas as linhas, mesmo `parcial`, têm contacto** e podem ser contactadas.
- `estado = parcial` + `etapa`: a pessoa desistiu nesse passo; veja os dados já preenchidos (produto, valor, prazo...).
- `estado = completo`: respondeu aos 5 passos.

## 3. Cuidados
- Contacte apenas linhas com `consentimento = true`.
- A página de privacidade explica que os dados parciais ficam guardados e que a pessoa pode ser contactada; confirme o texto com o advogado.
- Trate o endpoint como público: valide e limite o tamanho se o migrar para um servidor seu.

## 4. Email e WhatsApp
- A equipa recebe um email por cada pedido `completo`. O cliente recebe um email de confirmação no email que indicou.
- O WhatsApp continua como está: no fim do pedido o cliente vê o botão "Continuar no WhatsApp" com a mensagem já preparada.
  Um aviso automático por WhatsApp (sem o cliente tocar no botão) exige a API oficial do WhatsApp Business, que é um passo à parte.
- Limite do Gmail gratuito: cerca de 100 emails por dia no Apps Script. Para mais volume, use um serviço de email (Resend, Brevo, Mailgun).
- Peça a alguém para testar o fluxo completo e confirme que o email de confirmação não cai no spam.
