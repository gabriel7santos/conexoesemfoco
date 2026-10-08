# Conexões em FOCO 🚀

> **Informação que conecta pessoas e oportunidades.**  
> Portal de jornalismo analítico, inteligência de agronegócios e decisões econômicas em Goiás e no Centro-Oeste brasileiro.

---

## 🛠️ Tecnologias Utilizadas (Fase 1)

- **React 18** + **Vite 6**
- **TypeScript**
- **Tailwind CSS 3** (Tokens oficiais do design system *Agro-Metropolitan Broadcast*)
- **Google Fonts:** *Plus Jakarta Sans* e *Inter*
- **Material Symbols Outlined**

---

## 📐 Estrutura do Portal

1. **TopBar:** Ticker em tempo real de cotações agropecuárias de Goiás (Soja Rio Verde, Milho Jataí, Boi Gordo GO, Dólar) e previsão meteorológica.
2. **Header:** Logomarca oficial, menu de editorias (*Início, Notícias, Agro, Economia, Região, Entrevistas, Eventos*), busca rápida modal e cadastro VIP.
3. **Hero Editorial (Above the Fold):** Manchete principal do agronegócio goiano com botão de leitura direta + 2 matérias secundárias de economia e negócios.
4. **Topics Rail:** Pílulas com filtros rápidos de categorias com indicador dinâmico *EM ALTA*.
5. **News Grid:** Cards com visualizações interativas (Micro gráfico sparkline da safra de grãos, rota logística do corredor de exportação e player de áudio/podcast).
6. **Boletim / Newsletter:** Formulário de captação de leads corporativos.
7. **Footer Institucional:** Polos de cobertura de Goiás, links de editorias, conformidade e assinatura do Radar do Mercado.
8. **Article Reader Modal:** Visualização completa e imersiva de qualquer notícia com suporte a compartilhamento via WhatsApp e cópia de link.

---

## 🗺️ Roadmap de Desenvolvimento

- [x] **Fase 1:** Prototipação e recriação em React com dados mockados (Homologação na Vercel).
- [ ] **Fase 2:** Integração com **Supabase** (PostgreSQL, Auth e Storage de capas).
- [ ] **Fase 2:** Desenvolvimento do **Painel Administrativo (`/admin`)** para cadastro e gerenciamento de notícias.

---

## 💻 Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

---

Desenvolvido por **Gabriel Falasca** • Rio Verde / GO
