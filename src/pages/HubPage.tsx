import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getArticlesByHub, allArticles } from '../data/mockNews';

export const HubPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();

  const isEmpresarial = type === 'empresarial';
  const hubTitle = isEmpresarial ? 'Conexão Empresarial' : 'Conexão com a Lei';
  const hubSubtitle = isEmpresarial
    ? 'O hub de negócios, empresas de Goiás, cases corporativos e oportunidades B2B.'
    : 'Artigos jurídicos, compliance no agronegócio e orientações de advogados especialistas.';
  const hubIcon = isEmpresarial ? 'corporate_fare' : 'balance';
  const hubColor = isEmpresarial ? '#0E1B2B' : '#006d3f';

  const hubArticles = getArticlesByHub(isEmpresarial ? 'empresarial' : 'lei');
  // Se tiver poucos, adiciona mais da categoria relacionada
  const displayArticles =
    hubArticles.length > 0
      ? hubArticles
      : allArticles.filter((a) => (isEmpresarial ? a.category === 'Economia' : a.category === 'Política'));

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
          <span className="font-bold uppercase text-[#006d3f]">{hubTitle}</span>
        </div>

        {/* HERO BANNER DO HUB */}
        <div
          style={{ backgroundColor: hubColor }}
          className="text-white rounded-2xl p-6 sm:p-10 mb-10 shadow-lg border border-white/10 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7afbae] text-xs font-bold uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-[16px]">{hubIcon}</span>
              <span>Ambiente Especial Conexões</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              {hubTitle}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {hubSubtitle}
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
            <span className="material-symbols-outlined text-[240px] text-white">{hubIcon}</span>
          </div>
        </div>

        {/* LISTAGEM DE PUBLICAÇÕES DO HUB */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayArticles.map((art) => (
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
                    className={`absolute top-3 left-3 px-2.5 py-0.5 rounded text-white text-[10px] font-bold uppercase tracking-wider ${
                      art.contentType === 'artigo' ? 'bg-indigo-900/90' : 'bg-[#0E1B2B]/90'
                    }`}
                  >
                    {art.contentType === 'artigo' ? 'ARTIGO DE OPINIÃO' : art.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-2">
                  {art.columnist && (
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src={art.columnist.avatarUrl}
                        alt={art.columnist.name}
                        className="w-6 h-6 rounded-full object-cover border border-gray-200"
                      />
                      <span className="text-xs text-gray-600 font-semibold truncate">
                        Por {art.columnist.name}
                      </span>
                    </div>
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
                  Ler análise <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
