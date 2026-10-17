import React from 'react';
import { TrendingUp, ArrowRight, Sparkles, Building2, ExternalLink } from 'lucide-react';
import { ComigoLogo, SicoobLogo } from './SponsorLogos';

interface AdBannerProps {
  type?: 'leaderboard' | 'sidebar' | 'in-feed' | 'half-page';
  variant?: 'default' | 'comigo' | 'sicoob' | 'john-deere';
  onOpenAdModal?: () => void;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  type = 'leaderboard',
  variant = 'default',
  onOpenAdModal,
  className = '',
}) => {
  // FORMATO LATERAL (SIDEBAR PREMIUM 300x350 - NADA POLUÍDO, 100% EDITORIAL)
  if (type === 'sidebar') {
    return (
      <div
        onClick={onOpenAdModal}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1522] via-[#0E1B2B] to-[#122336] text-white p-5 border border-white/10 shadow-sm cursor-pointer group hover:border-[#23B26D] transition-all ${className}`}
      >
        <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/10">
          <span className="text-[9px] uppercase tracking-widest text-[#7afbae] font-extrabold bg-white/10 px-2 py-0.5 rounded">
            ESPAÇO PUBLICITÁRIO OFICIAL
          </span>
          <span className="text-[10px] text-gray-400">300 x 350</span>
        </div>

        {/* LOGO DA MARCA PATROCINADORA EM DESTAQUE */}
        <div className="bg-white rounded-xl p-3 mb-3 flex items-center justify-center shadow-inner">
          <ComigoLogo className="h-9 w-auto object-contain" />
        </div>

        <div className="space-y-1.5 mb-4">
          <h4 className="text-sm font-extrabold text-white group-hover:text-[#7afbae] transition-colors leading-snug">
            COMIGO • Safra e Tecnologia no Sudoeste Goiano
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            Armazenagem de ponta, fertilizantes de alta performance e assistência técnica para o produtor rural.
          </p>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-gray-400 text-[11px]">Anunciante Verificado</span>
          <span className="font-bold text-[#7afbae] group-hover:underline flex items-center gap-1">
            <span>Saiba Mais</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    );
  }

  // ANÚNCIO EXEMPLO: COMIGO COOPERATIVA (LEADERBOARD HORIZONTAL)
  if (variant === 'comigo') {
    return (
      <div
        onClick={onOpenAdModal}
        className={`w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#00381e] via-[#004e28] to-[#0b2417] text-white p-3 sm:p-4 border border-[#23B26D]/40 shadow-xs cursor-pointer group hover:border-[#7afbae] transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest text-[#7afbae] bg-black/40 px-2 py-1 rounded shrink-0 font-extrabold border border-[#23B26D]/30">
            PATROCÍNIO OFICIAL
          </span>
          <div className="flex items-center gap-3">
            {/* LOGO OFICIAL VETORIAL COMIGO */}
            <div className="bg-white rounded-lg px-2.5 py-1 flex items-center justify-center shrink-0 shadow-xs">
              <ComigoLogo className="h-7 w-auto object-contain" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-[#7afbae] transition-colors leading-tight">
                A Força do Cooperativismo e Safra 2026/2027
              </h4>
              <p className="text-[11px] text-gray-200 mt-0.5 line-clamp-1">
                Soluções completas em insumos agrícolas, armazenagem e tecnologia para o produtor goiano.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#23B26D] px-3.5 py-1.5 rounded-lg group-hover:bg-[#1fa162] transition-all shadow-xs flex items-center gap-1">
            <span>Conhecer Soluções</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    );
  }

  // ANÚNCIO EXEMPLO: SICOOB CREDI-RURAL (IN-FEED / LEADERBOARD)
  if (variant === 'sicoob') {
    return (
      <div
        onClick={onOpenAdModal}
        className={`w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#002f35] via-[#00424a] to-[#081a20] text-white p-3 sm:p-4 border border-teal-500/40 shadow-xs cursor-pointer group hover:border-teal-300 transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest text-teal-300 bg-black/40 px-2 py-1 rounded shrink-0 font-extrabold border border-teal-500/30">
            PARCEIRO MASTER
          </span>
          <div className="flex items-center gap-3">
            {/* LOGO OFICIAL VETORIAL SICOOB */}
            <div className="bg-white rounded-lg px-2.5 py-1 flex items-center justify-center shrink-0 shadow-xs">
              <SicoobLogo className="h-7 w-auto object-contain" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-teal-300 transition-colors leading-tight">
                Crédito Ágil, Financiamento de Safra & Maquinários
              </h4>
              <p className="text-[11px] text-gray-200 mt-0.5 line-clamp-1">
                Taxas diferenciadas, energia solar e capital de giro com o maior ecossistema cooperativo do Centro-Oeste.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-white bg-teal-600 px-3.5 py-1.5 rounded-lg group-hover:bg-teal-500 transition-all shadow-xs flex items-center gap-1">
            <span>Simular Crédito</span>
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
