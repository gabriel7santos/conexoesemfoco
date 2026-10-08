import React, { useState } from 'react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section
      id="boletim"
      className="w-full bg-[#eff4ff] border border-[#dce9ff] rounded-2xl p-6 sm:p-8 lg:p-10 mb-12 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2 text-[#006d3f] text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">mark_email_unread</span>
            <span>BOLETIM CONEXÕES EM FOCO</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0b1c30] leading-tight">
            Receba o resumo de negócios e cotações de Goiás todas as manhãs
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Direto no seu e-mail ou WhatsApp corporativo: abertura dos mercados, clima regional,
            safra e política goiana antes do sino tocar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row gap-3">
          {submitted ? (
            <div className="px-6 py-3.5 rounded-xl bg-[#23B26D] text-white text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Inscrição confirmada com sucesso!</span>
            </div>
          ) : (
            <>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail de negócios"
                className="w-full sm:w-80 px-4 py-3.5 rounded-xl bg-white border border-[#c5c6cd] text-[#0b1c30] text-sm focus:outline-none focus:ring-2 focus:ring-[#006d3f] shadow-inner"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0"
              >
                <span>QUERO RECEBER</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};
