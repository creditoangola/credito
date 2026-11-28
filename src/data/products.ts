// Conteúdo das páginas de produto. Edite aqui os textos, as listas e os prazos.
//
// PRAZOS: não existe prazo oficial publicado pelos bancos para aprovação nem para o dinheiro entrar na conta.
// Quando tiver o prazo confirmado por um banco parceiro, preencha "prazoResposta" e "prazoDinheiro"
// (ex.: "1 a 3 dias úteis") e o número passa a aparecer em destaque na página.

export type ProductKey = 'pessoal' | 'automovel' | 'habitacao';

export interface Product {
  key: ProductKey;
  path: string;
  nome: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  lead: string;
  cta: string;
  sim: { valor: number; prazo: number; taxa: number; min: number; max: number; step: number; maxPrazo: number };
  exemplo: { valores: number[]; prazos: number[]; taxa: number };
  respostas: { documentos: string; tempo: string; dinheiro: string };
  prazoResposta: string | null;
  prazoDinheiro: string | null;
  documentos: string[];
  documentosNota: string;
  etapas: { titulo: string; texto: string }[];
  problema: string;
  faq: { q: string; a: string }[];
  fontes: { label: string; url: string }[];
  photo: { name: string; alt: string; brief: string };
}

export const PRODUCTS: Record<ProductKey, Product> = {
  pessoal: {
    key: 'pessoal',
    path: '/credito-pessoal',
    nome: 'Crédito pessoal',
    seoTitle: 'Crédito pessoal Online em Angola: simule e peça',
    seoDescription:
      'Crédito pessoal em kwanzas: veja a prestação, os documentos que o banco pede e o prazo. Simule grátis e peça o seu crédito em poucos minutos.',
    h1: 'Crédito pessoal Online em Angola: saiba quanto vai pagar antes de pedir',
    lead:
      'Crédito pessoal: simule em kwanzas, saiba quais documentos o banco pede e quanto tempo demora até o dinheiro entrar na conta. Peça online, recomendamos o banco mais adequado e levamos o pedido a ele.',
    cta: 'Pedir crédito pessoal',
    sim: { valor: 5000000, prazo: 36, taxa: 22, min: 100000, max: 30000000, step: 50000, maxPrazo: 60 },
    exemplo: { valores: [1000000, 3000000, 5000000, 10000000], prazos: [12, 24, 36, 48], taxa: 22 },
    respostas: {
      documentos:
        'Bilhete de identidade, últimos 3 recibos de salário, declaração da entidade patronal, comprovativo de morada e uma carta com o valor, a finalidade e o prazo do crédito.',
      tempo:
        'Depende do banco e de o pedido estar completo. Um crédito pedido com todos os documentos é analisado mais depressa. Antes de avançar, dizemos-lhe o prazo previsto do banco.',
      dinheiro:
        'Depois de assinar o contrato, o banco credita o valor na conta à ordem indicada no contrato. Confirmamos consigo o prazo previsto.',
    },
    prazoResposta: null,
    prazoDinheiro: null,
    documentos: [
      'Bilhete de identidade',
      'Últimos 3 recibos de salário',
      'Declaração da entidade patronal (tipo de contrato, salário e domiciliação do salário)',
      'Comprovativo de morada',
      'Carta de pedido de crédito, com valor, finalidade, prazo e garantias',
      'Simulação de seguro de vida (alguns bancos exigem seguro durante todo o crédito)',
      'Se for casado ou viver em união de facto: documentos do cônjuge',
    ],
    documentosNota:
      'Os bancos não pedem todos exatamente o mesmo. Esta lista junta o que o BFA e o BAI publicam nos seus documentos oficiais para o crédito pessoal.',
    etapas: [
      { titulo: 'Simula e envia o pedido', texto: 'Responde a perguntas simples em cerca de 3 minutos e vê a prestação estimada do seu crédito.' },
      { titulo: 'Falamos consigo', texto: 'Confirmamos os dados e dizemos-lhe que documentos juntar, de acordo com o banco escolhido.' },
      { titulo: 'O banco analisa', texto: 'O banco verifica documentos, rendimento e histórico. Se faltar algo, pede. Um pedido completo avança mais depressa.' },
      { titulo: 'Recebe a proposta e decide', texto: 'Vê a taxa, a TAEG e o total a pagar e só assina se quiser. No BFA, depois de aprovado, tem até 10 dias para aceitar.' },
      { titulo: 'O dinheiro entra na conta', texto: 'Com o contrato assinado, o banco credita o valor na conta à ordem indicada no contrato.' },
    ],
    problema:
      'Pedir um crédito pessoal costuma significar ir a vários balcões, voltar por falta de um papel e só no fim descobrir quanto vai realmente pagar.',
    faq: [
      {
        q: 'Quanto tempo demora a aprovação do crédito pessoal?',
        a: 'Depende do banco e de o pedido estar completo. Os bancos só tratam o pedido como recebido quando tem todos os documentos, por isso começamos pela lista certa. Quando enviar o pedido, dizemos-lhe o prazo previsto do banco.',
      },
      {
        q: 'Quando é que o dinheiro do crédito entra na conta?',
        a: 'Depois de aprovado e de assinar o contrato, o banco credita o valor na conta à ordem indicada no contrato. O prazo exato varia de banco para banco e confirmamo-lo consigo.',
      },
      {
        q: 'Que documentos preciso para pedir um crédito pessoal?',
        a: 'Normalmente o bilhete de identidade, os últimos 3 recibos de salário, a declaração da entidade patronal, o comprovativo de morada e uma carta de pedido. Alguns bancos pedem ainda seguro de vida.',
      },
      {
        q: 'Preciso de ser cliente do banco para pedir crédito?',
        a: 'Em muitos casos sim. O BAI pede que seja cliente há pelo menos 3 meses e o BFA exige uma conta aberta há mais de 6 meses e regularizada. Confirmamos o requisito do banco antes de enviar o pedido.',
      },
      {
        q: 'Quanto vou pagar no total pelo crédito?',
        a: 'O total é a prestação multiplicada pelo número de meses. Num exemplo de 5 000 000 Kz a 36 meses com TAN de 22%, o total ronda 6 874 282 Kz. Use o simulador para o seu valor e compare sempre a TAEG.',
      },
      {
        q: 'Posso pedir crédito se já tenho outro crédito?',
        a: 'Pode, mas o banco analisa a sua taxa de esforço, que é a parte do rendimento que já vai para prestações. Quanto menor, melhor. Diga-nos o que paga hoje e indicamos as opções.',
      },
      {
        q: 'Quanto custa usar o Crédito.ao?',
        a: 'Simular e enviar o pedido não custa nada. Se houver algum custo pelo nosso serviço, é-lhe dito por escrito antes de avançar.',
      },
    ],
    fontes: [
      { label: 'BFA: checklist de documentos para crédito ao consumo', url: 'https://bfa.ao/media/7577/checklist-de-documentos-para-credito-ao-consumo.pdf' },
      { label: 'BAI: perguntas frequentes sobre crédito pessoal', url: 'https://bancobai.ao/pt/premium/produtos/credito/credito-pessoal/perguntas-frequentes' },
      { label: 'BFA: ficha técnica informativa de crédito pessoal', url: 'https://bfa.ao/media/6546/fti-credito-pessoal.pdf' },
    ],
    photo: {
      name: 'projetos',
      alt: 'Família a pintar uma parede de casa, com tinta nas mãos',
      brief: 'Família a pintar ou arrumar a casa, com tinta nas mãos, ambiente divertido.',
    },
  },

  automovel: {
    key: 'automovel',
    path: '/credito-automovel',
    nome: 'Crédito automóvel',
    seoTitle: 'Crédito automóvel Online em Angola: simule e peça',
    seoDescription:
      'Crédito automóvel em kwanzas: veja a prestação do carro, os documentos e o prazo. Simule grátis e peça o seu crédito antes de ir ao stand.',
    h1: 'Crédito automóvel Online em Angola: saiba a prestação do seu carro antes do stand',
    lead:
      'Crédito automóvel: simule em kwanzas, saiba quais documentos o banco pede e quando o valor chega à conta. Peça online, recomendamos o banco mais adequado e vá ao stand já a saber quanto pode pagar.',
    cta: 'Pedir crédito automóvel',
    sim: { valor: 8000000, prazo: 48, taxa: 22, min: 500000, max: 60000000, step: 100000, maxPrazo: 84 },
    exemplo: { valores: [3000000, 5000000, 8000000, 12000000], prazos: [24, 36, 48, 60], taxa: 22 },
    respostas: {
      documentos:
        'Bilhete de identidade, comprovativo de rendimento, comprovativo de morada, fatura proforma do veículo e a carta de pedido de crédito. O banco confirma a lista final.',
      tempo:
        'Depende do banco e de o pedido estar completo. Com a fatura proforma e os documentos prontos, o crédito automóvel avança mais depressa. Antes de avançar, dizemos-lhe o prazo previsto.',
      dinheiro:
        'Depois de assinar o contrato, o banco credita o valor na conta indicada no contrato, ou paga ao vendedor, conforme as condições do crédito. Confirmamos consigo.',
    },
    prazoResposta: null,
    prazoDinheiro: null,
    documentos: [
      'Bilhete de identidade',
      'Comprovativo de rendimento (recibos de salário ou declaração de serviço)',
      'Comprovativo de morada',
      'Fatura proforma do veículo que quer comprar',
      'Carta de pedido de crédito, com valor, prazo e garantias',
      'Seguro automóvel (muitos bancos exigem-no durante todo o crédito)',
      'Se aplicável: documentos do cônjuge ou do fiador',
    ],
    documentosNota:
      'Os bancos não publicam todos a mesma lista para o crédito automóvel. Esta é a lista habitual e o banco confirma o que falta no seu caso.',
    etapas: [
      { titulo: 'Escolhe o carro e simula', texto: 'Indica o valor e o prazo e vê a prestação estimada do crédito automóvel.' },
      { titulo: 'Falamos consigo', texto: 'Confirmamos os dados e dizemos-lhe que documentos juntar, incluindo a fatura proforma.' },
      { titulo: 'O banco analisa', texto: 'O banco verifica documentos, rendimento e histórico. Um pedido completo avança mais depressa.' },
      { titulo: 'Recebe a proposta e decide', texto: 'Vê a taxa, a TAEG, a entrada e o total a pagar e só assina se quiser.' },
      { titulo: 'O dinheiro chega e o carro é seu', texto: 'Com o contrato assinado, o banco credita o valor na conta indicada no contrato ou paga ao vendedor.' },
    ],
    problema:
      'Escolher o carro é a parte boa. Descobrir só no stand que a prestação não cabe no seu orçamento, ou que falta um documento, estraga tudo.',
    faq: [
      {
        q: 'Quanto tempo demora a aprovação do crédito automóvel?',
        a: 'Depende do banco e de o pedido estar completo. Com a fatura proforma e os documentos prontos, o banco analisa mais depressa. Dizemos-lhe o prazo previsto do banco quando enviar o pedido.',
      },
      {
        q: 'Quando é que o dinheiro do crédito automóvel chega?',
        a: 'Depois de assinar o contrato, o banco credita o valor na conta indicada ou paga ao vendedor, conforme o crédito. O prazo exato confirma-se com o banco.',
      },
      {
        q: 'Que documentos preciso para o crédito automóvel?',
        a: 'Normalmente o bilhete de identidade, o comprovativo de rendimento, o comprovativo de morada, a fatura proforma do carro e uma carta de pedido. O banco pode pedir seguro automóvel.',
      },
      {
        q: 'Preciso de dar uma entrada?',
        a: 'Muitos bancos pedem uma parte do valor como entrada. A percentagem depende do banco e do veículo e aparece na proposta. Simule com valores diferentes para ver o efeito na prestação.',
      },
      {
        q: 'Posso financiar um carro usado?',
        a: 'Depende do banco, da idade e do estado do veículo. Diga-nos o que quer comprar e indicamos quais as opções de crédito.',
      },
      {
        q: 'O carro fica como garantia do crédito?',
        a: 'É comum o banco exigir garantias, como a reserva de propriedade do carro. Leia a proposta e confirme o que está incluído antes de assinar.',
      },
      {
        q: 'Quanto custa usar o Crédito.ao?',
        a: 'Simular e enviar o pedido não custa nada. Se houver algum custo pelo nosso serviço, é-lhe dito por escrito antes de avançar.',
      },
    ],
    fontes: [
      { label: 'BFA: checklist de documentos para crédito ao consumo', url: 'https://bfa.ao/media/7577/checklist-de-documentos-para-credito-ao-consumo.pdf' },
      { label: 'BFA: tabela de taxas de juro', url: 'https://www.bfa.ao/media/1888/tabela-de-taxas-de-juro.pdf' },
    ],
    photo: {
      name: 'automovel',
      alt: 'Casal a rir e a brincar na garagem de casa',
      brief: 'Pessoa angolana a abraçar ou lavar o carro com um sorriso. Cena divertida.',
    },
  },

  habitacao: {
    key: 'habitacao',
    path: '/credito-habitacao',
    nome: 'Crédito habitação',
    seoTitle: 'Crédito habitação Online em Angola: simule e peça',
    seoDescription:
      'Crédito habitação em kwanzas: veja a prestação, os documentos do imóvel e o prazo. Simule grátis e peça o seu crédito para a casa própria.',
    h1: 'Crédito habitação Online em Angola: saiba o que paga todos os meses pela sua casa',
    lead:
      'Crédito habitação: simule em kwanzas, saiba quais documentos do imóvel o banco pede e o caminho até receber o dinheiro. Peça online, recomendamos o banco mais adequado e organizamos o pedido.',
    cta: 'Pedir crédito habitação',
    sim: { valor: 30000000, prazo: 240, taxa: 18, min: 5000000, max: 200000000, step: 500000, maxPrazo: 360 },
    exemplo: { valores: [15000000, 30000000, 50000000, 80000000], prazos: [120, 180, 240, 300], taxa: 18 },
    respostas: {
      documentos:
        'Bilhete de identidade, declaração da entidade patronal, últimos 3 recibos de salário, certidão do registo predial do imóvel, contrato-promessa de compra e venda e simulação de seguros.',
      tempo:
        'O crédito habitação demora mais do que um crédito pessoal, porque o banco avalia também o imóvel. Antes de avançar, dizemos-lhe o prazo previsto do banco.',
      dinheiro:
        'Depois da aprovação, da avaliação do imóvel e da assinatura do contrato, o banco paga o valor conforme o contrato-promessa. Confirmamos consigo as datas.',
    },
    prazoResposta: null,
    prazoDinheiro: null,
    documentos: [
      'Bilhete de identidade seu, do cônjuge e do fiador (se houver)',
      'Declaração da entidade patronal, com tipo de contrato e domiciliação do salário',
      'Últimos 3 recibos de salário',
      'Simulação de seguro de vida e de seguro multirriscos habitação',
      'Certidão do registo predial do imóvel, atualizada há menos de 6 meses',
      'Contrato-promessa de compra e venda',
      'Autorização para consultar a Central de Informação de Risco de Crédito',
      'Carta de pedido de crédito, com valor, finalidade, prazo e garantias',
      'Avaliação do imóvel (pedida pelo banco)',
    ],
    documentosNota:
      'Esta lista segue o checklist de crédito habitação publicado pelo BFA. Em imóveis em construção são pedidos documentos adicionais, como a licença de construção e o cronograma da obra.',
    etapas: [
      { titulo: 'Simula e envia o pedido', texto: 'Indica o valor da casa e o prazo e vê a prestação estimada do crédito habitação.' },
      { titulo: 'Falamos consigo', texto: 'Confirmamos os dados e damos-lhe a lista de documentos pessoais e do imóvel.' },
      { titulo: 'O banco avalia o imóvel e o pedido', texto: 'O banco analisa o seu rendimento e manda avaliar o imóvel. É a fase mais longa do crédito habitação.' },
      { titulo: 'Recebe a proposta e decide', texto: 'Vê a taxa, a TAEG, a entrada, os seguros e o total a pagar e só assina se quiser.' },
      { titulo: 'O banco paga e a casa é sua', texto: 'Com o contrato assinado, o banco paga o valor conforme o contrato-promessa de compra e venda.' },
    ],
    problema:
      'Comprar casa é a maior decisão financeira da maioria das famílias. Assinar sem saber o custo total, ou descobrir tarde que falta um documento do imóvel, custa tempo e dinheiro.',
    faq: [
      {
        q: 'Quanto tempo demora a aprovação do crédito habitação?',
        a: 'Costuma demorar mais do que o crédito pessoal, porque o banco avalia o imóvel. O prazo depende do banco e de o pedido estar completo. Dizemos-lhe o prazo previsto quando enviar o pedido.',
      },
      {
        q: 'Quando é que o banco paga o valor da casa?',
        a: 'Depois da aprovação, da avaliação do imóvel e da assinatura do contrato, o banco paga o valor conforme o contrato-promessa de compra e venda. As datas combinam-se com o banco.',
      },
      {
        q: 'Que documentos preciso para o crédito habitação?',
        a: 'Os seus documentos pessoais e de rendimento, a certidão do registo predial atualizada há menos de 6 meses, o contrato-promessa de compra e venda e as simulações de seguro. O banco pede ainda a avaliação do imóvel.',
      },
      {
        q: 'Quanto financia o banco e que entrada devo dar?',
        a: 'O banco financia uma parte do valor do imóvel e pede o resto como entrada. A percentagem depende do banco e da avaliação do imóvel e consta da proposta.',
      },
      {
        q: 'Que custos existem além da prestação?',
        a: 'Pode haver imposto de selo, avaliação do imóvel, seguros e custos notariais. A proposta do banco deve listar todos. Compare a TAEG para ver o custo total.',
      },
      {
        q: 'O prazo pode chegar aos 30 anos?',
        a: 'O simulador permite até 360 meses para comparar, mas o prazo máximo depende do banco e da sua idade. Confirmamos o limite com o banco.',
      },
      {
        q: 'Quanto custa usar o Crédito.ao?',
        a: 'Simular e enviar o pedido não custa nada. Se houver algum custo pelo nosso serviço, é-lhe dito por escrito antes de avançar.',
      },
    ],
    fontes: [
      { label: 'BFA: checklist de crédito habitação (imobiliário)', url: 'https://bfa.ao/media/4769/checklist-credito-especial-imobiliario-bfa.pdf' },
      { label: 'BFA: tabela de taxas de juro', url: 'https://www.bfa.ao/media/1888/tabela-de-taxas-de-juro.pdf' },
    ],
    photo: {
      name: 'habitacao',
      alt: 'Família a rir enquanto arruma caixas de mudança na casa nova',
      brief: 'Família a entrar numa casa nova com caixas, a brincar.',
    },
  },
};

export const PRODUCT_LIST: Product[] = [PRODUCTS.pessoal, PRODUCTS.automovel, PRODUCTS.habitacao];
