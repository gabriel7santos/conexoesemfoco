export type ContentType = 'materia' | 'artigo' | 'publi';

export type MainCategory =
  | 'Agro'
  | 'Cidade'
  | 'Política'
  | 'Saúde e Bem Estar'
  | 'Economia'
  | 'Geo Política';

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  category: MainCategory | string;
  categoryColor?: string;
  contentType: ContentType;
  imageUrl: string;
  imageAlt?: string;
  publishedAt: string;
  readTime: string;
  author: string;
  content: string[];
  isMainLead?: boolean;
  isSecondaryLead?: boolean;
  highlightTag?: string;
  hubType?: 'empresarial' | 'lei' | 'eventos';
  // Dados específicos para PUBLI
  sponsor?: {
    name: string;
    brandColor?: string;
    disclaimer?: string;
  };
  // Dados específicos para ARTIGO
  columnist?: {
    name: string;
    avatarUrl: string;
    role: string;
    bio: string;
  };
  audio?: {
    available: boolean;
    duration: string;
    episodeNumber?: string;
    title?: string;
  };
  metrics?: {
    label: string;
    value: string;
    trend?: string;
    trendType?: 'positive' | 'negative' | 'neutral';
  };
  locationRoute?: {
    title: string;
    route: string;
  };
}

export interface MarketQuote {
  id: string;
  name: string;
  label?: string;
  value: string;
  variation?: string;
  isPositive?: boolean;
  marketPlace?: string;
  isHighlight?: boolean;
}

export interface WeatherInfo {
  city: string;
  temp: string;
  condition: string;
  max?: string;
  min?: string;
  humidity?: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Agro' | 'Negócios' | 'Cultura' | 'Institucional';
  date: string;
  time: string;
  location: string;
  city: string;
  imageUrl: string;
  description: string;
}
