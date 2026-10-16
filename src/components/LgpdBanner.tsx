import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const LgpdBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('conexoes_lgpd_accepted');
    if (!accepted) {
      // Delay de 1 segundo para animação suave
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('conexoes_lgpd_accepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-[#0E1B2B]/95 backdrop-blur-md text-white border-t border-white/10 shadow-2xl animate-slide-up">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[#7afbae] text-[24px] shrink-0 mt-0.5">
            shield_lock
          </span>
          <div className="text-xs text-gray-300 leading-relaxed">
            <strong className="text-white">Privacidade e Proteção de Dados (LGPD):</strong> Utilizamos cookies e tecnologias semelhantes para personalizar a sua experiência no portal Conexões em FOCO, analisar o tráfego e exibir conteúdos relevantes, de acordo com a nossa{' '}
            <Link to="/privacidade-lgpd" className="text-[#7afbae] underline hover:text-white">
              Política de Privacidade
            </Link>{' '}
            e{' '}
            <Link to="/termos-de-uso" className="text-[#7afbae] underline hover:text-white">
              Termos de Uso
            </Link>
            .
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
          <Link
            to="/privacidade-lgpd"
            className="flex-1 md:flex-initial text-center px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 transition-colors"
          >
            Saber Mais
          </Link>
          <button
            onClick={handleAccept}
            type="button"
            className="flex-1 md:flex-initial px-5 py-2 rounded-xl bg-[#23B26D] hover:bg-[#1fa162] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
          >
            Aceitar Todos
          </button>
        </div>
      </div>
    </div>
  );
};
