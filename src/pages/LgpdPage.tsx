import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Scale } from 'lucide-react';

export const LgpdPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F8FAFC] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#006d3f] transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Início</span>
          </Link>
          <span>/</span>
          <span className="font-bold text-[#006d3f]">Política de Privacidade & LGPD</span>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 pb-6 border-b border-gray-100 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#0E1B2B] text-[#7afbae] flex items-center justify-center shrink-0">
              <Scale className="w-6 h-6 text-[#7afbae]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006d3f]">
                CONFORMIDADE JURÍDICA
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30]">
                Política de Privacidade & Proteção de Dados (LGPD)
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Conforme a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018)
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 text-sm leading-relaxed space-y-6">
            <section>
              <h2 className="text-base font-bold text-[#0b1c30] uppercase mb-2">
                1. Compromisso com a Privacidade
              </h2>
              <p>
                O portal <strong>Conexões em FOCO</strong>, sediado em Goiás, preza pela transparência, integridade e segurança no tratamento das informações de seus leitores, parceiros comerciais e anunciantes. Esta Política explica como coletamos, utilizamos, armazenamos e protegemos seus dados pessoais.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0b1c30] uppercase mb-2">
                2. Dados Coletados e Finalidade
              </h2>
              <p>
                Coletamos informações em situações pontuais, tais como:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Navegação e Métricas:</strong> Endereço IP, tipo de navegador, páginas visualizadas e tempo de permanência, coletados via cookies técnicos para fins estatísticos e aprimoramento da experiência.</li>
                <li><strong>Formulários de Contato e Comercial:</strong> Nome, telefone corporativo e e-mail informados voluntariamente para solicitação de mídia kit, propostas comerciais ou envio de sugestões de pauta.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0b1c30] uppercase mb-2">
                3. Uso de Cookies
              </h2>
              <p>
                Cookies são pequenos arquivos que nos auxiliam a lembrar suas preferências e personalizar a entrega de anúncios relevantes. O usuário pode desativar ou gerenciar os cookies a qualquer momento nas configurações do seu navegador web.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0b1c30] uppercase mb-2">
                4. Direitos do Titular de Dados
              </h2>
              <p>
                Em conformidade com o artigo 18 da LGPD, você tem o direito de:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Confirmar a existência de tratamento de dados;</li>
                <li>Acessar ou solicitar a correção de dados incompletos ou inexatos;</li>
                <li>Revogar o consentimento ou solicitar a eliminação dos seus dados de nossas bases cadastrais.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#0b1c30] uppercase mb-2">
                5. Contato do Encarregado de Dados (DPO)
              </h2>
              <p>
                Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato diretamente pelo e-mail: <strong className="text-[#006d3f]">privacidade@conexoesemfoco.com.br</strong> ou pelo WhatsApp oficial indicado no rodapé.
              </p>
            </section>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Última atualização: Outubro de 2026</span>
              <Link to="/termos-de-uso" className="text-[#006d3f] font-bold hover:underline">
                Ver Termos de Uso &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
