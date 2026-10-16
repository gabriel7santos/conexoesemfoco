import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockEvents } from '../data/mockNews';

export const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState('Todos');

  const filteredEvents =
    filter === 'Todos'
      ? mockEvents
      : mockEvents.filter((ev) => ev.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="w-full bg-[#F8FAFC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#006d3f] transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">home</span>
            <span>Início</span>
          </Link>
          <span>/</span>
          <span className="font-bold uppercase text-[#006d3f]">Agenda de Eventos</span>
        </div>

        {/* HERO BANNER DA AGENDA */}
        <div className="bg-gradient-to-r from-[#0E1B2B] via-[#1E3A5F] to-[#0E1B2B] text-white rounded-2xl p-6 sm:p-10 mb-8 shadow-lg border border-white/10 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7afbae] text-xs font-bold uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              <span>Calendário Oficial de Goiás</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Agenda de Eventos & Feiras
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Fique por dentro das maiores feiras do agronegócio, fóruns empresariais, congressos jurídicos e eventos de destaque em Rio Verde, Goiânia, Jataí e região.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
            <span className="material-symbols-outlined text-[240px] text-white">event</span>
          </div>
        </div>

        {/* FILTROS DE CATEGORIA */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {['Todos', 'Agro', 'Negócios', 'Institucional'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                filter === cat
                  ? 'bg-[#006d3f] text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LISTA DE EVENTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={ev.imageUrl}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#006d3f] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                    {ev.category}
                  </span>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#7afbae]">
                      calendar_today
                    </span>
                    <span>{ev.date}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-lg font-bold text-[#0b1c30] group-hover:text-[#006d3f] transition-colors leading-snug">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {ev.description}
                  </p>

                  <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#006d3f]">
                        schedule
                      </span>
                      <span>{ev.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-red-500">
                        location_on
                      </span>
                      <span className="font-semibold text-gray-800">
                        {ev.location} — {ev.city}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => alert(`Informações do evento: ${ev.title}\nLocal: ${ev.location}, ${ev.city}\nData: ${ev.date}`)}
                  className="w-full py-2.5 rounded-xl bg-[#f8f9ff] hover:bg-[#006d3f] text-[#006d3f] hover:text-white border border-gray-200 hover:border-transparent text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Mais Detalhes do Evento</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
