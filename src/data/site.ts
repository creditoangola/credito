// Configuração central. A marca é provisória: altere aqui e no logótipo (Header.astro / favicon.svg).
export const SITE = {
  name: 'Crédito.ao',
  domain: 'credito.ao',
  url: 'https://credito.ao',
  description:
    'Simule o seu crédito em kwanzas, veja o total a pagar, os documentos e o prazo. Peça crédito online e nós levamos o pedido aos bancos.',
  email: 'info@credito.ao',
  whatsapp: import.meta.env.PUBLIC_WHATSAPP || '244900000000',
  leadEndpoint: import.meta.env.PUBLIC_LEAD_ENDPOINT || '',
  // Só mostrar quando existir registo real no BNA. Não inventar.
  bnaRegistration: import.meta.env.PUBLIC_BNA_REGISTRO || '',
  googleVerification: import.meta.env.PUBLIC_GOOGLE_VERIFICATION || '',
  bingVerification: import.meta.env.PUBLIC_BING_VERIFICATION || '',
  yandexVerification: import.meta.env.PUBLIC_YANDEX_VERIFICATION || '',
  dataUpdated: '22 de novembro de 2026',
};

export const NAV = [
  { href: '/credito-pessoal', label: 'Crédito Pessoal Online' },
  { href: '/credito-automovel', label: 'Crédito Automóvel Online' },
  { href: '/credito-habitacao', label: 'Crédito Habitação Online' },
  { href: '/bancos', label: 'Bancos' },
  { href: '/blog', label: 'Blog' },
];

export const PROVINCES = [
  'Bengo',
  'Benguela',
  'Bié',
  'Cabinda',
  'Cuando',
  'Cubango',
  'Cuanza Norte',
  'Cuanza Sul',
  'Cunene',
  'Huambo',
  'Huíla',
  'Icolo e Bengo',
  'Luanda',
  'Lunda Norte',
  'Lunda Sul',
  'Malanje',
  'Moxico',
  'Moxico Leste',
  'Namibe',
  'Uíge',
  'Zaire',
];
