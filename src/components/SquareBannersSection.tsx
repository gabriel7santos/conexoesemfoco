import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { SquareBanner, mockSquareAds, resolveLogoComponent, SquareAdItem } from './SquareBanner';
import { usePortalData } from '../context/PortalDataContext';

interface SquareBannersSectionProps {
  onOpenAdModal?: () => void;
  className?: string;
  limit?: number;
}

export const SquareBannersSection: React.FC<SquareBannersSectionProps> = ({
  onOpenAdModal,
  className = '',
  limit = 3,
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

  const pool = dbSquareBanners.length > 0 ? dbSquareBanners : mockSquareAds;
  const selectedAds = pool.slice(0, limit);

  return (
    <section className={`w-full mb-12 ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-7 rounded bg-[#004E86]"></div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] uppercase tracking-tight">
                ESPAÇOS PUBLICITÁRIOS & MARCAS OFICIAIS
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#004E86] text-[10px] font-bold uppercase tracking-wider border border-blue-200/50">
                <Sparkles className="w-3 h-3 text-[#004E86]" />
                Banners Quadrados 300x300
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Vitrine de produtos, serviços e tecnologia das empresas parceiras do Conexões em FOCO
            </p>
          </div>
        </div>

        {onOpenAdModal && (
          <button
            type="button"
            onClick={onOpenAdModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#004E86] hover:bg-[#00375f] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            <span>Reservar Espaço Quadrado</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedAds.map((ad) => (
          <SquareBanner
            key={ad.id}
            ad={ad}
            onOpenAdModal={onOpenAdModal}
            aspect="square"
            className="w-full"
          />
        ))}
      </div>
    </section>
  );
};
