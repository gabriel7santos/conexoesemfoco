import React from 'react';

interface TopicsRailProps {
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
}

export const TopicsRail: React.FC<TopicsRailProps> = ({ selectedTopic, onSelectTopic }) => {
  const topics = [
    { id: 'todos', label: 'Todos os Temas', icon: 'grid_view' },
    { id: 'agro', label: 'Agro', icon: 'potted_plant', badge: 'EM ALTA' },
    { id: 'economia', label: 'Economia', icon: 'analytics' },
    { id: 'regiao', label: 'Região', icon: 'pin_drop' },
    { id: 'entrevistas', label: 'Entrevistas', icon: 'mic' },
    { id: 'eventos', label: 'Eventos', icon: 'event' },
    { id: 'tecnologia', label: 'Tecnologia no Campo', icon: 'precision_manufacturing' },
    { id: 'cotacoes', label: 'Cotações', icon: 'currency_exchange' },
  ];

  return (
    <section aria-label="Temas em Destaque" className="w-full mb-8">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 shrink-0 pr-2 border-r border-gray-200">
          <span className="material-symbols-outlined text-[20px] text-[#006d3f]">trending_up</span>
          <span className="text-[12px] uppercase tracking-wider text-gray-600 font-extrabold">
            TEMAS EM DESTAQUE:
          </span>
        </div>

        {topics.map((topic) => {
          const isSelected = selectedTopic === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              type="button"
              className={`group shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all ${
                isSelected
                  ? 'bg-[#0E1B2B] text-white shadow-md'
                  : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[17px] ${
                  isSelected ? 'text-[#7afbae]' : 'text-[#006d3f]'
                }`}
              >
                {topic.icon}
              </span>
              <span>{topic.label}</span>
              {topic.badge && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#77f8ac] text-[#00210f] text-[10px] font-extrabold uppercase tracking-wide">
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
