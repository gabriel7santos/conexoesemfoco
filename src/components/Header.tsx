import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearchClick: () => void;
  onSubscribeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick, onSubscribeClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/', label: 'INÍCIO' },
    { path: '/categoria/noticias', label: 'NOTÍCIAS' },
    { path: '/categoria/agro', label: 'AGRO' },
    { path: '/categoria/economia', label: 'ECONOMIA' },
    { path: '/categoria/regiao', label: 'REGIÃO' },
    { path: '/categoria/entrevistas', label: 'ENTREVISTAS' },
    { path: '/categoria/eventos', label: 'EVENTOS' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <div className="w-full bg-[#0E1B2B] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 group-hover:border-[#23B26D] transition-colors">
            <span className="material-symbols-outlined text-[#7afbae] text-[24px]">my_location</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl sm:text-2xl uppercase tracking-tight font-extrabold text-white">
              CONEXÕES
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#7afbae] font-bold">
              EM FOCO • GOIÁS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[13px] font-bold uppercase tracking-wider transition-colors py-2 border-b-2 ${
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

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={onSearchClick}
            aria-label="Buscar"
            className="p-2 text-gray-300 hover:text-white rounded-lg transition-colors flex items-center justify-center hover:bg-white/10"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            onClick={onSubscribeClick}
            className="hidden sm:inline-flex items-center justify-center text-[12px] font-bold uppercase tracking-wider text-white border border-white/60 hover:bg-white/10 px-4 py-2 rounded-xl transition-all"
            type="button"
          >
            CADASTRE-SE
          </button>

          <div
            className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center border border-white/20 text-gray-300"
            title="Área do Leitor"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1420] border-t border-white/10 px-4 py-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors ${
                isActive(item.path)
                  ? 'bg-white/10 text-[#7afbae]'
                  : 'text-gray-200 hover:bg-white/10 hover:text-[#7afbae]'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                onSubscribeClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-[#23B26D] text-white font-bold text-center uppercase tracking-wider text-xs"
            >
              Receber Boletim Matinal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
