// IMPORTANTE: só publicar dados confirmados em fonte oficial do banco (FTI, preçário, checklist).
// "published: false" => aparece como "dados em validação" e não tem página própria.
export interface Bank {
  slug: string;
  name: string;
  published: boolean;
  /** TAN do crédito pessoal, em % ao ano */
  taxa?: number;
  prazoMax?: string;
  docs?: string[];
  requisitos?: string[];
  fontes?: { label: string; url: string }[];
  nota?: string;
}

export const BANKS: Bank[] = [
  {
    slug: 'bfa',
    name: 'Banco de Fomento Angola (BFA)',
    published: true,
    taxa: 22,
    docs: [
      'Bilhete de identidade (ou cartão de residente / passaporte com visto, para estrangeiros)',
      'Últimos 3 recibos de salário',
      'Declaração da entidade patronal (tipo de contrato, salário base com subsídios fixos e domiciliação do salário no BFA)',
      'Simulação de seguro de vida',
      'Carta de pedido ao balcão do BFA com valor, finalidade, prazo e garantias propostas',
      'Se aplicável: documentos do cônjuge ou unido de facto e do fiador',
    ],
    requisitos: [
      'Sem incumprimento há pelo menos 2 anos',
      'Conta aberta há mais de 6 meses e regularizada',
      'Depois de aprovado, tem até 10 dias para comunicar a aceitação',
      'O pedido só conta como recebido quando está completo',
    ],
    fontes: [
      { label: 'BFA: checklist de documentos para crédito ao consumo', url: 'https://bfa.ao/media/7577/checklist-de-documentos-para-credito-ao-consumo.pdf' },
      { label: 'BFA: ficha técnica informativa de crédito pessoal', url: 'https://bfa.ao/media/6546/fti-credito-pessoal.pdf' },
    ],
    nota:
      'A TAN de 22% consta da ficha técnica informativa de crédito pessoal (versão 2.2024). O BFA já publica uma versão mais recente (1/2026): confirme as condições em vigor antes de decidir.',
  },
  {
    slug: 'bai',
    name: 'Banco Angolano de Investimentos (BAI)',
    published: true,
    prazoMax: 'Até 60 meses',
    docs: [
      'Carta de solicitação de crédito (finalidade, montante e garantias oferecidas)',
      'Fotocópia do bilhete de identidade',
      'Declaração ou documento que comprove os rendimentos',
      'Declaração de confirmação de morada',
      'Se aplicável: certidão de casamento ou declaração de união de facto, rendimentos e BI do cônjuge',
    ],
    requisitos: [
      'Ser cliente do BAI há pelo menos 3 meses',
      'Comprovar rendimentos',
      'Ter seguro de vida válido durante toda a vigência do crédito',
      'Quando há fiador: ser cliente BAI, com idoneidade e taxa de esforço igual ou inferior a 50%',
      'O limite do crédito vai até à capacidade de endividamento do cliente',
    ],
    fontes: [
      { label: 'BAI: perguntas frequentes sobre crédito pessoal', url: 'https://bancobai.ao/pt/premium/produtos/credito/credito-pessoal/perguntas-frequentes' },
    ],
    nota: 'O BAI não publica nesta página a taxa nem os prazos de resposta. Pergunte-os ao banco ou peça-nos ajuda.',
  },
  { slug: 'bic', name: 'Banco BIC', published: false },
  { slug: 'banco-sol', name: 'Banco Sol', published: false },
  { slug: 'standard-bank', name: 'Standard Bank Angola', published: false },
  { slug: 'access-bank', name: 'Access Bank Angola', published: false },
  { slug: 'atlantico', name: 'Banco Millennium Atlântico', published: false },
  { slug: 'keve', name: 'Banco Keve', published: false },
  { slug: 'bpc', name: 'Banco de Poupança e Crédito (BPC)', published: false },
  { slug: 'bni', name: 'Banco de Negócios Internacional (BNI)', published: false },
];
