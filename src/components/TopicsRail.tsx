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
} from 'lucide-react';

interface TopicsRailProps {
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
}

export const TopicsRail: React.FC<TopicsRailProps> = ({ selectedTopic, onSelectTopic }) => {
  const topics = [
    { id: 'todos', label: 'Todos os Temas', Icon: LayoutGrid },
    { id: 'agro', label: 'Agro', Icon: Sprout, badge: 'EM ALTA' },
    { id: 'cidade', label: 'Cidade', Icon: Building },
    { id: 'politica', label: 'Política', Icon: Landmark },
    { id: 'saude', label: 'Saúde & Bem-Estar', Icon: HeartPulse },
    { id: 'economia', label: 'Economia', Icon: TrendingUp },
    { id: 'geopolitica', label: 'Geo Política', Icon: Globe2 },
    { id: 'empresarial', label: 'Empresarial', Icon: Briefcase },
    { id: 'lei', label: 'Com a Lei', Icon: Scale },
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
              className={`group shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all ${
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
