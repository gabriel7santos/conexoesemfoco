import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onSearchClick: () => void;
  onOpenAdModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick, onOpenAdModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // As 6 categorias oficiais solicitadas pelo cliente
  const categoryLinks = [
    { path: '/categoria/agro', label: 'AGRO' },
    { path: '/categoria/cidade', label: 'CIDADE' },
    { path: '/categoria/politica', label: 'POLÍTICA' },
    { path: '/categoria/saude-e-bem-estar', label: 'SAÚDE & BEM-ESTAR' },
    { path: '/categoria/economia', label: 'ECONOMIA' },
    { path: '/categoria/geo-politica', label: 'GEO POLÍTICA' },
  ];

  // Os 3 ambientes especiais
  const specialHubs = [
    { path: '/hub/empresarial', label: 'EMPRESARIAL', icon: 'corporate_fare' },
    { path: '/hub/lei', label: 'COM A LEI', icon: 'balance' },
    { path: '/agenda-eventos', label: 'AGENDA', icon: 'calendar_month' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-full bg-[#0E1B2B] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 group-hover:border-[#23B26D] transition-colors">
            <span className="material-symbols-outlined text-[#7afbae] text-[24px]">
              my_location
            </span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl sm:text-2xl uppercase tracking-tight font-extrabold text-white">
              CONEXÕES
            </span>
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#7afbae] font-bold">
              EM FOCO • GOIÁS
            </span>
          </div>
        </Link>

        {/* NAVEGAÇÃO DESKTOP: CATEGORIAS OFICIAIS */}
        <nav className="hidden xl:flex items-center gap-5 h-full">
          <Link
            to="/"
            className={`text-xs font-bold uppercase tracking-wider transition-colors py-2 border-b-2 ${
              location.pathname === '/'
                ? 'text-[#7afbae] border-[#7afbae]'
                : 'text-gray-300 hover:text-white border-transparent'
            }`}
          >
            INÍCIO
          </Link>
          {categoryLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-bold uppercase tracking-wider transition-colors py-2 border-b-2 ${
                  active
                    ? 'text-[#7afbae] border-[#7afbae]'
                    : 'text-gray-300 hover:text-white border-transparent'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ATALHOS DOS 3 AMBIENTES ESPECIAIS + AÇÕES */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Pills dos Hubs Especiais (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl">
            {specialHubs.map((hub) => (
              <Link
                key={hub.path}
                to={hub.path}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold tracking-wider uppercase transition-all ${
                  isActive(hub.path)
                    ? 'bg-[#23B26D] text-white shadow'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">{hub.icon}</span>
                <span>{hub.label}</span>
              </Link>
            ))}
          </div>

          {/* Busca */}
          <button
            onClick={onSearchClick}
            aria-label="Buscar"
            className="p-2 text-gray-300 hover:text-white rounded-lg transition-colors flex items-center justify-center hover:bg-white/10"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Botão Anuncie Conosco */}
          {onOpenAdModal && (
            <button
              onClick={onOpenAdModal}
              className="hidden sm:inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-white border border-[#23B26D] bg-[#23B26D]/20 hover:bg-[#23B26D] px-3.5 py-2 rounded-xl transition-all shadow-sm"
              type="button"
            >
              ANUNCIE AQUI
            </button>
          )}

          {/* Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* DRAWER MOBILE */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A1420] border-t border-white/10 px-4 py-4 space-y-3 max-h-[85vh] overflow-y-auto">
          {/* Seção Ambientes Especiais no Mobile */}
          <div className="pb-3 border-b border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7afbae] block mb-2">
              AMBIENTES ESPECIAIS:
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {specialHubs.map((hub) => (
                <Link
                  key={hub.path}
                  to={hub.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs font-bold uppercase ${
                    isActive(hub.path)
                      ? 'bg-[#23B26D] text-white'
                      : 'bg-white/5 text-gray-200 hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{hub.icon}</span>
                  <span>Conexão {hub.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Categorias no Mobile */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
              EDITORIAS:
            </span>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-xs font-bold uppercase text-gray-200 hover:bg-white/10"
            >
              INÍCIO
            </Link>
            {categoryLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-3 rounded-lg text-xs font-semibold uppercase ${
                  isActive(item.path)
                    ? 'bg-white/10 text-[#7afbae]'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {onOpenAdModal && (
            <div className="pt-2">
              <button
                onClick={() => {
                  onOpenAdModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg bg-[#23B26D] text-white font-bold text-center uppercase tracking-wider text-xs shadow"
              >
                Anunciar no Conexões em FOCO
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
