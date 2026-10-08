import React, { useEffect } from 'react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const text = encodeURIComponent(`Confira no Conexões em FOCO: ${article.title} - ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link da matéria copiado para a área de transferência!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar Flutuante */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all shadow-lg"
          aria-label="Fechar"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Imagem de Capa */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 bg-gray-900">
          <img
            src={article.imageUrl}
            alt={article.imageAlt || article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded bg-[#006d3f] text-white text-xs font-bold uppercase tracking-wider mb-2">
              {article.category}
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Conteúdo Rolável */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Metadados */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">{article.author}</span>
              <span>•</span>
              <span>{article.publishedAt}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-1.5 transition-colors"
              >
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
                <span>Copiar link</span>
              </button>
            </div>
          </div>

          {/* Subtítulo */}
          {article.subtitle && (
            <p className="text-base sm:text-lg font-semibold text-gray-700 leading-relaxed italic border-l-4 border-[#006d3f] pl-4">
              {article.subtitle}
            </p>
          )}

          {/* Player de áudio se for podcast */}
          {article.audio?.available && (
            <div className="bg-[#0f1c2c] text-white p-4 rounded-xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[32px] text-[#7afbae]">
                  podcasts
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#7afbae] font-bold">
                    {article.audio.episodeNumber}
                  </div>
                  <div className="text-sm font-semibold">{article.audio.title}</div>
                </div>
              </div>
              <span className="text-xs text-gray-400">{article.audio.duration}</span>
            </div>
          )}

          {/* Parágrafos da Matéria */}
          <div className="prose max-w-none text-gray-800 text-base leading-relaxed space-y-4">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Chamada para o Radar de Mercado */}
          <div className="mt-8 p-5 bg-[#eff4ff] rounded-xl border border-[#dce9ff] text-center">
            <h4 className="text-sm font-bold text-[#0b1c30] uppercase mb-1">
              Gostou dessa análise?
            </h4>
            <p className="text-xs text-gray-600 mb-3">
              Cadastre-se para receber o resumo diário de notícias do agronegócio e economia de Goiás.
            </p>
            <button
              onClick={() => {
                onClose();
                const elem = document.getElementById('boletim');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2 rounded-lg bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Assinar Boletim Grátis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
