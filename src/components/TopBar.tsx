import React from 'react';
import { mockQuotes, mockWeather } from '../data/mockNews';

export const TopBar: React.FC = () => {
  return (
    <div className="w-full bg-[#0B1522] border-b border-white/10 text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-9 flex items-center justify-between">
        {/* Ticker ao vivo */}
        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap py-1 scrollbar-none">
          <div className="flex items-center gap-2 pr-3 border-r border-white/10 shrink-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#23B26D] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#23B26D]"></span>
            </span>
            <span className="text-[11px] font-bold tracking-wider text-[#7afbae] uppercase">
              AO VIVO
            </span>
          </div>

          <div className="flex items-center gap-5 text-gray-300 text-[12px]">
            {mockQuotes.map((quote, idx) => (
              <React.Fragment key={quote.id}>
                <span>
                  {quote.name}: <strong className="text-white font-semibold">{quote.value}</strong>{' '}
                  {quote.variation && (
                    <span className={quote.isPositive ? 'text-[#23B26D]' : 'text-red-400'}>
                      {quote.variation}
                    </span>
                  )}
                </span>
                {idx < mockQuotes.length - 1 && <span className="text-white/20">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Clima e Links Rápidos */}
        <div className="hidden xl:flex items-center gap-5 shrink-0 pl-6 border-l border-white/10 text-gray-300 text-[12px]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-amber-400">wb_sunny</span>
            <span>
              {mockWeather[0].city} <strong>{mockWeather[0].temp}</strong> {mockWeather[0].condition}
            </span>
            <span className="text-white/20">|</span>
            <span>
              {mockWeather[1].city} <strong>{mockWeather[1].temp}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-white/70 pl-2 border-l border-white/10">
            <a
              href="#podcast"
              title="Podcasts"
              className="hover:text-white transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-[16px]">podcasts</span>
            </a>
            <a
              href="#boletim"
              title="Boletim"
              className="hover:text-white transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-[16px]">rss_feed</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
