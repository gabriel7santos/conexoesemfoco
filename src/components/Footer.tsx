import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenAdModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdModal }) => {
  return (
    <footer className="w-full bg-[#08101A] text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Coluna 1: Marca, Endereço & Redes Sociais (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 border border-white/20">
                <Compass className="w-5 h-5 text-[#7afbae]" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl uppercase tracking-tight font-extrabold text-white">
                  CONEXÕES
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#7afbae] font-bold">
                  EM FOCO • GOIÁS
                </span>
              </div>
            </Link>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Liderança em jornalismo analítico, inteligência de agronegócios e decisões econômicas
              em Goiás e no Centro-Oeste brasileiro.
            </p>

            <div className="flex items-center gap-2 text-gray-400 text-xs pt-1">
              <MapPin className="w-4 h-4 text-[#7afbae] shrink-0" />
              <span>Av. Dep. Jamel Cecílio, Jardim Goiás, Goiânia – GO</span>
            </div>

            {/* Ícones de Redes Sociais no Rodapé */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Siga nossas redes:
              </span>
              <div className="flex items-center gap-3 text-white">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('YouTube oficial em breve!');
                  }}
                  title="YouTube"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Facebook oficial em breve!');
                  }}
                  title="Facebook"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Instagram oficial em breve!');
                  }}
                  title="Instagram"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Coluna 2: Editorias Oficiais (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7afbae]">
              EDITORIAS
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link to="/categoria/agro" className="hover:text-white transition-colors">
                  Agro & Agronegócios
                </Link>
              </li>
              <li>
                <Link to="/categoria/cidade" className="hover:text-white transition-colors">
                  Cidade & Polos Regionais
                </Link>
              </li>
              <li>
                <Link to="/categoria/politica" className="hover:text-white transition-colors">
                  Política Estadual
                </Link>
              </li>
              <li>
                <Link to="/categoria/saude-e-bem-estar" className="hover:text-white transition-colors">
                  Saúde e Bem-Estar
                </Link>
              </li>
              <li>
                <Link to="/categoria/economia" className="hover:text-white transition-colors">
                  Economia & Mercado
                </Link>
              </li>
              <li>
                <Link to="/categoria/geo-politica" className="hover:text-white transition-colors">
                  Geo Política & Relações Exteriores
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Ambientes Conexões (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7afbae]">
              CONEXÕES
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link to="/hub/empresarial" className="hover:text-white transition-colors font-medium">
                  Conexão Empresarial
                </Link>
              </li>
              <li>
                <Link to="/hub/lei" className="hover:text-white transition-colors font-medium">
                  Conexão com a Lei
                </Link>
              </li>
              <li>
                <Link to="/agenda-eventos" className="hover:text-white transition-colors font-medium">
                  Agenda de Eventos
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Publicidade & Mídia Kit (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7afbae]">
              COMERCIAL & ANÚNCIOS
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Posicione sua marca e produtos no portal que conecta tomadores de decisão em todo o estado de Goiás.
            </p>
            {onOpenAdModal && (
              <button
                onClick={onOpenAdModal}
                className="mt-1 w-full py-2.5 rounded-xl bg-[#23B26D] hover:bg-[#1fa162] text-white text-xs font-bold uppercase tracking-wider transition-all shadow"
              >
                Solicitar Mídia Kit
              </button>
            )}
          </div>
        </div>

        {/* Linha Inferior com Copyright e Links Jurídicos LGPD */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Conexões em FOCO Comunicação Ltda. Todos os direitos reservados. Goiânia / Rio Verde – Goiás.</p>
          <div className="flex items-center gap-6">
            <Link to="/termos-de-uso" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link to="/privacidade-lgpd" className="hover:text-white transition-colors">
              Política de Privacidade & LGPD
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
