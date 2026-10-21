import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Article,
  EventItem,
  AdBannerRecord,
  LeadRecord,
  MarketQuote,
} from '../types';
import { allArticles as initialMockArticles, mockEvents as initialMockEvents, mockQuotes } from '../data/mockNews';
import {
  supabase,
  mapRowToArticle,
  mapArticleToRow,
  mapRowToEvent,
  mapRowToBanner,
  mapRowToLead,
} from '../lib/supabase';

interface PortalDataContextType {
  articles: Article[];
  events: EventItem[];
  banners: AdBannerRecord[];
  leads: LeadRecord[];
  quotes: MarketQuote[];
  loading: boolean;
  mainFeaturedArticle: Article;
  secondaryLeadArticles: Article[];
  getArticleById: (id: string) => Article | undefined;
  getArticlesByCategory: (category: string) => Article[];
  getArticlesByHub: (hubType: 'empresarial' | 'lei' | 'eventos') => Article[];
  getRelatedArticles: (currentId: string, category: string, limit?: number) => Article[];
  saveArticle: (article: Article) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  setMainLeadArticle: (id: string) => Promise<void>;
  toggleSecondaryLeadArticle: (id: string) => Promise<void>;
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

export const PortalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(initialMockArticles);
  const [events, setEvents] = useState<EventItem[]>(initialMockEvents);
  const [banners, setBanners] = useState<AdBannerRecord[]>([]);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [quotes, setQuotes] = useState<MarketQuote[]>(mockQuotes);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllFromSupabase = useCallback(async () => {
    try {
      setLoading(true);
      const [artRes, evRes, banRes, leadRes] = await Promise.all([
        supabase.from('articles').select('*').order('created_at', { ascending: false }),
        supabase.from('events').select('*').order('created_at', { ascending: false }),
        supabase.from('ad_banners').select('*').order('display_order', { ascending: true }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
      ]);

      if (!artRes.error && artRes.data && artRes.data.length > 0) {
        setArticles(artRes.data.map(mapRowToArticle));
      }
      if (!evRes.error && evRes.data && evRes.data.length > 0) {
        setEvents(evRes.data.map(mapRowToEvent));
      }
      if (!banRes.error && banRes.data) {
        setBanners(banRes.data.map(mapRowToBanner));
      }
      if (!leadRes.error && leadRes.data) {
        setLeads(leadRes.data.map(mapRowToLead));
      }
    } catch (err) {
      console.warn('Usando dados em cache local:', err);
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

  const mainFeaturedArticle =
    publishedArticles.find((a) => a.isMainLead) || publishedArticles[0] || initialMockArticles[0];

  const secondaryLeadArticles = (() => {
    const secs = publishedArticles.filter(
      (a) => a.isSecondaryLead && a.id !== mainFeaturedArticle?.id
    );
    if (secs.length >= 2) return secs.slice(0, 2);
    const others = publishedArticles.filter((a) => a.id !== mainFeaturedArticle?.id);
    return others.slice(0, 2);
  })();

  const getArticleById = useCallback(
    (id: string) => articles.find((a) => a.id === id),
    [articles]
  );

  const getArticlesByCategory = useCallback(
    (category: string) => {
      const norm = category.toLowerCase().trim();
      if (norm === 'noticias' || norm === 'notícias' || norm === 'todas') {
        return publishedArticles;
      }
      return publishedArticles.filter((a) => {
        const artCat = a.category.toLowerCase().trim();
        if (norm === 'agro' && artCat === 'agro') return true;
        if (norm === 'cidade' && artCat === 'cidade') return true;
        if (norm === 'politica' || norm === 'política') return artCat.includes('pol');
        if (norm.includes('saude') || norm.includes('saúde')) return artCat.includes('saúde');
        if (norm === 'economia' && artCat === 'economia') return true;
        if (norm.includes('geo')) return artCat.includes('geo');
        return artCat === norm;
      });
    },
    [publishedArticles]
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
