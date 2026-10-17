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
import {
  mainFeaturedArticle,
  secondaryLeadArticles,
  allArticles,
} from '../data/mockNews';
import { Article } from '../types';

interface HomePageProps {
  onOpenAdModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAdModal }) => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('todos');

  // Filtragem inteligente por tópicos
  const displayedArticles = useMemo(() => {
    if (selectedTopic === 'todos') {
      return allArticles.filter((a) => !a.isMainLead && !a.isSecondaryLead).slice(0, 6);
    }
    if (selectedTopic === 'agro') {
      return allArticles.filter((a) => a.category.toLowerCase().includes('agro'));
    }
    if (selectedTopic === 'cidade') {
      return allArticles.filter((a) => a.category.toLowerCase().includes('cidade'));
    }
    if (selectedTopic === 'politica') {
      return allArticles.filter((a) => a.category.toLowerCase().includes('pol'));
    }
    if (selectedTopic === 'saude') {
      return allArticles.filter((a) => a.category.toLowerCase().includes('saúde'));
    }
    if (selectedTopic === 'economia') {
      return allArticles.filter((a) => a.category.toLowerCase().includes('economia'));
    }
    if (selectedTopic === 'geopolitica') {
      return allArticles.filter((a) => a.category.toLowerCase().includes('geo'));
    }
    if (selectedTopic === 'empresarial') {
      return allArticles.filter((a) => a.hubType === 'empresarial');
    }
    if (selectedTopic === 'lei') {
      return allArticles.filter((a) => a.hubType === 'lei');
    }
    return allArticles.slice(3, 9);
  }, [selectedTopic]);

  const handleArticleClick = (article: Article) => {
    navigate(`/materia/${article.id}`);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 w-full">
        {/* ESPAÇO PUBLICITÁRIO: SUPERBANNER ROTATIVO (MOSTRA VÁRIOS ANUNCIANTES RODANDO COM LOGOS REAIS) */}
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

        {/* BARRA HORIZONTAL DE TEMAS EM DESTAQUE (PÍLULAS DAS 6 CATEGORIAS) */}
        <TopicsRail
          selectedTopic={selectedTopic}
          onSelectTopic={(topic) => setSelectedTopic(topic)}
        />

        {/* SEÇÃO DO TEMPO MODELO CANAL RURAL (PREVISÃO DE CHUVAS 7 DIAS + TENDÊNCIA 7 MESES) */}
        <WeatherSectionCanalRural />

        {/* GRADE EDITORIAL DE NOTÍCIAS, ARTIGOS E COTAÇÕES DO CANAL RURAL */}
        <NewsGrid
          articles={displayedArticles}
          onArticleClick={handleArticleClick}
        />

        {/* VITRINE DE BANNERS QUADRADOS (MREC 300x300 DAS PRINCIPAIS MARCAS DE GOIÁS) */}
        <SquareBannersSection
          onOpenAdModal={onOpenAdModal}
          className="mb-10"
        />

        {/* SEÇÃO ESPECIAL DOS 3 AMBIENTES (CONEXÃO EMPRESARIAL, COM A LEI, AGENDA DE EVENTOS) */}
        <SpecialHubsSection />

        {/* CARROSSEL DE ANUNCIANTES & MARCAS PARCEIRAS + FAIXA COMERCIAL WHATSAPP */}
        <SponsorsCarousel onOpenAdModal={onOpenAdModal} className="mt-4" />
      </div>
    </div>
  );
};
