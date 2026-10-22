import React from 'react';
import {
  LayoutGrid,
  Sprout,
  Building,
  Landmark,
  HeartPulse,
  TrendingUp,
  Globe2,
  Briefcase,
  Scale,
  Tag,
} from 'lucide-react';
import { usePortalData } from '../context/PortalDataContext';

interface TopicsRailProps {
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
}

function getCategoryIcon(slug: string) {
  if (slug.includes('agro')) return Sprout;
  if (slug.includes('cidade')) return Building;
  if (slug.includes('pol')) return Landmark;
  if (slug.includes('saude')) return HeartPulse;
  if (slug.includes('economia')) return TrendingUp;
  if (slug.includes('geo')) return Globe2;
  return Tag;
}

export const TopicsRail: React.FC<TopicsRailProps> = ({ selectedTopic, onSelectTopic }) => {
  const { categories } = usePortalData();
  const activeCats = categories.filter((c) => c.isActive !== false);

  const topics = [
    { id: 'todos', label: 'Todos os Temas', Icon: LayoutGrid, badge: undefined as string | undefined },
    ...activeCats.map((c, idx) => ({
      id: c.slug,
      label: c.name,
      Icon: getCategoryIcon(c.slug),
      badge: idx === 0 ? 'EM ALTA' : undefined,
    })),
    { id: 'empresarial', label: 'Empresarial', Icon: Briefcase, badge: undefined },
    { id: 'lei', label: 'Com a Lei', Icon: Scale, badge: undefined },
  ];

  return (
    <section aria-label="Temas em Destaque" className="w-full mb-8">
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 shrink-0 pr-2 border-r border-gray-200">
          <TrendingUp className="w-5 h-5 text-[#006d3f]" />
          <span className="text-[11.5px] uppercase tracking-wider text-gray-700 font-extrabold">
            EDITORIAS:
          </span>
        </div>

        {topics.map((topic) => {
          const isSelected = selectedTopic === topic.id;
          const TopicIcon = topic.Icon;
          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              type="button"
              className={`group shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#0E1B2B] text-white shadow-md'
                  : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200'
              }`}
            >
              <TopicIcon
                className={`w-4 h-4 ${
                  isSelected ? 'text-[#7afbae]' : 'text-[#006d3f]'
                }`}
              />
              <span>{topic.label}</span>
              {topic.badge && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#77f8ac] text-[#00210f] text-[9.5px] font-extrabold uppercase tracking-wide">
                  {topic.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
