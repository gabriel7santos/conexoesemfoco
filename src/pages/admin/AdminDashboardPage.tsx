import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Compass,
  Megaphone,
  Users,
  Plus,
  Edit3,
  Trash2,
  Star,
  Sparkles,
  Building2,
  Scale,
  Calendar,
  Upload,
  CheckCircle2,
  ExternalLink,
  LogOut,
  Search,
  Eye,
  Power,
  MessageCircle,
  Loader2,
  ArrowLeft,
  Save,
  TrendingUp,
} from 'lucide-react';
import { usePortalData } from '../../context/PortalDataContext';
import {
  Article,
  ContentType,
  MainCategory,
  EventItem,
  AdBannerRecord,
} from '../../types';
import { RichTextEditor } from '../../components/admin/RichTextEditor';
import { uploadMediaFile, supabase } from '../../lib/supabase';

type AdminTab = 'dashboard' | 'materias' | 'conexoes' | 'anuncios' | 'leads';
type ConexaoSubTab = 'empresarial' | 'lei' | 'eventos';
type AdSubTab = 'leaderboard' | 'square';

const CATEGORIES: MainCategory[] = [
  'Agro',
  'Cidade',
  'Política',
  'Saúde e Bem Estar',
  'Economia',
  'Geo Política',
];

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    articles,
    events,
    banners,
    leads,
    mainFeaturedArticle,
    secondaryLeadArticles,
    saveArticle,
    deleteArticle,
    setMainLeadArticle,
    toggleSecondaryLeadArticle,
    saveEvent,
    deleteEvent,
    saveBanner,
    deleteBanner,
    toggleBannerActive,
    updateLeadStatus,
    deleteLead,
  } = usePortalData();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [conexaoSubTab, setConexaoSubTab] = useState<ConexaoSubTab>('empresarial');
  const [adSubTab, setAdSubTab] = useState<AdSubTab>('leaderboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // ESTADO DO EDITOR DE MATÉRIA / ARTIGO
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [articleForm, setArticleForm] = useState<Article>({
    id: '',
    title: '',
    subtitle: '',
    category: 'Agro',
    contentType: 'materia',
    hubType: null,
    imageUrl: '',
    imageAlt: '',
    publishedAt: 'Publicado hoje',
    readTime: '4 min de leitura',
    author: 'Redação Conexões',
    content: [],
    contentHtml: '<p></p>',
    isMainLead: false,
    isSecondaryLead: false,
    highlightTag: '',
    sponsor: null,
    columnist: null,
  });

  // ESTADO DO MODAL DE EVENTO
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [uploadingEventImg, setUploadingEventImg] = useState(false);
  const eventImgInputRef = useRef<HTMLInputElement>(null);
  const [eventForm, setEventForm] = useState<EventItem>({
    id: '',
    title: '',
    category: 'Agro',
    date: '',
    time: '08:00 às 18:00',
    location: '',
    city: 'Rio Verde - GO',
    imageUrl: '',
    description: '',
  });

  // ESTADO DO MODAL DE ANÚNCIO / BANNER
  const [isEditingBanner, setIsEditingBanner] = useState(false);
  const [uploadingBannerBg, setUploadingBannerBg] = useState(false);
  const [uploadingBannerLogo, setUploadingBannerLogo] = useState(false);
  const bannerBgInputRef = useRef<HTMLInputElement>(null);
  const bannerLogoInputRef = useRef<HTMLInputElement>(null);
  const [bannerForm, setBannerForm] = useState<AdBannerRecord>({
    id: '',
    adType: 'leaderboard',
    brandName: '',
    tag: 'PATROCÍNIO OFICIAL',
    headline: '',
    description: '',
    ctaText: 'Saiba Mais',
    targetUrl: '',
    bgImage: '',
    logoUrl: '',
    logoKey: 'conexoes',
    ctaColor: 'bg-[#23B26D] hover:bg-[#1fa162] text-white',
    gradientBg: 'from-[#00381e] via-[#004e28] to-[#0b2417]',
    borderColor: 'border-[#23B26D]/50 hover:border-[#7afbae]',
    displayOrder: 1,
    isActive: true,
  });

  // Verifica sessão de administrador
  useEffect(() => {
    const checkAuth = async () => {
      const localSession = localStorage.getItem('conexoes_admin_session');
      if (localSession) return;
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/admin/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleLogout = async () => {
    localStorage.removeItem('conexoes_admin_session');
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  // ABRIR CRIAÇÃO DE NOVA MATÉRIA / ARTIGO / CONEXÃO
  const openNewArticleEditor = (preset?: {
    contentType?: ContentType;
    hubType?: 'empresarial' | 'lei' | null;
    category?: MainCategory;
  }) => {
    const cType = preset?.contentType || 'materia';
    const hType = preset?.hubType !== undefined ? preset.hubType : null;
    const cat =
      preset?.category ||
      (hType === 'empresarial' ? 'Economia' : hType === 'lei' ? 'Política' : 'Agro');

    setArticleForm({
      id: '',
      title: '',
      subtitle: '',
      category: cat,
      contentType: cType,
      hubType: hType,
      imageUrl:
        'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1400&q=80',
      imageAlt: '',
      publishedAt: `Hoje às ${new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      readTime: '4 min de leitura',
      author: hType === 'lei' ? 'Colunista Jurídico' : 'Redação Conexões em FOCO',
      content: [],
      contentHtml: '<p>Escreva o conteúdo completo aqui...</p>',
      isMainLead: false,
      isSecondaryLead: false,
      highlightTag: '',
      sponsor:
        cType === 'publi'
          ? {
              name: '',
              brandColor: '#006d3f',
              disclaimer: 'Conteúdo Patrocinado • Informe Publicitário',
            }
          : null,
      columnist:
        cType === 'artigo' || hType === 'lei'
          ? {
              name: '',
              avatarUrl:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
              role: hType === 'lei' ? 'Advogado(a) Especialista' : 'Especialista Convidado',
              bio: '',
            }
          : null,
    });
    setIsEditingArticle(true);
  };

  const openEditArticleEditor = (art: Article) => {
    const html =
      art.contentHtml ||
      (art.content || []).map((p) => `<p>${p}</p>`).join('') ||
      '<p></p>';
    setArticleForm({
      ...art,
      contentHtml: html,
      sponsor: art.sponsor || {
        name: '',
        brandColor: '#006d3f',
        disclaimer: 'Conteúdo Patrocinado • Informe Publicitário',
      },
      columnist: art.columnist || {
        name: art.author || '',
        avatarUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'Especialista / Colunista',
        bio: '',
      },
    });
    setIsEditingArticle(true);
  };

  const handleUploadCoverImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCover(true);
      const url = await uploadMediaFile(file, 'articles');
      setArticleForm((prev) => ({ ...prev, imageUrl: url }));
      showToast('Foto de capa enviada para o Supabase com sucesso!');
    } catch {
      alert('Erro ao enviar a foto de capa.');
    } finally {
      setUploadingCover(false);
    }
  };

  const handleUploadAvatarImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingAvatar(true);
      const url = await uploadMediaFile(file, 'columnists');
      setArticleForm((prev) => ({
        ...prev,
        columnist: {
          name: prev.columnist?.name || prev.author || '',
          role: prev.columnist?.role || 'Colunista',
          bio: prev.columnist?.bio || '',
          avatarUrl: url,
        },
      }));
      showToast('Foto do colunista enviada com sucesso!');
    } catch {
      alert('Erro ao enviar foto do colunista.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title.trim()) {
      alert('Informe o título da publicação.');
      return;
    }
    try {
      setSaving(true);
      const slugId =
        articleForm.id.trim() ||
        `${articleForm.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
          .slice(0, 50)}-${Date.now().toString().slice(-4)}`;

      const finalParagraphs =
        articleForm.content && articleForm.content.length > 0
          ? articleForm.content
          : [articleForm.subtitle || articleForm.title];

      const payload: Article = {
        ...articleForm,
        id: slugId,
        content: finalParagraphs,
        author:
          articleForm.contentType === 'artigo' && articleForm.columnist?.name
            ? articleForm.columnist.name
            : articleForm.author || 'Redação Conexões',
        sponsor: articleForm.contentType === 'publi' ? articleForm.sponsor : null,
        columnist:
          articleForm.contentType === 'artigo' || articleForm.hubType === 'lei'
            ? articleForm.columnist
            : null,
      };

      await saveArticle(payload);
      setIsEditingArticle(false);
      showToast('Publicação salva e publicada no portal com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar publicação no banco de dados.');
    } finally {
      setSaving(false);
    }
  };

  // SALVAR EVENTO
  const handleSaveEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title.trim()) return;
    try {
      setSaving(true);
      const id = eventForm.id.trim() || `evento-${Date.now()}`;
      await saveEvent({ ...eventForm, id });
      setIsEditingEvent(false);
      showToast('Evento salvo na Agenda de Goiás!');
    } catch {
      alert('Erro ao salvar evento.');
    } finally {
      setSaving(false);
    }
  };

  // SALVAR BANNER / ANÚNCIO
  const handleSaveBannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerForm.brandName.trim() || !bannerForm.headline.trim()) return;
    try {
      setSaving(true);
      const id = bannerForm.id.trim() || `ad-${bannerForm.adType}-${Date.now()}`;
      await saveBanner({ ...bannerForm, id });
      setIsEditingBanner(false);
      showToast('Espaço publicitário salvo e atualizado no portal!');
    } catch {
      alert('Erro ao salvar anúncio.');
    } finally {
      setSaving(false);
    }
  };

  const filteredArticlesList = articles.filter((a) => {
    const matchesSearch =
      !searchTerm.trim() ||
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      categoryFilter === 'todas' ||
      a.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const empresarialArticles = articles.filter((a) => a.hubType === 'empresarial');
  const leiArticles = articles.filter((a) => a.hubType === 'lei');
  const leaderboardBanners = banners.filter((b) => b.adType === 'leaderboard');
  const squareBanners = banners.filter((b) => b.adType === 'square');

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col lg:flex-row font-sans text-[#0b1c30]">
      {/* NOTIFICAÇÃO TOAST */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#006d3f] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#7afbae]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* SIDEBAR ESQUERDA DO PAINEL ADMIN */}
      <aside className="w-full lg:w-72 bg-[#0E1B2B] text-white flex flex-col justify-between shrink-0 border-r border-white/10">
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/conexoes_logo_clean.png"
                alt="Conexões em FOCO"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <span className="px-2 py-0.5 rounded bg-[#23B26D]/20 text-[#7afbae] text-[10px] font-extrabold uppercase">
              CMS 2.0
            </span>
          </div>

          <nav className="p-4 space-y-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('dashboard');
                setIsEditingArticle(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#006d3f] text-white shadow-md'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Visão Geral & Capa</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('materias');
                setIsEditingArticle(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'materias'
                  ? 'bg-[#006d3f] text-white shadow-md'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Matérias & Editorias</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('conexoes');
                setIsEditingArticle(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'conexoes'
                  ? 'bg-[#006d3f] text-white shadow-md'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-[#7afbae]" />
                <span>As 3 Conexões</span>
              </div>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full">
                Emp • Lei • Eventos
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('anuncios');
                setIsEditingArticle(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'anuncios'
                  ? 'bg-[#006d3f] text-white shadow-md'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>Anúncios & Banners</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('leads');
                setIsEditingArticle(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'leads'
                  ? 'bg-[#006d3f] text-white shadow-md'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Leads & Anunciantes</span>
              </div>
              {leads.filter((l) => l.status === 'novo').length > 0 && (
                <span className="bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full">
                  {leads.filter((l) => l.status === 'novo').length}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="bg-white/5 rounded-xl p-3 text-[11px] text-gray-300 border border-white/10">
            <div className="flex items-center gap-1.5 text-[#7afbae] font-bold mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Cotações & Clima Automáticos</span>
            </div>
            <p className="text-[10px] text-gray-400">
              Sincronizados em tempo real via API (Soja, Milho, Boi, Dólar e Clima GO).
            </p>
          </div>

          <Link
            to="/"
            target="_blank"
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Ver Portal Ao Vivo</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-5 sm:p-8 overflow-y-auto">
        {/* SE ESTIVER COM O EDITOR ESTILO WORD ABERTO */}
        {isEditingArticle ? (
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md border border-gray-200 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingArticle(false)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#006d3f] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Editor Jornalístico Profissional (Estilo Word)
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] mt-0.5">
                    {articleForm.id ? 'Editar Publicação' : 'Nova Publicação no Portal'}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingArticle(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveArticleSubmit}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{saving ? 'Salvando...' : 'Publicar Agora'}</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveArticleSubmit} className="space-y-6">
              {/* LINHA 1: TIPO DE PUBLICAÇÃO, EDITORIA E AMBIENTE ESPECIAL (CONEXÃO) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#f8fafc] p-4 rounded-2xl border border-gray-200">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Formato da Publicação
                  </label>
                  <select
                    value={articleForm.contentType}
                    onChange={(e) =>
                      setArticleForm((prev) => ({
                        ...prev,
                        contentType: e.target.value as ContentType,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-bold text-[#0b1c30]"
                  >
                    <option value="materia">📰 Matéria Jornalística</option>
                    <option value="artigo">✒️ Artigo de Opinião / Coluna</option>
                    <option value="publi">📢 Publieditorial (Patrocinado)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Editoria Principal (6 Categorias)
                  </label>
                  <select
                    value={articleForm.category}
                    onChange={(e) =>
                      setArticleForm((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-bold text-[#0b1c30]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Vincular a Ambiente Especial (Conexões)
                  </label>
                  <select
                    value={articleForm.hubType || ''}
                    onChange={(e) =>
                      setArticleForm((prev) => ({
                        ...prev,
                        hubType: (e.target.value || null) as any,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-bold text-[#006d3f]"
                  >
                    <option value="">Nenhum (Apenas Editoria Normal)</option>
                    <option value="empresarial">🏢 Conexão Empresarial (Hub B2B)</option>
                    <option value="lei">⚖️ Conexão com a Lei (Jurídico)</option>
                  </select>
                </div>
              </div>

              {/* LINHA 2: TÍTULO E SUBTÍTULO */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Título Principal da Matéria / Artigo *
                  </label>
                  <input
                    type="text"
                    required
                    value={articleForm.title}
                    onChange={(e) =>
                      setArticleForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Ex: O agro impulsiona o desenvolvimento de Goiás com safra histórica"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-lg font-extrabold text-[#0b1c30] focus:outline-none focus:border-[#006d3f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Subtítulo / Linha Fina (Resumo abaixo do título)
                  </label>
                  <textarea
                    rows={2}
                    value={articleForm.subtitle || ''}
                    onChange={(e) =>
                      setArticleForm((prev) => ({ ...prev, subtitle: e.target.value }))
                    }
                    placeholder="Resumo de 1 ou 2 linhas que aparece abaixo da manchete..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-700 focus:outline-none focus:border-[#006d3f]"
                  />
                </div>
              </div>

              {/* LINHA 3: UPLOAD DA FOTO DE CAPA + POSIÇÃO NA HOME */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#f8fafc] p-5 rounded-2xl border border-gray-200">
                <div className="lg:col-span-7 space-y-3">
                  <label className="block text-xs font-bold uppercase text-gray-700">
                    Foto de Capa Principal (Subir do Computador ou Link)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={articleForm.imageUrl}
                      onChange={(e) =>
                        setArticleForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                      }
                      placeholder="https://... ou clique em Subir Foto de Capa"
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-xs"
                    />
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleUploadCoverImage}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={uploadingCover}
                      onClick={() => coverInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-[#0E1B2B] hover:bg-[#1a2f4a] text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
                    >
                      {uploadingCover ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4 text-[#7afbae]" />
                      )}
                      <span>{uploadingCover ? 'Enviando...' : 'Subir Foto de Capa'}</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={articleForm.imageAlt || ''}
                    onChange={(e) =>
                      setArticleForm((prev) => ({ ...prev, imageAlt: e.target.value }))
                    }
                    placeholder="Legenda da foto de capa (Ex: Colheitadeira em lavoura de Rio Verde)"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 bg-white text-xs"
                  />

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Autor / Redação
                      </label>
                      <input
                        type="text"
                        value={articleForm.author}
                        onChange={(e) =>
                          setArticleForm((prev) => ({ ...prev, author: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Tempo de Leitura
                      </label>
                      <input
                        type="text"
                        value={articleForm.readTime}
                        onChange={(e) =>
                          setArticleForm((prev) => ({ ...prev, readTime: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                  {articleForm.imageUrl && (
                    <div className="h-36 w-full rounded-xl overflow-hidden border border-gray-300 bg-gray-100 relative">
                      <img
                        src={articleForm.imageUrl}
                        alt="Preview da Capa"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                        Preview da Capa
                      </span>
                    </div>
                  )}

                  <div className="space-y-2 bg-white p-3 rounded-xl border border-gray-200">
                    <label className="flex items-center gap-2 text-xs font-bold text-[#0b1c30] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(articleForm.isMainLead)}
                        onChange={(e) =>
                          setArticleForm((prev) => ({
                            ...prev,
                            isMainLead: e.target.checked,
                            isSecondaryLead: e.target.checked ? false : prev.isSecondaryLead,
                          }))
                        }
                        className="w-4 h-4 accent-[#006d3f]"
                      />
                      <span>⭐ Definir como MANCHETE PRINCIPAL da Capa (Hero)</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(articleForm.isSecondaryLead)}
                        onChange={(e) =>
                          setArticleForm((prev) => ({
                            ...prev,
                            isSecondaryLead: e.target.checked,
                            isMainLead: e.target.checked ? false : prev.isMainLead,
                          }))
                        }
                        className="w-4 h-4 accent-[#006d3f]"
                      />
                      <span>📌 Definir como Destaque Secundário da Capa</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* DADOS DO COLUNISTA (SE FOR ARTIGO OU CONEXÃO COM A LEI) */}
              {(articleForm.contentType === 'artigo' || articleForm.hubType === 'lei') && (
                <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-950 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-indigo-700" />
                      Dados do Colunista / Especialista (Conexão com a Lei ou Opinião)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-indigo-950 mb-1">
                        Nome do Colunista / Advogado(a)
                      </label>
                      <input
                        type="text"
                        value={articleForm.columnist?.name || ''}
                        onChange={(e) =>
                          setArticleForm((prev) => ({
                            ...prev,
                            columnist: {
                              name: e.target.value,
                              role: prev.columnist?.role || '',
                              bio: prev.columnist?.bio || '',
                              avatarUrl: prev.columnist?.avatarUrl || '',
                            },
                          }))
                        }
                        placeholder="Ex: Dra. Camila Nogueira"
                        className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-indigo-950 mb-1">
                        Cargo / Especialidade / OAB
                      </label>
                      <input
                        type="text"
                        value={articleForm.columnist?.role || ''}
                        onChange={(e) =>
                          setArticleForm((prev) => ({
                            ...prev,
                            columnist: {
                              name: prev.columnist?.name || '',
                              role: e.target.value,
                              bio: prev.columnist?.bio || '',
                              avatarUrl: prev.columnist?.avatarUrl || '',
                            },
                          }))
                        }
                        placeholder="Ex: Especialista em Direito Agrário & Tributário"
                        className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-indigo-950 mb-1">
                        Foto do Colunista (Avatar)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={articleForm.columnist?.avatarUrl || ''}
                          onChange={(e) =>
                            setArticleForm((prev) => ({
                              ...prev,
                              columnist: {
                                name: prev.columnist?.name || '',
                                role: prev.columnist?.role || '',
                                bio: prev.columnist?.bio || '',
                                avatarUrl: e.target.value,
                              },
                            }))
                          }
                          placeholder="URL ou Subir Foto"
                          className="flex-1 px-3 py-2 rounded-xl border border-indigo-200 bg-white text-xs"
                        />
                        <input
                          ref={avatarInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleUploadAvatarImage}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => avatarInputRef.current?.click()}
                          disabled={uploadingAvatar}
                          className="px-3 py-2 rounded-xl bg-indigo-900 text-white text-xs font-bold shrink-0"
                        >
                          {uploadingAvatar ? '...' : 'Subir Foto'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-indigo-950 mb-1">
                      Minibiografia do Colunista (Aparece no rodapé do artigo)
                    </label>
                    <input
                      type="text"
                      value={articleForm.columnist?.bio || ''}
                      onChange={(e) =>
                        setArticleForm((prev) => ({
                          ...prev,
                          columnist: {
                            name: prev.columnist?.name || '',
                            role: prev.columnist?.role || '',
                            avatarUrl: prev.columnist?.avatarUrl || '',
                            bio: e.target.value,
                          },
                        }))
                      }
                      placeholder="Ex: Sócia fundadora do escritório..., assessora jurídica de cooperativas em Goiás."
                      className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white text-xs"
                    />
                  </div>
                </div>
              )}

              {/* DADOS DO PATROCINADOR (SE FOR PUBLIEDITORIAL) */}
              {articleForm.contentType === 'publi' && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                    📢 Dados do Patrocinador (Publieditorial / Informe Publicitário)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-amber-900 mb-1">
                        Nome da Empresa / Marca Patrocinadora
                      </label>
                      <input
                        type="text"
                        value={articleForm.sponsor?.name || ''}
                        onChange={(e) =>
                          setArticleForm((prev) => ({
                            ...prev,
                            sponsor: {
                              name: e.target.value,
                              brandColor: prev.sponsor?.brandColor || '#059669',
                              disclaimer:
                                prev.sponsor?.disclaimer ||
                                'Conteúdo Patrocinado • Informe Publicitário',
                            },
                          }))
                        }
                        placeholder="Ex: COMIGO Cooperativa / Centro Médico Vitalis"
                        className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-white text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-amber-900 mb-1">
                        Selo / Aviso de Rodapé
                      </label>
                      <input
                        type="text"
                        value={
                          articleForm.sponsor?.disclaimer ||
                          'Conteúdo Patrocinado • Informe Publicitário'
                        }
                        onChange={(e) =>
                          setArticleForm((prev) => ({
                            ...prev,
                            sponsor: {
                              name: prev.sponsor?.name || '',
                              brandColor: prev.sponsor?.brandColor || '#059669',
                              disclaimer: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* EDITOR RICO ESTILO WORD */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-[#0b1c30]">
                    Corpo da Publicação (Editor Visual Estilo Word — Títulos, Fontes A+/A-, Cores e Fotos no Texto)
                  </label>
                </div>
                <RichTextEditor
                  value={articleForm.contentHtml || ''}
                  onChange={(html, paragraphs) =>
                    setArticleForm((prev) => ({
                      ...prev,
                      contentHtml: html,
                      content: paragraphs,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsEditingArticle(false)}
                  className="px-5 py-3 rounded-xl border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Salvando no Supabase...' : 'Salvar e Publicar no Portal'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* ABA 1: VISÃO GERAL & CAPA */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#006d3f]">
                      Painel de Controle Oficial
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30]">
                      Bem-vindo ao CMS Conexões em FOCO
                    </h1>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => openNewArticleEditor({ contentType: 'materia' })}
                      className="px-4 py-2.5 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nova Matéria</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('conexoes');
                        setConexaoSubTab('lei');
                        openNewArticleEditor({ contentType: 'artigo', hubType: 'lei' });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#0E1B2B] hover:bg-[#1a2f4a] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                    >
                      <Scale className="w-4 h-4 text-[#7afbae]" />
                      <span>Novo Artigo (Lei / Empresarial)</span>
                    </button>
                  </div>
                </div>

                {/* CARDS DE INDICADORES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
                    <div className="text-xs font-bold uppercase text-gray-400">
                      Total de Publicações
                    </div>
                    <div className="text-3xl font-extrabold text-[#0b1c30] mt-1">
                      {articles.length}
                    </div>
                    <div className="text-xs text-[#006d3f] font-semibold mt-1">
                      Matérias, Artigos e Publis no ar
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
                    <div className="text-xs font-bold uppercase text-gray-400">
                      As 3 Conexões Especiais
                    </div>
                    <div className="text-3xl font-extrabold text-[#006d3f] mt-1">
                      {empresarialArticles.length + leiArticles.length + events.length}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {empresarialArticles.length} Emp • {leiArticles.length} Lei • {events.length}{' '}
                      Eventos
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
                    <div className="text-xs font-bold uppercase text-gray-400">
                      Banners Publicitários
                    </div>
                    <div className="text-3xl font-extrabold text-[#004E86] mt-1">
                      {banners.filter((b) => b.isActive).length}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {leaderboardBanners.length} Topo • {squareBanners.length} Quadrados 300x300
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
                    <div className="text-xs font-bold uppercase text-gray-400">
                      Contatos / Mídia Kit
                    </div>
                    <div className="text-3xl font-extrabold text-amber-600 mt-1">
                      {leads.length}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Interessados em anunciar
                    </div>
                  </div>
                </div>

                {/* DESTAQUES ATUAIS DA CAPA (HERO) */}
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h2 className="text-lg font-extrabold text-[#0b1c30] flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                        <span>Configuração Atual da Capa Principal (Hero)</span>
                      </h2>
                      <p className="text-xs text-gray-500">
                        Veja qual notícia está em destaque máximo na primeira dobra do site
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('materias')}
                      className="text-xs font-bold text-[#006d3f] hover:underline"
                    >
                      Gerenciar todas as matérias &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {mainFeaturedArticle && (
                      <div className="lg:col-span-2 bg-gradient-to-br from-[#0E1B2B] to-[#162B42] text-white rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center">
                        <img
                          src={mainFeaturedArticle.imageUrl}
                          alt={mainFeaturedArticle.title}
                          className="w-full sm:w-44 h-32 object-cover rounded-xl shrink-0"
                        />
                        <div className="flex-1">
                          <span className="inline-block px-2.5 py-0.5 rounded bg-[#23B26D] text-white text-[10px] font-extrabold uppercase mb-2">
                            ⭐ MANCHETE PRINCIPAL DA CAPA
                          </span>
                          <h3 className="text-base font-extrabold leading-snug mb-1">
                            {mainFeaturedArticle.title}
                          </h3>
                          <p className="text-xs text-gray-300 line-clamp-2 mb-3">
                            {mainFeaturedArticle.subtitle}
                          </p>
                          <button
                            type="button"
                            onClick={() => openEditArticleEditor(mainFeaturedArticle)}
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Editar Manchete</span>
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="text-xs font-extrabold uppercase text-gray-500">
                        📌 2 Destaques Secundários da Capa:
                      </div>
                      {secondaryLeadArticles.map((sec) => (
                        <div
                          key={sec.id}
                          className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase text-[#006d3f]">
                              {sec.category}
                            </span>
                            <h4 className="text-xs font-bold text-[#0b1c30] truncate">
                              {sec.title}
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => openEditArticleEditor(sec)}
                            className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-600 shrink-0"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ABA 2: MATÉRIAS & EDITORIAS */}
            {activeTab === 'materias' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-extrabold text-[#0b1c30]">
                      Matérias, Artigos & Publieditoriais
                    </h1>
                    <p className="text-xs text-gray-500">
                      Crie publicações com o Editor Estilo Word, suba imagens e escolha a Manchete Principal da Capa
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openNewArticleEditor()}
                    className="px-5 py-3 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Criar Nova Publicação</span>
                  </button>
                </div>

                {/* FILTROS */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar por título ou palavra-chave..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 text-xs"
                    />
                  </div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-bold bg-white"
                  >
                    <option value="todas">Todas as 6 Editorias</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* LISTA DE MATÉRIAS */}
                <div className="space-y-3">
                  {filteredArticlesList.map((art) => (
                    <div
                      key={art.id}
                      className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          className="w-20 h-16 rounded-xl object-cover shrink-0 bg-gray-100"
                        />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#006d3f] text-[10px] font-extrabold uppercase">
                              {art.category}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-bold uppercase">
                              {art.contentType === 'publi'
                                ? '📢 Publi'
                                : art.contentType === 'artigo'
                                ? '✒️ Artigo'
                                : '📰 Matéria'}
                            </span>
                            {art.hubType === 'empresarial' && (
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-bold">
                                🏢 Conexão Empresarial
                              </span>
                            )}
                            {art.hubType === 'lei' && (
                              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 text-[10px] font-bold">
                                ⚖️ Conexão com a Lei
                              </span>
                            )}
                            {art.isMainLead && (
                              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-extrabold">
                                ⭐ Manchete Principal
                              </span>
                            )}
                            {art.isSecondaryLead && (
                              <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 text-[10px] font-bold">
                                📌 Secundária da Capa
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm font-extrabold text-[#0b1c30] truncate">
                            {art.title}
                          </h3>
                          <p className="text-xs text-gray-400">
                            Por {art.author} • {art.publishedAt}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0 self-end md:self-center">
                        {!art.isMainLead && (
                          <button
                            type="button"
                            onClick={async () => {
                              await setMainLeadArticle(art.id);
                              showToast('Definida como Manchete Principal da Capa!');
                            }}
                            title="Tornar Manchete Principal"
                            className="px-2.5 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-bold flex items-center gap-1"
                          >
                            <Star className="w-3.5 h-3.5" />
                            <span>Manchete</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={async () => {
                            await toggleSecondaryLeadArticle(art.id);
                            showToast('Status de Destaque Secundário atualizado!');
                          }}
                          className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-bold ${
                            art.isSecondaryLead
                              ? 'bg-sky-600 text-white border-sky-600'
                              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          2º Destaque
                        </button>

                        <Link
                          to={`/materia/${art.id}`}
                          target="_blank"
                          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
                          title="Ver no Portal"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => openEditArticleEditor(art)}
                          className="px-3 py-1.5 rounded-lg bg-[#0E1B2B] hover:bg-[#1a2f4a] text-white text-xs font-bold flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </button>

                        <button
                          type="button"
                          onClick={async () => {
                            if (window.confirm(`Deseja excluir "${art.title}"?`)) {
                              await deleteArticle(art.id);
                              showToast('Publicação removida.');
                            }
                          }}
                          className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ABA 3: AS 3 CONEXÕES ESPECIAIS (EMPRESARIAL, LEI E AGENDA DE EVENTOS) */}
            {activeTab === 'conexoes' && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#006d3f]">
                    Ambientes Especiais do Portal
                  </span>
                  <h1 className="text-2xl font-extrabold text-[#0b1c30]">
                    Gestão das 3 Conexões Especiais
                  </h1>
                  <p className="text-xs text-gray-500">
                    Gerencie separadamente o Hub Conexão Empresarial, os Artigos da Conexão com a Lei e a Agenda de Eventos
                  </p>
                </div>

                {/* SELETOR DAS 3 CONEXÕES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setConexaoSubTab('empresarial')}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                      conexaoSubTab === 'empresarial'
                        ? 'bg-[#0E1B2B] text-white border-[#0E1B2B] shadow-md'
                        : 'bg-white text-[#0b1c30] border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-[#23B26D]" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold">1. Conexão Empresarial</div>
                      <div className="text-[11px] opacity-75">
                        Cases B2B, Indústrias & Negócios ({empresarialArticles.length})
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConexaoSubTab('lei')}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                      conexaoSubTab === 'lei'
                        ? 'bg-[#006d3f] text-white border-[#006d3f] shadow-md'
                        : 'bg-white text-[#0b1c30] border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Scale className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold">2. Conexão com a Lei</div>
                      <div className="text-[11px] opacity-75">
                        Colunas Jurídicas & Advogados ({leiArticles.length})
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConexaoSubTab('eventos')}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                      conexaoSubTab === 'eventos'
                        ? 'bg-[#004E86] text-white border-[#004E86] shadow-md'
                        : 'bg-white text-[#0b1c30] border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-sky-300" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold">3. Agenda de Eventos</div>
                      <div className="text-[11px] opacity-75">
                        Feiras, Congressos & Encontros ({events.length})
                      </div>
                    </div>
                  </button>
                </div>

                {/* CONTEÚDO SUB-ABA: CONEXÃO EMPRESARIAL */}
                {conexaoSubTab === 'empresarial' && (
                  <div className="bg-white rounded-3xl p-6 border border-gray-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                      <div>
                        <h3 className="text-lg font-extrabold text-[#0b1c30]">
                          🏢 Publicações da Conexão Empresarial
                        </h3>
                        <p className="text-xs text-gray-500">
                          Aparecem na seção Conexões Especiais da Home e na página /hub/empresarial
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          openNewArticleEditor({
                            contentType: 'materia',
                            hubType: 'empresarial',
                            category: 'Economia',
                          })
                        }
                        className="px-4 py-2.5 rounded-xl bg-[#0E1B2B] hover:bg-[#1a2f4a] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4 text-[#7afbae]" />
                        <span>+ Publicar em Conexão Empresarial</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {empresarialArticles.map((art) => (
                        <div
                          key={art.id}
                          className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={art.imageUrl}
                              alt={art.title}
                              className="w-16 h-14 rounded-xl object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-[#0b1c30] truncate">
                                {art.title}
                              </h4>
                              <p className="text-xs text-gray-500 truncate">{art.subtitle}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => openEditArticleEditor(art)}
                              className="px-3 py-1.5 rounded-lg bg-[#0E1B2B] text-white text-xs font-bold"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteArticle(art.id)}
                              className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CONTEÚDO SUB-ABA: CONEXÃO COM A LEI */}
                {conexaoSubTab === 'lei' && (
                  <div className="bg-white rounded-3xl p-6 border border-gray-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                      <div>
                        <h3 className="text-lg font-extrabold text-[#0b1c30]">
                          ⚖️ Artigos & Colunas da Conexão com a Lei
                        </h3>
                        <p className="text-xs text-gray-500">
                          Artigos jurídicos com foto do advogado/colunista, cargo e biografia (/hub/lei)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          openNewArticleEditor({
                            contentType: 'artigo',
                            hubType: 'lei',
                            category: 'Política',
                          })
                        }
                        className="px-4 py-2.5 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Novo Artigo Jurídico (Conexão com a Lei)</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {leiArticles.map((art) => (
                        <div
                          key={art.id}
                          className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={art.columnist?.avatarUrl || art.imageUrl}
                              alt={art.title}
                              className="w-12 h-12 rounded-full object-cover border-2 border-[#006d3f] shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold text-[#006d3f] uppercase">
                                {art.columnist?.name || art.author} • {art.columnist?.role}
                              </span>
                              <h4 className="text-sm font-bold text-[#0b1c30] truncate">
                                {art.title}
                              </h4>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => openEditArticleEditor(art)}
                              className="px-3 py-1.5 rounded-lg bg-[#006d3f] text-white text-xs font-bold"
                            >
                              Editar Artigo
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteArticle(art.id)}
                              className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CONTEÚDO SUB-ABA: AGENDA DE EVENTOS */}
                {conexaoSubTab === 'eventos' && (
                  <div className="bg-white rounded-3xl p-6 border border-gray-200 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                      <div>
                        <h3 className="text-lg font-extrabold text-[#0b1c30]">
                          📅 Calendário Oficial da Agenda de Eventos
                        </h3>
                        <p className="text-xs text-gray-500">
                          Gerencie feiras agropecuárias, congressos e encontros em Goiás
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEventForm({
                            id: '',
                            title: '',
                            category: 'Agro',
                            date: '',
                            time: '08:00 às 18:00',
                            location: '',
                            city: 'Rio Verde - GO',
                            imageUrl:
                              'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
                            description: '',
                          });
                          setIsEditingEvent(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-[#004E86] hover:bg-[#003963] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Cadastrar Novo Evento</span>
                      </button>
                    </div>

                    {isEditingEvent && (
                      <form
                        onSubmit={handleSaveEventSubmit}
                        className="bg-[#f8fafc] p-5 rounded-2xl border border-gray-200 space-y-4"
                      >
                        <h4 className="text-sm font-extrabold text-[#0b1c30]">
                          {eventForm.id ? 'Editar Evento' : 'Novo Evento na Agenda'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              Nome do Evento *
                            </label>
                            <input
                              type="text"
                              required
                              value={eventForm.title}
                              onChange={(e) =>
                                setEventForm((prev) => ({ ...prev, title: e.target.value }))
                              }
                              placeholder="Ex: Tecnoshow Comigo 2026"
                              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 bg-white text-xs font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              Categoria
                            </label>
                            <select
                              value={eventForm.category}
                              onChange={(e) =>
                                setEventForm((prev) => ({
                                  ...prev,
                                  category: e.target.value as any,
                                }))
                              }
                              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 bg-white text-xs font-bold"
                            >
                              <option value="Agro">Agro</option>
                              <option value="Negócios">Negócios</option>
                              <option value="Institucional">Institucional</option>
                              <option value="Cultura">Cultura</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              Data (Ex: 07 a 11 de Abril)
                            </label>
                            <input
                              type="text"
                              required
                              value={eventForm.date}
                              onChange={(e) =>
                                setEventForm((prev) => ({ ...prev, date: e.target.value }))
                              }
                              className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              Horário
                            </label>
                            <input
                              type="text"
                              value={eventForm.time}
                              onChange={(e) =>
                                setEventForm((prev) => ({ ...prev, time: e.target.value }))
                              }
                              className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              Local / Auditório
                            </label>
                            <input
                              type="text"
                              value={eventForm.location}
                              onChange={(e) =>
                                setEventForm((prev) => ({ ...prev, location: e.target.value }))
                              }
                              className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              Cidade / UF
                            </label>
                            <input
                              type="text"
                              value={eventForm.city}
                              onChange={(e) =>
                                setEventForm((prev) => ({ ...prev, city: e.target.value }))
                              }
                              className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Imagem do Evento
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={eventForm.imageUrl}
                              onChange={(e) =>
                                setEventForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                              }
                              className="flex-1 px-3 py-2 rounded-xl border border-gray-300 bg-white text-xs"
                            />
                            <input
                              ref={eventImgInputRef}
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setUploadingEventImg(true);
                                const url = await uploadMediaFile(file, 'events');
                                setEventForm((prev) => ({ ...prev, imageUrl: url }));
                                setUploadingEventImg(false);
                              }}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => eventImgInputRef.current?.click()}
                              className="px-3 py-2 rounded-xl bg-[#0E1B2B] text-white text-xs font-bold"
                            >
                              {uploadingEventImg ? 'Enviando...' : 'Subir Foto'}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Descrição do Evento
                          </label>
                          <textarea
                            rows={2}
                            value={eventForm.description}
                            onChange={(e) =>
                              setEventForm((prev) => ({ ...prev, description: e.target.value }))
                            }
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-xs"
                          />
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsEditingEvent(false)}
                            className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#006d3f] text-white text-xs font-extrabold uppercase"
                          >
                            Salvar Evento
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {events.map((ev) => (
                        <div
                          key={ev.id}
                          className="rounded-2xl border border-gray-200 overflow-hidden bg-white flex flex-col justify-between"
                        >
                          <div>
                            <img
                              src={ev.imageUrl}
                              alt={ev.title}
                              className="w-full h-36 object-cover"
                            />
                            <div className="p-4">
                              <span className="text-[10px] font-bold uppercase text-[#006d3f] bg-emerald-50 px-2 py-0.5 rounded">
                                {ev.category} • {ev.date}
                              </span>
                              <h4 className="text-sm font-extrabold text-[#0b1c30] mt-1">
                                {ev.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {ev.location} — {ev.city}
                              </p>
                            </div>
                          </div>
                          <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEventForm(ev);
                                setIsEditingEvent(true);
                              }}
                              className="px-3 py-1 rounded-lg bg-[#0E1B2B] text-white text-xs font-bold"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteEvent(ev.id)}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ABA 4: ANÚNCIOS & BANNERS */}
            {activeTab === 'anuncios' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-extrabold text-[#0b1c30]">
                      Gestão de Anúncios & Banners Comerciais
                    </h1>
                    <p className="text-xs text-gray-500">
                      Gerencie os Superbanners Rotativos do Topo e os Banners Quadrados 300x300
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setBannerForm({
                        id: '',
                        adType: adSubTab,
                        brandName: '',
                        tag: 'PATROCÍNIO OFICIAL',
                        headline: '',
                        description: '',
                        ctaText: 'Saiba Mais',
                        targetUrl: '',
                        bgImage:
                          'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
                        logoUrl: '',
                        logoKey: 'conexoes',
                        ctaColor: 'bg-[#23B26D] hover:bg-[#1fa162] text-white',
                        gradientBg: 'from-[#00381e] via-[#004e28] to-[#0b2417]',
                        borderColor: 'border-[#23B26D]/50 hover:border-[#7afbae]',
                        displayOrder: banners.length + 1,
                        isActive: true,
                      });
                      setIsEditingBanner(true);
                    }}
                    className="px-5 py-3 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Novo Anúncio Comercial</span>
                  </button>
                </div>

                {/* SUB-ABAS DE FORMATO DE ANÚNCIO */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAdSubTab('leaderboard')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                      adSubTab === 'leaderboard'
                        ? 'bg-[#0E1B2B] text-white shadow'
                        : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >
                    Superbanners do Topo ({leaderboardBanners.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdSubTab('square')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                      adSubTab === 'square'
                        ? 'bg-[#0E1B2B] text-white shadow'
                        : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >
                    Banners Quadrados 300x300 ({squareBanners.length})
                  </button>
                </div>

                {/* MODAL DE CRIAÇÃO/EDIÇÃO DE BANNER */}
                {isEditingBanner && (
                  <form
                    onSubmit={handleSaveBannerSubmit}
                    className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-4"
                  >
                    <h3 className="text-base font-extrabold text-[#0b1c30]">
                      {bannerForm.id ? 'Editar Espaço Publicitário' : 'Novo Espaço Publicitário'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Formato do Banner
                        </label>
                        <select
                          value={bannerForm.adType}
                          onChange={(e) =>
                            setBannerForm((prev) => ({
                              ...prev,
                              adType: e.target.value as 'leaderboard' | 'square',
                            }))
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 bg-white text-xs font-bold"
                        >
                          <option value="leaderboard">Superbanner Horizontal (Topo)</option>
                          <option value="square">Banner Quadrado 300x300 (Vitrine & Lateral)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Nome da Empresa / Marca *
                        </label>
                        <input
                          type="text"
                          required
                          value={bannerForm.brandName}
                          onChange={(e) =>
                            setBannerForm((prev) => ({ ...prev, brandName: e.target.value }))
                          }
                          placeholder="Ex: COMIGO Cooperativa"
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Selo Superior (Tag)
                        </label>
                        <input
                          type="text"
                          value={bannerForm.tag}
                          onChange={(e) =>
                            setBannerForm((prev) => ({ ...prev, tag: e.target.value }))
                          }
                          placeholder="Ex: PATROCÍNIO OFICIAL"
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Frase Principal do Anúncio (Headline) *
                        </label>
                        <input
                          type="text"
                          required
                          value={bannerForm.headline}
                          onChange={(e) =>
                            setBannerForm((prev) => ({ ...prev, headline: e.target.value }))
                          }
                          placeholder="Ex: Safra 2026/2027 com Alta Produtividade"
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Descrição Curta / Subtítulo
                        </label>
                        <input
                          type="text"
                          value={bannerForm.description}
                          onChange={(e) =>
                            setBannerForm((prev) => ({ ...prev, description: e.target.value }))
                          }
                          placeholder="Ex: Soluções completas para o produtor rural."
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Texto do Botão (CTA)
                        </label>
                        <input
                          type="text"
                          value={bannerForm.ctaText}
                          onChange={(e) =>
                            setBannerForm((prev) => ({ ...prev, ctaText: e.target.value }))
                          }
                          placeholder="Ex: Conhecer Soluções"
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-bold"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Link de Destino ao Clicar (Site do Cliente ou WhatsApp)
                        </label>
                        <input
                          type="text"
                          value={bannerForm.targetUrl || ''}
                          onChange={(e) =>
                            setBannerForm((prev) => ({ ...prev, targetUrl: e.target.value }))
                          }
                          placeholder="https://... (deixe em branco para abrir o Mídia Kit)"
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Logo da Marca (Upload de Imagem ou Logo Pré-cadastrado)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={bannerForm.logoUrl || ''}
                            onChange={(e) =>
                              setBannerForm((prev) => ({ ...prev, logoUrl: e.target.value }))
                            }
                            placeholder="Suba uma logo ou escolha ao lado"
                            className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs"
                          />
                          <input
                            ref={bannerLogoInputRef}
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setUploadingBannerLogo(true);
                              const url = await uploadMediaFile(file, 'banners');
                              setBannerForm((prev) => ({ ...prev, logoUrl: url }));
                              setUploadingBannerLogo(false);
                            }}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => bannerLogoInputRef.current?.click()}
                            className="px-3 py-2 rounded-xl bg-[#0E1B2B] text-white text-xs font-bold"
                          >
                            {uploadingBannerLogo ? '...' : 'Subir Logo'}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Imagem de Fundo (Para Banner Quadrado 300x300)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={bannerForm.bgImage || ''}
                            onChange={(e) =>
                              setBannerForm((prev) => ({ ...prev, bgImage: e.target.value }))
                            }
                            placeholder="https://... ou Subir Imagem"
                            className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs"
                          />
                          <input
                            ref={bannerBgInputRef}
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setUploadingBannerBg(true);
                              const url = await uploadMediaFile(file, 'banners');
                              setBannerForm((prev) => ({ ...prev, bgImage: url }));
                              setUploadingBannerBg(false);
                            }}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => bannerBgInputRef.current?.click()}
                            className="px-3 py-2 rounded-xl bg-[#006d3f] text-white text-xs font-bold"
                          >
                            {uploadingBannerBg ? '...' : 'Subir Fundo'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingBanner(false)}
                        className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-[#006d3f] text-white text-xs font-extrabold uppercase"
                      >
                        Salvar Anúncio
                      </button>
                    </div>
                  </form>
                )}

                {/* LISTA DE BANNERS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(adSubTab === 'leaderboard' ? leaderboardBanners : squareBanners).map((ban) => (
                    <div
                      key={ban.id}
                      className={`p-5 rounded-2xl border bg-white flex flex-col justify-between gap-4 ${
                        ban.isActive ? 'border-gray-200' : 'border-gray-200 opacity-60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-emerald-50 text-[#006d3f]">
                            {ban.tag}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              ban.isActive
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {ban.isActive ? '● ATIVO NO AR' : '○ PAUSADO'}
                          </span>
                        </div>
                        <h4 className="text-base font-extrabold text-[#0b1c30]">{ban.brandName}</h4>
                        <p className="text-xs font-bold text-gray-700 mt-0.5">{ban.headline}</p>
                        <p className="text-xs text-gray-500 mt-1">{ban.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => toggleBannerActive(ban.id, !ban.isActive)}
                          className="text-xs font-bold flex items-center gap-1 text-gray-600 hover:text-[#0b1c30]"
                        >
                          <Power className="w-3.5 h-3.5" />
                          <span>{ban.isActive ? 'Pausar' : 'Ativar'}</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setBannerForm(ban);
                              setIsEditingBanner(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#0E1B2B] text-white text-xs font-bold"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteBanner(ban.id)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ABA 5: LEADS & ANUNCIANTES */}
            {activeTab === 'leads' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#0b1c30]">
                    Central de Leads Comerciais & Newsletter
                  </h1>
                  <p className="text-xs text-gray-500">
                    Empresas que solicitaram o Mídia Kit no portal e inscritos no Boletim VIP
                  </p>
                </div>

                {leads.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-[#0b1c30]">
                      Nenhum contato recebido ainda
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Assim que alguém preencher o formulário "Anuncie no Conexões em FOCO", aparecerá aqui.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-white rounded-2xl p-4 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#006d3f] text-[10px] font-extrabold uppercase">
                              {lead.leadType}
                            </span>
                            {lead.interest && (
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-bold">
                                Interesse: {lead.interest}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-extrabold text-[#0b1c30]">
                            {lead.name || lead.email || 'Contato do Portal'}{' '}
                            {lead.company ? `• ${lead.company}` : ''}
                          </h4>
                          <p className="text-xs text-gray-500">
                            Tel/WhatsApp: {lead.phone || '—'} {lead.email ? `• ${lead.email}` : ''}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {lead.phone && (
                            <a
                              href={`https://api.whatsapp.com/send?phone=55${lead.phone.replace(
                                /\D/g,
                                ''
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center gap-1.5"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Chamar no WhatsApp</span>
                            </a>
                          )}
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              updateLeadStatus(lead.id, e.target.value as any)
                            }
                            className="px-2.5 py-1.5 rounded-xl border border-gray-300 text-xs font-bold"
                          >
                            <option value="novo">🟡 Novo</option>
                            <option value="em_atendimento">🔵 Em Atendimento</option>
                            <option value="fechado">🟢 Fechado</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => deleteLead(lead.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};
