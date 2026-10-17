import React from 'react';

/**
 * Logotipos corporativos vetoriais autênticos (SVG) das principais marcas e
 * cooperativas do agronegócio e economia de Goiás para o carrossel de anunciantes.
 */

// 1. COMIGO - Cooperativa Agroindustrial dos Produtores Rurais do Sudoeste Goiano (Rio Verde - GO)
export const ComigoLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 160 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Emblema Folha e Grão COMIGO */}
    <g transform="translate(4, 4)">
      {/* Folha Verde Superior */}
      <path
        d="M20 2C10 2 2 10 2 20C2 30 10 38 20 38C22 38 24 37.5 26 36.8C20 33 16 26 16 19C16 11 21 4.5 28 3C25.5 2.3 22.8 2 20 2Z"
        fill="#007A3D"
      />
      {/* Folha Verde Clara / Amarela */}
      <path
        d="M20 38C30 38 38 30 38 20C38 10 30 2 20 2C18 2 16 2.5 14 3.2C20 7 24 14 24 21C24 29 19 35.5 12 37C14.5 37.7 17.2 38 20 38Z"
        fill="#8DC63F"
      />
      {/* Núcleo Dourado Grão */}
      <ellipse cx="20" cy="20" rx="3.5" ry="6.5" fill="#FDB813" />
    </g>
    {/* Logotipo COMIGO */}
    <text x="48" y="27" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="20" fill="#006D3F" letterSpacing="0.5">
      COMIGO
    </text>
    <text x="49" y="38" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="6.5" fill="#4B6B56" letterSpacing="1.2">
      COOPERATIVA AGROINDUSTRIAL
    </text>
  </svg>
);

// 2. SICOOB Credi-Rural - Sistema de Cooperativas Financeiras do Brasil
export const SicoobLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 170 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Emblema Poligonal Diamante Sicoob */}
    <g transform="translate(6, 6)">
      {/* Polígonos entrelaçados em degradê verde/turquesa */}
      <polygon points="18,0 32,8 24,20 12,12" fill="#00AE9D" />
      <polygon points="12,12 24,20 18,34 6,24" fill="#003641" />
      <polygon points="24,20 36,22 30,36 18,34" fill="#7DB627" />
      <polygon points="6,24 18,34 14,36 2,26" fill="#008375" />
    </g>
    {/* Logotipo SICOOB Credi-Rural */}
    <text x="48" y="26" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="19" fill="#003641" letterSpacing="-0.3">
      SICOOB
    </text>
    <text x="49" y="38" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="8" fill="#00AE9D" letterSpacing="0.8">
      CREDI-RURAL
    </text>
  </svg>
);

// 3. Sistema OCB/GO - Organização das Cooperativas Brasileiras no Estado de Goiás
export const OcbGoLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 160 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 5)">
      {/* Círculo Verde com Pinheiros Cooperativos */}
      <circle cx="19" cy="19" r="17" fill="#005A36" />
      <path d="M19 6L13 18H16L12 26H17V31H21V26H26L22 18H25L19 6Z" fill="#FFFFFF" />
      <circle cx="31" cy="9" r="6" fill="#FDB813" />
    </g>
    <text x="46" y="25" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="18" fill="#005A36">
      OCB<tspan fill="#FDB813">/GO</tspan>
    </text>
    <text x="47" y="37" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="7" fill="#5A6B62" letterSpacing="0.6">
      SISTEMA OCB • GOIÁS
    </text>
  </svg>
);

// 4. John Deere - Máquinas Agrícolas (Concessionária Regional Goiás)
export const JohnDeereLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 170 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Brasão Amarelo e Verde */}
    <g transform="translate(6, 6)">
      <rect x="0" y="0" width="34" height="34" rx="4" fill="#367C2B" stroke="#FFDE00" strokeWidth="2" />
      {/* Silhueta Veado Saltando Amarelo */}
      <path
        d="M8 22C11 18 16 12 21 11C20 9 19 8 18 7C22 7 26 9 27 12C25 14 22 17 21 21C20 22 17 25 14 26C12 26 10 24 8 22Z"
        fill="#FFDE00"
      />
      <circle cx="25" cy="8" r="1.5" fill="#FFDE00" />
    </g>
    <text x="48" y="24" fontFamily="Impact, Arial Black, sans-serif" fontWeight="900" fontSize="16" fill="#367C2B" letterSpacing="0.8">
      JOHN DEERE
    </text>
    <text x="49" y="36" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="7" fill="#8C7800" letterSpacing="0.8">
      MÁQUINAS & SAFRA
    </text>
  </svg>
);

// 5. Autorio Chevrolet - Concessionária Oficial Goiás
export const AutorioLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 160 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Gravata Dourada Chevrolet */}
    <g transform="translate(6, 12)">
      <polygon points="12,4 28,4 28,18 12,18" fill="#D99B26" stroke="#9A6900" strokeWidth="1" />
      <polygon points="0,9 40,9 40,15 0,15" fill="#E5AA38" stroke="#9A6900" strokeWidth="1" />
      <polygon points="13,5 27,5 27,17 13,17" fill="#FCD34D" />
    </g>
    <text x="50" y="24" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="17" fill="#1E293B" letterSpacing="0.4">
      AUTORIO
    </text>
    <text x="51" y="36" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="7.5" fill="#B45309" letterSpacing="0.6">
      CHEVROLET GOIÁS
    </text>
  </svg>
);

// 6. Solutec Agro - Inteligência & Tecnologia Agrícola (Jataí / Rio Verde)
export const SolutecLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 160 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hexágono Tech Verde */}
    <g transform="translate(6, 6)">
      <polygon points="18,1 33,10 33,26 18,35 3,26 3,10" fill="#004E86" stroke="#0284C7" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="6" fill="#22C55E" />
      <circle cx="18" cy="18" r="2.5" fill="#FFFFFF" />
      <line x1="18" y1="5" x2="18" y2="12" stroke="#38BDF8" strokeWidth="1.5" />
      <line x1="18" y1="24" x2="18" y2="31" stroke="#38BDF8" strokeWidth="1.5" />
    </g>
    <text x="47" y="25" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="17" fill="#004E86" letterSpacing="0.3">
      SOLUTEC
    </text>
    <text x="48" y="37" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="7" fill="#22C55E" letterSpacing="1">
      AGRO INTELIGÊNCIA
    </text>
  </svg>
);

// 7. Aerotex - Aviação Agrícola (Rio Verde - GO)
export const AerotexLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 160 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Asas e Hélice Aeronáutica */}
    <g transform="translate(6, 8)">
      <ellipse cx="18" cy="16" rx="16" ry="7" fill="#0F172A" />
      <circle cx="18" cy="16" r="4.5" fill="#EAB308" />
      <path d="M4 16C10 12 26 12 32 16C26 19 10 19 4 16Z" fill="#F8FAFC" />
      <polygon points="18,4 20,16 16,16" fill="#EAB308" />
      <polygon points="18,28 20,16 16,16" fill="#EAB308" />
    </g>
    <text x="48" y="25" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="16" fontStyle="italic" fill="#0F172A" letterSpacing="0.5">
      AEROTEX
    </text>
    <text x="49" y="36" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="7" fill="#CA8A04" letterSpacing="0.8">
      AVIAÇÃO AGRÍCOLA
    </text>
  </svg>
);

// 8. Jalles Machado - Açúcar, Etanol e Energia Limpa (Goianésia - GO)
export const JallesMachadoLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 165 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Sol Dourado e Colmo de Cana */}
    <g transform="translate(6, 6)">
      <circle cx="18" cy="18" r="16" fill="#005B28" />
      <path d="M18 5V31M10 18H26M12 12L24 24M24 12L12 24" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="18" cy="18" r="5" fill="#FBBF24" />
    </g>
    <text x="47" y="24" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="15" fill="#005B28" letterSpacing="0.2">
      JALLES MACHADO
    </text>
    <text x="48" y="36" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="7" fill="#B45309" letterSpacing="0.6">
      ENERGIA & BIODIESEL
    </text>
  </svg>
);

// 9. Mosaic Fertilizantes - Nutrição de Safras Goiás
export const MosaicLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 160 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Mosaico de Losangos */}
    <g transform="translate(8, 7)">
      <polygon points="16,2 24,10 16,18 8,10" fill="#EC4899" />
      <polygon points="26,10 34,18 26,26 18,18" fill="#F97316" />
      <polygon points="6,10 14,18 6,26 -2,18" fill="#3B82F6" />
      <polygon points="16,20 24,28 16,36 8,28" fill="#10B981" />
    </g>
    <text x="48" y="25" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="16" fill="#1E293B" letterSpacing="0.3">
      MOSAIC
    </text>
    <text x="49" y="36" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="7" fill="#059669" letterSpacing="0.8">
      FERTILIZANTES
    </text>
  </svg>
);

// 10. Nelore Goiás - Pecuária de Corte e Genética Bovina
export const NeloreGoiasLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 160 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Silhueta Zebu Nelore com Cupim */}
    <g transform="translate(6, 6)">
      <rect x="0" y="0" width="34" height="34" rx="17" fill="#7F1D1D" stroke="#D97706" strokeWidth="1.5" />
      {/* Chifre e cabeça característicos */}
      <path
        d="M10 24C12 18 16 14 20 12C20 9 22 7 24 8C23 11 25 13 25 15C27 16 27 19 25 21C22 24 16 26 10 24Z"
        fill="#FFFFFF"
      />
      <circle cx="21" cy="15" r="1.5" fill="#7F1D1D" />
    </g>
    <text x="47" y="25" fontFamily="Georgia, serif" fontWeight="900" fontSize="16" fill="#7F1D1D" letterSpacing="0.3">
      NELORE GOIÁS
    </text>
    <text x="48" y="36" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="7" fill="#D97706" letterSpacing="0.8">
      GENÉTICA & PECUÁRIA
    </text>
  </svg>
);
