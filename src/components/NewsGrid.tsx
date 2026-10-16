import React from 'react';
import { Article } from '../types';

interface NewsGridProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

export const NewsGrid: React.FC<NewsGridProps> = ({ articles, onArticleClick }) => {
  return (
    <section className="w-full mb-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-7 rounded bg-[#006d3f]"></div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] uppercase tracking-tight">
              ÚLTIMAS NOTÍCIAS & ARTIGOS
            </h2>
            <p className="text-xs text-gray-500">
              Cobertura jornalística, análises de especialistas e matérias especiais de Goiás
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const isArtigo = article.contentType === 'artigo';
          const isPubli = article.contentType === 'publi';

          return (
            <article
              key={article.id}
              onClick={() => onArticleClick(article)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group border border-gray-200 cursor-pointer"
            >
              <div>
                {/* Imagem do Card */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges de Formato / Categoria */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {isPubli ? (
                      <span className="px-2.5 py-0.5 rounded bg-amber-600/95 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                        INFORME PUBLICITÁRIO
                      </span>
                    ) : isArtigo ? (
                      <span className="px-2.5 py-0.5 rounded bg-indigo-900/95 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                        ARTIGO DE OPINIÃO
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded bg-[#0E1B2B]/90 text-white text-[10px] font-bold uppercase tracking-wider">
                        {article.category}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3">
                  {/* Se for Artigo, exibe o Colunista com avatar */}
                  {isArtigo && article.columnist && (
                    <div className="flex items-center gap-2 pt-1 border-b border-gray-100 pb-2">
                      <img
                        src={article.columnist.avatarUrl}
                        alt={article.columnist.name}
                        className="w-7 h-7 rounded-full object-cover border border-indigo-200"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-indigo-950 block truncate">
                          {article.columnist.name}
                        </span>
                        <span className="text-[10px] text-gray-500 block truncate">
                          {article.columnist.role}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Se for Publi, exibe o Patrocinador */}
                  {isPubli && article.sponsor && (
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-800 font-semibold bg-amber-50 px-2 py-1 rounded">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      <span>Patrocinado por: {article.sponsor.name}</span>
                    </div>
                  )}

                  {/* Título */}
                  <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#006d3f] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Subtítulo */}
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>

                  {/* Micro métrica se houver */}
                  {article.metrics && (
                    <div className="bg-[#f8f9ff] rounded-lg p-2.5 flex items-center justify-between text-xs border border-gray-100">
                      <span className="text-gray-500 font-semibold">{article.metrics.label}:</span>
                      <strong className="text-[#006d3f]">{article.metrics.value}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Rodapé do Card */}
              <div className="px-5 py-3 bg-[#f8f9ff] flex items-center justify-between text-xs text-gray-400 border-t border-gray-100">
                <span>{article.publishedAt}</span>
                <span className="text-[#006d3f] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {isArtigo ? 'Ler artigo' : isPubli ? 'Conhecer mais' : 'Ler matéria'}
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
