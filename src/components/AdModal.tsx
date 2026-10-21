import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { usePortalData } from '../context/PortalDataContext';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose }) => {
  const { createLead } = usePortalData();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Superbanner Topo');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLead({
        leadType: 'anunciante',
        name,
        company,
        phone,
        interest,
      });
    } catch {
      // Silencioso
    }
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setCompany('');
      setPhone('');
      onClose();
    }, 3000);
  };

  const handleWhatsAppCommercial = () => {
    const text = encodeURIComponent(
      'Olá! Gostaria de receber o Mídia Kit oficial e informações para anunciar no portal Conexões em FOCO Goiás.'
    );
    window.open(`https://api.whatsapp.com/send?phone=5564992145066&text=${text}`, '_blank');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-gray-100"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER MODAL COM LOGO REAL */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-[#0E1B2B] px-2.5 py-1.5 rounded-xl border border-white/10 shadow-sm flex items-center justify-center shrink-0">
              <img
                src="/conexoes_logo_clean.png"
                alt="Conexões em FOCO"
                className="h-7 w-auto object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#006d3f] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                MÍDIA KIT OFICIAL 2026/2027
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0b1c30]">
                Anuncie no Conexões em FOCO
              </h3>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Conecte sua empresa a mais de <strong>180.000 leitores e tomadores de decisão</strong> em Goiás: produtores rurais, diretores, investidores, advogados e lideranças econômicas.
        </p>

        {/* MÉTRICAS EM DESTAQUE */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#f8f9ff] border border-gray-100 rounded-xl p-3 text-center">
            <div className="text-lg sm:text-xl font-extrabold text-[#006d3f]">180k+</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Leituras / mês</div>
          </div>
          <div className="bg-[#f8f9ff] border border-gray-100 rounded-xl p-3 text-center">
            <div className="text-lg sm:text-xl font-extrabold text-[#0E1B2B]">78%</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Público Classe A/B</div>
          </div>
          <div className="bg-[#f8f9ff] border border-gray-100 rounded-xl p-3 text-center">
            <div className="text-lg sm:text-xl font-extrabold text-[#4178A7]">Goiás & CO</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Cobertura Regional</div>
          </div>
        </div>

        {/* FORMATOS DISPONÍVEIS */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Formatos Comerciais Disponíveis:
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-50 border border-gray-100">
              <CheckCircle className="w-4 h-4 text-[#006d3f] shrink-0" />
              <span>Superbanner Topo (Desktop & Mobile)</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-50 border border-gray-100">
              <CheckCircle className="w-4 h-4 text-[#006d3f] shrink-0" />
              <span>Publieditorial / Matéria Patrocinada</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-50 border border-gray-100">
              <CheckCircle className="w-4 h-4 text-[#006d3f] shrink-0" />
              <span>Banners Laterais nas Matérias</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-50 border border-gray-100">
              <CheckCircle className="w-4 h-4 text-[#006d3f] shrink-0" />
              <span>Patrocínio do Ticker de Cotações</span>
            </div>
          </div>
        </div>

        {/* FORMULÁRIO DE CONTATO OU WHATSAPP */}
        {sent ? (
          <div className="p-4 rounded-xl bg-emerald-50 text-[#006d3f] font-bold text-center text-sm">
            ✅ Solicitação recebida! Nossa equipe comercial entrará em contato em breve.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome completo"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#006d3f]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Empresa</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Nome da sua empresa"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#006d3f]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp / Telefone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(64) 99999-9999"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#006d3f]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Formato de Interesse</label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#006d3f] bg-white"
                >
                  <option>Superbanner Topo</option>
                  <option>Publieditorial Patrocinado</option>
                  <option>Banner Lateral nas Notícias</option>
                  <option>Patrocínio de Cotações / Clima</option>
                  <option>Outros / Pacote Completo</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                className="w-full sm:flex-1 py-2.5 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                Solicitar Proposta Comercial
              </button>
              <button
                type="button"
                onClick={handleWhatsAppCommercial}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Falar no WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
