import React from 'react';
import {
  MessageCircle,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { usePortalData } from '../context/PortalDataContext';
import { resolveLogoComponent } from './SquareBanner';
import { OFFICIAL_SITE_INFO, openRotatedWhatsApp } from '../utils/contactRotator';

interface SponsorsCarouselProps {
  onOpenAdModal?: () => void;
  className?: string;
}

export const SponsorsCarousel: React.FC<SponsorsCarouselProps> = ({
  onOpenAdModal,
  className = '',
}) => {
  const { banners } = usePortalData();
  const activeBanners = banners.filter((b) => b.isActive);

  const handleWhatsApp = () => {
    openRotatedWhatsApp(
      'Olá! Tenho interesse em anunciar e posicionar a minha marca no portal Conexões em FOCO.'
    );
  };

  // Duplicar a lista de patrocinadores reais cadastrados para o carrossel quando houver patrocinadores
  const infiniteSponsors =
    activeBanners.length > 0 ? [...activeBanners, ...activeBanners] : [];

  return (
    <section className={`w-full mb-12 ${className}`}>
      {/* SÓ MOSTRA O CARROSSEL DE PATROCINADORES SE HOUVER PATROCINADOR CADASTRADO ATIVO */}
      {activeBanners.length > 0 && (
        <>
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
                    Parceiros Oficiais
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Empresas e marcas parceiras presentes no portal Conexões em FOCO
                </p>
              </div>
            </div>

            {onOpenAdModal && (
              <button
                type="button"
                onClick={onOpenAdModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <span>Anuncie Sua Marca Aqui</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="relative overflow-hidden w-full py-3 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl border border-gray-200/80 shadow-sm mb-6">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

            <div className="animate-marquee flex items-center gap-4 py-2 px-4">
              {infiniteSponsors.map((sponsor, idx) => {
                const LogoComponent = resolveLogoComponent(sponsor.logoKey, sponsor.logoUrl);
                return (
                  <div
                    key={`${sponsor.id}-${idx}`}
                    onClick={() => {
                      if (sponsor.targetUrl?.trim()) {
                        window.open(sponsor.targetUrl.trim(), '_blank');
                      } else if (onOpenAdModal) {
                        onOpenAdModal();
                      }
                    }}
                    className="bg-white rounded-xl border border-gray-200 hover:border-[#006d3f] p-3 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3.5 shrink-0 min-w-[260px] sm:min-w-[290px] group cursor-pointer"
                    title={`${sponsor.brandName} • ${sponsor.headline}`}
                  >
                    <div className="w-28 sm:w-32 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center px-2 py-1 shrink-0 group-hover:scale-105 group-hover:bg-white transition-all">
                      <LogoComponent className="w-full h-8 max-h-8 object-contain" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <h4 className="text-xs sm:text-sm font-extrabold text-[#0b1c30] group-hover:text-[#006d3f] transition-colors truncate">
                          {sponsor.brandName}
                        </h4>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#23B26D] shrink-0" />
                      </div>
                      <p className="text-[10.5px] font-semibold text-gray-500 truncate">
                        {sponsor.headline}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                          {sponsor.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* FAIXA COMERCIAL PREMIUM DE CONTATO & WHATSAPP COM OS 2 SÓCIOS E REVEZAMENTO */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-[#004e28] via-[#006d3f] to-[#0E1B2B] text-white p-5 sm:p-7 shadow-md border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
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
              Posicione sua marca para milhares de produtores rurais, empresários e decisores
              econômicos em Rio Verde e todo o estado de Goiás.
            </p>
          </div>
        </div>

        {/* TELEFONES DE VALÉRIO DELFINO E DARIS DIAS + BOTÃO DE REVEZAMENTO */}
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
          <div className="text-center sm:text-right px-4 py-2.5 rounded-xl bg-black/25 border border-white/10 w-full sm:w-auto space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-gray-300 block font-bold">
              Atendimento Comercial (Rio Verde - GO):
            </span>
            {OFFICIAL_SITE_INFO.contacts.map((c) => (
              <div key={c.phoneWa} className="text-xs sm:text-sm font-extrabold text-[#7afbae]">
                {c.phoneDisplay} <span className="text-white font-semibold">• {c.name}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#23B26D] hover:bg-[#1fa162] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </button>
            {onOpenAdModal && (
              <button
                type="button"
                onClick={onOpenAdModal}
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center gap-1.5 cursor-pointer"
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
