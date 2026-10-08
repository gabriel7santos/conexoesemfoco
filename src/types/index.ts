export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  category: 'AGRO' | 'ECONOMIA' | 'NEGÓCIOS' | 'REGIÃO' | 'ENTREVISTAS' | 'LOGÍSTICA' | 'INOVAÇÃO' | 'EVENTOS' | string;
  categoryColor?: string;
  imageUrl: string;
  imageAlt?: string;
  publishedAt: string;
  readTime: string;
  author: string;
  content: string[];
  isMainLead?: boolean;
  isSecondaryLead?: boolean;
  highlightTag?: string;
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
  value: string;
  variation?: string;
  isPositive?: boolean;
}

export interface WeatherInfo {
  city: string;
  temp: string;
  condition: string;
}
