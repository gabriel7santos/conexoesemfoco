import React, { useState, useMemo } from 'react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TopicsRail } from './components/TopicsRail';
import { NewsGrid } from './components/NewsGrid';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import {
  mainFeaturedArticle,
  secondaryLeadArticles,
  curatedNewsArticles,
} from './data/mockNews';
import { Article } from './types';

export const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('todos');
  const [activeCategory, setActiveCategory] = useState('inicio');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [subscribeName, setSubscribeName] = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeDone, setSubscribeDone] = useState(false);

  // Todos os artigos juntos para busca
  const allArticles = useMemo(() => {
    return [mainFeaturedArticle, ...secondaryLeadArticles, ...curatedNewsArticles];
  }, []);

  // Filtragem por busca
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return allArticles;
    const q = searchQuery.toLowerCase();
    return allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle?.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [allArticles, searchQuery]);

  // Filtragem por tópico das pílulas
  const displayedCuratedNews = useMemo(() => {
    if (selectedTopic === 'todos') return curatedNewsArticles;
    if (selectedTopic === 'agro') {
      return curatedNewsArticles.filter((a) => a.category === 'AGRO');
    }
    if (selectedTopic === 'economia' || selectedTopic === 'cotacoes') {
      return curatedNewsArticles.filter(
        (a) => a.category === 'ECONOMIA' || a.category === 'AGRO'
      );
    }
    if (selectedTopic === 'entrevistas') {
      return curatedNewsArticles.filter((a) => a.category === 'ENTREVISTAS');
    }
    return curatedNewsArticles;
  }, [selectedTopic]);

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'inicio') {
      setSelectedTopic('todos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (cat === 'agro') {
      setSelectedTopic('agro');
    } else if (cat === 'economia') {
      setSelectedTopic('economia');
    } else if (cat === 'entrevistas') {
      setSelectedTopic('entrevistas');
    }
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setSubscribeDone(true);
    setTimeout(() => {
      setIsSubscribeModalOpen(false);
      setSubscribeDone(false);
      setSubscribeName('');
      setSubscribeEmail('');
    }, 2500);
  };

  return (
    <div className="bg-[#f8f9ff] font-sans text-[#0b1c30] min-h-screen flex flex-col antialiased">
      {/* HEADER FIXO SUPERIOR */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full shadow-[0_8px_24px_-4px_rgba(14,27,43,0.12)]">
        <TopBar />
        <Header
          onSearchClick={() => setIsSearchOpen(true)}
          onSubscribeClick={() => setIsSubscribeModalOpen(true)}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
        />
      </header>

      {/* CONTEÚDO PRINCIPAL (COM PADDING TOP PARA COMPENSAR O HEADER FIXO DE 116PX) */}
      <main className="w-full flex-1 pt-[124px] bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 w-full">
          {/* SEÇÃO HERO (MANCHETE PRINCIPAL + 2 CARDS SECUNDÁRIOS) */}
          <HeroSection
            mainArticle={mainFeaturedArticle}
            secondaryArticles={secondaryLeadArticles}
            onArticleClick={(article) => setActiveArticle(article)}
          />

          {/* BARRA HORIZONTAL DE TEMAS EM DESTAQUE (PÍLULAS) */}
          <TopicsRail
            selectedTopic={selectedTopic}
            onSelectTopic={(topic) => setSelectedTopic(topic)}
          />

          {/* GRADE EDITORIAL DE ÚLTIMAS NOTÍCIAS */}
          <NewsGrid
            articles={displayedCuratedNews}
            onArticleClick={(article) => setActiveArticle(article)}
          />

          {/* SEÇÃO BOLETIM & NEWSLETTER */}
          <NewsletterSection />
        </div>
      </main>

      {/* RODAPÉ INSTITUCIONAL */}
      <Footer />

      {/* MODAL DE LEITURA COMPLETA DA MATÉRIA */}
      <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />

      {/* MODAL DE BUSCA RÁPIDA */}
      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 overflow-hidden border border-gray-100"
          >
            <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
              <span className="material-symbols-outlined text-[24px] text-[#006d3f]">search</span>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar notícias, cotações, agro, Rio Verde..."
                className="w-full text-base sm:text-lg text-[#0b1c30] placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
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
                      setActiveArticle(art);
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
                    <span className="material-symbols-outlined text-[18px] text-gray-400">
                      arrow_forward
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL CADASTRE-SE VIP */}
      {isSubscribeModalOpen && (
        <div
          onClick={() => setIsSubscribeModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative border border-gray-100"
          >
            <button
              onClick={() => setIsSubscribeModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#0f1c2c] text-[#7afbae] flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-[28px]">mark_email_read</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#0b1c30]">Cadastre-se no Conexões VIP</h3>
              <p className="text-xs text-gray-500 mt-1">
                Acesso exclusivo a relatórios de safras, cotações antecipadas e notícias de Goiás.
              </p>
            </div>

            {subscribeDone ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-center font-bold text-sm">
                🎉 Cadastro realizado com sucesso! Bem-vindo ao Conexões em FOCO.
              </div>
            ) : (
              <form onSubmit={handleSubscribeSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    required
                    value={subscribeName}
                    onChange={(e) => setSubscribeName(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#006d3f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    E-mail Corporativo
                  </label>
                  <input
                    type="email"
                    required
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    placeholder="joao@suaempresa.com.br"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#006d3f]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#006d3f] hover:bg-[#00522e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md mt-2"
                >
                  Concluir Cadastro Gratuito
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
