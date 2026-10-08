import React from 'react';
import { Article } from '../types';

interface HeroSectionProps {
  mainArticle: Article;
  secondaryArticles: Article[];
  onArticleClick: (article: Article) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  mainArticle,
  secondaryArticles,
  onArticleClick,
}) => {
  return (
    <section className="w-full bg-[#0f1c2c] text-white rounded-xl shadow-xl p-5 md:p-6 mb-8 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* COLUNA ESQUERDA: Manchete Principal de Capa */}
        <article
          onClick={() => onArticleClick(mainArticle)}
          className="lg:col-span-8 flex flex-col group relative rounded-xl overflow-hidden min-h-[460px] lg:min-h-[540px] justify-end p-6 md:p-8 shadow-lg cursor-pointer"
        >
          <img
            src={mainArticle.imageUrl}
            alt={mainArticle.imageAlt || mainArticle.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c2c] via-[#0f1c2c]/65 to-transparent"></div>

          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#006d3f] text-white text-[12px] uppercase tracking-wider font-bold shadow-sm">
                <span className="material-symbols-outlined text-[15px]">eco</span>
                {mainArticle.category}
              </span>
              {mainArticle.highlightTag && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 text-[#7afbae] text-[11px] uppercase tracking-wider font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7afbae] animate-ping"></span>
                  {mainArticle.highlightTag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-[#7afbae] transition-colors leading-tight">
              {mainArticle.title}
            </h1>

            {mainArticle.subtitle && (
              <p className="text-gray-300 text-sm sm:text-base line-clamp-2 max-w-2xl font-normal leading-relaxed">
                {mainArticle.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 mt-1 border-t border-white/10">
              <div className="flex items-center gap-3 text-gray-300 text-xs sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#7afbae]">
                    schedule
                  </span>
                  {mainArticle.publishedAt}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#7afbae]">
                    menu_book
                  </span>
                  {mainArticle.readTime}
                </span>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/15 hover:bg-[#23B26D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md group-hover:bg-[#23B26D]"
              >
                <span>LER MATÉRIA</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </article>

        {/* COLUNA DIREITA: Matérias Secundárias Empilhadas */}
        <aside className="lg:col-span-4 flex flex-col gap-4 justify-between h-full">
          {secondaryArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onArticleClick(article)}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col justify-between group cursor-pointer hover:bg-white/10 transition-all flex-1"
            >
              <div className="relative rounded-lg overflow-hidden h-36 w-full mb-3 bg-black/20">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded text-[11px] uppercase tracking-wider font-bold ${
                    article.category === 'ECONOMIA'
                      ? 'bg-[#001d32]/90 text-[#cde5ff]'
                      : 'bg-[#006d3f]/90 text-white'
                  }`}
                >
                  {article.category}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-base font-bold text-white group-hover:text-[#7afbae] transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h2>
                <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
                  <span className="material-symbols-outlined text-[15px]">timer</span>
                  <span>
                    {article.publishedAt} • {article.author}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </aside>
      </div>
    </section>
  );
};
