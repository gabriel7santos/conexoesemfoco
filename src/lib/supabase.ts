import { createClient } from '@supabase/supabase-js';
import { Article, EventItem, AdBannerRecord, LeadRecord } from '../types';

const metaEnv = (import.meta as any).env || {};
const SUPABASE_URL =
  metaEnv.VITE_SUPABASE_URL || 'https://tapolpxjhydcubtgkwzg.supabase.co';
const SUPABASE_ANON_KEY =
  metaEnv.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_-nBKrnstn3wYZVdY4skdXQ_GsIEY4kM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Faz upload de uma imagem/arquivo para o bucket público `media` no Supabase Storage
 * e retorna a URL pública pronta para exibição.
 */
export async function uploadMediaFile(
  file: File,
  folder: 'articles' | 'banners' | 'columnists' | 'events' | 'inline' = 'articles'
): Promise<string> {
  try {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const cleanName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .slice(0, 40);
    const filePath = `${folder}/${Date.now()}-${cleanName}.${ext}`;

    const { error } = await supabase.storage.from('media').upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage.from('media').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.warn('Fallback para base64 local no upload:', err);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

export function mapRowToArticle(row: any): Article {
  const contentArr = Array.isArray(row.content)
    ? row.content
    : typeof row.content === 'string'
    ? [row.content]
    : [];

  return {
    id: row.id,
    title: row.title || '',
    subtitle: row.subtitle || '',
    category: row.category || 'Agro',
    categoryColor: row.category_color || undefined,
    contentType: row.content_type || 'materia',
    hubType: row.hub_type || null,
    imageUrl:
      row.image_url ||
      'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80',
    imageAlt: row.image_alt || row.title || '',
    publishedAt: row.published_at || 'Publicado hoje',
    readTime: row.read_time || '4 min de leitura',
    author: row.author || 'Redação Conexões',
    content: contentArr,
    contentHtml: row.content_html || contentArr.map((p: string) => `<p>${p}</p>`).join(''),
    isMainLead: Boolean(row.is_main_lead),
    isSecondaryLead: Boolean(row.is_secondary_lead),
    highlightTag: row.highlight_tag || undefined,
    sponsor: row.sponsor || null,
    columnist: row.columnist || null,
    audio: row.audio || null,
    metrics: row.metrics || null,
    locationRoute: row.location_route || null,
    viewsCount: Number(row.views_count || 0),
    isPublished: row.is_published !== false,
    createdAt: row.created_at,
  };
}

export function mapArticleToRow(article: Partial<Article> & { id: string; title: string }) {
  return {
    id: article.id,
    title: article.title,
    subtitle: article.subtitle || null,
    category: article.category || 'Agro',
    category_color: article.categoryColor || null,
    content_type: article.contentType || 'materia',
    hub_type: article.hubType || null,
    image_url: article.imageUrl || '',
    image_alt: article.imageAlt || article.title,
    published_at: article.publishedAt || 'Publicado hoje',
    read_time: article.readTime || '4 min de leitura',
    author: article.author || 'Redação Conexões',
    content: article.content || [],
    content_html: article.contentHtml || null,
    is_main_lead: Boolean(article.isMainLead),
    is_secondary_lead: Boolean(article.isSecondaryLead),
    highlight_tag: article.highlightTag || null,
    sponsor: article.sponsor || null,
    columnist: article.columnist || null,
    audio: article.audio || null,
    metrics: article.metrics || null,
    location_route: article.locationRoute || null,
    is_published: article.isPublished !== false,
    updated_at: new Date().toISOString(),
  };
}

export function mapRowToEvent(row: any): EventItem {
  return {
    id: row.id,
    title: row.title || '',
    category: row.category || 'Agro',
    date: row.date || '',
    time: row.time || '',
    location: row.location || '',
    city: row.city || 'Rio Verde - GO',
    imageUrl:
      row.image_url ||
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    description: row.description || '',
    linkUrl: row.link_url || undefined,
    isActive: row.is_active !== false,
  };
}

export function mapRowToBanner(row: any): AdBannerRecord {
  return {
    id: row.id,
    adType: row.ad_type || 'leaderboard',
    brandName: row.brand_name || '',
    tag: row.tag || 'PATROCÍNIO OFICIAL',
    headline: row.headline || '',
    description: row.description || '',
    ctaText: row.cta_text || 'Saiba Mais',
    targetUrl: row.target_url || '',
    bgImage: row.bg_image || '',
    logoUrl: row.logo_url || '',
    logoKey: row.logo_key || 'conexoes',
    ctaColor: row.cta_color || 'bg-[#23B26D] hover:bg-[#1fa162] text-white',
    gradientBg: row.gradient_bg || 'from-[#00381e] via-[#004e28] to-[#0b2417]',
    borderColor: row.border_color || 'border-[#23B26D]/50 hover:border-[#7afbae]',
    displayOrder: Number(row.display_order || 0),
    isActive: row.is_active !== false,
  };
}

export function mapRowToLead(row: any): LeadRecord {
  return {
    id: row.id,
    leadType: row.lead_type || 'anunciante',
    name: row.name || '',
    company: row.company || '',
    phone: row.phone || '',
    email: row.email || '',
    interest: row.interest || '',
    status: row.status || 'novo',
    createdAt: row.created_at || new Date().toISOString(),
  };
}
