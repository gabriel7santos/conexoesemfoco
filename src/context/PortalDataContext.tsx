import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Article,
  EventItem,
  AdBannerRecord,
  LeadRecord,
  MarketQuote,
  CategoryRecord,
} from '../types';
import { mockQuotes } from '../data/mockNews';
import {
  supabase,
  mapRowToArticle,
  mapArticleToRow,
  mapRowToEvent,
  mapRowToBanner,
  mapRowToLead,
  mapRowToCategory,
} from '../lib/supabase';

const DEFAULT_CATEGORIES: CategoryRecord[] = [
  {
    id: 'agro',
    name: 'Agro',
    slug: 'agro',
    color: '#006d3f',
    description:
      'Inteligência de safras, tecnologia de precisão, insumos e o dia a dia do produtor rural goiano.',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'cidade',
    name: 'Cidade',
    slug: 'cidade',
    color: '#004E86',
    description:
      'Infraestrutura urbana, desenvolvimento regional e acontecimentos em Rio Verde, Jataí, Goiânia e região.',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'politica',
    name: 'Política',
    slug: 'politica',
    color: '#b45309',
    description:
      'Decisões do governo, legislação, políticas públicas e o impacto das medidas estaduais no setor produtivo.',
    displayOrder: 3,
    isActive: true,
  },
  {
    id: 'saude-e-bem-estar',
    name: 'Saúde e Bem Estar',
    slug: 'saude-e-bem-estar',
    color: '#0d9488',
    description:
      'Medicina preventiva, longevidade, qualidade de vida, avanços hospitalares e saúde ocupacional.',
    displayOrder: 4,
    isActive: true,
  },
  {
    id: 'economia',
    name: 'Economia',
    slug: 'economia',
    color: '#1e3a8a',
    description:
      'Indicadores financeiros, cotações, investimentos industriais e crescimento econômico no Centro-Oeste.',
    displayOrder: 5,
    isActive: true,
  },
  {
    id: 'geo-politica',
    name: 'Geo Política',
    slug: 'geo-politica',
    color: '#4338ca',
    description:
      'Relações internacionais, balança comercial, exportações e o posicionamento de Goiás no mundo.',
    displayOrder: 6,
    isActive: true,
  },
];

interface PortalDataContextType {
  articles: Article[];
  events: EventItem[];
  banners: AdBannerRecord[];
  leads: LeadRecord[];
  categories: CategoryRecord[];
  quotes: MarketQuote[];
  loading: boolean;
  mainFeaturedArticle: Article | null;
  secondaryLeadArticles: Article[];
  getArticleById: (id: string) => Article | undefined;
  getArticlesByCategory: (categoryOrSlug: string) => Article[];
  getArticlesByHub: (hubType: 'empresarial' | 'lei' | 'eventos') => Article[];
  getRelatedArticles: (currentId: string, category: string, limit?: number) => Article[];
  saveArticle: (article: Article) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  setMainLeadArticle: (id: string) => Promise<void>;
  toggleSecondaryLeadArticle: (id: string) => Promise<void>;
  saveCategory: (category: CategoryRecord) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  toggleCategoryActive: (id: string, isActive: boolean) => Promise<void>;
  saveEvent: (event: EventItem) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  saveBanner: (banner: AdBannerRecord) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
  toggleBannerActive: (id: string, isActive: boolean) => Promise<void>;
  createLead: (lead: {
    leadType: 'anunciante' | 'newsletter' | 'vip';
    name?: string;
    company?: string;
    phone?: string;
    email?: string;
    interest?: string;
  }) => Promise<void>;
  updateLeadStatus: (id: string, status: LeadRecord['status']) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  refreshAll: () => Promise<void>;
}

const PortalDataContext = createContext<PortalDataContextType | undefined>(undefined);

function normalizeSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const PortalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [banners, setBanners] = useState<AdBannerRecord[]>([]);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [categories, setCategories] = useState<CategoryRecord[]>(DEFAULT_CATEGORIES);
  const [quotes, setQuotes] = useState<MarketQuote[]>(mockQuotes);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllFromSupabase = useCallback(async () => {
    try {
      setLoading(true);
      const [artRes, evRes, banRes, leadRes, catRes] = await Promise.all([
        supabase.from('articles').select('*').order('created_at', { ascending: false }),
        supabase.from('events').select('*').order('created_at', { ascending: false }),
        supabase.from('ad_banners').select('*').order('display_order', { ascending: true }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('display_order', { ascending: true }),
      ]);

      if (!artRes.error && artRes.data) {
        setArticles(artRes.data.map(mapRowToArticle));
      }
      if (!evRes.error && evRes.data) {
        setEvents(evRes.data.map(mapRowToEvent));
      }
      if (!banRes.error && banRes.data) {
        setBanners(banRes.data.map(mapRowToBanner));
      }
      if (!leadRes.error && leadRes.data) {
        setLeads(leadRes.data.map(mapRowToLead));
      }
      if (!catRes.error && catRes.data && catRes.data.length > 0) {
        setCategories(catRes.data.map(mapRowToCategory));
      }
    } catch (err) {
      console.warn('Erro ao buscar dados do Supabase:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualização automática de Câmbio Dólar (AwesomeAPI gratuita em tempo real)
  useEffect(() => {
    const fetchLiveDollar = async () => {
      try {
        const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
        if (!res.ok) return;
        const data = await res.json();
        const usd = data?.USDBRL;
        if (usd) {
          const bid = parseFloat(usd.bid).toFixed(2).replace('.', ',');
          const pct = parseFloat(usd.pctChange);
          const isPos = pct >= 0;
          const sign = isPos ? '▲ +' : '▼ ';
          setQuotes((prev) =>
            prev.map((q) =>
              q.id === 'dolar-comercial'
                ? {
                    ...q,
                    value: `R$ ${bid}`,
                    variation: `${sign}${pct.toFixed(2)}%`,
                    isPositive: isPos,
                  }
                : q
            )
          );
        }
      } catch {
        // Silencioso se offline
      }
    };

    fetchAllFromSupabase();
    fetchLiveDollar();
  }, [fetchAllFromSupabase]);

  const publishedArticles = articles.filter((a) => a.isPublished !== false);

  const mainFeaturedArticle: Article | null =
    publishedArticles.find((a) => a.isMainLead) || publishedArticles[0] || null;

  const secondaryLeadArticles = (() => {
    if (!mainFeaturedArticle) return [];
    const secs = publishedArticles.filter(
      (a) => a.isSecondaryLead && a.id !== mainFeaturedArticle.id
    );
    if (secs.length >= 2) return secs.slice(0, 2);
    const others = publishedArticles.filter((a) => a.id !== mainFeaturedArticle.id);
    return others.slice(0, 2);
  })();

  const getArticleById = useCallback(
    (id: string) => articles.find((a) => a.id === id),
    [articles]
  );

  const getArticlesByCategory = useCallback(
    (categoryOrSlug: string) => {
      const norm = normalizeSlug(categoryOrSlug);
      if (norm === 'noticias' || norm === 'todas' || norm === 'todos') {
        return publishedArticles;
      }

      // Verifica se bate com alguma categoria cadastrada no banco
      const matchedCat = categories.find(
        (c) => normalizeSlug(c.slug) === norm || normalizeSlug(c.name) === norm || c.id === norm
      );

      return publishedArticles.filter((a) => {
        const artSlug = normalizeSlug(a.category);
        if (artSlug === norm) return true;
        if (matchedCat) {
          return (
            artSlug === normalizeSlug(matchedCat.name) ||
            artSlug === normalizeSlug(matchedCat.slug)
          );
        }
        if (norm === 'saude' && artSlug.includes('saude')) return true;
        if (norm === 'geopolitica' && artSlug.includes('geo')) return true;
        return false;
      });
    },
    [publishedArticles, categories]
  );

  const getArticlesByHub = useCallback(
    (hubType: 'empresarial' | 'lei' | 'eventos') =>
      publishedArticles.filter((a) => a.hubType === hubType),
    [publishedArticles]
  );

  const getRelatedArticles = useCallback(
    (currentId: string, category: string, limit = 3) => {
      const sameCat = publishedArticles.filter(
        (a) => a.id !== currentId && a.category.toLowerCase() === category.toLowerCase()
      );
      if (sameCat.length >= limit) return sameCat.slice(0, limit);
      const others = publishedArticles.filter(
        (a) => a.id !== currentId && !sameCat.some((s) => s.id === a.id)
      );
      return [...sameCat, ...others].slice(0, limit);
    },
    [publishedArticles]
  );

  // CRUD DE MATÉRIAS / ARTIGOS / CONEXÕES
  const saveArticle = async (article: Article) => {
    if (article.isMainLead) {
      await supabase
        .from('articles')
        .update({ is_main_lead: false })
        .neq('id', article.id);
    }
    const row = mapArticleToRow(article);
    const { error } = await supabase.from('articles').upsert(row, { onConflict: 'id' });
    if (error) throw error;
    await fetchAllFromSupabase();
  };

  const deleteArticle = async (id: string) => {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const setMainLeadArticle = async (id: string) => {
    await supabase.from('articles').update({ is_main_lead: false }).neq('id', id);
    await supabase
      .from('articles')
      .update({ is_main_lead: true, is_secondary_lead: false })
      .eq('id', id);
    await fetchAllFromSupabase();
  };

  const toggleSecondaryLeadArticle = async (id: string) => {
    const target = articles.find((a) => a.id === id);
    if (!target) return;
    const nextVal = !target.isSecondaryLead;
    await supabase
      .from('articles')
      .update({ is_secondary_lead: nextVal, is_main_lead: false })
      .eq('id', id);
    await fetchAllFromSupabase();
  };

  // CRUD DE CATEGORIAS DINÂMICAS
  const saveCategory = async (category: CategoryRecord) => {
    const slug = normalizeSlug(category.slug || category.name);
    const id = category.id.trim() || slug;
    const row = {
      id,
      name: category.name.trim(),
      slug,
      color: category.color || '#006d3f',
      description: category.description || '',
      display_order: category.displayOrder || categories.length + 1,
      is_active: category.isActive !== false,
    };
    const { error } = await supabase.from('categories').upsert(row, { onConflict: 'id' });
    if (error) throw error;
    await fetchAllFromSupabase();
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleCategoryActive = async (id: string, isActive: boolean) => {
    const { error } = await supabase
      .from('categories')
      .update({ is_active: isActive })
      .eq('id', id);
    if (error) throw error;
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, isActive } : c)));
  };

  // CRUD DE EVENTOS
  const saveEvent = async (event: EventItem) => {
    const row = {
      id: event.id,
      title: event.title,
      category: event.category,
      date: event.date,
      time: event.time,
      location: event.location,
      city: event.city,
      image_url: event.imageUrl,
      description: event.description,
      link_url: event.linkUrl || null,
      is_active: event.isActive !== false,
    };
    const { error } = await supabase.from('events').upsert(row, { onConflict: 'id' });
    if (error) throw error;
    await fetchAllFromSupabase();
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // CRUD DE BANNERS / ANÚNCIOS
  const saveBanner = async (banner: AdBannerRecord) => {
    const row = {
      id: banner.id,
      ad_type: banner.adType,
      brand_name: banner.brandName,
      tag: banner.tag,
      headline: banner.headline,
      description: banner.description,
      cta_text: banner.ctaText,
      target_url: banner.targetUrl || '',
      bg_image: banner.bgImage || '',
      logo_url: banner.logoUrl || '',
      logo_key: banner.logoKey || 'conexoes',
      cta_color: banner.ctaColor || 'bg-[#23B26D] hover:bg-[#1fa162] text-white',
      gradient_bg: banner.gradientBg || 'from-[#00381e] via-[#004e28] to-[#0b2417]',
      border_color: banner.borderColor || 'border-[#23B26D]/50 hover:border-[#7afbae]',
      display_order: banner.displayOrder || 1,
      is_active: banner.isActive !== false,
    };
    const { error } = await supabase.from('ad_banners').upsert(row, { onConflict: 'id' });
    if (error) throw error;
    await fetchAllFromSupabase();
  };

  const deleteBanner = async (id: string) => {
    const { error } = await supabase.from('ad_banners').delete().eq('id', id);
    if (error) throw error;
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleBannerActive = async (id: string, isActive: boolean) => {
    const { error } = await supabase
      .from('ad_banners')
      .update({ is_active: isActive })
      .eq('id', id);
    if (error) throw error;
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, isActive } : b)));
  };

  // CRUD DE LEADS COMERCIAIS / NEWSLETTER
  const createLead = async (lead: {
    leadType: 'anunciante' | 'newsletter' | 'vip';
    name?: string;
    company?: string;
    phone?: string;
    email?: string;
    interest?: string;
  }) => {
    await supabase.from('leads').insert({
      lead_type: lead.leadType,
      name: lead.name || null,
      company: lead.company || null,
      phone: lead.phone || null,
      email: lead.email || null,
      interest: lead.interest || null,
      status: 'novo',
    });
    await fetchAllFromSupabase();
  };

  const updateLeadStatus = async (id: string, status: LeadRecord['status']) => {
    await supabase.from('leads').update({ status }).eq('id', id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const deleteLead = async (id: string) => {
    await supabase.from('leads').delete().eq('id', id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <PortalDataContext.Provider
      value={{
        articles,
        events,
        banners,
        leads,
        categories,
        quotes,
        loading,
        mainFeaturedArticle,
        secondaryLeadArticles,
        getArticleById,
        getArticlesByCategory,
        getArticlesByHub,
        getRelatedArticles,
        saveArticle,
        deleteArticle,
        setMainLeadArticle,
        toggleSecondaryLeadArticle,
        saveCategory,
        deleteCategory,
        toggleCategoryActive,
        saveEvent,
        deleteEvent,
        saveBanner,
        deleteBanner,
        toggleBannerActive,
        createLead,
        updateLeadStatus,
        deleteLead,
        refreshAll: fetchAllFromSupabase,
      }}
    >
      {children}
    </PortalDataContext.Provider>
  );
};

export function usePortalData(): PortalDataContextType {
  const ctx = useContext(PortalDataContext);
  if (!ctx) {
    throw new Error('usePortalData deve ser usado dentro de um PortalDataProvider');
  }
  return ctx;
}
