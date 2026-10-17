import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Building2,
  Scale,
  Calendar,
  Compass,
} from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  onOpenAdModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick, onOpenAdModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hubsDropdownOpen, setHubsDropdownOpen] = useState(false);
  const location = useLocation();

  // As 6 categorias oficiais solicitadas pelo cliente
  const categoryLinks = [
    { path: '/categoria/agro', label: 'AGRO' },
    { path: '/categoria/cidade', label: 'CIDADE' },
    { path: '/categoria/politica', label: 'POLÍTICA' },
    { path: '/categoria/saude-e-bem-estar', label: 'SAÚDE' },
    { path: '/categoria/economia', label: 'ECONOMIA' },
    { path: '/categoria/geo-politica', label: 'GEOPOLÍTICA' },
  ];

  // Os 3 ambientes especiais
  const specialHubs = [
    {
      path: '/hub/empresarial',
      label: 'Conexão Empresarial',
      desc: 'Hub B2B e Empresas',
      icon: Building2,
      color: 'text-emerald-400',
    },
    {
      path: '/hub/lei',
      label: 'Conexão com a Lei',
      desc: 'Artigos e Colunas Jurídicas',
      icon: Scale,
      color: 'text-blue-400',
    },
    {
      path: '/agenda-eventos',
      label: 'Agenda de Eventos',
      desc: 'Calendário de Feiras e Feiras',
      icon: Calendar,
      color: 'text-amber-400',
    },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isHubActive =
    location.pathname.startsWith('/hub/') || location.pathname === '/agenda-eventos';

  return (
    <div className="w-full bg-[#0E1B2B] text-white border-b border-white/10 relative z-30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 group-hover:border-[#23B26D] transition-colors">
            <Compass className="w-6 h-6 text-[#7afbae]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl sm:text-2xl uppercase tracking-tight font-extrabold text-white">
              CONEXÕES
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#7afbae] font-bold">
              EM FOCO • GOIÁS
            </span>
          </div>
        </Link>

        {/* NAVEGAÇÃO DESKTOP: CATEGORIAS OFICIAIS */}
        <nav className="hidden xl:flex items-center gap-6 h-full">
          <Link
            to="/"
            className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors py-2 border-b-2 ${
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
                className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors py-2 border-b-2 ${
                  active
                    ? 'text-[#7afbae] border-[#7afbae]'
                    : 'text-gray-300 hover:text-white border-transparent'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* DROPDOWN DOS 3 AMBIENTES ESPECIAIS ("CONEXÕES ▾") */}
          <div
            className="relative"
            onMouseEnter={() => setHubsDropdownOpen(true)}
            onMouseLeave={() => setHubsDropdownOpen(false)}
          >
            <button
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                isHubActive
                  ? 'bg-[#23B26D] text-white border-[#23B26D]'
                  : 'bg-white/10 hover:bg-white/15 text-[#7afbae] border-white/20'
              }`}
            >
              <span>CONEXÕES</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Menu Suspenso */}
            {hubsDropdownOpen && (
              <div className="absolute right-0 top-full pt-2 w-64 z-50 animate-fade-in">
                <div className="bg-[#0B1522] border border-white/15 rounded-xl shadow-2xl p-2 space-y-1">
                  {specialHubs.map((hub) => {
                    const HubIcon = hub.icon;
                    return (
                      <Link
                        key={hub.path}
                        to={hub.path}
                        onClick={() => setHubsDropdownOpen(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
                          isActive(hub.path)
                            ? 'bg-white/15 text-white'
                            : 'hover:bg-white/10 text-gray-200'
                        }`}
                      >
                        <HubIcon className={`w-5 h-5 shrink-0 mt-0.5 ${hub.color}`} />
                        <div>
                          <div className="text-xs font-bold text-white uppercase">
                            {hub.label}
                          </div>
                          <div className="text-[11px] text-gray-400 font-normal">
                            {hub.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* AÇÕES DA DIREITA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Busca */}
          <button
            onClick={onSearchClick}
            aria-label="Buscar"
            className="p-2 text-gray-300 hover:text-white rounded-lg transition-colors flex items-center justify-center hover:bg-white/10"
            type="button"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Botão Anuncie Conosco */}
          {onOpenAdModal && (
            <button
              onClick={onOpenAdModal}
              className="hidden sm:inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-white border border-[#23B26D] bg-[#23B26D]/20 hover:bg-[#23B26D] px-3.5 py-2 rounded-xl transition-all shadow-sm whitespace-nowrap"
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
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* DRAWER MOBILE */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A1420] border-t border-white/10 px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Seção Ambientes Especiais no Mobile */}
          <div className="pb-3 border-b border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7afbae] block mb-2">
              AMBIENTES ESPECIAIS:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {specialHubs.map((hub) => {
                const HubIcon = hub.icon;
                return (
                  <Link
                    key={hub.path}
                    to={hub.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg text-xs font-bold uppercase ${
                      isActive(hub.path)
                        ? 'bg-[#23B26D] text-white'
                        : 'bg-white/5 text-gray-200 hover:bg-white/10'
                    }`}
                  >
                    <HubIcon className="w-4 h-4 text-[#7afbae]" />
                    <span>{hub.label}</span>
                  </Link>
                );
              })}
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
