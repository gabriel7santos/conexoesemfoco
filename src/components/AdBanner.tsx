import React from 'react';
import { TrendingUp, Wheat, Landmark, ArrowRight, Sparkles } from 'lucide-react';

interface AdBannerProps {
  type?: 'leaderboard' | 'sidebar' | 'in-feed';
  variant?: 'default' | 'comigo' | 'sicoob';
  onOpenAdModal?: () => void;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  type = 'leaderboard',
  variant = 'default',
  onOpenAdModal,
  className = '',
}) => {
  if (type === 'sidebar') {
    return (
      <div
        onClick={onOpenAdModal}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0E1B2B] via-[#162B42] to-[#0A1420] text-white p-5 border border-white/10 shadow-sm cursor-pointer group hover:border-[#23B26D] transition-all ${className}`}
      >
        <span className="absolute top-2.5 right-2.5 text-[9px] uppercase tracking-widest text-gray-400 bg-black/40 px-2 py-0.5 rounded">
          PUBLICIDADE
        </span>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-[#23B26D] flex items-center justify-center font-bold text-white text-xs shadow-sm">
            CF
          </div>
          <div>
            <div className="text-xs font-bold text-white">Sua Marca em Goiás</div>
            <div className="text-[10px] text-[#7afbae]">Conecte com decisores</div>
          </div>
        </div>
        <p className="text-xs text-gray-300 mb-4 leading-relaxed">
          Anuncie seus produtos e serviços para milhares de produtores rurais, diretores e empresários do Centro-Oeste.
        </p>
        <button
          type="button"
          className="w-full py-2.5 rounded-xl bg-[#23B26D] group-hover:bg-[#1fa162] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5"
        >
          <span>Anuncie Aqui</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // ANÚNCIO EXEMPLO: COMIGO COOPERATIVA
  if (variant === 'comigo') {
    return (
      <div
        onClick={onOpenAdModal}
        className={`w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#00381e] via-[#004e28] to-[#0b2417] text-white p-3.5 sm:p-4 border border-[#23B26D]/30 shadow-xs cursor-pointer group hover:border-[#7afbae] transition-all flex flex-col sm:flex-row items-center justify-between gap-3 ${className}`}
      >
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest text-[#7afbae] bg-black/40 px-2 py-1 rounded shrink-0 font-extrabold border border-[#23B26D]/30">
            PATROCÍNIO OFICIAL
          </span>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#23B26D]/20 border border-[#23B26D]/40 flex items-center justify-center shrink-0">
              <Wheat className="text-[#7afbae] w-5 h-5" />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-[#7afbae] transition-colors flex items-center justify-center sm:justify-start gap-1.5">
                <span>COMIGO • A Força do Cooperativismo e Safra 2026/2027</span>
              </h4>
              <p className="text-[11px] text-gray-200">
                Soluções completas em insumos agrícolas, armazenagem e tecnologia para o produtor goiano.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#23B26D] px-3.5 py-1.5 rounded-lg group-hover:bg-[#1fa162] transition-all shadow-xs flex items-center gap-1">
            <span>Conhecer Soluções</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    );
  }

  // ANÚNCIO EXEMPLO: SICOOB CREDI-RURAL
  if (variant === 'sicoob') {
    return (
      <div
        onClick={onOpenAdModal}
        className={`w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#002f35] via-[#00424a] to-[#081a20] text-white p-3.5 sm:p-4 border border-teal-500/30 shadow-xs cursor-pointer group hover:border-teal-300 transition-all flex flex-col sm:flex-row items-center justify-between gap-3 ${className}`}
      >
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest text-teal-300 bg-black/40 px-2 py-1 rounded shrink-0 font-extrabold border border-teal-500/30">
            PARCEIRO MASTER
          </span>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center shrink-0">
              <Landmark className="text-teal-300 w-5 h-5" />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-teal-300 transition-colors flex items-center justify-center sm:justify-start gap-1.5">
                <span>SICOOB Credi-Rural • Crédito Ágil & Maquinários</span>
              </h4>
              <p className="text-[11px] text-gray-200">
                Financiamento de lavouras, energia solar e capital de giro com as melhores taxas do Centro-Oeste.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-white bg-teal-600 px-3.5 py-1.5 rounded-lg group-hover:bg-teal-500 transition-all shadow-xs flex items-center gap-1">
            <span>Simular Financiamento</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    );
  }

  // DEFAULT: ESPAÇO PUBLICITÁRIO / MÍDIA KIT CONEXÕES EM FOCO
  return (
    <div
      onClick={onOpenAdModal}
      className={`w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#0E1B2B] via-[#14263B] to-[#0E1B2B] text-white p-3 sm:p-4 border border-white/10 shadow-xs cursor-pointer group hover:border-[#23B26D] transition-all flex flex-col sm:flex-row items-center justify-between gap-3 ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest text-gray-400 bg-black/40 px-2 py-1 rounded shrink-0">
          PUBLICIDADE
        </span>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
            <TrendingUp className="text-[#7afbae] w-5 h-5" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#7afbae] transition-colors">
              Espaço Publicitário em Destaque • Conexões em FOCO
            </h4>
            <p className="text-[11px] text-gray-300">
              Sua empresa diante de mais de 180.000 leitores e decisores no agronegócio e economia de Goiás.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7afbae] bg-white/10 px-3 py-1.5 rounded-lg group-hover:bg-[#23B26D] group-hover:text-white transition-all flex items-center gap-1">
          <span>Anuncie Conosco</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
