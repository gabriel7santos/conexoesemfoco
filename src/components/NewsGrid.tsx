import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Article } from '../types';
import { MarketQuotesCanalRural } from './MarketQuotesCanalRural';

interface NewsGridProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

const NewsCardItem: React.FC<{
  article: Article;
  onClick: () => void;
}> = ({ article, onClick }) => {
  const isArtigo = article.contentType === 'artigo';
  const isPubli = article.contentType === 'publi';

  return (
    <article
      onClick={onClick}
      className="bg-white rounded-xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group border border-gray-200 cursor-pointer h-full"
    >
      <div>
        {/* Imagem do Card */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100">
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
              <span className="px-2.5 py-0.5 rounded bg-[#004E86]/95 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                {article.category}
              </span>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-5 flex flex-col gap-2.5">
          {/* Se for Artigo, exibe o Colunista com avatar */}
          {isArtigo && article.columnist && (
            <div className="flex items-center gap-2 pt-0.5 border-b border-gray-100 pb-2">
              <img
                src={article.columnist.avatarUrl}
                alt={article.columnist.name}
                className="w-7 h-7 rounded-full object-cover border border-indigo-200 shrink-0"
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
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Patrocinado por: {article.sponsor.name}</span>
            </div>
          )}

          {/* Título */}
          <h3 className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#004E86] transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          {/* Subtítulo */}
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {article.subtitle}
          </p>

          {/* Micro métrica se houver */}
          {article.metrics && (
            <div className="bg-[#f8f9ff] rounded-lg p-2 flex items-center justify-between text-xs border border-gray-100 mt-1">
              <span className="text-gray-500 font-semibold">{article.metrics.label}:</span>
              <strong className="text-[#006d3f]">{article.metrics.value}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Rodapé do Card */}
      <div className="px-4 sm:px-5 py-3 bg-[#f8f9ff] flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 mt-auto">
        <span>{article.publishedAt}</span>
        <span className="text-[#004E86] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          {isArtigo ? 'Ler artigo' : isPubli ? 'Conhecer mais' : 'Ler matéria'}
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};

export const NewsGrid: React.FC<NewsGridProps> = ({ articles, onArticleClick }) => {
  // Primeiras 3 matérias que ficam lado a lado com o widget de Cotações (idêntico ao Canal Rural)
  const topArticles = articles.slice(0, 3);
  // Matérias restantes que ficam na grade inferior
  const remainingArticles = articles.slice(3);

  return (
    <section className="w-full mb-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-7 rounded bg-[#004E86]"></div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] uppercase tracking-tight">
              ÚLTIMAS NOTÍCIAS & MERCADO
            </h2>
            <p className="text-xs text-gray-500">
              Cobertura jornalística, cotações ao vivo do Canal Rural/CEPEA e análises de Goiás
            </p>
          </div>
        </div>
      </div>

      {/* LINHA 1 (MODELO EXATO CANAL RURAL): 3 CARDS DE NOTÍCIAS + WIDGET COTAÇÕES MERCADO FÍSICO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-8">
        {topArticles.map((article) => (
          <div key={article.id} className="h-full">
            <NewsCardItem article={article} onClick={() => onArticleClick(article)} />
          </div>
        ))}

        {/* 4ª COLUNA: WIDGET EXCLUSIVO DE COTAÇÕES MODELO CANAL RURAL */}
        <div className="lg:col-span-1 h-full flex flex-col">
          <MarketQuotesCanalRural className="h-full" maxHeight="max-h-[360px] lg:max-h-[380px]" />
        </div>
      </div>

      {/* LINHA 2: MATÉRIAS RESTANTES DA SEÇÃO */}
      {remainingArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingArticles.map((article) => (
            <NewsCardItem
              key={article.id}
              article={article}
              onClick={() => onArticleClick(article)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
