import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import {
  ComigoLogo,
  SicoobLogo,
  JohnDeereLogo,
  AutorioLogo,
  SolutecLogo,
  OcbGoLogo,
} from './SponsorLogos';

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
  LogoComponent: React.FC<{ className?: string }>;
}

export const mockSquareAds: SquareAdItem[] = [
  {
    id: 'sq-comigo',
    brandName: 'COMIGO Cooperativa',
    tag: 'PATROCÍNIO OFICIAL',
    headline: 'Safra 2026/2027 com Alta Produtividade',
    description: 'Armazenagem moderna, insumos e assistência técnica agronômica no Sudoeste Goiano.',
    ctaText: 'Conhecer Soluções',
    ctaColor: 'bg-[#23B26D] hover:bg-[#1fa162]',
    gradientBg: 'from-[#002f1a] via-[#004e28] to-[#041a0f]',
    borderColor: 'border-[#23B26D]/40 hover:border-[#7afbae]',
    bgImage: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80',
    LogoComponent: ComigoLogo,
  },
  {
    id: 'sq-sicoob',
    brandName: 'SICOOB Credi-Rural',
    tag: 'PARCEIRO MASTER',
    headline: 'Crédito Ágil para Maquinários & Safra',
    description: 'Linhas de financiamento com taxas competitivas e energia solar para o produtor rural.',
    ctaText: 'Simular Financiamento',
    ctaColor: 'bg-[#00AE9D] hover:bg-[#008f80]',
    gradientBg: 'from-[#00262c] via-[#003c46] to-[#00171b]',
    borderColor: 'border-teal-500/40 hover:border-teal-300',
    bgImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
    LogoComponent: SicoobLogo,
  },
  {
    id: 'sq-autorio',
    brandName: 'Autorio Chevrolet',
    tag: 'CONDICÕES PRODUTOR RURAL',
    headline: 'Nova Chevrolet S10 & Silverado 4x4',
    description: 'Bônus de fábrica, taxa reduzida e pronta entrega com desconto para CNPJ e Produtor.',
    ctaText: 'Ver Condições',
    ctaColor: 'bg-[#D99B26] hover:bg-[#b8801b] text-black font-black',
    gradientBg: 'from-[#0c1626] via-[#12233c] to-[#080e18]',
    borderColor: 'border-amber-500/40 hover:border-amber-300',
    bgImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    LogoComponent: AutorioLogo,
  },
  {
    id: 'sq-johndeere',
    brandName: 'John Deere Máquinas',
    tag: 'TECNOLOGIA DE CAMPO',
    headline: 'Colheita Conectada com Piloto Automático',
    description: 'Telemetria em tempo real e colheitadeiras autônomas para maximizar o rendimento.',
    ctaText: 'Ver Máquinas',
    ctaColor: 'bg-[#367C2B] hover:bg-[#2a6222]',
    gradientBg: 'from-[#142e0f] via-[#1f4818] to-[#0a1807]',
    borderColor: 'border-yellow-500/40 hover:border-yellow-300',
    bgImage: 'https://images.unsplash.com/photo-1589876527581-2a626a575bb6?auto=format&fit=crop&w=600&q=80',
    LogoComponent: JohnDeereLogo,
  },
  {
    id: 'sq-solutec',
    brandName: 'Solutec Agro',
    tag: 'AGRICULTURA DE PRECISÃO',
    headline: 'Monitoramento & Sensores por IA',
    description: 'Mapeamento aéreo e diagnóstico nutricional de lavouras em Rio Verde e Jataí.',
    ctaText: 'Agendar Teste',
    ctaColor: 'bg-[#0284C7] hover:bg-[#0369a1]',
    gradientBg: 'from-[#041a28] via-[#072d46] to-[#020e17]',
    borderColor: 'border-sky-500/40 hover:border-sky-300',
    bgImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    LogoComponent: SolutecLogo,
  },
  {
    id: 'sq-ocb',
    brandName: 'Sistema OCB/GO',
    tag: 'SOMOSCOOP GOIÁS',
    headline: 'O Cooperativismo que Move Nosso Estado',
    description: 'Mais de 250 cooperativas goianas gerando emprego, renda e desenvolvimento sustentável.',
    ctaText: 'Conhecer Projetos',
    ctaColor: 'bg-[#005A36] hover:bg-[#004227]',
    gradientBg: 'from-[#002e1c] via-[#00472b] to-[#00170e]',
    borderColor: 'border-emerald-500/40 hover:border-emerald-300',
    bgImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    LogoComponent: OcbGoLogo,
  },
];

interface SquareBannerProps {
  ad?: SquareAdItem;
  autoRotate?: boolean;
  intervalMs?: number;
  onOpenAdModal?: () => void;
  className?: string;
  aspect?: 'square' | 'mrec'; // square = 1:1, mrec = 300x250
}

/**
 * Banner Quadrado (IAB MREC / Square Ad 300x250 a 300x300)
 * Pode ser estático ou rotativo, com logotipo da marca, fundo fotográfico com overlay e CTA.
 */
export const SquareBanner: React.FC<SquareBannerProps> = ({
  ad,
  autoRotate = false,
  intervalMs = 6000,
  onOpenAdModal,
  className = '',
  aspect = 'square',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % mockSquareAds.length);
      }
    }, intervalMs);
    return () => clearInterval(timer);
  }, [autoRotate, isPaused, intervalMs]);

  const activeAd = ad || mockSquareAds[currentIndex];
  const Logo = activeAd.LogoComponent;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % mockSquareAds.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + mockSquareAds.length) % mockSquareAds.length);
  };

  return (
    <div
      onClick={onOpenAdModal}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`group relative overflow-hidden rounded-2xl border ${activeAd.borderColor} shadow-md transition-all duration-500 cursor-pointer flex flex-col justify-between ${
        aspect === 'square' ? 'aspect-square min-h-[300px]' : 'min-h-[260px]'
      } ${className}`}
      title={`${activeAd.brandName} • ${activeAd.headline}`}
    >
      {/* IMAGEM DE FUNDO COM OVERLAY GRADIENTE ESCURO */}
      {activeAd.bgImage && (
        <img
          src={activeAd.bgImage}
          alt={activeAd.brandName}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-25"
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-b ${activeAd.gradientBg} opacity-95`}></div>

      {/* CABEÇALHO DO BANNER QUADRADO */}
      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between gap-2 border-b border-white/10">
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#7afbae] bg-black/50 px-2 py-0.5 rounded border border-white/10">
          {activeAd.tag}
        </span>

        {/* NAVEGAÇÃO / CONTROLE SE FOR ROTATIVO */}
        {autoRotate && (
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handlePrev}
              aria-label="Anúncio anterior"
              className="w-5 h-5 rounded-full bg-black/40 hover:bg-white/20 text-white flex items-center justify-center text-xs transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-gray-300 font-bold">
              {currentIndex + 1}/{mockSquareAds.length}
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

      {/* CENTRO: LOGO OFICIAL DA EMPRESA & TEXTOS EDITORIAIS */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-col items-center text-center my-auto">
        {/* LOGO DA MARCA EM CARD BRANCO NÍTIDO */}
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

      {/* RODAPÉ DO BANNER QUADRADO: BOTÃO CTA */}
      <div className="relative z-10 p-4 sm:p-5 pt-0">
        <button
          type="button"
          className={`w-full py-2.5 px-4 rounded-xl text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 ${activeAd.ctaColor}`}
        >
          <span>{activeAd.ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* INDICADOR DE DOTS SE FOR ROTATIVO */}
        {autoRotate && (
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {mockSquareAds.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(dotIdx);
                }}
                aria-label={`Ir para anúncio ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  dotIdx === currentIndex ? 'w-4 bg-[#7afbae]' : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
