import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getArticlesByCategory, allArticles } from '../data/mockNews';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const categoryName = (slug || 'noticias').toUpperCase();

  const categoryMeta: Record<string, { title: string; desc: string; icon: string }> = {
    AGRO: {
      title: 'Agro & Agronegócios',
      desc: 'Inteligência de safras, tecnologia de precisão, insumos e o dia a dia do produtor rural goiano.',
      icon: 'potted_plant',
    },
    ECONOMIA: {
      title: 'Economia & Negócios',
      desc: 'Indicadores financeiros, investimentos industriais e desenvolvimento econômico no Centro-Oeste.',
      icon: 'analytics',
    },
    REGIAO: {
      title: 'Região & Cidades',
      desc: 'Acontecimentos dos principais polos: Rio Verde, Jataí, Anápolis, Goiânia e Cristalina.',
      icon: 'pin_drop',
    },
    REGIÃO: {
      title: 'Região & Cidades',
      desc: 'Acontecimentos dos principais polos: Rio Verde, Jataí, Anápolis, Goiânia e Cristalina.',
      icon: 'pin_drop',
    },
    ENTREVISTAS: {
      title: 'Entrevistas & Podcasts',
      desc: 'Conversas aprofundadas com lideranças, pesquisadores e executivos que transformam Goiás.',
      icon: 'mic',
    },
    EVENTOS: {
      title: 'Eventos & Feiras',
      desc: 'Agenda das principais feiras de tecnologia, exposições agropecuárias e rodadas de negócios.',
      icon: 'event',
    },
    NOTICIAS: {
      title: 'Todas as Notícias',
      desc: 'Acompanhe a cobertura editorial completa do portal Conexões em FOCO.',
      icon: 'newspaper',
    },
    NOTÍCIAS: {
      title: 'Todas as Notícias',
      desc: 'Acompanhe a cobertura editorial completa do portal Conexões em FOCO.',
      icon: 'newspaper',
    },
  };

  const currentMeta = categoryMeta[categoryName] || {
    title: `Editoria: ${categoryName}`,
    desc: 'Notícias e análises selecionadas pela equipe do Conexões em FOCO.',
    icon: 'article',
  };

  const articles = useMemo(() => {
    if (categoryName === 'NOTICIAS' || categoryName === 'NOTÍCIAS' || categoryName === 'TODAS') {
      return allArticles;
    }
    return getArticlesByCategory(categoryName);
  }, [categoryName]);

  return (
    <div className="w-full bg-[#F8FAFC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#006d3f] transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">home</span>
            <span>Início</span>
          </Link>
          <span>/</span>
          <span className="font-bold uppercase text-[#006d3f]">{currentMeta.title}</span>
        </div>

        {/* BANNER DA CATEGORIA */}
        <div className="bg-[#0E1B2B] text-white rounded-2xl p-6 sm:p-10 mb-10 shadow-lg border border-white/10 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7afbae] text-xs font-bold uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-[16px]">{currentMeta.icon}</span>
              <span>Editoria Oficial</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              {currentMeta.title}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {currentMeta.desc}
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
            <span className="material-symbols-outlined text-[240px] text-white">
              {currentMeta.icon}
            </span>
          </div>
        </div>

        {/* GRADE DE ARTIGOS */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-6 rounded bg-[#006d3f]"></div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0b1c30] uppercase tracking-tight">
              Matérias Publicadas ({articles.length})
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
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#0E1B2B]/90 text-white text-[10px] font-bold uppercase tracking-wider">
                      {art.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col gap-2">
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
                    Ler matéria <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
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
