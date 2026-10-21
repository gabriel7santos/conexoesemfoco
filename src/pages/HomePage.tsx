import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { TopicsRail } from '../components/TopicsRail';
import { WeatherSectionCanalRural } from '../components/WeatherSectionCanalRural';
import { NewsGrid } from '../components/NewsGrid';
import { SpecialHubsSection } from '../components/SpecialHubsSection';
import { SponsorsCarousel } from '../components/SponsorsCarousel';
import { AdBanner } from '../components/AdBanner';
import { SquareBannersSection } from '../components/SquareBannersSection';
import { usePortalData } from '../context/PortalDataContext';
import { Article } from '../types';

interface HomePageProps {
  onOpenAdModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAdModal }) => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('todos');
  const { articles, mainFeaturedArticle, secondaryLeadArticles } = usePortalData();

  // Filtragem inteligente por tópicos
  const displayedArticles = useMemo(() => {
    const secondaryIds = new Set(secondaryLeadArticles.map((s) => s.id));
    if (selectedTopic === 'todos') {
      return articles
        .filter((a) => a.id !== mainFeaturedArticle?.id && !secondaryIds.has(a.id))
        .slice(0, 6);
    }
    if (selectedTopic === 'agro') {
      return articles.filter((a) => a.category.toLowerCase().includes('agro'));
    }
    if (selectedTopic === 'cidade') {
      return articles.filter((a) => a.category.toLowerCase().includes('cidade'));
    }
    if (selectedTopic === 'politica') {
      return articles.filter((a) => a.category.toLowerCase().includes('pol'));
    }
    if (selectedTopic === 'saude') {
      return articles.filter((a) => a.category.toLowerCase().includes('saúde'));
    }
    if (selectedTopic === 'economia') {
      return articles.filter((a) => a.category.toLowerCase().includes('economia'));
    }
    if (selectedTopic === 'geopolitica') {
      return articles.filter((a) => a.category.toLowerCase().includes('geo'));
    }
    if (selectedTopic === 'empresarial') {
      return articles.filter((a) => a.hubType === 'empresarial');
    }
    if (selectedTopic === 'lei') {
      return articles.filter((a) => a.hubType === 'lei');
    }
    return articles.slice(3, 9);
  }, [selectedTopic, articles, mainFeaturedArticle, secondaryLeadArticles]);

  const handleArticleClick = (article: Article) => {
    navigate(`/materia/${article.id}`);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 w-full">
        {/* ESPAÇO PUBLICITÁRIO: SUPERBANNER ROTATIVO */}
        <AdBanner
          type="leaderboard"
          variant="rotating"
          onOpenAdModal={onOpenAdModal}
          className="mb-6"
        />

        {/* SEÇÃO HERO (MANCHETE PRINCIPAL + 2 CARDS SECUNDÁRIOS) */}
        <HeroSection
          mainArticle={mainFeaturedArticle}
          secondaryArticles={secondaryLeadArticles}
          onArticleClick={handleArticleClick}
        />

        {/* BARRA HORIZONTAL DE TEMAS EM DESTAQUE */}
        <TopicsRail
          selectedTopic={selectedTopic}
          onSelectTopic={(topic) => setSelectedTopic(topic)}
        />

        {/* SEÇÃO DO TEMPO MODELO CANAL RURAL */}
        <WeatherSectionCanalRural />

        {/* GRADE EDITORIAL DE NOTÍCIAS, ARTIGOS E COTAÇÕES DO CANAL RURAL */}
        <NewsGrid
          articles={displayedArticles}
          onArticleClick={handleArticleClick}
        />

        {/* VITRINE DE BANNERS QUADRADOS (MREC 300x300) */}
        <SquareBannersSection
          onOpenAdModal={onOpenAdModal}
          className="mb-10"
        />

        {/* SEÇÃO ESPECIAL DOS 3 AMBIENTES (CONEXÃO EMPRESARIAL, COM A LEI, AGENDA DE EVENTOS) */}
        <SpecialHubsSection />

        {/* CARROSSEL DE ANUNCIANTES & MARCAS PARCEIRAS */}
        <SponsorsCarousel onOpenAdModal={onOpenAdModal} className="mt-4" />
      </div>
    </div>
  );
};
