import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { SquareBanner, resolveLogoComponent } from './SquareBanner';
import { usePortalData } from '../context/PortalDataContext';

interface AdBannerProps {
  type?: 'leaderboard' | 'sidebar' | 'in-feed' | 'square';
  variant?: 'rotating' | 'comigo' | 'sicoob' | 'default';
  onOpenAdModal?: () => void;
  className?: string;
  autoRotateInterval?: number;
}

interface LeaderboardSlide {
  id: string;
  tag: string;
  brandName: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaClass: string;
  bgGradient: string;
  borderColor: string;
  targetUrl?: string;
  Logo: React.FC<{ className?: string }>;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  type = 'leaderboard',
  variant = 'rotating',
  onOpenAdModal,
  className = '',
  autoRotateInterval = 5500,
}) => {
  const { banners } = usePortalData();

  if (type === 'square') {
    return (
      <SquareBanner
        autoRotate={true}
        onOpenAdModal={onOpenAdModal}
        className={className}
      />
    );
  }

  if (type === 'sidebar') {
    return (
      <SquareBanner
        autoRotate={true}
        intervalMs={6500}
        onOpenAdModal={onOpenAdModal}
        aspect="square"
        className={className}
      />
    );
  }

  const dbSlides: LeaderboardSlide[] = banners
    .filter((b) => b.adType === 'leaderboard' && b.isActive)
    .map((b) => ({
      id: b.id,
      tag: b.tag,
      brandName: b.brandName,
      headline: b.headline,
      description: b.description,
      ctaText: b.ctaText,
      ctaClass: b.ctaColor || 'bg-[#23B26D] hover:bg-[#1fa162] text-white',
      bgGradient: b.gradientBg || 'from-[#00381e] via-[#004e28] to-[#0b2417]',
      borderColor: b.borderColor || 'border-[#23B26D]/50 hover:border-[#7afbae]',
      targetUrl: b.targetUrl,
      Logo: resolveLogoComponent(b.logoKey, b.logoUrl),
    }));

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (dbSlides.length <= 1) return;

    const timer = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % dbSlides.length);
      }
    }, autoRotateInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoRotateInterval, dbSlides.length]);

  // Quando não houver patrocinador/banner cadastrado ativo, não exibir nada
  if (dbSlides.length === 0) {
    return null;
  }

  const slide = dbSlides[currentSlide % dbSlides.length];
  const LogoComponent = slide.Logo;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + dbSlides.length) % dbSlides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % dbSlides.length);
  };

  const handleBannerClick = () => {
    if (slide.targetUrl && slide.targetUrl.trim()) {
      window.open(slide.targetUrl.trim(), '_blank');
    } else if (onOpenAdModal) {
      onOpenAdModal();
    }
  };

  return (
    <div
      onClick={handleBannerClick}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-r ${slide.bgGradient} text-white p-3.5 sm:p-4 border ${slide.borderColor} shadow-md cursor-pointer transition-all duration-700 group ${className}`}
      title={`${slide.brandName} • ${slide.headline}`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3.5 w-full lg:w-auto">
          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-[9px] uppercase tracking-widest text-[#7afbae] bg-black/50 px-2 py-1 rounded shrink-0 font-extrabold border border-white/10">
              {slide.tag}
            </span>
          </div>

          <div className="bg-white rounded-xl px-3 py-1.5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform max-w-[150px]">
            <LogoComponent className="h-7 w-auto object-contain" />
          </div>

          <div className="text-center sm:text-left min-w-0">
            <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-[#7afbae] transition-colors leading-tight line-clamp-1">
              {slide.headline}
            </h4>
            <p className="text-[11px] text-gray-200 mt-0.5 line-clamp-1">
              {slide.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
          {variant !== 'comigo' && variant !== 'sicoob' && dbSlides.length > 1 && (
            <div
              className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg border border-white/10 text-gray-300 text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Anúncio anterior"
                className="hover:text-white p-0.5 rounded hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-bold text-gray-300 px-1">
                {(currentSlide % dbSlides.length) + 1}/{dbSlides.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Próximo anúncio"
                className="hover:text-white p-0.5 rounded hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <span
            className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 ${slide.ctaClass}`}
          >
            <span>{slide.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>

      {variant !== 'comigo' && variant !== 'sicoob' && dbSlides.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-2.5 pt-1.5 border-t border-white/10">
          {dbSlides.map((item, dotIdx) => (
            <button
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(dotIdx);
              }}
              aria-label={`Ver anúncio de ${item.brandName}`}
              className={`h-1 rounded-full transition-all ${
                dotIdx === currentSlide % dbSlides.length
                  ? 'w-6 bg-[#7afbae]'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
