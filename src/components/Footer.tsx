import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import { usePortalData } from '../context/PortalDataContext';
import { OFFICIAL_SITE_INFO, openRotatedWhatsApp } from '../utils/contactRotator';

interface FooterProps {
  onOpenAdModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdModal }) => {
  const { categories } = usePortalData();
  const activeCategories = categories.filter((c) => c.isActive !== false);

  return (
    <footer className="w-full bg-[#08101A] text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Coluna 1: Marca, Endereço Oficial, E-mail & Contatos (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <Link to="/" className="flex items-center shrink-0 group py-1">
              <img
                src="/conexoes_logo_clean.png"
                alt="Conexões em FOCO"
                className="h-12 w-auto object-contain group-hover:scale-[1.02] transition-transform"
              />
            </Link>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Liderança em jornalismo analítico, inteligência de agronegócios e decisões econômicas
              em Rio Verde, Goiás e no Centro-Oeste brasileiro.
            </p>

            <div className="space-y-2 text-xs text-gray-300 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#7afbae] shrink-0 mt-0.5" />
                <span>{OFFICIAL_SITE_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#7afbae] shrink-0" />
                <a
                  href={`mailto:${OFFICIAL_SITE_INFO.email}`}
                  className="hover:text-[#7afbae] transition-colors"
                >
                  {OFFICIAL_SITE_INFO.email}
                </a>
              </div>

              {OFFICIAL_SITE_INFO.contacts.map((c) => (
                <div key={c.phoneWa} className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#7afbae] shrink-0" />
                  <span>
                    <strong className="text-white">{c.phoneDisplay}</strong> — {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna 2: Editorias Dinâmicas (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7afbae]">
              EDITORIAS
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {activeCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/categoria/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Ambientes Conexões (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7afbae]">
              CONEXÕES
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link
                  to="/hub/empresarial"
                  className="hover:text-white transition-colors font-medium"
                >
                  Conexão Empresarial
                </Link>
              </li>
              <li>
                <Link
                  to="/hub/lei"
                  className="hover:text-white transition-colors font-medium"
                >
                  Conexão com a Lei
                </Link>
              </li>
              <li>
                <Link
                  to="/agenda-eventos"
                  className="hover:text-white transition-colors font-medium"
                >
                  Agenda de Eventos
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Publicidade & WhatsApp com Revezamento Automático (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7afbae]">
              COMERCIAL & ANÚNCIOS
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Posicione sua marca e produtos no portal que conecta tomadores de decisão em Rio Verde e todo o estado de Goiás.
            </p>
            <button
              type="button"
              onClick={() =>
                openRotatedWhatsApp(
                  'Olá! Gostaria de falar com o departamento comercial do portal Conexões em FOCO.'
                )
              }
              className="mt-1 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1fa855] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </button>
            {onOpenAdModal && (
              <button
                type="button"
                onClick={onOpenAdModal}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all border border-white/15 cursor-pointer"
              >
                Solicitar Mídia Kit
              </button>
            )}
          </div>
        </div>

        {/* Linha Inferior com Copyright e Links Jurídicos LGPD */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © 2026 Conexões em FOCO. Todos os direitos reservados. {OFFICIAL_SITE_INFO.address}.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/termos-de-uso" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link to="/privacidade-lgpd" className="hover:text-white transition-colors">
              Política de Privacidade & LGPD
            </Link>
            <Link
              to="/admin"
              className="text-[#7afbae] hover:text-white font-bold transition-colors"
            >
              Painel Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
