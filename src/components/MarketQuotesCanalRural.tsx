import React, { useState } from 'react';
import { TrendingUp, RefreshCw, ChevronRight } from 'lucide-react';
import { usePortalData } from '../context/PortalDataContext';
import { MarketQuote } from '../types';

interface MarketQuotesCanalRuralProps {
  className?: string;
  maxHeight?: string;
  onSelectQuote?: (quote: MarketQuote) => void;
}

export const MarketQuotesCanalRural: React.FC<MarketQuotesCanalRuralProps> = ({
  className = '',
  maxHeight = 'max-h-[460px]',
  onSelectQuote,
}) => {
  const { quotes: mockQuotes } = usePortalData();
  const [activeTab, setActiveTab] = useState<'todos' | 'fisico' | 'futuro' | 'cambio'>('todos');
  const [selectedItem, setSelectedItem] = useState<MarketQuote | null>(null);

  const filteredQuotes = mockQuotes.filter((q) => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'fisico') return q.category === 'fisico' || !q.category;
    if (activeTab === 'futuro') return q.category === 'futuro';
    if (activeTab === 'cambio') return q.category === 'cambio';
    return true;
  });

  const handleCardClick = (quote: MarketQuote) => {
    setSelectedItem(quote);
    if (onSelectQuote) onSelectQuote(quote);
  };

  return (
    <div
      className={`bg-[#F8FAFC] border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between ${className}`}
    >
      <div>
        {/* CABEÇALHO MODELO EXATO DO CANAL RURAL */}
        <div className="flex items-start justify-between gap-3 pb-3 mb-3 border-b border-gray-200">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#004E86] tracking-tight leading-none">
              Cotações - Mercado Físico
            </h3>
            <p className="text-[11px] text-gray-500 font-medium mt-1">
              Giro do Boi, Soja, Milho, Dólar e Commodities de Goiás
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#008844] text-[10px] font-extrabold uppercase tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-[#008844] animate-ping" />
              Ao Vivo
            </span>
          </div>
        </div>

        {/* ABAS DE NAVEGAÇÃO RÁPIDA (Mercado Físico / Futuro / Câmbio) */}
        <div className="flex items-center gap-1.5 pb-3 mb-2 overflow-x-auto scrollbar-none text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab('todos')}
            className={`px-2.5 py-1 rounded-md font-bold transition-all whitespace-nowrap ${
              activeTab === 'todos'
                ? 'bg-[#004E86] text-white shadow-xs'
                : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('fisico')}
            className={`px-2.5 py-1 rounded-md font-bold transition-all whitespace-nowrap ${
              activeTab === 'fisico'
                ? 'bg-[#004E86] text-white shadow-xs'
                : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            Mercado Físico
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('futuro')}
            className={`px-2.5 py-1 rounded-md font-bold transition-all whitespace-nowrap ${
              activeTab === 'futuro'
                ? 'bg-[#004E86] text-white shadow-xs'
                : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            Futuro (B3)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cambio')}
            className={`px-2.5 py-1 rounded-md font-bold transition-all whitespace-nowrap ${
              activeTab === 'cambio'
                ? 'bg-[#004E86] text-white shadow-xs'
                : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            Dólar / Câmbio
          </button>
        </div>

        {/* LISTA VERTICAL DE CARDS COM SCROLLBAR MODELO CANAL RURAL */}
        <div
          className={`${maxHeight} overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400`}
        >
          {filteredQuotes.map((quote) => {
            const isPositive = quote.isPositive !== false;
            return (
              <div
                key={quote.id}
                onClick={() => handleCardClick(quote)}
                className="bg-white rounded-lg border border-gray-200 hover:border-[#004E86] p-3 shadow-xs hover:shadow transition-all cursor-pointer group flex flex-col gap-1.5"
              >
                {/* LINHA 1: TÍTULO EM AZUL CANAL RURAL */}
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#004E86] group-hover:text-[#003459] transition-colors line-clamp-1">
                    {quote.fullName || `${quote.name} | ${quote.label || quote.marketPlace}`}
                  </h4>
                </div>

                {/* LINHA 2: CÓDIGO/SIGLA À ESQUERDA | VALOR E TRIÂNGULO À DIREITA */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    {quote.code || quote.label || 'MERCADO'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-[13px] font-extrabold text-gray-900">
                      {quote.value}
                    </span>
                    <span
                      className={`text-xs font-bold flex items-center ${
                        isPositive ? 'text-[#008844]' : 'text-red-600'
                      }`}
                    >
                      {isPositive ? '▲' : '▼'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RODAPÉ DO WIDGET */}
      <div className="pt-3 mt-3 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
        <span className="flex items-center gap-1 truncate">
          <RefreshCw className="w-3 h-3 text-[#004E86] shrink-0" />
          <span>Fonte: CEPEA / B3 / SAFRAS</span>
        </span>
        <button
          type="button"
          onClick={() => setActiveTab('todos')}
          className="text-[#004E86] hover:text-[#002f52] font-bold inline-flex items-center gap-0.5 transition-colors shrink-0"
        >
          <span>Ver todas</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* MODAL / POPOVER INFORMATIVO AO CLICAR EM QUALQUER COTAÇÃO */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-gray-100"
          >
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#004E86] bg-blue-50 px-2 py-0.5 rounded">
                  {selectedItem.code || 'COTAÇÃO REGIONAL'}
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-[#004E86] mt-1">
                  {selectedItem.fullName || selectedItem.name}
                </h4>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-700 p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-xs text-gray-500">Valor Atual</span>
                <span className="text-xl font-black text-gray-900">{selectedItem.value}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-xs text-gray-500">Variação do Dia</span>
                <span
                  className={`text-sm font-bold ${
                    selectedItem.isPositive !== false ? 'text-[#008844]' : 'text-red-600'
                  }`}
                >
                  {selectedItem.variation || 'Estável'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-xs text-gray-500">Praça / Mercado</span>
                <span className="text-xs font-bold text-gray-800">
                  {selectedItem.marketPlace || 'Goiás / Brasil'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-2.5 rounded-xl bg-[#004E86] hover:bg-[#003861] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow"
            >
              Fechar Detalhes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
