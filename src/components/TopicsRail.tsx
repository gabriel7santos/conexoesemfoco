import React from 'react';

interface TopicsRailProps {
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
}

export const TopicsRail: React.FC<TopicsRailProps> = ({ selectedTopic, onSelectTopic }) => {
  const topics = [
    { id: 'todos', label: 'Todos os Temas', icon: 'grid_view' },
    { id: 'agro', label: 'Agro', icon: 'potted_plant', badge: 'EM ALTA' },
    { id: 'cidade', label: 'Cidade', icon: 'location_city' },
    { id: 'politica', label: 'Política', icon: 'policy' },
    { id: 'saude', label: 'Saúde & Bem-Estar', icon: 'health_and_safety' },
    { id: 'economia', label: 'Economia', icon: 'analytics' },
    { id: 'geopolitica', label: 'Geo Política', icon: 'public' },
    { id: 'empresarial', label: 'Empresarial', icon: 'corporate_fare' },
    { id: 'lei', label: 'Com a Lei', icon: 'balance' },
  ];

  return (
    <section aria-label="Temas em Destaque" className="w-full mb-8">
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 shrink-0 pr-2 border-r border-gray-200">
          <span className="material-symbols-outlined text-[20px] text-[#006d3f]">trending_up</span>
          <span className="text-[11.5px] uppercase tracking-wider text-gray-700 font-extrabold">
            EDITORIAS:
          </span>
        </div>

        {topics.map((topic) => {
          const isSelected = selectedTopic === topic.id;
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
              <span
                className={`material-symbols-outlined text-[16px] ${
                  isSelected ? 'text-[#7afbae]' : 'text-[#006d3f]'
                }`}
              >
                {topic.icon}
              </span>
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
