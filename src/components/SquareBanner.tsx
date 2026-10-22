import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  ComigoLogo,
  SicoobLogo,
  JohnDeereLogo,
  AutorioLogo,
  SolutecLogo,
  OcbGoLogo,
} from './SponsorLogos';
import { usePortalData } from '../context/PortalDataContext';

export interface SquareAdItem {
  id: string;
  brandName: string;
  tag: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaColor: string;
  gradientBg: string;
  borderColor: string;
  bgImage?: string;
  logoUrl?: string;
  targetUrl?: string;
  LogoComponent: React.FC<{ className?: string }>;
}

const DefaultConexoesLogo: React.FC<{ className?: string }> = ({ className = 'h-7' }) => (
  <img
    src="/conexoes_logo_clean.png"
    alt="Conexões em FOCO"
    className={`${className} w-auto object-contain`}
  />
);

export function resolveLogoComponent(
  logoKey?: string,
  logoUrl?: string
): React.FC<{ className?: string }> {
  if (logoUrl && logoUrl.trim()) {
    return ({ className = 'h-8' }) => (
      <img src={logoUrl} alt="Logo" className={`${className} w-auto object-contain`} />
    );
  }
  switch (logoKey) {
    case 'comigo':
      return ComigoLogo;
    case 'sicoob':
      return SicoobLogo;
    case 'johndeere':
      return JohnDeereLogo;
    case 'autorio':
      return AutorioLogo;
    case 'solutec':
      return SolutecLogo;
    case 'ocbgo':
      return OcbGoLogo;
    default:
      return DefaultConexoesLogo;
  }
}

export const mockSquareAds: SquareAdItem[] = [];

interface SquareBannerProps {
  ad?: SquareAdItem;
  autoRotate?: boolean;
  intervalMs?: number;
  onOpenAdModal?: () => void;
  className?: string;
  aspect?: 'square' | 'mrec';
}

export const SquareBanner: React.FC<SquareBannerProps> = ({
  ad,
  autoRotate = false,
  intervalMs = 6000,
  onOpenAdModal,
  className = '',
  aspect = 'square',
}) => {
  const { banners } = usePortalData();
  const dbSquareBanners: SquareAdItem[] = banners
    .filter((b) => b.adType === 'square' && b.isActive)
    .map((b) => ({
      id: b.id,
      brandName: b.brandName,
      tag: b.tag,
      headline: b.headline,
      description: b.description,
      ctaText: b.ctaText,
      ctaColor: b.ctaColor || 'bg-[#23B26D] hover:bg-[#1fa162]',
      gradientBg: b.gradientBg || 'from-[#002f1a] via-[#004e28] to-[#041a0f]',
      borderColor: b.borderColor || 'border-[#23B26D]/40 hover:border-[#7afbae]',
      bgImage: b.bgImage,
      logoUrl: b.logoUrl,
      targetUrl: b.targetUrl,
      LogoComponent: resolveLogoComponent(b.logoKey, b.logoUrl),
    }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoRotate || dbSquareBanners.length <= 1) return;
    const timer = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % dbSquareBanners.length);
      }
    }, intervalMs);
    return () => clearInterval(timer);
  }, [autoRotate, isPaused, intervalMs, dbSquareBanners.length]);

  const activeAd = ad || dbSquareBanners[currentIndex % dbSquareBanners.length];

  // Quando não houver patrocinador quadrado cadastrado, não exibir nada
  if (!activeAd) {
    return null;
  }

  const Logo = activeAd.LogoComponent;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % dbSquareBanners.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + dbSquareBanners.length) % dbSquareBanners.length);
  };

  const handleBannerClick = () => {
    if (activeAd.targetUrl && activeAd.targetUrl.trim()) {
      window.open(activeAd.targetUrl.trim(), '_blank');
    } else if (onOpenAdModal) {
      onOpenAdModal();
    }
  };

  return (
    <div
      onClick={handleBannerClick}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`group relative overflow-hidden rounded-2xl border ${activeAd.borderColor} shadow-md transition-all duration-500 cursor-pointer flex flex-col justify-between ${
        aspect === 'square' ? 'aspect-square min-h-[300px]' : 'min-h-[260px]'
      } ${className}`}
      title={`${activeAd.brandName} • ${activeAd.headline}`}
    >
      {activeAd.bgImage && (
        <img
          src={activeAd.bgImage}
          alt={activeAd.brandName}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-25"
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-b ${activeAd.gradientBg} opacity-95`}></div>

      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between gap-2 border-b border-white/10">
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#7afbae] bg-black/50 px-2 py-0.5 rounded border border-white/10">
          {activeAd.tag}
        </span>

        {autoRotate && dbSquareBanners.length > 1 && (
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handlePrev}
              aria-label="Anúncio anterior"
              className="w-5 h-5 rounded-full bg-black/40 hover:bg-white/20 text-white flex items-center justify-center text-xs transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-gray-300 font-bold">
              {(currentIndex % dbSquareBanners.length) + 1}/{dbSquareBanners.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Próximo anúncio"
              className="w-5 h-5 rounded-full bg-black/40 hover:bg-white/20 text-white flex items-center justify-center text-xs transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="relative z-10 p-4 sm:p-5 flex flex-col items-center text-center my-auto">
        <div className="bg-white rounded-xl px-4 py-2 mb-3.5 shadow-md flex items-center justify-center w-auto max-w-[200px] group-hover:scale-105 transition-transform">
          <Logo className="h-8 sm:h-9 w-auto object-contain" />
        </div>

        <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight mb-2 group-hover:text-[#7afbae] transition-colors line-clamp-2">
          {activeAd.headline}
        </h4>
        <p className="text-xs text-gray-200 line-clamp-2 leading-relaxed">
          {activeAd.description}
        </p>
      </div>

      <div className="relative z-10 p-4 sm:p-5 pt-0">
        <button
          type="button"
          className={`w-full py-2.5 px-4 rounded-xl text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 ${activeAd.ctaColor}`}
        >
          <span>{activeAd.ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>

        {autoRotate && dbSquareBanners.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {dbSquareBanners.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(dotIdx);
                }}
                aria-label={`Ir para anúncio ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  dotIdx === currentIndex % dbSquareBanners.length
                    ? 'w-4 bg-[#7afbae]'
                    : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
