import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { TopicsRail } from '../components/TopicsRail';
import { NewsGrid } from '../components/NewsGrid';
import { NewsletterSection } from '../components/NewsletterSection';
import {
  mainFeaturedArticle,
  secondaryLeadArticles,
  curatedNewsArticles,
} from '../data/mockNews';
import { Article } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('todos');

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

  const handleArticleClick = (article: Article) => {
    navigate(`/materia/${article.id}`);
  };

  const handleTopicSelect = (topic: string) => {
    if (topic === 'agro' || topic === 'economia' || topic === 'entrevistas') {
      // Também pode navegar para a página inteira da editoria se quiser
      setSelectedTopic(topic);
    } else {
      setSelectedTopic(topic);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 w-full">
        {/* SEÇÃO HERO (MANCHETE PRINCIPAL + 2 CARDS SECUNDÁRIOS) */}
        <HeroSection
          mainArticle={mainFeaturedArticle}
          secondaryArticles={secondaryLeadArticles}
          onArticleClick={handleArticleClick}
        />

        {/* BARRA HORIZONTAL DE TEMAS EM DESTAQUE (PÍLULAS) */}
        <TopicsRail
          selectedTopic={selectedTopic}
          onSelectTopic={handleTopicSelect}
        />

        {/* GRADE EDITORIAL DE ÚLTIMAS NOTÍCIAS */}
        <NewsGrid
          articles={displayedCuratedNews}
          onArticleClick={handleArticleClick}
        />

        {/* SEÇÃO BOLETIM & NEWSLETTER */}
        <NewsletterSection />
      </div>
    </div>
  );
};
