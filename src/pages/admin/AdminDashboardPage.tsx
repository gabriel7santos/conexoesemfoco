import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  Users,
  Plus,
  Edit3,
  Trash2,
  Star,
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
  Newspaper,
  Sparkles,
  ShieldCheck,
  Clock,
  MapPin,
  ChevronRight,
  Layers,
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

type AdminTab =
  | 'dashboard'
  | 'materias'
  | 'conexao_empresarial'
  | 'conexao_lei'
  | 'agenda_eventos'
  | 'anuncios'
  | 'leads';

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
      contentHtml: '<p>Comece a digitar o texto completo aqui...</p>',
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
      showToast('Evento salvo na Agenda Oficial de Goiás!');
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
  const newLeadsCount = leads.filter((l) => l.status === 'novo').length;

  const getPageTitle = () => {
    if (isEditingArticle) {
      return articleForm.id ? 'Editor de Publicação' : 'Nova Publicação Editorial';
    }
    switch (activeTab) {
      case 'dashboard':
        return 'Mesa de Redação & Visão Geral';
      case 'materias':
        return 'Matérias, Artigos & Editorias';
      case 'conexao_empresarial':
        return 'Conexão Empresarial • Hub B2B';
      case 'conexao_lei':
        return 'Conexão com a Lei • Colunas Jurídicas';
      case 'agenda_eventos':
        return 'Agenda Oficial de Eventos • Goiás';
      case 'anuncios':
        return 'Gestão Comercial & Banners';
      case 'leads':
        return 'Central de Leads & Mídia Kit';
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col lg:flex-row font-sans text-[#0b1c30] antialiased">
      {/* NOTIFICAÇÃO TOAST EXECUTIVA */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#08121E] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#23B26D]/40 flex items-center gap-3 text-xs font-bold tracking-wide animate-fade-in">
          <div className="w-6 h-6 rounded-full bg-[#23B26D]/20 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-[#7afbae]" />
          </div>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* SIDEBAR EXECUTIVA REFINADA */}
      <aside className="w-full lg:w-68 bg-[#08111D] text-white flex flex-col justify-between shrink-0 border-r border-white/10 select-none">
        <div>
          {/* BRAND HEADER */}
          <div className="px-6 py-5 border-b border-white/[0.07] flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/conexoes_logo_clean.png"
                alt="Conexões em FOCO"
                className="h-9 w-auto object-contain group-hover:opacity-90 transition-opacity"
              />
            </Link>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-[#7afbae] border border-emerald-500/25 text-[10px] font-extrabold uppercase tracking-wider">
              PRO
            </span>
          </div>

          {/* NAVEGAÇÃO CATEGORIZADA */}
          <div className="px-3.5 py-5 space-y-6">
            {/* GRUPO 1: REDAÇÃO & CAPA */}
            <div>
              <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Redação & Capa
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('dashboard');
                    setIsEditingArticle(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'dashboard' && !isEditingArticle
                      ? 'bg-gradient-to-r from-[#006d3f] to-[#00884f] text-white shadow-md shadow-emerald-950/50 font-bold'
                      : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span>Visão Geral & Capa</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('materias');
                    setIsEditingArticle(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'materias' && !isEditingArticle
                      ? 'bg-gradient-to-r from-[#006d3f] to-[#00884f] text-white shadow-md shadow-emerald-950/50 font-bold'
                      : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Newspaper className="w-4 h-4 shrink-0" />
                    <span>Matérias & Editorias</span>
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">
                    {articles.length}
                  </span>
                </button>
              </div>
            </div>

            {/* GRUPO 2: AMBIENTES CONEXÕES (OS 3 AMBIENTES SEPARADOS E LIMPOS) */}
            <div>
              <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-[#7afbae]/80">
                Ambientes Conexões
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('conexao_empresarial');
                    setIsEditingArticle(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'conexao_empresarial' && !isEditingArticle
                      ? 'bg-gradient-to-r from-[#006d3f] to-[#00884f] text-white shadow-md font-bold'
                      : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Conexão Empresarial</span>
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">
                    {empresarialArticles.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('conexao_lei');
                    setIsEditingArticle(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'conexao_lei' && !isEditingArticle
                      ? 'bg-gradient-to-r from-[#006d3f] to-[#00884f] text-white shadow-md font-bold'
                      : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Scale className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Conexão com a Lei</span>
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">
                    {leiArticles.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('agenda_eventos');
                    setIsEditingArticle(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'agenda_eventos' && !isEditingArticle
                      ? 'bg-gradient-to-r from-[#006d3f] to-[#00884f] text-white shadow-md font-bold'
                      : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Agenda de Eventos</span>
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">
                    {events.length}
                  </span>
                </button>
              </div>
            </div>

            {/* GRUPO 3: COMERCIAL & AUDIÊNCIA */}
            <div>
              <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Comercial & Mídia
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('anuncios');
                    setIsEditingArticle(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'anuncios' && !isEditingArticle
                      ? 'bg-gradient-to-r from-[#006d3f] to-[#00884f] text-white shadow-md font-bold'
                      : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Megaphone className="w-4 h-4 shrink-0" />
                    <span>Anúncios & Banners</span>
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">
                    {banners.filter((b) => b.isActive).length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('leads');
                    setIsEditingArticle(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'leads' && !isEditingArticle
                      ? 'bg-gradient-to-r from-[#006d3f] to-[#00884f] text-white shadow-md font-bold'
                      : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>Leads & Anunciantes</span>
                  </span>
                  {newLeadsCount > 0 ? (
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                      {newLeadsCount}
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                      {leads.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RODAPÉ DA SIDEBAR */}
        <div className="p-4 border-t border-white/[0.07] space-y-2.5 bg-[#050B14]">
          <div className="rounded-xl p-3 bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-2 text-[#7afbae] text-[11px] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#23B26D] animate-pulse" />
              <span>Cotações & Clima Ao Vivo</span>
            </div>
            <p className="text-[10.5px] text-slate-400 mt-1 leading-relaxed">
              Soja, Milho, Boi, Dólar e Clima GO atualizados automaticamente.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              target="_blank"
              className="py-2 px-3 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#7afbae]" />
              <span>Ver Site</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* COLUNA DIREITA: TOPBAR EXECUTIVA + CONTEÚDO */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR SUPERIOR DO PAINEL */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <span>Conexões em FOCO</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#006d3f]">Painel Editorial</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#006d3f] text-[11px] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Banco Supabase Conectado</span>
            </div>

            {!isEditingArticle && (
              <button
                type="button"
                onClick={() => openNewArticleEditor()}
                className="px-4 py-2.5 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Publicação</span>
              </button>
            )}
          </div>
        </header>

        {/* ÁREA PRINCIPAL */}
        <main className="flex-1 p-5 sm:p-8 max-w-7xl w-full mx-auto">
          {isEditingArticle ? (
            /* EDITOR ESTILO WORD COMPLETO */
            <div className="bg-white rounded-3xl shadow-xs border border-slate-200/90 p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditingArticle(false)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#006d3f] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                      Editor Jornalístico Estilo Word
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                      {articleForm.id ? 'Editando Publicação' : 'Redigir Nova Publicação'}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditingArticle(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveArticleSubmit}
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{saving ? 'Salvando...' : 'Salvar e Publicar'}</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveArticleSubmit} className="space-y-6">
                {/* CONFIGURAÇÕES DE CLASSIFICAÇÃO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                      Tipo de Conteúdo
                    </label>
                    <select
                      value={articleForm.contentType}
                      onChange={(e) =>
                        setArticleForm((prev) => ({
                          ...prev,
                          contentType: e.target.value as ContentType,
                        }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:border-[#006d3f]"
                    >
                      <option value="materia">📰 Matéria Jornalística</option>
                      <option value="artigo">✒️ Artigo de Opinião / Coluna</option>
                      <option value="publi">📢 Publieditorial (Conteúdo Patrocinado)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                      Editoria Oficial (6 Categorias)
                    </label>
                    <select
                      value={articleForm.category}
                      onChange={(e) =>
                        setArticleForm((prev) => ({ ...prev, category: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:border-[#006d3f]"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                      Ambiente Especial (Conexões)
                    </label>
                    <select
                      value={articleForm.hubType || ''}
                      onChange={(e) =>
                        setArticleForm((prev) => ({
                          ...prev,
                          hubType: (e.target.value || null) as any,
                        }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#006d3f] focus:outline-none focus:border-[#006d3f]"
                    >
                      <option value="">Apenas na Editoria Principal</option>
                      <option value="empresarial">🏢 Conexão Empresarial (Hub B2B)</option>
                      <option value="lei">⚖️ Conexão com a Lei (Artigos Jurídicos)</option>
                    </select>
                  </div>
                </div>

                {/* TÍTULO E SUBTÍTULO */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Manchete / Título Principal *
                    </label>
                    <input
                      type="text"
                      required
                      value={articleForm.title}
                      onChange={(e) =>
                        setArticleForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="Digite um título forte e impactante..."
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-lg font-extrabold text-slate-900 focus:outline-none focus:border-[#006d3f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Subtítulo / Linha Fina
                    </label>
                    <textarea
                      rows={2}
                      value={articleForm.subtitle || ''}
                      onChange={(e) =>
                        setArticleForm((prev) => ({ ...prev, subtitle: e.target.value }))
                      }
                      placeholder="Resumo complementar que aparece logo abaixo da manchete..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-700 focus:outline-none focus:border-[#006d3f]"
                    />
                  </div>
                </div>

                {/* CAPA + POSICIONAMENTO NA HOME */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                  <div className="lg:col-span-7 space-y-3">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Imagem de Capa da Publicação
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={articleForm.imageUrl}
                        onChange={(e) =>
                          setArticleForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                        }
                        placeholder="Cole o link da imagem ou envie do computador..."
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs"
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
                        className="px-4 py-2.5 rounded-xl bg-[#08111D] hover:bg-[#162B42] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        {uploadingCover ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4 text-[#7afbae]" />
                        )}
                        <span>{uploadingCover ? 'Enviando...' : 'Subir Capa do PC'}</span>
                      </button>
                    </div>

                    <input
                      type="text"
                      value={articleForm.imageAlt || ''}
                      onChange={(e) =>
                        setArticleForm((prev) => ({ ...prev, imageAlt: e.target.value }))
                      }
                      placeholder="Legenda/crédito da foto de capa (Ex: Safra em Rio Verde - Foto: Divulgação)"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                    />

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Autor / Assinatura
                        </label>
                        <input
                          type="text"
                          value={articleForm.author}
                          onChange={(e) =>
                            setArticleForm((prev) => ({ ...prev, author: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Tempo de Leitura
                        </label>
                        <input
                          type="text"
                          value={articleForm.readTime}
                          onChange={(e) =>
                            setArticleForm((prev) => ({ ...prev, readTime: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                    {articleForm.imageUrl && (
                      <div className="h-36 w-full rounded-xl overflow-hidden border border-slate-300 bg-slate-200 relative">
                        <img
                          src={articleForm.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] px-2.5 py-0.5 rounded-md font-bold">
                          Preview da Capa
                        </span>
                      </div>
                    )}

                    <div className="space-y-2 bg-white p-3.5 rounded-xl border border-slate-200">
                      <label className="flex items-center gap-2.5 text-xs font-bold text-slate-900 cursor-pointer">
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
                        <span>⭐ Destacar como MANCHETE PRINCIPAL da Capa</span>
                      </label>

                      <label className="flex items-center gap-2.5 text-xs font-bold text-slate-600 cursor-pointer">
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
                        <span>📌 Destacar nas 2 Matérias Secundárias da Capa</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* DADOS DO COLUNISTA (ARTIGO OU CONEXÃO COM A LEI) */}
                {(articleForm.contentType === 'artigo' || articleForm.hubType === 'lei') && (
                  <div className="bg-indigo-50/60 border border-indigo-200/80 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-950 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-indigo-700" />
                      Perfil do Colunista / Especialista Jurídico
                    </h3>

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
                          Especialidade / Cargo / OAB
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
                          placeholder="Ex: Especialista em Direito Agrário"
                          className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-indigo-950 mb-1">
                          Foto do Colunista
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
                            placeholder="Link ou Subir Foto"
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
                            className="px-3 py-2 rounded-xl bg-indigo-950 text-white text-xs font-bold shrink-0 cursor-pointer"
                          >
                            {uploadingAvatar ? '...' : 'Subir Foto'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-indigo-950 mb-1">
                        Biografia Resumida do Autor
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
                        placeholder="Resumo da trajetória profissional do colunista..."
                        className="w-full px-3 py-2 rounded-xl border border-indigo-200 bg-white text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* DADOS DO PATROCINADOR (SE FOR PUBLIEDITORIAL) */}
                {articleForm.contentType === 'publi' && (
                  <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                      📢 Identificação do Patrocinador (Informe Publicitário)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-amber-900 mb-1">
                          Empresa / Marca Patrocinadora
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
                          placeholder="Ex: COMIGO Cooperativa"
                          className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-white text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-amber-900 mb-1">
                          Selo de Transparência
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
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2">
                    Conteúdo Completo da Matéria (Editor Visual Estilo Word)
                  </label>
                  <RichTextEditor
                    value={articleForm.contentHtml || ''}
                    onChange={(html, paragraphs, readTime) =>
                      setArticleForm((prev) => ({
                        ...prev,
                        contentHtml: html,
                        content: paragraphs,
                        readTime: readTime || prev.readTime,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditingArticle(false)}
                    className="px-5 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-3 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Publicando...' : 'Publicar Agora no Portal'}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {/* ABA 1: VISÃO GERAL & MESA DE CAPA */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  {/* KPI CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div
                      onClick={() => setActiveTab('materias')}
                      className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                          Publicações no Ar
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#006d3f] flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Newspaper className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900">
                        {articles.length}
                      </div>
                      <div className="text-xs text-[#006d3f] font-semibold mt-1 flex items-center gap-1">
                        <span>6 Editorias Oficiais</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveTab('conexao_empresarial')}
                      className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                          Ambientes Conexões
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Layers className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900">
                        {empresarialArticles.length + leiArticles.length + events.length}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {empresarialArticles.length} Emp • {leiArticles.length} Lei •{' '}
                        {events.length} Eventos
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveTab('anuncios')}
                      className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                          Banners Ativos
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#004E86] flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Megaphone className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900">
                        {banners.filter((b) => b.isActive).length}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {leaderboardBanners.length} Superbanners • {squareBanners.length} Quadrados
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveTab('leads')}
                      className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                          Leads & Mídia Kit
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Users className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900">{leads.length}</div>
                      <div className="text-xs text-amber-700 font-semibold mt-1">
                        Solicitações comerciais
                      </div>
                    </div>
                  </div>

                  {/* MESA DE REDAÇÃO DA CAPA (HERO) */}
                  <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                          <h2 className="text-lg font-extrabold text-slate-900">
                            Destaques da Capa Principal (Primeira Dobra)
                          </h2>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Troque a Manchete Principal instantaneamente ou edite os destaques atuais
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">
                          Trocar Manchete:
                        </span>
                        <select
                          aria-label="Selecionar Manchete Principal"
                          value={mainFeaturedArticle?.id || ''}
                          onChange={async (e) => {
                            if (e.target.value) {
                              await setMainLeadArticle(e.target.value);
                              showToast('Manchete Principal da Capa atualizada!');
                            }
                          }}
                          className="px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-800 max-w-xs truncate"
                        >
                          {articles.map((a) => (
                            <option key={a.id} value={a.id}>
                              [{a.category}] {a.title.slice(0, 52)}...
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {mainFeaturedArticle && (
                        <div className="lg:col-span-7 bg-gradient-to-br from-[#08111D] via-[#0E1B2B] to-[#162B42] text-white rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-center shadow-md">
                          <img
                            src={mainFeaturedArticle.imageUrl}
                            alt={mainFeaturedArticle.title}
                            className="w-full sm:w-48 h-36 object-cover rounded-xl shrink-0 border border-white/10"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2.5 py-0.5 rounded-md bg-[#23B26D] text-white text-[10px] font-extrabold uppercase">
                                Manchete Principal
                              </span>
                              <span className="text-[11px] text-[#7afbae] font-bold">
                                {mainFeaturedArticle.category}
                              </span>
                            </div>
                            <h3 className="text-base font-extrabold leading-snug mb-1.5 line-clamp-2">
                              {mainFeaturedArticle.title}
                            </h3>
                            <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                              {mainFeaturedArticle.subtitle}
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => openEditArticleEditor(mainFeaturedArticle)}
                                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Editar no Editor Word</span>
                              </button>
                              <Link
                                to={`/materia/${mainFeaturedArticle.id}`}
                                target="_blank"
                                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs font-semibold text-slate-300"
                              >
                                Ver no Site ↗
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                          Destaques Secundários da Capa (Coluna Lateral)
                        </div>
                        {secondaryLeadArticles.map((sec) => (
                          <div
                            key={sec.id}
                            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={sec.imageUrl}
                                alt={sec.title}
                                className="w-14 h-12 rounded-lg object-cover shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="text-[10px] font-extrabold uppercase text-[#006d3f]">
                                  {sec.category}
                                </span>
                                <h4 className="text-xs font-bold text-slate-900 truncate">
                                  {sec.title}
                                </h4>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => openEditArticleEditor(sec)}
                              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 shrink-0 cursor-pointer"
                            >
                              Editar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ATALHOS RÁPIDOS DOS 3 AMBIENTES CONEXÕES */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-10 h-10 rounded-xl bg-[#0E1B2B] text-[#7afbae] flex items-center justify-center">
                            <Building2 className="w-5 h-5" />
                          </span>
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {empresarialArticles.length} publicações
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900">
                          Conexão Empresarial
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 mb-4">
                          Cases corporativos, indústrias, cooperativas e negócios B2B em Goiás.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab('conexao_empresarial')}
                          className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
                        >
                          Gerenciar
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            openNewArticleEditor({
                              contentType: 'materia',
                              hubType: 'empresarial',
                              category: 'Economia',
                            })
                          }
                          className="px-3.5 py-2 rounded-xl bg-[#0E1B2B] text-white text-xs font-bold cursor-pointer"
                        >
                          + Publicar
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-10 h-10 rounded-xl bg-[#006d3f] text-white flex items-center justify-center">
                            <Scale className="w-5 h-5" />
                          </span>
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#006d3f]">
                            {leiArticles.length} artigos
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900">
                          Conexão com a Lei
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 mb-4">
                          Colunas e análises jurídicas de advogados e especialistas convidados.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab('conexao_lei')}
                          className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
                        >
                          Gerenciar
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            openNewArticleEditor({
                              contentType: 'artigo',
                              hubType: 'lei',
                              category: 'Política',
                            })
                          }
                          className="px-3.5 py-2 rounded-xl bg-[#006d3f] text-white text-xs font-bold cursor-pointer"
                        >
                          + Novo Artigo
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-10 h-10 rounded-xl bg-[#004E86] text-white flex items-center justify-center">
                            <Calendar className="w-5 h-5" />
                          </span>
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-sky-50 text-[#004E86]">
                            {events.length} eventos
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900">
                          Agenda de Eventos
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 mb-4">
                          Calendário oficial de feiras agropecuárias, congressos e encontros.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab('agenda_eventos')}
                          className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
                        >
                          Ver Agenda
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('agenda_eventos');
                            setIsEditingEvent(true);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-[#004E86] text-white text-xs font-bold cursor-pointer"
                        >
                          + Evento
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA 2: MATÉRIAS & EDITORIAS */}
              {activeTab === 'materias' && (
                <div className="space-y-6">
                  {/* BARRA DE BUSCA E PÍLULAS DE EDITORIAS */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="relative flex-1 w-full">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Pesquisar por título, autor ou editoria..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#006d3f]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => openNewArticleEditor()}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Redigir Matéria</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {['todas', ...CATEGORIES].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                            categoryFilter === cat
                              ? 'bg-[#08111D] text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {cat === 'todas' ? 'Todas as Editorias' : cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* LISTAGEM DE PUBLICAÇÕES */}
                  <div className="space-y-3">
                    {filteredArticlesList.map((art) => (
                      <div
                        key={art.id}
                        className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            className="w-24 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                          />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#006d3f] text-[10px] font-extrabold uppercase">
                                {art.category}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                                {art.contentType === 'publi'
                                  ? 'Publieditorial'
                                  : art.contentType === 'artigo'
                                  ? 'Artigo de Opinião'
                                  : 'Matéria'}
                              </span>
                              {art.hubType === 'empresarial' && (
                                <span className="px-2 py-0.5 rounded-md bg-slate-900 text-[#7afbae] text-[10px] font-bold">
                                  Conexão Empresarial
                                </span>
                              )}
                              {art.hubType === 'lei' && (
                                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 text-[10px] font-bold">
                                  Conexão com a Lei
                                </span>
                              )}
                              {art.isMainLead && (
                                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-extrabold">
                                  ⭐ Manchete Principal
                                </span>
                              )}
                              {art.isSecondaryLead && (
                                <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 text-[10px] font-bold">
                                  📌 Destaque Secundário
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm font-extrabold text-slate-900 truncate">
                              {art.title}
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                              Por {art.author} • {art.publishedAt} • {art.readTime}
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
                              className="px-2.5 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Star className="w-3.5 h-3.5" />
                              <span>Manchete</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={async () => {
                              await toggleSecondaryLeadArticle(art.id);
                              showToast('Destaque Secundário atualizado!');
                            }}
                            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-bold cursor-pointer ${
                              art.isSecondaryLead
                                ? 'bg-sky-600 text-white border-sky-600'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            2º Destaque
                          </button>

                          <Link
                            to={`/materia/${art.id}`}
                            target="_blank"
                            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                            title="Abrir no Portal"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => openEditArticleEditor(art)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#08111D] hover:bg-[#162B42] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Editar</span>
                          </button>

                          <button
                            type="button"
                            onClick={async () => {
                              if (window.confirm(`Deseja excluir "${art.title}"?`)) {
                                await deleteArticle(art.id);
                                showToast('Publicação excluída.');
                              }
                            }}
                            className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
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

              {/* AMBIENTE 1: CONEXÃO EMPRESARIAL */}
              {activeTab === 'conexao_empresarial' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#08111D] via-[#0E1B2B] to-[#162B42] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-[#7afbae]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7afbae]">
                          Ambiente Especial B2B
                        </span>
                        <h2 className="text-xl sm:text-2xl font-extrabold mt-0.5">
                          Conexão Empresarial
                        </h2>
                        <p className="text-xs text-slate-300 mt-1 max-w-xl">
                          Publique reportagens sobre indústrias, cooperativas, investimentos e histórias de sucesso empresarial em Goiás.
                        </p>
                      </div>
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
                      className="px-5 py-3 rounded-xl bg-[#23B26D] hover:bg-[#1fa162] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-lg cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nova Matéria Empresarial</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {empresarialArticles.map((art) => (
                      <div
                        key={art.id}
                        className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            className="w-24 h-20 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-extrabold uppercase text-[#006d3f] bg-emerald-50 px-2 py-0.5 rounded">
                              {art.category} • Hub Empresarial
                            </span>
                            <h3 className="text-sm font-extrabold text-slate-900 mt-1 line-clamp-2">
                              {art.title}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                              {art.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <span className="text-[11px] text-slate-400">{art.publishedAt}</span>
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/materia/${art.id}`}
                              target="_blank"
                              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                            >
                              Ver
                            </Link>
                            <button
                              type="button"
                              onClick={() => openEditArticleEditor(art)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#08111D] text-white text-xs font-bold cursor-pointer"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteArticle(art.id)}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
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

              {/* AMBIENTE 2: CONEXÃO COM A LEI */}
              {activeTab === 'conexao_lei' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#004d2c] via-[#006d3f] to-[#044028] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                        <Scale className="w-6 h-6 text-amber-300" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                          Colunas Jurídicas & Compliance
                        </span>
                        <h2 className="text-xl sm:text-2xl font-extrabold mt-0.5">
                          Conexão com a Lei
                        </h2>
                        <p className="text-xs text-emerald-100 mt-1 max-w-xl">
                          Publique artigos assinados por advogados e juristas (Direito Agrário, Tributário, Trabalhista e Empresarial) com foto e biografia do autor.
                        </p>
                      </div>
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
                      className="px-5 py-3 rounded-xl bg-white text-[#006d3f] hover:bg-emerald-50 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-lg cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Novo Artigo Jurídico</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {leiArticles.map((art) => (
                      <div
                        key={art.id}
                        className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={art.columnist?.avatarUrl || art.imageUrl}
                            alt={art.title}
                            className="w-14 h-14 rounded-full object-cover border-2 border-[#006d3f] shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-extrabold uppercase text-[#006d3f]">
                              {art.columnist?.name || art.author} •{' '}
                              {art.columnist?.role || 'Colunista Jurídico'}
                            </span>
                            <h3 className="text-sm font-extrabold text-slate-900 mt-1 line-clamp-2">
                              {art.title}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                              {art.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <span className="text-[11px] text-slate-400">{art.publishedAt}</span>
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/materia/${art.id}`}
                              target="_blank"
                              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                            >
                              Ver
                            </Link>
                            <button
                              type="button"
                              onClick={() => openEditArticleEditor(art)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#006d3f] text-white text-xs font-bold cursor-pointer"
                            >
                              Editar Artigo
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteArticle(art.id)}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
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

              {/* AMBIENTE 3: AGENDA DE EVENTOS */}
              {activeTab === 'agenda_eventos' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#0B2545] via-[#004E86] to-[#0B2545] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                        <Calendar className="w-6 h-6 text-sky-300" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-300">
                          Calendário Oficial de Goiás
                        </span>
                        <h2 className="text-xl sm:text-2xl font-extrabold mt-0.5">
                          Agenda de Eventos & Feiras
                        </h2>
                        <p className="text-xs text-sky-100 mt-1 max-w-xl">
                          Cadastre feiras do agronegócio, congressos, leilões, simpósios e rodadas de negócios em Rio Verde, Goiânia, Jataí e região.
                        </p>
                      </div>
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
                      className="px-5 py-3 rounded-xl bg-white text-[#004E86] hover:bg-sky-50 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-lg cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Cadastrar Evento</span>
                    </button>
                  </div>

                  {isEditingEvent && (
                    <form
                      onSubmit={handleSaveEventSubmit}
                      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4"
                    >
                      <h4 className="text-base font-extrabold text-slate-900">
                        {eventForm.id ? 'Editar Evento' : 'Novo Evento na Agenda'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Título do Evento *
                          </label>
                          <input
                            type="text"
                            required
                            value={eventForm.title}
                            onChange={(e) =>
                              setEventForm((prev) => ({ ...prev, title: e.target.value }))
                            }
                            placeholder="Ex: Tecnoshow Comigo 2026"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Segmento
                          </label>
                          <select
                            value={eventForm.category}
                            onChange={(e) =>
                              setEventForm((prev) => ({
                                ...prev,
                                category: e.target.value as any,
                              }))
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold"
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
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Data (Ex: 07 a 11 de Abril)
                          </label>
                          <input
                            type="text"
                            required
                            value={eventForm.date}
                            onChange={(e) =>
                              setEventForm((prev) => ({ ...prev, date: e.target.value }))
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Horário
                          </label>
                          <input
                            type="text"
                            value={eventForm.time}
                            onChange={(e) =>
                              setEventForm((prev) => ({ ...prev, time: e.target.value }))
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Local / Parque / Auditório
                          </label>
                          <input
                            type="text"
                            value={eventForm.location}
                            onChange={(e) =>
                              setEventForm((prev) => ({ ...prev, location: e.target.value }))
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Cidade / UF
                          </label>
                          <input
                            type="text"
                            value={eventForm.city}
                            onChange={(e) =>
                              setEventForm((prev) => ({ ...prev, city: e.target.value }))
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Foto / Banner do Evento
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={eventForm.imageUrl}
                            onChange={(e) =>
                              setEventForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                            }
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
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
                            className="px-3.5 py-2 rounded-xl bg-[#08111D] text-white text-xs font-bold cursor-pointer"
                          >
                            {uploadingEventImg ? 'Enviando...' : 'Subir Imagem'}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Descrição Oficial
                        </label>
                        <textarea
                          rows={2}
                          value={eventForm.description}
                          onChange={(e) =>
                            setEventForm((prev) => ({ ...prev, description: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingEvent(false)}
                          className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-xl bg-[#006d3f] text-white text-xs font-extrabold uppercase cursor-pointer"
                        >
                          Salvar Evento
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {events.map((ev) => (
                      <div
                        key={ev.id}
                        className="rounded-2xl border border-slate-200/80 overflow-hidden bg-white shadow-2xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative h-40">
                            <img
                              src={ev.imageUrl}
                              alt={ev.title}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#006d3f] text-white text-[10px] font-bold uppercase">
                              {ev.category}
                            </span>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#004E86] mb-1">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{ev.date}</span>
                            </div>
                            <h4 className="text-sm font-extrabold text-slate-900">{ev.title}</h4>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                              <span className="truncate">
                                {ev.location} — {ev.city}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEventForm(ev);
                              setIsEditingEvent(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#08111D] text-white text-xs font-bold cursor-pointer"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteEvent(ev.id)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ABA 4: ANÚNCIOS & BANNERS */}
              {activeTab === 'anuncios' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAdSubTab('leaderboard')}
                        className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                          adSubTab === 'leaderboard'
                            ? 'bg-[#08111D] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Superbanners do Topo ({leaderboardBanners.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdSubTab('square')}
                        className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                          adSubTab === 'square'
                            ? 'bg-[#08111D] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Banners Quadrados 300x300 ({squareBanners.length})
                      </button>
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
                      className="px-5 py-2.5 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Novo Espaço Publicitário</span>
                    </button>
                  </div>

                  {isEditingBanner && (
                    <form
                      onSubmit={handleSaveBannerSubmit}
                      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4"
                    >
                      <h3 className="text-base font-extrabold text-slate-900">
                        {bannerForm.id ? 'Editar Anúncio Comercial' : 'Cadastrar Novo Anúncio'}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Formato Comercial
                          </label>
                          <select
                            value={bannerForm.adType}
                            onChange={(e) =>
                              setBannerForm((prev) => ({
                                ...prev,
                                adType: e.target.value as 'leaderboard' | 'square',
                              }))
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold"
                          >
                            <option value="leaderboard">Superbanner Horizontal (Topo)</option>
                            <option value="square">Banner Quadrado 300x300 (Vitrine & Lateral)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Empresa Anunciante *
                          </label>
                          <input
                            type="text"
                            required
                            value={bannerForm.brandName}
                            onChange={(e) =>
                              setBannerForm((prev) => ({ ...prev, brandName: e.target.value }))
                            }
                            placeholder="Ex: COMIGO Cooperativa"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Selo Superior
                          </label>
                          <input
                            type="text"
                            value={bannerForm.tag}
                            onChange={(e) =>
                              setBannerForm((prev) => ({ ...prev, tag: e.target.value }))
                            }
                            placeholder="Ex: PATROCÍNIO OFICIAL"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Chamada Principal (Headline) *
                          </label>
                          <input
                            type="text"
                            required
                            value={bannerForm.headline}
                            onChange={(e) =>
                              setBannerForm((prev) => ({ ...prev, headline: e.target.value }))
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Descrição Complementar
                          </label>
                          <input
                            type="text"
                            value={bannerForm.description}
                            onChange={(e) =>
                              setBannerForm((prev) => ({ ...prev, description: e.target.value }))
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Texto do Botão (CTA)
                          </label>
                          <input
                            type="text"
                            value={bannerForm.ctaText}
                            onChange={(e) =>
                              setBannerForm((prev) => ({ ...prev, ctaText: e.target.value }))
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Link de Destino (Site ou WhatsApp do Cliente)
                          </label>
                          <input
                            type="text"
                            value={bannerForm.targetUrl || ''}
                            onChange={(e) =>
                              setBannerForm((prev) => ({ ...prev, targetUrl: e.target.value }))
                            }
                            placeholder="https://... (vazio abre o Mídia Kit)"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Logo da Marca (Upload do PC)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={bannerForm.logoUrl || ''}
                              onChange={(e) =>
                                setBannerForm((prev) => ({ ...prev, logoUrl: e.target.value }))
                              }
                              placeholder="URL da logo ou envie do PC"
                              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs"
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
                              className="px-3 py-2 rounded-xl bg-[#08111D] text-white text-xs font-bold cursor-pointer"
                            >
                              {uploadingBannerLogo ? '...' : 'Subir Logo'}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Imagem de Fundo (Para Banner 300x300)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={bannerForm.bgImage || ''}
                              onChange={(e) =>
                                setBannerForm((prev) => ({ ...prev, bgImage: e.target.value }))
                              }
                              placeholder="URL da foto ou envie do PC"
                              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs"
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
                              className="px-3 py-2 rounded-xl bg-[#006d3f] text-white text-xs font-bold cursor-pointer"
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
                          className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-xl bg-[#006d3f] text-white text-xs font-extrabold uppercase cursor-pointer"
                        >
                          Salvar Anúncio
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(adSubTab === 'leaderboard' ? leaderboardBanners : squareBanners).map(
                      (ban) => (
                        <div
                          key={ban.id}
                          className={`p-5 rounded-2xl border bg-white shadow-2xs flex flex-col justify-between gap-4 ${
                            ban.isActive ? 'border-slate-200/80' : 'border-slate-200 opacity-60'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#006d3f]">
                                {ban.tag}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                  ban.isActive
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-slate-200 text-slate-600'
                                }`}
                              >
                                {ban.isActive ? '● ATIVO NO PORTAL' : '○ PAUSADO'}
                              </span>
                            </div>
                            <h4 className="text-base font-extrabold text-slate-900">
                              {ban.brandName}
                            </h4>
                            <p className="text-xs font-bold text-slate-700 mt-0.5">
                              {ban.headline}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">{ban.description}</p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => toggleBannerActive(ban.id, !ban.isActive)}
                              className="text-xs font-bold flex items-center gap-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                            >
                              <Power className="w-3.5 h-3.5" />
                              <span>{ban.isActive ? 'Pausar Exibição' : 'Ativar Exibição'}</span>
                            </button>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setBannerForm(ban);
                                  setIsEditingBanner(true);
                                }}
                                className="px-3.5 py-1.5 rounded-lg bg-[#08111D] text-white text-xs font-bold cursor-pointer"
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteBanner(ban.id)}
                                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* ABA 5: LEADS & ANUNCIANTES */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  {leads.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
                      <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <h3 className="text-base font-bold text-slate-900">
                        Nenhuma solicitação comercial pendente
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Todos os cadastros feitos no modal "Anuncie no Conexões em FOCO" aparecem aqui em tempo real.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {leads.map((lead) => (
                        <div
                          key={lead.id}
                          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#006d3f] text-[10px] font-extrabold uppercase">
                                {lead.leadType}
                              </span>
                              {lead.interest && (
                                <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-[#004E86] text-[10px] font-bold">
                                  Formato: {lead.interest}
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-extrabold text-slate-900">
                              {lead.name || lead.email || 'Solicitante Comercial'}{' '}
                              {lead.company ? `• ${lead.company}` : ''}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              WhatsApp: {lead.phone || '—'} {lead.email ? `• ${lead.email}` : ''}
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
                                className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Atender no WhatsApp</span>
                              </a>
                            )}
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                updateLeadStatus(lead.id, e.target.value as any)
                              }
                              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
                            >
                              <option value="novo">🟡 Novo Contato</option>
                              <option value="em_atendimento">🔵 Em Negociação</option>
                              <option value="fechado">🟢 Patrocínio Fechado</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => deleteLead(lead.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer"
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
    </div>
  );
};
