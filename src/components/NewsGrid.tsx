import React, { useState } from 'react';
import { Article } from '../types';

interface NewsGridProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

export const NewsGrid: React.FC<NewsGridProps> = ({ articles, onArticleClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="w-full mb-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-7 rounded bg-[#006d3f]"></div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] uppercase tracking-tight">
            ÚLTIMAS NOTÍCIAS DE GOIÁS
          </h2>
        </div>
        <button
          onClick={() => alert('Em breve mais notícias adicionadas no painel!')}
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#006d3f] hover:text-[#00210f] transition-colors"
        >
          <span>VER TODAS AS NOTÍCIAS</span>
          <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const isPodcast = article.audio?.available;

          return (
            <article
              key={article.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group border border-gray-100"
            >
              <div className="p-6 flex flex-col gap-4">
                {/* Header do Card */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-1 rounded text-[11px] uppercase tracking-wider font-bold ${
                      article.category === 'ENTREVISTAS'
                        ? 'bg-[#77f8ac]/30 text-[#006d3f]'
                        : article.category === 'LOGÍSTICA'
                        ? 'bg-[#dce9ff] text-[#001d32]'
                        : 'bg-[#e5eeff] text-[#006d3f]'
                    }`}
                  >
                    {article.category === 'ENTREVISTAS'
                      ? 'ENTREVISTA EXCLUSIVA'
                      : article.category === 'LOGÍSTICA'
                      ? 'LOGÍSTICA & TRANSPORTE'
                      : 'PRODUÇÃO AGRÍCOLA'}
                  </span>

                  {article.metrics?.trend && (
                    <span className="text-gray-600 text-xs font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#006d3f]">
                        trending_up
                      </span>
                      {article.metrics.trend}
                    </span>
                  )}

                  {article.locationRoute && (
                    <span className="text-gray-600 text-xs font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#001d32]">
                        location_on
                      </span>
                      BR-060 / Ferrovia
                    </span>
                  )}

                  {isPodcast && (
                    <span className="text-gray-600 text-xs font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#006d3f]">
                        podcasts
                      </span>
                      {article.audio?.episodeNumber}
                    </span>
                  )}
                </div>

                {/* Título */}
                <h3
                  onClick={() => onArticleClick(article)}
                  className="text-lg font-bold text-[#0b1c30] group-hover:text-[#006d3f] transition-colors leading-snug cursor-pointer"
                >
                  {article.title}
                </h3>

                {/* Subtítulo */}
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                  {article.subtitle}
                </p>

                {/* Micro Visualização de Dados (Sparkline / Rota / Podcast Player) */}
                {article.metrics && (
                  <div className="bg-[#f8f9ff] rounded-lg p-3 flex items-center justify-between mt-1 border border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-gray-500 uppercase font-semibold">
                        {article.metrics.label}
                      </span>
                      <span className="text-base text-[#0b1c30] font-extrabold">
                        {article.metrics.value}
                      </span>
                    </div>
                    <div className="w-28 h-10">
                      <svg
                        className="w-full h-full text-[#006d3f]"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        viewBox="0 0 120 40"
                      >
                        <polyline points="0,32 25,28 50,18 75,22 100,8 118,5"></polyline>
                        <circle className="fill-[#006d3f]" cx="118" cy="5" r="3"></circle>
                      </svg>
                    </div>
                  </div>
                )}

                {article.locationRoute && (
                  <div className="bg-[#f8f9ff] rounded-lg p-3 flex items-center gap-3 mt-1 border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-[#d3e4fe] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#0b1c30] text-[22px]">
                        route
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm text-[#0b1c30] truncate font-bold">
                        {article.locationRoute.title}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {article.locationRoute.route}
                      </span>
                    </div>
                  </div>
                )}

                {isPodcast && (
                  <div className="bg-[#0b1c30] text-white rounded-lg p-3 flex items-center justify-between mt-1 shadow-inner">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        type="button"
                        className="w-9 h-9 rounded-full bg-[#23B26D] hover:bg-[#1fa162] text-white flex items-center justify-center transition-all shadow"
                        aria-label={isPlaying ? 'Pausar áudio' : 'Tocar áudio'}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {isPlaying ? 'pause' : 'play_arrow'}
                        </span>
                      </button>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-gray-300 font-semibold tracking-wider uppercase">
                          {isPlaying ? 'REPRODUZINDO PODCAST...' : 'ÁUDIO DISPONÍVEL'}
                        </span>
                        <span className="text-xs text-[#7afbae] font-medium">
                          {article.audio?.duration}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[22px] text-[#23B26D] animate-pulse">
                      graphic_eq
                    </span>
                  </div>
                )}
              </div>

              {/* Footer do Card */}
              <div className="bg-[#f8f9ff] px-6 py-3 flex items-center justify-between text-gray-500 text-xs border-t border-gray-100">
                <span>{article.publishedAt}</span>
                <button
                  onClick={() => onArticleClick(article)}
                  className="text-xs text-[#006d3f] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  {isPodcast ? 'Ouvir agora' : 'Ler análise'}{' '}
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
