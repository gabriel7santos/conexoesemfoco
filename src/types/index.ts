export type ContentType = 'materia' | 'artigo' | 'publi';

export type MainCategory =
  | 'Agro'
  | 'Cidade'
  | 'Política'
  | 'Saúde e Bem Estar'
  | 'Economia'
  | 'Geo Política'
  | string;

export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  color: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  category: MainCategory | string;
  categoryColor?: string;
  contentType: ContentType;
  imageUrl: string;
  imageAlt?: string;
  imageCredit?: string;
  publishedAt: string;
  readTime: string;
  author: string;
  content: string[];
  contentHtml?: string;
  isMainLead?: boolean;
  isSecondaryLead?: boolean;
  highlightTag?: string;
  hubType?: 'empresarial' | 'lei' | 'eventos' | null;
  // Dados específicos para PUBLI
  sponsor?: {
    name: string;
    brandColor?: string;
    disclaimer?: string;
  } | null;
  // Dados específicos para ARTIGO / CONEXÃO COM A LEI
  columnist?: {
    name: string;
    avatarUrl: string;
    role: string;
    bio: string;
  } | null;
  audio?: {
    available: boolean;
    duration: string;
    episodeNumber?: string;
    title?: string;
    audioUrl?: string;
  } | null;
  metrics?: {
    label: string;
    value: string;
    trend?: string;
    trendType?: 'positive' | 'negative' | 'neutral';
  } | null;
  locationRoute?: {
    title: string;
    route: string;
  } | null;
  viewsCount?: number;
  isPublished?: boolean;
  createdAt?: string;
}

export interface MarketQuote {
  id: string;
  name: string;
  fullName?: string;
  code?: string;
  label?: string;
  value: string;
  variation?: string;
  isPositive?: boolean;
  marketPlace?: string;
  category?: 'fisico' | 'futuro' | 'cambio';
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

export interface DayForecast {
  date: string; // Ex: '17/10'
  dayOfWeek: string; // Ex: 'Sáb'
  rainMm: number; // Ex: 6.4
  rainProb: number; // Ex: 47
  tempMax: number; // Ex: 28
  tempMin: number; // Ex: 19
}

export interface CityWeatherData {
  city: string;
  state: string;
  temp: number;
  tempMax: number;
  tempMin: number;
  condition: string;
  rainProb: number;
  rainMm: number;
  windSpeed: string;
  windDirection: string;
  sevenDays: DayForecast[];
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Agro' | 'Negócios' | 'Cultura' | 'Institucional' | string;
  date: string;
  time: string;
  location: string;
  city: string;
  imageUrl: string;
  description: string;
  linkUrl?: string;
  isActive?: boolean;
}

export interface AdBannerRecord {
  id: string;
  adType: 'leaderboard' | 'square';
  brandName: string;
  tag: string;
  headline: string;
  description: string;
  ctaText: string;
  targetUrl?: string;
  bgImage?: string;
  logoUrl?: string;
  logoKey?: string;
  ctaColor?: string;
  gradientBg?: string;
  borderColor?: string;
  displayOrder?: number;
  isActive: boolean;
}

export interface LeadRecord {
  id: string;
  leadType: 'anunciante' | 'newsletter' | 'vip';
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  interest?: string;
  status: 'novo' | 'em_atendimento' | 'fechado' | 'perdido';
  createdAt: string;
}
