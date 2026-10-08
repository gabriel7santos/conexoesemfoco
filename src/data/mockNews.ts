import { Article, MarketQuote, WeatherInfo } from '../types';

export const mockQuotes: MarketQuote[] = [
  { id: '1', name: 'Soja Rio Verde', value: 'R$ 128,50', variation: '▲ +0.8%', isPositive: true },
  { id: '2', name: 'Milho Jataí', value: 'R$ 54,20', variation: '▼ -0.3%', isPositive: false },
  { id: '3', name: 'Boi Gordo GO', value: 'R$ 245,00' },
  { id: '4', name: 'Dólar', value: 'R$ 5,42', variation: '▲ +0.15%', isPositive: true },
  { id: '5', name: 'Etanol Hidratado GO', value: 'R$ 2,75' },
];

export const mockWeather: WeatherInfo[] = [
  { city: 'Goiânia', temp: '29°C', condition: 'Ensolarado' },
  { city: 'Rio Verde', temp: '27°C', condition: 'Parcialmente Nublado' },
];

export const mainFeaturedArticle: Article = {
  id: 'agro-desenvolvimento-goias',
  title: 'O agro impulsiona o desenvolvimento de Goiás',
  subtitle:
    'Setor segue em expansão e fortalece a economia da região com exportações recordes, alta produtividade nas lavouras e vanguarda em inovação sustentável no campo.',
  category: 'AGRO',
  highlightTag: 'DESTAQUE PRINCIPAL',
  imageUrl:
    'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1600&q=80',
  imageAlt: 'Colheitadeira moderna trabalhando em lavoura de grãos em Goiás durante o pôr do sol',
  publishedAt: 'Publicado hoje às 08:30',
  readTime: '4 min de leitura',
  author: 'Redação Conexões • Campo',
  isMainLead: true,
  content: [
    'O agronegócio goiano consolidou sua liderança no cenário nacional ao alcançar novos recordes de produtividade e volume de exportação na safra 2024/2025.',
    'Municípios como Rio Verde, Jataí, Cristalina e Montividiu continuam atraindo investimentos robustos em biotecnologia, maquinários autônomos e conectividade rural de ponta.',
    'A união entre sustentabilidade e alta tecnologia permitiu que os produtores locais mantivessem um crescimento contínuo, mesmo diante das oscilações climáticas globais, consolidando Goiás como um polo indispensável para a segurança alimentar do planeta.',
  ],
};

export const secondaryLeadArticles: Article[] = [
  {
    id: 'rio-verde-negocios-qualidade-vida',
    title: 'Rio Verde se consolida como referência em negócios e qualidade de vida',
    subtitle:
      'Com forte atração de agroindústrias e infraestrutura de ponta, o polo do sudoeste goiano acelera o crescimento sustentável.',
    category: 'ECONOMIA',
    imageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Vista urbana e prédios modernos de centro de negócios',
    publishedAt: 'Há 25 minutos',
    readTime: '3 min de leitura',
    author: 'Redação Goiânia',
    isSecondaryLead: true,
    content: [
      'Rio Verde experimenta uma nova fase de expansão urbana e diversificação econômica, impulsionada pelo fortalecimento das agroindústrias e do setor de serviços.',
      'Novos empreendimentos comerciais e melhorias viárias estão atraindo profissionais qualificados e novas empresas para a região sudoeste.',
    ],
  },
  {
    id: 'parcerias-oportunidades-ecossistema-goias',
    title: 'Parcerias que geram oportunidades para o ecossistema regional de Goiás',
    subtitle:
      'Acordos entre cooperativas, startups e universidades aceleram a transferência de tecnologia para o produtor rural.',
    category: 'NEGÓCIOS',
    imageUrl:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Executivos selando parceria comercial em sala corporativa',
    publishedAt: 'Há 1 hora',
    readTime: '3 min de leitura',
    author: 'Conexões Business',
    isSecondaryLead: true,
    content: [
      'A articulação entre os setores público e privado em Goiás tem gerado frutos promissores para a aceleração de pequenas e médias empresas.',
      'Eventos regionais e fóruns de negócios estão criando conexões estratégicas entre investidores e projetos inovadores do estado.',
    ],
  },
];

export const curatedNewsArticles: Article[] = [
  {
    id: 'safra-recorde-graos-2025',
    title: 'Safra recorde de grãos projeta superávit histórico na balança goiana em 2025',
    subtitle:
      'O avanço técnico das colheitadeiras autônomas e a expansão da área irrigada em Cristalina e Jataí impulsionam projeções da safra de soja e milho safrinha.',
    category: 'AGRO',
    categoryColor: 'bg-emerald-700 text-white',
    imageUrl:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Há 40 minutos',
    readTime: '4 min de leitura',
    author: 'Equipe de Economia Rural',
    metrics: {
      label: 'Evolução Safra GO',
      value: '32.8M Toneladas',
      trend: '+14.2% GO',
      trendType: 'positive',
    },
    content: [
      'A expansão das áreas de agricultura de precisão está permitindo recordes contínuos de produtividade por hectare em solo goiano.',
      'Os dados preliminares apontam para um desempenho superior a safras passadas, reforçando o superávit comercial do estado.',
    ],
  },
  {
    id: 'infraestrutura-rodoviaria-sudoeste-portos',
    title: 'Investimentos em infraestrutura rodoviária ligam o sudoeste goiano aos portos',
    subtitle:
      'Obras estruturantes no anel viário e a integração com terminais multimodais aceleram a saída de farelo e óleo com redução de custo de frete por tonelada.',
    category: 'LOGÍSTICA',
    imageUrl:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Há 2 horas',
    readTime: '5 min de leitura',
    author: 'Repórter Especial Logística',
    locationRoute: {
      title: 'Corredor de Exportação',
      route: 'Rio Verde → Anápolis → Santos',
    },
    content: [
      'A modernização da malha viária e ferroviária representa um divisor de águas para a competitividade das exportações do Centro-Oeste.',
      'A diminuição do tempo de trânsito até os portos marítimos de Santos e Paranaguá reduz sensivelmente os custos logísticos.',
    ],
  },
  {
    id: 'tendencias-agritech-2025-ia-podcast',
    title: 'Tendências do agritech para 2025: IA na lavoura e bioinsumos no Centro-Oeste',
    subtitle:
      'Especialistas do polo tecnológico debatem como a conectividade no campo está gerando uma nova geração de cooperativas digitais.',
    category: 'ENTREVISTAS',
    imageUrl:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Hoje, 07:15',
    readTime: 'Áudio • 28 min',
    author: 'Conexões Cast',
    audio: {
      available: true,
      duration: '28 min • Alta fidelidade',
      episodeNumber: 'PODCAST #42',
      title: 'IA e o Futuro do Agronegócio Goiano',
    },
    content: [
      'No episódio de hoje do Conexões Cast, recebemos pesquisadores e empreendedores para analisar o impacto direto da inteligência artificial aplicada ao manejo de lavouras e bioinsumos.',
      'Descubra como fazendas de Goiás já estão utilizando sensores inteligentes para economizar água e defensivos.',
    ],
  },
];
