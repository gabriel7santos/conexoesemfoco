import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  ArrowRight,
  Sprout,
  Building,
  Landmark,
  HeartPulse,
  TrendingUp,
  Globe2,
  Newspaper,
  FileText,
  LucideIcon,
} from 'lucide-react';
import { usePortalData } from '../context/PortalDataContext';
import { AdBanner } from '../components/AdBanner';

interface CategoryPageProps {
  onOpenAdModal?: () => void;
}

function getCategoryIconBySlug(slug: string): LucideIcon {
  if (slug.includes('agro')) return Sprout;
  if (slug.includes('cidade')) return Building;
  if (slug.includes('pol')) return Landmark;
  if (slug.includes('saude')) return HeartPulse;
  if (slug.includes('economia')) return TrendingUp;
  if (slug.includes('geo')) return Globe2;
  if (slug.includes('noticias') || slug.includes('todas')) return Newspaper;
  return FileText;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ onOpenAdModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { articles: allArticles, categories, getArticlesByCategory } = usePortalData();

  const rawSlug = (slug || 'noticias').toLowerCase().trim();

  // Busca dinâmica na tabela de categorias cadastradas no Admin
  const dynamicCat = categories.find(
    (c) =>
      c.slug.toLowerCase() === rawSlug ||
      c.id.toLowerCase() === rawSlug ||
      c.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-') === rawSlug
  );

  const currentMeta = useMemo(() => {
    if (rawSlug === 'noticias' || rawSlug === 'todas') {
      return {
        title: 'Todas as Notícias',
        desc: 'Acompanhe a cobertura editorial completa do portal Conexões em FOCO.',
        Icon: Newspaper,
      };
    }
    if (dynamicCat) {
      return {
        title: dynamicCat.name,
        desc:
          dynamicCat.description ||
          `Cobertura completa e reportagens da editoria ${dynamicCat.name} no portal Conexões em FOCO.`,
        Icon: getCategoryIconBySlug(dynamicCat.slug),
      };
    }
    return {
      title: rawSlug.replace(/-/g, ' ').toUpperCase(),
      desc: 'Notícias e análises selecionadas pela equipe do Conexões em FOCO.',
      Icon: getCategoryIconBySlug(rawSlug),
    };
  }, [rawSlug, dynamicCat]);

  const CurrentIcon = currentMeta.Icon;

  const articles = useMemo(() => {
    if (rawSlug === 'noticias' || rawSlug === 'todas') {
      return allArticles;
    }
    return getArticlesByCategory(rawSlug);
  }, [rawSlug, allArticles, getArticlesByCategory]);

  return (
    <div className="w-full bg-[#F8FAFC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#006d3f] transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Início</span>
          </Link>
          <span>/</span>
          <span className="font-bold uppercase text-[#006d3f]">{currentMeta.title}</span>
        </div>

        {/* BANNER DA CATEGORIA */}
        <div className="bg-[#0E1B2B] text-white rounded-2xl p-6 sm:p-10 mb-8 shadow-lg border border-white/10 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7afbae] text-xs font-bold uppercase tracking-wider mb-3">
              <CurrentIcon className="w-4 h-4 text-[#7afbae]" />
              <span>Editoria Oficial</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              {currentMeta.title}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {currentMeta.desc}
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
            <CurrentIcon className="w-64 h-64 text-white" />
          </div>
        </div>

        {/* ESPAÇO PUBLICITÁRIO DE CATEGORIA (SÓ APARECE SE HOUVER BANNER CADASTRADO) */}
        <AdBanner type="leaderboard" onOpenAdModal={onOpenAdModal} className="mb-8" />

        {/* GRADE DE ARTIGOS */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-6 rounded bg-[#006d3f]"></div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0b1c30] uppercase tracking-tight">
              Publicações Recentes ({articles.length})
            </h2>
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-sm">
              Nenhuma matéria cadastrada nesta editoria no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <article
                key={art.id}
                onClick={() => navigate(`/materia/${art.id}`)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group border border-gray-200 cursor-pointer"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white ${
                        art.contentType === 'publi'
                          ? 'bg-amber-600'
                          : art.contentType === 'artigo'
                          ? 'bg-indigo-900'
                          : 'bg-[#0E1B2B]/90'
                      }`}
                    >
                      {art.contentType === 'publi'
                        ? 'INFORME PUBLICITÁRIO'
                        : art.contentType === 'artigo'
                        ? 'ARTIGO DE OPINIÃO'
                        : art.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col gap-2">
                    {art.columnist?.name && (
                      <span className="text-[11px] text-indigo-900 font-bold">
                        Por {art.columnist.name}
                      </span>
                    )}
                    {art.sponsor?.name && (
                      <span className="text-[11px] text-amber-800 font-bold">
                        Patrocinado por {art.sponsor.name}
                      </span>
                    )}

                    <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#006d3f] transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {art.subtitle}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 bg-[#f8f9ff] flex items-center justify-between text-xs text-gray-400 border-t border-gray-100">
                  <span>{art.publishedAt}</span>
                  <span className="text-[#006d3f] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Ler conteúdo <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
