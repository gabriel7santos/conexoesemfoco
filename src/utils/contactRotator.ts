export interface OfficialContactPerson {
  name: string;
  role: string;
  phoneDisplay: string;
  phoneWa: string;
}

export const OFFICIAL_SITE_INFO = {
  email: 'conexoesemfoco@gmail.com',
  address: 'Rua Osório Coelho de Moraes, N° 2149, Jardim Goiás, Rio Verde, CEP: 75.903-380',
  cityState: 'Rio Verde – Goiás',
  contacts: [
    {
      name: 'Valério Delfino',
      role: 'Diretoria & Comercial',
      phoneDisplay: '(64) 99211-9284',
      phoneWa: '5564992119284',
    },
    {
      name: 'Daris Dias',
      role: 'Diretoria & Comercial',
      phoneDisplay: '(64) 98406-8205',
      phoneWa: '5564984068205',
    },
  ] as OfficialContactPerson[],
};

const STORAGE_TURN_KEY = 'conexoes_whatsapp_rotator_turn';

/**
 * Retorna o próximo contato na fila de revezamento (Valério Delfino <-> Daris Dias)
 * e avança o ponteiro no localStorage para que cada clique chame um deles alternadamente.
 */
export function getNextRotatedContact(): OfficialContactPerson {
  try {
    const raw = localStorage.getItem(STORAGE_TURN_KEY);
    const currentIndex = raw ? parseInt(raw, 10) : 0;
    const safeIndex = Number.isNaN(currentIndex)
      ? 0
      : currentIndex % OFFICIAL_SITE_INFO.contacts.length;
    const nextIndex = (safeIndex + 1) % OFFICIAL_SITE_INFO.contacts.length;
    localStorage.setItem(STORAGE_TURN_KEY, String(nextIndex));
    return OFFICIAL_SITE_INFO.contacts[safeIndex];
  } catch {
    return OFFICIAL_SITE_INFO.contacts[0];
  }
}

/**
 * Abre o WhatsApp revezando automaticamente entre Valério Delfino (64 99211-9284)
 * e Daris Dias (64 98406-8205) a cada clique.
 */
export function openRotatedWhatsApp(customMessage?: string): OfficialContactPerson {
  const contact = getNextRotatedContact();
  const defaultMsg = `Olá ${contact.name}! Gostaria de falar com a equipe do portal Conexões em FOCO.`;
  const text = encodeURIComponent(customMessage || defaultMsg);
  window.open(`https://api.whatsapp.com/send?phone=${contact.phoneWa}&text=${text}`, '_blank');
  return contact;
}
