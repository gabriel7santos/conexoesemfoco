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
  const {
    articles,
    mainFeaturedArticle,
    secondaryLeadArticles,
    getArticlesByCategory,
    getArticlesByHub,
  } = usePortalData();

  // Filtragem inteligente e dinâmica por editorias cadastradas no banco
  const displayedArticles = useMemo(() => {
    const secondaryIds = new Set(secondaryLeadArticles.map((s) => s.id));
    if (selectedTopic === 'todos') {
      return articles
        .filter((a) => a.id !== mainFeaturedArticle?.id && !secondaryIds.has(a.id))
        .slice(0, 6);
    }
    if (selectedTopic === 'empresarial') {
      return getArticlesByHub('empresarial');
    }
    if (selectedTopic === 'lei') {
      return getArticlesByHub('lei');
    }
    return getArticlesByCategory(selectedTopic);
  }, [
    selectedTopic,
    articles,
    mainFeaturedArticle,
    secondaryLeadArticles,
    getArticlesByCategory,
    getArticlesByHub,
  ]);

  const handleArticleClick = (article: Article) => {
    navigate(`/materia/${article.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-8">
      {/* 1. SUPERBANNER PUBLICITÁRIO DE TOPO (SÓ EXIBE SE HOUVER PATROCINADOR CADASTRADO) */}
      <AdBanner
        type="leaderboard"
        variant="rotating"
        autoRotateInterval={5500}
        onOpenAdModal={onOpenAdModal}
        className="mb-6"
      />

      {/* 2. TRILHO DE EDITORIAS DINÂMICAS */}
      <TopicsRail selectedTopic={selectedTopic} onSelectTopic={setSelectedTopic} />

      {/* 3. MANCHETE PRINCIPAL + 2 SECUNDÁRIAS (SÓ EXIBE QUANDO HOUVER MATÉRIA CADASTRADA) */}
      {mainFeaturedArticle && (
        <HeroSection
          mainArticle={mainFeaturedArticle}
          secondaryArticles={secondaryLeadArticles}
          onArticleClick={handleArticleClick}
        />
      )}

      {/* 4. GRADE DE NOTÍCIAS + WIDGET DE COTAÇÕES AUTOMÁTICAS */}
      <NewsGrid articles={displayedArticles} onArticleClick={handleArticleClick} />

      {/* 5. VITRINE DE BANNERS QUADRADOS 300x300 (SÓ EXIBE SE HOUVER BANNER CADASTRADO) */}
      <SquareBannersSection onOpenAdModal={onOpenAdModal} limit={3} />

      {/* 6. PREVISÃO DO TEMPO AUTOMÁTICA (GOIÁS) */}
      <WeatherSectionCanalRural />

      {/* 7. BANNER ROTATIVO INTERMEDIÁRIO (SÓ EXIBE SE HOUVER PATROCINADOR CADASTRADO) */}
      <AdBanner
        type="leaderboard"
        variant="rotating"
        autoRotateInterval={6500}
        onOpenAdModal={onOpenAdModal}
        className="mb-12"
      />

      {/* 8. OS 3 AMBIENTES ESPECIAIS CONEXÕES */}
      <SpecialHubsSection />

      {/* 9. FAIXA COMERCIAL WHATSAPP & PATROCINADORES */}
      <SponsorsCarousel onOpenAdModal={onOpenAdModal} />
    </div>
  );
};
