import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Scale, Calendar, ArrowRight } from 'lucide-react';
import { usePortalData } from '../context/PortalDataContext';

export const SpecialHubsSection: React.FC = () => {
  const { events, getArticlesByHub } = usePortalData();
  const latestEmpresarial = getArticlesByHub('empresarial')[0];
  const latestLei = getArticlesByHub('lei')[0];

  return (
    <section className="w-full mb-12">
      {/* HEADER DA SEÇÃO */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-7 rounded bg-[#006d3f]"></div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] uppercase tracking-tight">
              CONEXÕES ESPECIAIS & AMBIENTES
            </h2>
            <p className="text-xs text-gray-500">
              Verticais exclusivas: Negócios corporativos, assessoria jurídica e calendário de eventos
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AMBIENTE 1: CONEXÃO EMPRESARIAL */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-all group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-[#0E1B2B] text-[#7afbae] flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6 text-[#7afbae]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#006d3f] bg-emerald-50 px-2 py-0.5 rounded">
                HUB B2B
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#0b1c30] group-hover:text-[#006d3f] transition-colors mb-2">
              Conexão Empresarial
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Espaço dedicado ao fomento de negócios em Goiás. Cases de sucesso de indústrias, franquias, cooperativas e oportunidades de parcerias estratégicas.
            </p>
            <div className="bg-[#f8f9ff] rounded-lg p-3 text-xs border border-gray-100 mb-4">
              <strong className="text-[#0b1c30] block mb-1">Destaque Recente:</strong>
              <p className="text-gray-600 line-clamp-2">
                "
                {latestEmpresarial?.title ||
                  'Gestão Estratégica: O novo perfil das empresas familiares e sucessão no agro de Goiás'}
                "
              </p>
            </div>
          </div>
          <Link
            to="/hub/empresarial"
            className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#0E1B2B] hover:bg-[#162B42] text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>Acessar Ambiente Empresarial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* AMBIENTE 2: CONEXÃO COM A LEI */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-all group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-[#006d3f] text-white flex items-center justify-center font-bold">
                <Scale className="w-6 h-6 text-white" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#001d32] bg-blue-50 px-2 py-0.5 rounded">
                COLUNAS JURÍDICAS
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#0b1c30] group-hover:text-[#006d3f] transition-colors mb-2">
              Conexão com a Lei
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Artigos de análise e orientações jurídicas de advogados especialistas em Direito Agrário, Tributário, Trabalhista e Compliance corporativo.
            </p>
            <div className="bg-[#f8f9ff] rounded-lg p-3 text-xs border border-gray-100 mb-4">
              <strong className="text-[#0b1c30] block mb-1">Artigo em Foco:</strong>
              <p className="text-gray-600 line-clamp-2">
                "
                {latestLei?.title ||
                  'Segurança Jurídica: Como blindar contratos agrários e mitigar riscos na safra'}
                "
              </p>
            </div>
          </div>
          <Link
            to="/hub/lei"
            className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>Acessar Conexão com a Lei</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* AMBIENTE 3: AGENDA DE EVENTOS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-all group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-[#4178A7] text-white flex items-center justify-center font-bold">
                <Calendar className="w-6 h-6 text-white" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                CALENDÁRIO GOIÁS
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#0b1c30] group-hover:text-[#4178A7] transition-colors mb-2">
              Agenda de Eventos
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Calendário completo das grandes feiras do agronegócio, congressos técnicos, rodadas de negócios e eventos culturais da cidade e do estado.
            </p>
            <div className="space-y-2 mb-4">
              {events.slice(0, 2).map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center gap-2 text-xs text-gray-700 bg-[#f8f9ff] p-2 rounded-lg border border-gray-100"
                >
                  <Calendar className="w-4 h-4 text-[#006d3f] shrink-0" />
                  <span className="font-bold truncate">{ev.title}</span>
                  <span className="text-[10px] text-gray-400 shrink-0 ml-auto">{ev.date}</span>
                </div>
              ))}
            </div>
          </div>
          <Link
            to="/agenda-eventos"
            className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#4178A7] hover:bg-[#346289] text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>Ver Agenda Completa</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
