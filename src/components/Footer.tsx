import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [radarEmail, setRadarEmail] = useState('');
  const [radarSent, setRadarSent] = useState(false);

  const handleRadarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!radarEmail) return;
    setRadarSent(true);
    setTimeout(() => {
      setRadarEmail('');
      setRadarSent(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#0E1B2B] text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Coluna 1: Marca & Endereço (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 border border-white/20">
                <span className="material-symbols-outlined text-[#7afbae] text-[22px]">
                  my_location
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl uppercase tracking-tight font-extrabold text-white">
                  CONEXÕES
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#7afbae] font-bold">
                  EM FOCO • GOIÁS
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Liderança em jornalismo analítico, inteligência de agronegócios e decisões econômicas
              em Goiás e no Centro-Oeste brasileiro.
            </p>

            <div className="flex items-center gap-2 text-gray-400 text-xs pt-2">
              <span className="material-symbols-outlined text-[18px] text-[#7afbae]">
                location_on
              </span>
              <span>Av. Dep. Jamel Cecílio, Jardim Goiás, Goiânia – GO</span>
            </div>
          </div>

          {/* Coluna 2: Editorias (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7afbae]">
              EDITORIAS
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Agronegócio & Commodities
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Economia & Finanças
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Política Estadual
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pólos Regionais
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Inovação no Campo
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Pólos de Cobertura (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7afbae]">
              PÓLOS DE COBERTURA
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Goiânia Metropolitana
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Rio Verde & Sudoeste
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Anápolis & Distrito Agro
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Jataí & Cristalina
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Norte & Vale do São Patrício
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Radar do Mercado (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7afbae]">
              RADAR DO MERCADO
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Receba os fechamentos de safras, cotações e inteligência goiana diariamente no seu e-mail.
            </p>
            <form onSubmit={handleRadarSubmit} className="flex flex-col gap-2 mt-1">
              {radarSent ? (
                <div className="p-2.5 rounded-lg bg-[#23B26D] text-white text-xs font-semibold text-center">
                  Inscrito no Radar!
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    required
                    value={radarEmail}
                    onChange={(e) => setRadarEmail(e.target.value)}
                    placeholder="Seu e-mail corporativo"
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#7afbae]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#23B26D] hover:bg-[#1fa162] text-white text-xs font-bold uppercase tracking-wider transition-all shadow"
                  >
                    ASSINAR RADAR
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Linha Inferior com Copyright e Links Jurídicos */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Conexões em FOCO Comunicação Ltda. Todos os direitos reservados. Goiânia – Goiás.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Expediente & Redação
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
