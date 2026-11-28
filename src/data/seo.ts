// SEO por página: título, descrição e palavras-chave. Usado pelas páginas e por scripts/seo-check.mjs.
// primary: palavra principal (densidade alvo ~2,5%). secondary: expressões de apoio. contextual: termos do tema.
// Nota: "credito" (sem acento) aparece nos URLs, nos nomes de ficheiro e no domínio. O Google e o Bing tratam
// credito = crédito, por isso no texto usamos sempre a ortografia correta.

export interface PageSeo {
  title: string;
  description: string;
  primary: string[];
  secondary: string[];
  contextual: string[];
  /** false = página legal ou sem objetivo de ranking: o verificador não mede a densidade */
  density?: boolean;
}

const PRIMARY = ['crédito', 'credito'];

export const SEO: Record<string, PageSeo> = {
  '/': {
    title: 'Crédito Online em Angola: Simule e Peça o seu Crédito Online Grátis em menos de 3 minutos Sem sair de Casa',
    description: 'Crédito Online em Angola: simule e peça o seu crédito online grátis em menos de 3 minutos, sem sair de casa. Simule o seu Crédito Online agora!',
    primary: PRIMARY,
    secondary: ['pedir crédito', 'simular crédito', 'crédito online'],
    contextual: ['kwanzas', 'taeg', 'prestação', 'documentos', 'banco', 'angola'],
  },
  '/credito-pessoal': {
    title: 'Crédito Pessoal Online em Angola: Simule e Peça Grátis em menos de 3 minutos, Sem sair de Casa',
    description: 'Crédito pessoal online em Angola: saiba quanto paga, que documentos levar e quando recebe. Simule e peça grátis em 3 minutos. Simule agora!',
    primary: PRIMARY,
    secondary: ['crédito pessoal', 'pedir crédito pessoal', 'simular crédito pessoal'],
    contextual: ['prestação', 'taeg', 'documentos', 'recibos de salário', 'banco', 'kwanzas'],
  },
  '/credito-automovel': {
    title: 'Crédito Automóvel Online em Angola: Simule e Peça Grátis em menos de 3 minutos, Sem sair de Casa',
    description: 'Crédito automóvel online em Angola: saiba a prestação do seu carro antes do stand. Simule e peça grátis em 3 minutos. Simule agora!',
    primary: PRIMARY,
    secondary: ['crédito automóvel', 'pedir crédito automóvel', 'financiar um carro'],
    contextual: ['prestação', 'entrada', 'fatura proforma', 'seguro automóvel', 'banco', 'kwanzas'],
  },
  '/credito-habitacao': {
    title: 'Crédito Habitação Online em Angola: Simule e Peça Grátis em menos de 3 minutos, Sem sair de Casa',
    description: 'Crédito habitação online em Angola: saiba o que paga por mês pela sua casa. Simule e peça grátis em 3 minutos, sem sair de casa. Simule agora!',
    primary: PRIMARY,
    secondary: ['crédito habitação', 'pedir crédito habitação', 'comprar casa'],
    contextual: ['prestação', 'imóvel', 'avaliação', 'registo predial', 'banco', 'kwanzas'],
  },
  '/simulador': {
    title: 'Simulador de Crédito Online Grátis em Kwanzas: veja a Prestação e a TAEG em Segundos',
    description: 'Simulador de crédito online grátis: veja a prestação, o total a pagar e a TAEG em segundos, sem sair de casa. Simule o seu crédito agora!',
    primary: PRIMARY,
    secondary: ['simular crédito', 'simulador de crédito', 'pedir crédito'],
    contextual: ['prestação', 'taeg', 'taxa de juro', 'prazo', 'kwanzas', 'total a pagar'],
  },
  '/pedir-credito': {
    title: 'Pedir Crédito Online em Angola: Peça Grátis em 3 minutos, Sem sair de Casa',
    description: 'Pedir crédito online em Angola em 5 passos e menos de 3 minutos, sem sair de casa. Levamos o seu pedido ao banco certo. Peça o seu crédito agora!',
    primary: PRIMARY,
    secondary: ['pedir crédito', 'pedir crédito online', 'pedido de crédito'],
    contextual: ['passo', 'banco', 'documentos', 'whatsapp', 'prestação', 'kwanzas'],
  },
  '/bancos': {
    title: 'Bancos em Angola: Crédito Online, Documentos e Requisitos Atualizados',
    description: 'Bancos em Angola e crédito online: documentos, requisitos e taxas confirmados em fontes oficiais, para pedir ao banco certo sem surpresas.',
    primary: PRIMARY,
    secondary: ['crédito pessoal', 'pedir crédito', 'bancos em angola'],
    contextual: ['taxa de juro', 'taeg', 'documentos', 'requisitos', 'ficha técnica', 'kwanzas'],
  },
  '/blog': {
    title: 'Blog de Crédito Online em Angola: guias para pedir',
    description: 'Blog de crédito online em Angola: guias claros sobre documentos, custos e TAEG, para pedir crédito com segurança e sem surpresas.',
    primary: PRIMARY,
    secondary: ['pedir crédito', 'crédito pessoal', 'crédito habitação'],
    contextual: ['guia', 'taeg', 'documentos', 'prestação', 'banco', 'angola'],
  },
  '/sobre-nos': {
    title: 'Sobre Nós: Crédito Online em Angola, Simples, Grátis e sem Sair de Casa',
    description:
      'Sobre nós: o Crédito Online que explica o que vai pagar, os documentos e o prazo, e leva o seu pedido ao banco certo. Conheça-nos agora!',
    primary: PRIMARY,
    secondary: ['crédito online', 'pedir crédito', 'intermediário de crédito'],
    contextual: ['banco', 'kwanzas', 'taeg', 'documentos', 'angola'],
  },
  '/contactos': {
    title: 'Contactos Crédito Online: Fale connosco por WhatsApp ou Email',
    description:
      'Contactos do Crédito.ao: fale connosco por WhatsApp ou email sobre o seu crédito online, documentos e prazos. Sem compromisso e sem custo.',
    primary: PRIMARY,
    secondary: ['crédito online', 'pedir crédito'],
    contextual: ['whatsapp', 'email', 'banco', 'documentos', 'angola'],
  },
  '/aviso-legal': { title: 'Aviso legal e quem somos | Crédito.ao', description: 'Quem somos, o que fazemos e o que não fazemos. Informação legal do Crédito.ao.', primary: PRIMARY, secondary: [], contextual: [], density: false },
  '/privacidade': { title: 'Política de privacidade | Crédito.ao', description: 'Que dados pedimos, para que os usamos e como pode exercer os seus direitos.', primary: PRIMARY, secondary: [], contextual: [], density: false },
  '/termos': { title: 'Termos de utilização | Crédito.ao', description: 'Condições de utilização do site Crédito.ao: o que oferecemos, o que não fazemos e as suas responsabilidades.', primary: PRIMARY, secondary: [], contextual: [], density: false },
};

export const BLOG_KEYWORDS: Record<string, { secondary: string[]; contextual: string[] }> = {
  pessoal: { secondary: ['crédito pessoal', 'pedir crédito'], contextual: ['prestação', 'banco', 'documentos', 'kwanzas'] },
  automovel: { secondary: ['crédito automóvel', 'pedir crédito'], contextual: ['carro', 'entrada', 'banco', 'kwanzas'] },
  habitacao: { secondary: ['crédito habitação', 'pedir crédito'], contextual: ['casa', 'imóvel', 'banco', 'kwanzas'] },
  geral: { secondary: ['pedir crédito', 'crédito pessoal'], contextual: ['taeg', 'banco', 'prestação', 'kwanzas'] },
};
