import React from 'react';
import {
  MessageCircle,
  Mail,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  ComigoLogo,
  SicoobLogo,
  OcbGoLogo,
  JohnDeereLogo,
  AutorioLogo,
  SolutecLogo,
  AerotexLogo,
  JallesMachadoLogo,
  MosaicLogo,
  NeloreGoiasLogo,
} from './SponsorLogos';

interface SponsorsCarouselProps {
  onOpenAdModal?: () => void;
  className?: string;
}

export interface SponsorItem {
  id: string;
  name: string;
  segment: string;
  location: string;
  Logo: React.FC<{ className?: string }>;
  tag?: string;
  websiteUrl?: string;
}

export const mockSponsorsList: SponsorItem[] = [
  {
    id: 'comigo',
    name: 'COMIGO Cooperativa',
    segment: 'Agroindustrial & Grãos',
    location: 'Rio Verde - GO',
    Logo: ComigoLogo,
    tag: 'Safra & Grãos',
  },
  {
    id: 'sicoob',
    name: 'SICOOB Credi-Rural',
    segment: 'Cooperativa Financeira',
    location: 'Rio Verde & Goiás',
    Logo: SicoobLogo,
    tag: 'Crédito Agro',
  },
  {
    id: 'ocb-go',
    name: 'Sistema OCB/GO',
    segment: 'Cooperativismo Goiano',
    location: 'Goiânia - GO',
    Logo: OcbGoLogo,
    tag: 'SomosCoop',
  },
  {
    id: 'john-deere',
    name: 'John Deere Máquinas',
    segment: 'Tratores & Colheitadeiras',
    location: 'Sudoeste Goiano',
    Logo: JohnDeereLogo,
    tag: 'Tecnologia Campo',
  },
  {
    id: 'autorio',
    name: 'Autorio Chevrolet',
    segment: 'Concessionária & Frotas',
    location: 'Rio Verde & Região',
    Logo: AutorioLogo,
    tag: 'Pick-ups & Frotas',
  },
  {
    id: 'solutec',
    name: 'Solutec Agro',
    segment: 'Agricultura de Precisão',
    location: 'Jataí - GO',
    Logo: SolutecLogo,
    tag: 'IA & Sensores',
  },
  {
    id: 'aerotex',
    name: 'Aerotex Aviação',
    segment: 'Aviação Agrícola',
    location: 'Rio Verde - GO',
    Logo: AerotexLogo,
    tag: 'Pulverização Aérea',
  },
  {
    id: 'jalles-machado',
    name: 'Jalles Machado',
    segment: 'Açúcar, Etanol e Bioenergia',
    location: 'Goianésia - GO',
    Logo: JallesMachadoLogo,
    tag: 'Bioenergia',
  },
  {
    id: 'mosaic',
    name: 'Mosaic Fertilizantes',
    segment: 'Nutrição & Fertilizantes',
    location: 'Goiás & Centro-Oeste',
    Logo: MosaicLogo,
    tag: 'Nutrição de Safra',
  },
  {
    id: 'nelore-goias',
    name: 'Nelore Goiás',
    segment: 'Genética & Pecuária de Corte',
    location: 'Goiás',
    Logo: NeloreGoiasLogo,
    tag: 'Pecuária Elite',
  },
];

export const SponsorsCarousel: React.FC<SponsorsCarouselProps> = ({
  onOpenAdModal,
  className = '',
}) => {
  // Duplicar a lista para criar a animação infinita perfeita (marquee)
  const infiniteSponsors = [...mockSponsorsList, ...mockSponsorsList];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Olá! Tenho interesse em anunciar e posicionar a minha marca no portal Conexões em FOCO.'
    );
    window.open(`https://api.whatsapp.com/send?phone=5564992145066&text=${text}`, '_blank');
  };

  return (
    <section className={`w-full mb-12 ${className}`}>
      {/* CABEÇALHO DO CARROSSEL DE ANUNCIANTES */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-7 rounded bg-[#006d3f]"></div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] uppercase tracking-tight">
                ANUNCIANTES & MARCAS PARCEIRAS
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#006d3f] text-[10px] font-bold uppercase tracking-wider border border-emerald-200/50">
                <Sparkles className="w-3 h-3 text-[#006d3f]" />
                Centro-Oeste em Destaque
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Grandes cooperativas, indústrias e empresas líderes presentes no Conexões em FOCO
            </p>
          </div>
        </div>

        {onOpenAdModal && (
          <button
            type="button"
            onClick={onOpenAdModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            <span>Anuncie Sua Marca Aqui</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* CONTAINER DO CARROSSEL COM MÁSCARA DE TRANSIÇÃO SUAVE NAS PONTAS */}
      <div className="relative overflow-hidden w-full py-3 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl border border-gray-200/80 shadow-xs mb-6">
        {/* Degradê sutil nas extremidades para fusão suave */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        {/* LISTA ANIMADA EM LOOP INFINITO (PAUSA AO PASSAR O MOUSE) COM LOGOS REAIS */}
        <div className="animate-marquee flex items-center gap-4 py-2 px-4">
          {infiniteSponsors.map((sponsor, idx) => {
            const LogoComponent = sponsor.Logo;
            return (
              <div
                key={`${sponsor.id}-${idx}`}
                onClick={onOpenAdModal}
                className="bg-white rounded-xl border border-gray-200 hover:border-[#006d3f] p-3 shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-3.5 shrink-0 min-w-[260px] sm:min-w-[290px] group cursor-pointer"
                title={`${sponsor.name} • ${sponsor.segment}`}
              >
                {/* LOGO OFICIAL VETORIAL DA MARCA (NÃO ÍCONE) */}
                <div className="w-28 sm:w-32 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center px-2 py-1 shrink-0 group-hover:scale-105 group-hover:bg-white transition-all">
                  <LogoComponent className="w-full h-8 max-h-8 object-contain" />
                </div>

                {/* INFORMAÇÕES DA EMPRESA */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#0b1c30] group-hover:text-[#006d3f] transition-colors truncate">
                      {sponsor.name}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#23B26D] shrink-0" />
                  </div>
                  <p className="text-[10.5px] font-semibold text-gray-500 truncate">
                    {sponsor.segment}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                      {sponsor.tag}
                    </span>
                    <span className="text-[9.5px] text-gray-400 truncate">
                      {sponsor.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAIXA COMERCIAL PREMIUM DE CONTATO & WHATSAPP (ESTILO RIO VERDE RURAL / CANAL RURAL) */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-[#004e28] via-[#006d3f] to-[#0E1B2B] text-white p-5 sm:p-7 shadow-md border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* LADO ESQUERDO: TEXTO E PROPOSTA COMERCIAL */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
            <MessageCircle className="w-8 h-8 text-[#7afbae]" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7afbae] bg-white/10 px-2 py-0.5 rounded">
                DEPARTAMENTO COMERCIAL & MÍDIA
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
              FALE COM O CONEXÕES EM FOCO PELO WHATSAPP
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 mt-1 max-w-xl leading-relaxed">
              Posicione sua marca para milhares de produtores rurais, empresários e decisores econômicos em todo o estado de Goiás.
            </p>
          </div>
        </div>

        {/* LADO DIREITO: NÚMERO DE CONTATO & BOTÕES DE AÇÃO */}
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
          {/* NÚMERO DE TELEFONE / WHATSAPP */}
          <div className="text-center sm:text-right px-4 py-2 rounded-xl bg-black/25 border border-white/10 w-full sm:w-auto">
            <span className="text-[11px] uppercase tracking-wider text-gray-300 block">
              Atendimento Comercial:
            </span>
            <span className="text-base sm:text-lg font-black text-[#7afbae] tracking-wide">
              (64) 9 9214-5066
            </span>
            <span className="text-[10px] text-gray-300 block">
              Gabriel Falasca • Rio Verde / GO
            </span>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#23B26D] hover:bg-[#1fa162] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </button>
            {onOpenAdModal && (
              <button
                type="button"
                onClick={onOpenAdModal}
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center gap-1.5"
              >
                <span>Ver Mídia Kit</span>
                <ArrowUpRight className="w-4 h-4 text-[#7afbae]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
