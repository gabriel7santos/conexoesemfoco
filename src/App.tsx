import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { LgpdBanner } from './components/LgpdBanner';
import { AdModal } from './components/AdModal';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { HubPage } from './pages/HubPage';
import { EventsPage } from './pages/EventsPage';
import { LgpdPage } from './pages/LgpdPage';
import { TermsPage } from './pages/TermsPage';
import { allArticles } from './data/mockNews';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  // Filtragem de busca em todas as matérias
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return allArticles;
    const q = searchQuery.toLowerCase();
    return allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle?.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="bg-[#f8f9ff] font-sans text-[#0b1c30] min-h-screen flex flex-col antialiased">
      <ScrollToTop />

      {/* HEADER FIXO SUPERIOR COM COTAÇÕES E CLIMA */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full shadow-[0_8px_24px_-4px_rgba(14,27,43,0.12)]">
        <TopBar onOpenAdModal={() => setIsAdModalOpen(true)} />
        <Header
          onSearchClick={() => setIsSearchOpen(true)}
          onOpenAdModal={() => setIsAdModalOpen(true)}
        />
      </header>

      {/* ÁREA DE CONTEÚDO PRINCIPAL COM PADDING TOP PARA COMPENSAR O HEADER FIXO */}
      <main className="w-full flex-1 pt-[116px] bg-[#F8FAFC]">
        <Routes>
          <Route path="/" element={<HomePage onOpenAdModal={() => setIsAdModalOpen(true)} />} />
          <Route
            path="/materia/:id"
            element={<ArticlePage onOpenAdModal={() => setIsAdModalOpen(true)} />}
          />
          <Route
            path="/categoria/:slug"
            element={<CategoryPage onOpenAdModal={() => setIsAdModalOpen(true)} />}
          />
          <Route path="/hub/:type" element={<HubPage />} />
          <Route path="/agenda-eventos" element={<EventsPage />} />
          <Route path="/privacidade-lgpd" element={<LgpdPage />} />
          <Route path="/termos-de-uso" element={<TermsPage />} />
          {/* Rota de fallback */}
          <Route path="*" element={<HomePage onOpenAdModal={() => setIsAdModalOpen(true)} />} />
        </Routes>
      </main>

      {/* RODAPÉ INSTITUCIONAL */}
      <Footer onOpenAdModal={() => setIsAdModalOpen(true)} />

      {/* BANNER FLUTUANTE DE CONSENTIMENTO LGPD */}
      <LgpdBanner />

      {/* MODAL DE PUBLICIDADE & MÍDIA KIT */}
      <AdModal isOpen={isAdModalOpen} onClose={() => setIsAdModalOpen(false)} />

      {/* MODAL DE BUSCA RÁPIDA */}
      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 overflow-hidden border border-gray-100 animate-fade-in"
          >
            <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
              <Search className="w-6 h-6 text-[#006d3f] shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar notícias, agro, cotações, política, Rio Verde..."
                className="w-full text-base sm:text-lg text-[#0b1c30] placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto mt-4 space-y-2">
              {filteredArticles.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-6">
                  Nenhum resultado encontrado para "{searchQuery}".
                </p>
              ) : (
                filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate(`/materia/${art.id}`);
                    }}
                    className="p-3 rounded-xl hover:bg-gray-50 cursor-pointer flex items-center justify-between gap-4 transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#006d3f] bg-emerald-50 px-2 py-0.5 rounded">
                        {art.category}
                      </span>
                      <h4 className="text-sm font-semibold text-gray-800 line-clamp-1 mt-1">
                        {art.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
};

export default App;
