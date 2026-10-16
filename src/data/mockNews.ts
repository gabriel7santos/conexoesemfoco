import { Article, MarketQuote, WeatherInfo, EventItem } from '../types';

// COTAÇÕES INSPIRADAS NO CANAL RURAL / GIRO DO BOI
export const mockQuotes: MarketQuote[] = [
  {
    id: 'boi-gordo',
    name: 'Boi Gordo (Giro do Boi)',
    label: 'CEPEA/B3',
    value: 'R$ 248,50 / @',
    variation: '▲ +1.2%',
    isPositive: true,
    marketPlace: 'Goiás / SP',
    isHighlight: true,
  },
  {
    id: 'dolar',
    name: 'Dólar Comercial',
    label: 'Câmbio',
    value: 'R$ 5,46',
    variation: '▲ +0.32%',
    isPositive: true,
    isHighlight: true,
  },
  {
    id: 'soja',
    name: 'Soja',
    label: 'Saca 60kg',
    value: 'R$ 129,00',
    variation: '▲ +0.78%',
    isPositive: true,
    marketPlace: 'Rio Verde - GO',
  },
  {
    id: 'milho',
    name: 'Milho',
    label: 'Saca 60kg',
    value: 'R$ 54,80',
    variation: '▼ -0.36%',
    isPositive: false,
    marketPlace: 'Jataí - GO',
  },
  {
    id: 'etanol',
    name: 'Etanol Hidratado',
    label: 'Usina',
    value: 'R$ 2,78 / L',
    variation: '▲ +0.10%',
    isPositive: true,
    marketPlace: 'Goiás',
  },
  {
    id: 'bezerro',
    name: 'Bezerro Nelore',
    label: 'Reposição',
    value: 'R$ 2.150,00',
    variation: '▲ +0.95%',
    isPositive: true,
    marketPlace: 'Goiás',
  },
  {
    id: 'cafe',
    name: 'Café Arábica',
    label: 'Tipo 6 Duro',
    value: 'R$ 1.480,00',
    variation: '▼ -0.20%',
    isPositive: false,
  },
];

export const fallbackWeather: WeatherInfo[] = [
  { city: 'Rio Verde', temp: '28°C', condition: 'Sol com Nuvens', max: '31°C', min: '20°C', humidity: '54%' },
  { city: 'Goiânia', temp: '29°C', condition: 'Ensolarado', max: '32°C', min: '21°C', humidity: '48%' },
  { city: 'Jataí', temp: '27°C', condition: 'Céu Limpo', max: '30°C', min: '19°C', humidity: '58%' },
];

export const allArticles: Article[] = [
  // 1. MATÉRIA - AGRO (MANCHETE DE CAPA)
  {
    id: 'agro-desenvolvimento-goias',
    title: 'O agro impulsiona o desenvolvimento de Goiás com safra histórica',
    subtitle:
      'Setor segue em expansão e fortalece a economia da região com exportações recordes, alta produtividade nas lavouras e vanguarda em inovação sustentável no campo.',
    category: 'Agro',
    contentType: 'materia',
    highlightTag: 'DESTAQUE PRINCIPAL',
    imageUrl:
      'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Colheitadeira moderna trabalhando em lavoura de grãos em Goiás durante o pôr do sol',
    publishedAt: 'Publicado hoje às 08:30',
    readTime: '4 min de leitura',
    author: 'Redação Conexões • Campo',
    isMainLead: true,
    content: [
      'O agronegócio goiano consolidou sua liderança no cenário nacional ao alcançar novos recordes de produtividade e volume de exportação na safra 2024/2025. Com solos férteis e a aplicação intensiva de biotecnologia, o estado vem se distanciando como o motor econômico do Centro-Oeste.',
      'Municípios estratégicos como Rio Verde, Jataí, Cristalina e Montividiu continuam atraindo investimentos robustos em maquinários autônomos, conectividade 5G em áreas rurais e sistemas inteligentes de irrigação por pivô central.',
      'Segundo lideranças do setor produtivo, a grande virada de chave está na sustentabilidade aliada à rentabilidade: "Hoje, o produtor de Goiás não apenas colhe mais por hectare, mas regenera o solo com plantas de cobertura e bioinsumos produzidos na própria fazenda", destaca o relatório anual de inteligência agrícola.',
      'A expansão da malha logística da Ferrovia Norte-Sul e a duplicação de trechos vitais da BR-060 completam o ecossistema que assegura o escoamento veloz da safra até os portos marítimos de Santos e Itaqui, garantindo preços competitivos no mercado global.',
    ],
  },

  // 2. MATÉRIA - CIDADE
  {
    id: 'rio-verde-negocios-qualidade-vida',
    title: 'Rio Verde se consolida como referência em negócios e qualidade de vida',
    subtitle:
      'Com forte atração de agroindústrias e infraestrutura de ponta, o polo do sudoeste goiano acelera o crescimento sustentável.',
    category: 'Cidade',
    contentType: 'materia',
    imageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Vista urbana e prédios modernos de centro de negócios',
    publishedAt: 'Há 25 minutos',
    readTime: '3 min de leitura',
    author: 'Redação Regional',
    isSecondaryLead: true,
    content: [
      'Rio Verde experimenta uma nova fase de expansão urbana e diversificação econômica, impulsionada pelo fortalecimento das agroindústrias e do setor de serviços.',
      'A chegada de novos centros de tecnologia, condomínios empresariais e hospitais de alta complexidade transformou o município em um polo de atração para jovens executivos, pesquisadores e famílias que buscam desenvolvimento com qualidade de vida.',
      'O PIB per capita do município figura entre os maiores da região Centro-Oeste, respaldado por uma cadeia que vai do plantio de grãos ao processamento industrial de carnes e óleos vegetais.',
    ],
  },

  // 3. ARTIGO DE OPINIÃO - ECONOMIA (CONEXÃO EMPRESARIAL)
  {
    id: 'gestao-estrategica-agro-empresas',
    title: 'Gestão Estratégica: O novo perfil das empresas familiares em Goiás',
    subtitle:
      'Profissionalização de diretorias e governança corporativa aceleram a sucessão nas fazendas e indústrias goianas.',
    category: 'Economia',
    contentType: 'artigo',
    hubType: 'empresarial',
    imageUrl:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Há 1 hora',
    readTime: '5 min de leitura',
    author: 'Dr. Marcos Valadares',
    columnist: {
      name: 'Dr. Marcos Valadares',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Consultor de Governança & Finanças Corporativas',
      bio: 'Especialista em governança para grupos agroindustriais, conselheiro de empresas familiares e autor de artigos sobre sucessão no Centro-Oeste.',
    },
    isSecondaryLead: true,
    content: [
      'A transição geracional nos grupos agropecuários e nas empresas de Goiás deixou de ser um tabu para se tornar o vetor determinante de sobrevivência e expansão no mercado moderno.',
      'Empresas que adotam conselhos consultivos independentes e protocolos familiares claros conseguem reduzir atritos em até 70%, garantindo que a terceira geração preserve o legado produtivo com visão de mercado aberto.',
      'Em Goiás, vemos cases notáveis de produtores rurais que transformaram simples propriedades rurais em corporações estruturadas com auditoria externa e captação de recursos via Fiagros.',
    ],
  },

  // 4. ARTIGO DE OPINIÃO - POLÍTICA / CONEXÃO COM A LEI
  {
    id: 'seguranca-juridica-contratos-agrarios',
    title: 'Segurança Jurídica: Como blindar contratos agrários na safra 2025/2026',
    subtitle:
      'Análise sobre cláusulas de força maior, antecipação de grãos e mitigação de litígios no agronegócio.',
    category: 'Política',
    contentType: 'artigo',
    hubType: 'lei',
    imageUrl:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Hoje às 07:15',
    readTime: '6 min de leitura',
    author: 'Dra. Camila Nogueira',
    columnist: {
      name: 'Dra. Camila Nogueira',
      avatarUrl:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: 'Advogada Especialista em Direito Agrário & Tributário',
      bio: 'Sócia fundadora da Nogueira & Associados, assessora jurídica de cooperativas agrícolas e membro da Comissão de Direito Agrário de Goiás.',
    },
    content: [
      'Os recentes episódios de volatilidade climática e quebra de safras acenderam o alerta vermelho para a redação dos contratos de compra e venda futura de grãos no Brasil.',
      'Cláusulas genéricas de "caso fortuito ou força maior" não oferecem a proteção que o produtor e a trading imaginam. É imperativo que os contratos especifiquem limites pluviométricos e parâmetros técnicos para renegociação sem litígio.',
      'Neste artigo, examino como a jurisprudência recente dos tribunais goianos tem valorizado o cumprimento dos contratos de barter e a importância da assessoria preventiva para ambas as partes.',
    ],
  },

  // 5. PUBLIEDITORIAL (CONTEÚDO PATROCINADO) - SAÚDE E BEM ESTAR
  {
    id: 'medicina-preventiva-longevidade-goiania',
    title: 'Medicina Preventiva: Como a tecnologia está revolucionando o bem-estar e a longevidade',
    subtitle:
      'Check-ups genéticos e acompanhamento multidisciplinar tornam-se prioridade para profissionais e empresários de alta performance.',
    category: 'Saúde e Bem Estar',
    contentType: 'publi',
    sponsor: {
      name: 'Centro Médico Integrado Vitalis',
      brandColor: '#059669',
      disclaimer: 'Conteúdo Patrocinado • Informe Publicitário',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Ontem às 16:30',
    readTime: '4 min de leitura',
    author: 'Equipe de Comunicação Vitalis',
    content: [
      'A rotina acelerada dos negócios exige uma abordagem de saúde que vá muito além do tratamento de sintomas pontuais. A medicina preventiva e personalizada surge como a maior aliada de quem busca equilíbrio físico e mental.',
      'Com equipamentos de diagnóstico molecular de última geração instalados em Goiás, o Centro Médico Vitalis oferece programas personalizados de monitoramento da saúde cardiovascular, estresse oxidativo e otimização do sono.',
      '"Investir em prevenção com exames precoces não apenas eleva a qualidade de vida, mas evita interrupções abruptas na carreira e no dia a dia executivo", destaca a diretoria médica da instituição.',
    ],
  },

  // 6. MATÉRIA - GEO POLÍTICA
  {
    id: 'geopolitica-rotas-asiaticas-exportacao',
    title: 'Rota Asiática: As novas exigências globais para a carne e os grãos de Goiás',
    subtitle:
      'Acordos bilaterais entre Brasil e China impulsionam rastreabilidade digital e abrem novas cotas de exportação para frigoríficos goianos.',
    category: 'Geo Política',
    contentType: 'materia',
    imageUrl:
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Ontem às 11:20',
    readTime: '4 min de leitura',
    author: 'Correspondente Internacional',
    metrics: {
      label: 'Participação da Ásia',
      value: '68% do Agro GO',
      trend: '+8.4% no trimestre',
      trendType: 'positive',
    },
    content: [
      'As recentes negociações diplomáticas entre Brasília e Pequim resultaram na habilitação de novas plantas frigoríficas goianas para abate e exportação imediata para o mercado consumidor asiático.',
      'Contudo, o acesso a esse mercado exige o cumprimento estrito de normas de rastreabilidade animal individual e certificação de não desmatamento via satélite.',
      'O Porto Seco de Anápolis e o Corredor Ferroviário Centro-Atlântica despontam como estruturas estratégicas para manter o fluxo contínuo dos contêineres refrigerados.',
    ],
  },

  // 7. MATÉRIA - CIDADE / CONEXÃO EMPRESARIAL
  {
    id: 'polo-farmaceutico-anapolis-expansao',
    title: 'Polo Farmacêutico e Industrial de Anápolis atrai R$ 600 milhões em novos investimentos',
    subtitle:
      'Incentivos e localização central consolidam o DAIA como o segundo maior polo de medicamentos do país.',
    category: 'Cidade',
    contentType: 'materia',
    hubType: 'empresarial',
    imageUrl:
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Há 3 horas',
    readTime: '3 min de leitura',
    author: 'Redação Negócios',
    content: [
      'O Distrito Agroindustrial de Anápolis (DAIA) vive um momento histórico de expansão com a confirmação de três novas fábricas de princípios ativos e insumos farmacêuticos.',
      'A previsão das autoridades é que mais de 2.200 postos diretos de trabalho sejam gerados nos próximos dois anos.',
    ],
  },
];

export const mockEvents: EventItem[] = [
  {
    id: 'evento-1',
    title: 'Tecnoshow Comigo 2026',
    category: 'Agro',
    date: '07 a 11 de Abril',
    time: '08:00 às 18:00',
    location: 'Centro Tecnológico Comigo',
    city: 'Rio Verde - GO',
    imageUrl:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    description:
      'A maior feira de tecnologia rural do Centro-Oeste brasileiro, reunindo mais de 650 expositores e lançamentos de maquinários, sementes e biológicos.',
  },
  {
    id: 'evento-2',
    title: 'Fórum Goiano de Direito Agrário & Negócios',
    category: 'Institucional',
    date: '24 e 25 de Maio',
    time: '09:00 às 17:30',
    location: 'Auditório OAB Goiás / Flamboyant',
    city: 'Goiânia - GO',
    imageUrl:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
    description:
      'Debates sobre securitização do agro, CPRs verdes, governança familiar e marco legal das terras com os maiores juristas do país.',
  },
  {
    id: 'evento-3',
    title: 'ExpoNegócios & Franchising Goiás',
    category: 'Negócios',
    date: '12 de Junho',
    time: '14:00 às 21:00',
    location: 'Centro de Convenções de Anápolis',
    city: 'Anápolis - GO',
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    description:
      'Rodadas de negócios B2B e captação de investimentos para redes de franquias, prestadores de serviços e startups do Centro-Oeste.',
  },
];

export const mainFeaturedArticle = allArticles[0];
export const secondaryLeadArticles = [allArticles[1], allArticles[2]];
export const curatedNewsArticles = [allArticles[3], allArticles[4], allArticles[5]];

export function getArticleById(id: string): Article | undefined {
  return allArticles.find((a) => a.id === id);
}

export function getArticlesByCategory(category: string): Article[] {
  const norm = category.toLowerCase().trim();
  if (norm === 'noticias' || norm === 'notícias' || norm === 'todas') {
    return allArticles;
  }
  return allArticles.filter((a) => {
    const artCat = a.category.toLowerCase().trim();
    if (norm === 'agro' && artCat === 'agro') return true;
    if (norm === 'cidade' && artCat === 'cidade') return true;
    if (norm === 'politica' || norm === 'política') return artCat.includes('pol');
    if (norm.includes('saude') || norm.includes('saúde')) return artCat.includes('saúde');
    if (norm === 'economia' && artCat === 'economia') return true;
    if (norm.includes('geo')) return artCat.includes('geo');
    return artCat === norm;
  });
}

export function getArticlesByHub(hubType: 'empresarial' | 'lei' | 'eventos'): Article[] {
  return allArticles.filter((a) => a.hubType === hubType);
}

export function getRelatedArticles(currentId: string, category: string, limit = 3): Article[] {
  return allArticles
    .filter((a) => a.id !== currentId)
    .slice(0, limit);
}
