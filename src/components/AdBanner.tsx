import React from 'react';
import { TrendingUp } from 'lucide-react';

interface AdBannerProps {
  type?: 'leaderboard' | 'sidebar' | 'in-feed';
  onOpenAdModal?: () => void;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  type = 'leaderboard',
  onOpenAdModal,
  className = '',
}) => {
  if (type === 'sidebar') {
    return (
      <div
        onClick={onOpenAdModal}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0E1B2B] via-[#162B42] to-[#0A1420] text-white p-5 border border-white/10 shadow-sm cursor-pointer group hover:border-[#23B26D] transition-all ${className}`}
      >
        <span className="absolute top-2 right-2 text-[9px] uppercase tracking-widest text-gray-400 bg-black/40 px-2 py-0.5 rounded">
          PUBLICIDADE
        </span>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#23B26D] flex items-center justify-center font-bold text-white text-xs">
            CF
          </div>
          <div>
            <div className="text-xs font-bold text-white">Sua Marca em Goiás</div>
            <div className="text-[10px] text-[#7afbae]">Conecte com decisores</div>
          </div>
        </div>
        <p className="text-xs text-gray-300 mb-4 leading-relaxed">
          Anuncie seus produtos e serviços para milhares de produtores e empresários do Centro-Oeste.
        </p>
        <button
          type="button"
          className="w-full py-2 rounded-lg bg-[#23B26D] group-hover:bg-[#1fa162] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow"
        >
          Anuncie Aqui &rarr;
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={onOpenAdModal}
      className={`w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#0E1B2B] via-[#14263B] to-[#0E1B2B] text-white p-3 sm:p-4 border border-white/10 shadow-sm cursor-pointer group hover:border-[#23B26D] transition-all flex flex-col sm:flex-row items-center justify-between gap-3 ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest text-gray-400 bg-black/40 px-2 py-1 rounded shrink-0">
          PUBLICIDADE
        </span>
        <div className="flex items-center gap-2">
          <TrendingUp className="text-[#7afbae] w-5 h-5 shrink-0" />
          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#7afbae] transition-colors">
              Espaço Publicitário em Destaque • Conexões em FOCO
            </h4>
            <p className="text-[11px] text-gray-300">
              Sua empresa diante de quem toma as decisões econômicas em Goiás e no Centro-Oeste.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7afbae] bg-white/10 px-3 py-1.5 rounded-lg group-hover:bg-[#23B26D] group-hover:text-white transition-all">
          Anuncie Conosco &rarr;
        </span>
      </div>
    </div>
  );
};
