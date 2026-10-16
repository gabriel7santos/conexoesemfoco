import React from 'react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F8FAFC] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#006d3f] transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">home</span>
            <span>Início</span>
          </Link>
          <span>/</span>
          <span className="font-bold text-[#006d3f]">Termos de Uso</span>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 pb-6 border-b border-gray-100 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#0E1B2B] text-[#7afbae] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">description</span>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006d3f]">
                TERMOS & CONDIÇÕES
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30]">
                Termos de Uso do Portal Conexões em FOCO
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Regras e diretrizes para navegação e consumo de conteúdo editorial
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 text-sm leading-relaxed space-y-6">
            <section>
              <h2 className="text-base font-bold text-[#0b1c30] uppercase mb-2">
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao acessar e navegar pelo portal <strong>Conexões em FOCO</strong>, você concorda expressamente em cumprir estes Termos de Uso e todas as leis e regulamentos aplicáveis no território brasileiro.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0b1c30] uppercase mb-2">
                2. Propriedade Intelectual & Direitos Autorais
              </h2>
              <p>
                Todos os textos, reportagens, matérias investigativas, fotografias autorais, infográficos, logomarcas e marcas nominativas exibidas neste portal são de propriedade exclusiva da <strong>Conexões em FOCO Comunicação Ltda</strong> ou de seus parceiros e articulistas licenciados. É vedada a reprodução comercial sem prévia autorização e sem a devida citação da fonte original.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0b1c30] uppercase mb-2">
                3. Isenção sobre Cotações e Indicadores
              </h2>
              <p>
                As cotações de commodities (Boi Gordo, Soja, Milho, Dólar e insumos) veiculadas possuem caráter estritamente informativo e jornalístico. O portal não atua como corretora e não se responsabiliza por decisões comerciais ou financeiras tomadas com base exclusiva nos indicadores publicados.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0b1c30] uppercase mb-2">
                4. Conteúdos Patrocinados (Publieditoriais)
              </h2>
              <p>
                Em observância às diretrizes do CONAR (Conselho Nacional de Autorregulamentação Publicitária), todos os conteúdos pagos ou patrocinados são identificados com as tags <em>"Informe Publicitário"</em> ou <em>"Conteúdo Patrocinado"</em>, garantindo total clareza editorial ao leitor.
              </p>
            </section>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Goiânia – Goiás, Outubro de 2026</span>
              <Link to="/privacidade-lgpd" className="text-[#006d3f] font-bold hover:underline">
                Política de Privacidade &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
