import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  ComigoLogo,
  SicoobLogo,
  JohnDeereLogo,
  AutorioLogo,
  OcbGoLogo,
  SolutecLogo,
} from './SponsorLogos';
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

export const leaderboardSlides: LeaderboardSlide[] = [
  {
    id: 'comigo',
    tag: 'PATROCÍNIO OFICIAL',
    brandName: 'COMIGO Cooperativa',
    headline: 'A Força do Cooperativismo e Safra 2026/2027',
    description: 'Soluções completas em insumos agrícolas, armazenagem e tecnologia para o produtor goiano.',
    ctaText: 'Conhecer Soluções',
    ctaClass: 'bg-[#23B26D] hover:bg-[#1fa162] text-white',
    bgGradient: 'from-[#00381e] via-[#004e28] to-[#0b2417]',
    borderColor: 'border-[#23B26D]/50 hover:border-[#7afbae]',
    Logo: ComigoLogo,
  },
  {
    id: 'sicoob',
    tag: 'PARCEIRO MASTER',
    brandName: 'SICOOB Credi-Rural',
    headline: 'Crédito Ágil, Financiamento de Safra & Maquinários',
    description: 'Taxas diferenciadas, energia solar e capital de giro com o maior ecossistema cooperativo do Centro-Oeste.',
    ctaText: 'Simular Crédito',
    ctaClass: 'bg-teal-600 hover:bg-teal-500 text-white',
    bgGradient: 'from-[#002f35] via-[#00424a] to-[#081a20]',
    borderColor: 'border-teal-500/50 hover:border-teal-300',
    Logo: SicoobLogo,
  },
  {
    id: 'johndeere',
    tag: 'TECNOLOGIA NO CAMPO',
    brandName: 'John Deere Máquinas',
    headline: 'Colheita Conectada com Piloto Automático e Telemetria',
    description: 'Concessionárias regionais em Goiás com assistência técnica e peças originais para a safra.',
    ctaText: 'Ver Máquinas',
    ctaClass: 'bg-[#367C2B] hover:bg-[#28601f] text-white',
    bgGradient: 'from-[#112a0d] via-[#1c4415] to-[#091707]',
    borderColor: 'border-yellow-500/40 hover:border-yellow-300',
    Logo: JohnDeereLogo,
  },
  {
    id: 'autorio',
    tag: 'CONDIÇÕES ESPECIAIS',
    brandName: 'Autorio Chevrolet',
    headline: 'Nova Chevrolet S10 e Silverado para o Produtor Rural',
    description: 'Condições exclusivas de faturamento direto com desconto de fábrica para Produtores Rurais e CNPJ em Goiás.',
    ctaText: 'Ver Ofertas',
    ctaClass: 'bg-[#D99B26] hover:bg-[#b8801b] text-black font-extrabold',
    bgGradient: 'from-[#0f1b2d] via-[#152741] to-[#0a121e]',
    borderColor: 'border-amber-500/40 hover:border-amber-300',
    Logo: AutorioLogo,
  },
  {
    id: 'ocbgo',
    tag: 'SOMOSCOOP GOIÁS',
    brandName: 'Sistema OCB/GO',
    headline: 'O Cooperativismo que Alavanca o Agronegócio e a Economia Goiana',
    description: 'Mais de 250 cooperativas gerando emprego, capacitação técnica e desenvolvimento sustentável.',
    ctaText: 'Conhecer Projetos',
    ctaClass: 'bg-[#005A36] hover:bg-[#004529] text-white',
    bgGradient: 'from-[#002e1c] via-[#00472b] to-[#00170e]',
    borderColor: 'border-emerald-500/40 hover:border-emerald-300',
    Logo: OcbGoLogo,
  },
  {
    id: 'solutec',
    tag: 'AGRICULTURA DE PRECISÃO',
    brandName: 'Solutec Agro',
    headline: 'Sensores de Solo e Mapeamento Aéreo por Inteligência Artificial',
    description: 'Monitoramento em tempo real de lavouras e diagnóstico nutricional no Sudoeste Goiano.',
    ctaText: 'Agendar Demonstração',
    ctaClass: 'bg-[#0284C7] hover:bg-[#0369a1] text-white',
    bgGradient: 'from-[#051c2c] via-[#092d47] to-[#03111b]',
    borderColor: 'border-sky-500/40 hover:border-sky-300',
    Logo: SolutecLogo,
  },
];

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
      <div className={`space-y-4 ${className}`}>
        <SquareBanner
          autoRotate={true}
          intervalMs={6500}
          onOpenAdModal={onOpenAdModal}
          aspect="square"
          className="w-full"
        />
      </div>
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

  const slidesPool = dbSlides.length > 0 ? dbSlides : leaderboardSlides;

  const [currentSlide, setCurrentSlide] = useState(() => {
    if (variant === 'comigo') return 0;
    if (variant === 'sicoob') return 1;
    return 0;
  });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (variant === 'comigo' || variant === 'sicoob') return;

    const timer = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % slidesPool.length);
      }
    }, autoRotateInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoRotateInterval, variant, slidesPool.length]);

  const slide = slidesPool[currentSlide % slidesPool.length] || leaderboardSlides[0];
  const LogoComponent = slide.Logo;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slidesPool.length) % slidesPool.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slidesPool.length);
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

          <div className="bg-white rounded-xl px-3 py-1.5 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform max-w-[150px]">
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
          {variant !== 'comigo' && variant !== 'sicoob' && (
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
                {(currentSlide % slidesPool.length) + 1}/{slidesPool.length}
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
            className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 ${slide.ctaClass}`}
          >
            <span>{slide.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>

      {variant !== 'comigo' && variant !== 'sicoob' && (
        <div className="flex items-center justify-center gap-1.5 mt-2.5 pt-1.5 border-t border-white/10">
          {slidesPool.map((item, dotIdx) => (
            <button
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(dotIdx);
              }}
              aria-label={`Ver anúncio de ${item.brandName}`}
              className={`h-1 rounded-full transition-all ${
                dotIdx === currentSlide % slidesPool.length
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
