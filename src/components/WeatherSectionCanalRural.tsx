import React, { useState, useEffect } from 'react';
import {
  CloudRain,
  Droplets,
  Wind,
  RefreshCw,
  ChevronRight,
  Sun,
  CloudSun,
  Calendar,
  X,
  MapPin,
} from 'lucide-react';
import { fetchDetailedCityWeather, GOIAS_CITIES_LIST } from '../services/weatherService';
import { CityWeatherData } from '../types';

interface WeatherSectionCanalRuralProps {
  className?: string;
}

export const WeatherSectionCanalRural: React.FC<WeatherSectionCanalRuralProps> = ({
  className = '',
}) => {
  const [selectedCityId, setSelectedCityId] = useState('rio-verde');
  const [weatherData, setWeatherData] = useState<CityWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isExtendedModalOpen, setIsExtendedModalOpen] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchDetailedCityWeather(selectedCityId).then((data) => {
      if (isMounted) {
        setWeatherData(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [selectedCityId]);

  if (!weatherData) return null;

  // Escala máxima do gráfico em mm (Canal Rural usa 80mm)
  const maxScaleMm = 80;

  return (
    <section className={`w-full mb-10 ${className}`}>
      {/* CABEÇALHO DA SEÇÃO DE TEMPO (MODELO CANAL RURAL) */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004E86] tracking-tight">
          Tempo
        </h2>
        <button
          type="button"
          onClick={() => setIsExtendedModalOpen(true)}
          className="text-xs sm:text-sm font-bold text-[#005a9c] hover:underline flex items-center gap-1"
        >
          <span>Mais notícias</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* GRADE COM OS 3 CARDS LADO A LADO DO CANAL RURAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* CARD 1: CONDIÇÕES ATUAIS DA CIDADE SELECIONADA (3 COLS) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            {/* Nome da cidade + Botão Mudar Cidade */}
            <div className="text-center mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                {weatherData.city}, {weatherData.state}
              </h3>
              <button
                type="button"
                onClick={() => setIsCityModalOpen(true)}
                className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-300 hover:border-[#004E86] hover:bg-gray-50 text-[11px] font-semibold text-gray-700 transition-colors"
              >
                <RefreshCw className="w-3 h-3 text-[#004E86]" />
                <span>Mudar cidade</span>
              </button>
            </div>

            {/* Temperaturas Máxima e Mínima em Destaque */}
            <div className="flex items-center justify-center gap-3 my-3">
              <span className="flex items-center text-2xl sm:text-3xl font-black text-gray-900">
                <span className="text-red-500 mr-1 text-xl sm:text-2xl">▲</span>
                {weatherData.tempMax}°
              </span>
              <span className="flex items-center text-2xl sm:text-3xl font-black text-gray-900">
                <span className="text-blue-500 mr-1 text-xl sm:text-2xl">▼</span>
                {weatherData.tempMin}°
              </span>
            </div>

            {/* Descrição textual do tempo */}
            <p className="text-xs text-gray-600 text-center leading-relaxed mb-5 min-h-[36px]">
              {weatherData.condition}
            </p>
          </div>

          <div>
            {/* Linha com os 3 indicadores climáticos (Chuva %, Volume mm, Vento) */}
            <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100 text-center">
              <div className="flex flex-col items-center">
                <CloudRain className="w-4 h-4 text-[#0088CC] mb-1" />
                <span className="text-xs font-bold text-gray-800">{weatherData.rainProb}%</span>
                <span className="text-[9.5px] text-gray-400">Probabilidade</span>
              </div>
              <div className="flex flex-col items-center border-x border-gray-100 px-1">
                <Droplets className="w-4 h-4 text-[#0088CC] mb-1" />
                <span className="text-xs font-bold text-gray-800">{weatherData.rainMm}mm</span>
                <span className="text-[9.5px] text-gray-400">Volume</span>
              </div>
              <div className="flex flex-col items-center">
                <Wind className="w-4 h-4 text-[#0088CC] mb-1" />
                <span className="text-xs font-bold text-gray-800">{weatherData.windDirection} {weatherData.windSpeed}</span>
                <span className="text-[9.5px] text-gray-400">Vento</span>
              </div>
            </div>

            {/* Powered by Climatempo */}
            <div className="pt-2 text-center text-[10px] text-gray-400">
              Powered by <span className="font-extrabold text-[#004E86]">CLIMATEMPO</span>
            </div>
          </div>
        </div>

        {/* CARD 2: GRÁFICO DE PREVISÃO DE CHUVAS - 7 DIAS (6 COLS) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            {/* Header do Gráfico */}
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-100">
              <h3 className="text-sm sm:text-base font-extrabold text-gray-900">
                Previsão de Chuvas <span className="font-normal text-gray-400">•</span> 7 dias
              </h3>
              <span className="text-[10px] text-gray-400">
                Powered by <strong className="text-[#004E86]">CLIMATEMPO</strong>
              </span>
            </div>

            {/* GRÁFICO DE BARRAS DE CHUVA (0 a 80 mm) */}
            <div className="relative pt-2 pb-1">
              {/* Eixo Y com linhas guias (0, 20, 40, 60, 80) */}
              <div className="h-44 relative flex flex-col justify-between pointer-events-none">
                {[80, 60, 40, 20, 0].map((val) => (
                  <div key={val} className="flex items-center w-full">
                    <span className="text-[10px] text-gray-400 w-6 shrink-0 text-right pr-2">
                      {val}
                    </span>
                    <div className="w-full border-b border-gray-100"></div>
                  </div>
                ))}

                {/* BARRAS AZUIS INTERATIVAS DE CHUVA */}
                <div className="absolute inset-0 left-6 flex items-end justify-between px-2 sm:px-4 pointer-events-auto">
                  {weatherData.sevenDays.map((day, idx) => {
                    const heightPercent = Math.min(100, Math.max(4, (day.rainMm / maxScaleMm) * 100));
                    const isHovered = hoveredDay === idx;

                    return (
                      <div
                        key={day.date}
                        onMouseEnter={() => setHoveredDay(idx)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className="flex flex-col items-center justify-end h-full flex-1 max-w-[42px] mx-1 relative group cursor-pointer"
                      >
                        {/* Tooltip ao passar o mouse */}
                        {isHovered && (
                          <div className="absolute -top-12 z-20 bg-gray-900 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap animate-fade-in pointer-events-none">
                            <strong>{day.rainMm} mm</strong> de chuva ({day.rainProb}%)
                            <br />
                            {day.tempMax}° / {day.tempMin}°
                          </div>
                        )}

                        {/* Barra Azul */}
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-sm transition-all duration-300 ${
                            isHovered
                              ? 'bg-[#005a9c] shadow-sm'
                              : 'bg-[#0088CC] hover:bg-[#005a9c]'
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RÓTULOS DO EIXO X (DATAS: 17/10, 18/10, ETC.) */}
              <div className="flex items-center justify-between pl-6 pr-2 sm:pr-4 pt-2 border-t border-gray-200">
                {weatherData.sevenDays.map((day) => (
                  <div key={day.date} className="flex-1 text-center max-w-[42px] mx-1">
                    <span className="text-[10px] font-bold text-gray-600 block">
                      {day.date}
                    </span>
                    <span className="text-[9px] text-gray-400 uppercase block">
                      {day.dayOfWeek}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 text-right">
            <span className="text-[10px] text-gray-400">
              * Escala em milímetros (mm) acumulados por dia
            </span>
          </div>
        </div>

        {/* CARD 3: BANNER ESPECIAL PREVISÃO 7 MESES (3 COLS) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col items-center justify-between text-center relative overflow-hidden">
          {/* Ilustração Sol + Nuvem com Chuva + Texto 7 MESES */}
          <div className="flex flex-col items-center pt-2">
            <div className="relative mb-2">
              <div className="flex items-center gap-1.5 justify-center">
                <Sun className="w-9 h-9 text-amber-500 animate-spin-slow" />
                <CloudRain className="w-11 h-11 text-[#0088CC]" />
              </div>
              <div className="text-3xl font-black text-[#004E86] tracking-tight mt-1">
                7 MESES
              </div>
            </div>

            <p className="text-xs sm:text-sm font-bold text-gray-800 leading-snug mt-2 max-w-[190px]">
              Veja aqui a previsão de chuvas para até 7 meses
            </p>
            <p className="text-[11px] text-gray-500 mt-1 max-w-[200px]">
              Tendência climática para o planejamento da safra e safrinha em Goiás.
            </p>
          </div>

          {/* Botão Acesse grátis > */}
          <button
            type="button"
            onClick={() => setIsExtendedModalOpen(true)}
            className="w-full mt-4 py-2.5 px-4 rounded-xl border-2 border-[#005a9c] hover:bg-[#005a9c] text-[#005a9c] hover:text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
          >
            Acesse grátis &gt;
          </button>
        </div>
      </div>

      {/* MODAL DE SELEÇÃO DE CIDADES DE GOIÁS */}
      {isCityModalOpen && (
        <div
          onClick={() => setIsCityModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-gray-100"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#004E86]" />
                <h3 className="text-base font-extrabold text-[#004E86]">
                  Selecione a Cidade de Goiás
                </h3>
              </div>
              <button
                onClick={() => setIsCityModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 mb-4 max-h-72 overflow-y-auto">
              {GOIAS_CITIES_LIST.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    setSelectedCityId(city.id);
                    setIsCityModalOpen(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    selectedCityId === city.id
                      ? 'bg-blue-50 border-[#004E86] text-[#004E86] font-bold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  <span className="text-sm">{city.name}</span>
                  {selectedCityId === city.id && (
                    <span className="text-xs bg-[#004E86] text-white px-2 py-0.5 rounded-full font-bold">
                      Ativa
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsCityModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* MODAL ESPECIAL: PREVISÃO CLIMÁTICA ESTENDIDA PARA 7 MESES */}
      {isExtendedModalOpen && (
        <div
          onClick={() => setIsExtendedModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#004E86]" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#004E86] bg-blue-50 px-2 py-0.5 rounded">
                    INTELIGÊNCIA AGROCLIMÁTICA
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#004E86] mt-0.5">
                    Projeção Climática de 7 Meses para Goiás
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsExtendedModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
              Análise meteorológica consolidada para o planejamento do plantio e colheita nas macrorregiões de Rio Verde, Jataí, Sul Goiano e Entorno do DF:
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-xs text-[#004E86]">Novembro / Dezembro (Início de Safra)</strong>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Chuvas Regulares
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Precipitações entre 220mm e 280mm/mês, garantindo umidade adequada no solo para o pleno desenvolvimento das lavouras de soja.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-xs text-[#004E86]">Janeiro / Fevereiro (Colheita & Safrinha)</strong>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    Janela Ideal
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Períodos de estiagem intercalados com chuvas moderadas, favorecendo o trânsito de máquinas e a semeadura imediata do milho safrinha.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-xs text-[#004E86]">Março a Maio (Enchimento de Grãos)</strong>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Atenção a Veranicos
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Redução gradativa dos volumes pluviométricos. Recomendação técnica para uso de cultivares adaptadas ao estresse hídrico.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#004E86] text-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <strong className="text-xs block">Quer receber alertas climáticos no WhatsApp?</strong>
                <span className="text-[11px] text-gray-200">Boletins diários gratuitos para os produtores rurais de Goiás.</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  alert('Inscrição no Boletim Meteorológico Goiás confirmada!');
                  setIsExtendedModalOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-[#23B26D] hover:bg-[#1fa162] text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
              >
                Ativar Alertas
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
