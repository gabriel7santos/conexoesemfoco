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

export const allArticles: Article[] = [
  {
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
      'O agronegócio goiano consolidou sua liderança no cenário nacional ao alcançar novos recordes de produtividade e volume de exportação na safra 2024/2025. Com solos férteis e a aplicação intensiva de biotecnologia, o estado vem se distanciando como o motor econômico do Centro-Oeste.',
      'Municípios estratégicos como Rio Verde, Jataí, Cristalina e Montividiu continuam atraindo investimentos robustos em maquinários autônomos, conectividade 5G em áreas rurais e sistemas inteligentes de irrigação por pivô central.',
      'Segundo lideranças do setor produtivo, a grande virada de chave está na sustentabilidade aliada à rentabilidade: "Hoje, o produtor de Goiás não apenas colhe mais por hectare, mas regenera o solo com plantas de cobertura e bioinsumos produzidos na própria fazenda", destaca o relatório anual de inteligência agrícola.',
      'A expansão da malha logística da Ferrovia Norte-Sul e a duplicação de trechos vitais da BR-060 completam o ecossistema que assegura o escoamento veloz da safra até os portos marítimos de Santos e Itaqui, garantindo preços competitivos no mercado global.',
    ],
  },
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
      'A chegada de novos centros de tecnologia, condomínios empresariais e hospitais de alta complexidade transformou o município em um polo de atração para jovens executivos, pesquisadores e famílias que buscam desenvolvimento com qualidade de vida.',
      'O PIB per capita do município figura entre os maiores da região Centro-Oeste, respaldado por uma cadeia que vai do plantio de grãos ao processamento industrial de carnes e óleos vegetais.',
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
      'Centros de inovação instalados em polos como Anápolis, Goiânia e Rio Verde estão conectando pesquisadores acadêmicos a problemas reais enfrentados pelos produtores no campo.',
      'O investimento em fundos de venture capital focados em agritechs e cleantechs já supera R$ 180 milhões no estado nos últimos doze meses.',
    ],
  },
  {
    id: 'safra-recorde-graos-2025',
    title: 'Safra recorde de grãos projeta superávit histórico na balança goiana em 2025',
    subtitle:
      'O avanço técnico das colheitadeiras autônomas e a expansão da área irrigada em Cristalina e Jataí impulsionam projeções da safra de soja e milho safrinha.',
    category: 'AGRO',
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
      'A estimativa oficial para a colheita goiana de grãos aponta para um salto de 14,2% em relação ao ciclo anterior, atingindo a marca expressiva de 32,8 milhões de toneladas.',
      'O destaque absoluto foi o ganho de eficiência: a área plantada cresceu de forma moderada, enquanto o rendimento médio por talhão bateu recordes históricos graças à agricultura de precisão.',
      'O saldo positivo das exportações já se reflete na arrecadação municipal das regiões produtoras, possibilitando investimentos diretos em escolas e estradas vicinais.',
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
      'A integração logística entre os polos produtores de Goiás e os terminais marítimos de exportação deu um salto com a entrega de novos viadutos e pistas duplas.',
      'A redução no custo de transporte chega a 18% para cargas conteinerizadas de farelo e carnes frigorificadas, tornando a indústria goiana ainda mais competitiva.',
      'Projetos multimodais que ligam rodovias à ferrovia Norte-Sul no polo de Anápolis e Santa Helena de Goiás são os motores dessa transformação.',
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
      'Drones equipados com câmeras multiespectrais já detectam focos de pragas antes mesmo que os sintomas sejam visíveis a olho nu, permitindo aplicações cirúrgicas de defensivos.',
      'A automação e a digitalização estão reduzindo custos operacionais em até 30% em propriedades modelo em Goiás.',
    ],
  },
  {
    id: 'circuito-eventos-agro-goias-2026',
    title: 'Circuito de feiras e feiras de negócios movimenta R$ 4 bilhões em Goiás',
    subtitle:
      'Calendário de eventos agropecuários e rodadas de negócios impulsiona turismo de negócios e vendas de maquinários no estado.',
    category: 'EVENTOS',
    imageUrl:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Ontem às 17:40',
    readTime: '3 min de leitura',
    author: 'Redação Eventos & Mercado',
    content: [
      'As grandes feiras de negócios de Goiás, como a Tecnoshow Comigo em Rio Verde e a Agro Centro-Oeste em Goiânia, projetam números históricos para suas próximas edições.',
      'A presença de comitivas internacionais de países da Ásia e da Europa reforça o prestígio global das inovações agrícolas desenvolvidas em terras goianas.',
      'A rede hoteleira e de serviços dos municípios anfitriões opera com 100% de ocupação durante as semanas de evento.',
    ],
  },
  {
    id: 'credito-verde-sustentabilidade-rural',
    title: 'Linhas de crédito verde crescem 45% entre produtores do sudoeste goiano',
    subtitle:
      'Instituições financeiras oferecem juros reduzidos para propriedades com certificações socioambientais e manejo de carbono.',
    category: 'ECONOMIA',
    imageUrl:
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    publishedAt: 'Ontem às 14:20',
    readTime: '4 min de leitura',
    author: 'Conexões Finanças',
    content: [
      'O mercado de finanças sustentáveis ganhou escala definitiva no agronegócio goiano com a expansão das CPRs Verdes e títulos de transição climática.',
      'Produtores que comprovam preservação de áreas de reserva legal e adoção de plantio direto conseguem taxas de juros até 2 pontos percentuais menores junto aos bancos cooperativos.',
    ],
  },
];

export const mainFeaturedArticle = allArticles[0];
export const secondaryLeadArticles = [allArticles[1], allArticles[2]];
export const curatedNewsArticles = [allArticles[3], allArticles[4], allArticles[5]];

export function getArticleById(id: string): Article | undefined {
  return allArticles.find((a) => a.id === id);
}

export function getArticlesByCategory(category: string): Article[] {
  const catUpper = category.toUpperCase();
  if (catUpper === 'NOTICIAS' || catUpper === 'NOTÍCIAS' || catUpper === 'TODOS') {
    return allArticles;
  }
  return allArticles.filter((a) => a.category.toUpperCase() === catUpper);
}

export function getRelatedArticles(currentId: string, category: string, limit = 3): Article[] {
  return allArticles
    .filter((a) => a.id !== currentId && (a.category === category || a.isSecondaryLead))
    .slice(0, limit);
}
