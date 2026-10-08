import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getArticleById,
  getRelatedArticles,
  allArticles,
  mockQuotes,
} from '../data/mockNews';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const article = getArticleById(id || '');

  if (!article) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
          article
        </span>
        <h1 className="text-2xl font-extrabold text-[#0b1c30] mb-2">
          Matéria não encontrada
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          A notícia que você procura pode ter sido movida ou não existe mais.
        </p>
        <Link
          to="/"
          className="px-6 py-2.5 rounded-lg bg-[#006d3f] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#00522e] transition-colors"
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.id, article.category, 3);
  const mostRead = allArticles.filter((a) => a.id !== article.id).slice(0, 4);

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const text = encodeURIComponent(
      `Confira esta notícia no Conexões em FOCO: ${article.title} - ${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="w-full bg-[#F8FAFC] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* BREADCRUMBS */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#006d3f] transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">home</span>
            <span>Início</span>
          </Link>
          <span>/</span>
          <Link
            to={`/categoria/${article.category.toLowerCase()}`}
            className="hover:text-[#006d3f] transition-colors font-semibold uppercase text-[#006d3f]"
          >
            {article.category}
          </Link>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-xs">{article.title}</span>
        </nav>

        {/* ARTIGO HEADER */}
        <header className="max-w-4xl mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded bg-[#006d3f] text-white text-[11px] uppercase tracking-wider font-extrabold">
              {article.category}
            </span>
            {article.highlightTag && (
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-[#006d3f] text-[11px] uppercase tracking-wider font-bold">
                {article.highlightTag}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b1c30] tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-base sm:text-xl text-gray-600 font-normal leading-relaxed border-l-4 border-[#23B26D] pl-4 mb-6">
              {article.subtitle}
            </p>
          )}

          {/* BYLINE / AUTOR & DATA */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0E1B2B] text-[#7afbae] flex items-center justify-center font-bold text-sm">
                CF
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#0b1c30]">{article.author}</span>
                <span className="text-xs text-gray-500">
                  {article.publishedAt} • {article.readTime}
                </span>
              </div>
            </div>

            {/* BOTÕES DE COMPARTILHAMENTO */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareWhatsApp}
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all shadow-sm"
              >
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCopyLink}
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Copiado!' : 'Copiar Link'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* GRID PRINCIPAL: CONTEÚDO (8 COLS) + SIDEBAR (4 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* COLUNA ESQUERDA: CORPO DA MATÉRIA */}
          <article className="lg:col-span-8 flex flex-col gap-6">
            {/* IMAGEM PRINCIPAL */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-md">
              <img
                src={article.imageUrl}
                alt={article.imageAlt || article.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
              <div className="bg-[#0b1c30]/90 text-gray-300 text-xs px-4 py-2 flex items-center justify-between">
                <span>{article.imageAlt || 'Registro da atividade em Goiás'}</span>
                <span className="text-gray-400 text-[11px]">Foto: Divulgação / Conexões em FOCO</span>
              </div>
            </div>

            {/* PLAYER DE ÁUDIO SE FOR PODCAST */}
            {article.audio?.available && (
              <div className="bg-[#0f1c2c] text-white p-5 rounded-2xl flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#23B26D] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[28px]">podcasts</span>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#7afbae] font-bold">
                      {article.audio.episodeNumber}
                    </div>
                    <div className="text-base font-bold">{article.audio.title}</div>
                    <div className="text-xs text-gray-400">{article.audio.duration}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Reproduzindo episódio do Conexões Cast...')}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#7afbae] text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Ouvir Áudio
                </button>
              </div>
            )}

            {/* PARÁGRAFOS DA NOTÍCIA */}
            <div className="prose prose-lg max-w-none text-[#1E293B] text-base sm:text-lg leading-relaxed space-y-6 pt-2">
              {article.content.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}

              {/* Bloco de Citação em Destaque */}
              <blockquote className="border-l-4 border-[#006d3f] bg-[#eff4ff] p-5 rounded-r-xl my-6 not-italic font-medium text-[#0b1c30]">
                "A consolidação de Goiás no cenário econômico nacional reflete o trabalho
                incansável do produtor e os investimentos estratégicos em infraestrutura e
                tecnologia de ponta."
              </blockquote>

              <p className="leading-relaxed">
                Especialistas ouvidos pelo portal <strong>Conexões em FOCO</strong> reiteram que a
                tendência para os próximos trimestres é de estabilidade nos custos dos insumos e
                ampliação das rotas de exportação com destino aos mercados asiáticos e do Oriente Médio.
              </p>
            </div>

            {/* TAGS DA MATÉRIA */}
            <div className="pt-6 border-t border-gray-200">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Palavras-chave relacionadas:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Agronegócio', 'Goiás', 'Rio Verde', 'Economia Goiana', 'Mercado', 'Safra 2025'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* BOX DE ENGAJAMENTO SOCIAL */}
            <div className="bg-[#0E1B2B] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 shadow-md">
              <div className="flex flex-col text-center sm:text-left">
                <h4 className="text-base font-bold">Compartilhe esta informação</h4>
                <p className="text-xs text-gray-400">
                  Ajude a conectar mais pessoas e oportunidades em Goiás.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShareWhatsApp}
                  className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  Enviar no WhatsApp
                </button>
              </div>
            </div>
          </article>

          {/* COLUNA DIREITA: SIDEBAR (4 COLS) */}
          <aside className="lg:col-span-4 flex flex-col gap-8 w-full">
            {/* WIDGET COTAÇÕES RÁPIDAS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006d3f] text-[20px]">
                    trending_up
                  </span>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0b1c30]">
                    Cotações de Goiás
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-[#23B26D] bg-emerald-50 px-2 py-0.5 rounded">
                  AO VIVO
                </span>
              </div>
              <div className="space-y-3">
                {mockQuotes.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between py-1.5 border-b border-gray-50 text-xs"
                  >
                    <span className="text-gray-600 font-medium">{q.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0b1c30]">{q.value}</span>
                      {q.variation && (
                        <span
                          className={`text-[11px] font-semibold ${
                            q.isPositive ? 'text-[#23B26D]' : 'text-red-500'
                          }`}
                        >
                          {q.variation}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MAIS LIDAS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100 mb-4">
                <span className="material-symbols-outlined text-[#006d3f] text-[20px]">
                  local_fire_department
                </span>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0b1c30]">
                  Mais Lidas
                </h3>
              </div>
              <div className="space-y-4">
                {mostRead.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/materia/${item.id}`)}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <span className="text-2xl font-black text-gray-300 group-hover:text-[#006d3f] transition-colors leading-none w-6 shrink-0">
                      0{idx + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-[#006d3f]">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#0b1c30] group-hover:text-[#006d3f] transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-gray-400 mt-1">{item.publishedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MINI BOLETIM CARD */}
            <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-2xl p-6 text-center">
              <span className="material-symbols-outlined text-3xl text-[#006d3f] mb-2">
                mark_email_unread
              </span>
              <h4 className="text-sm font-extrabold text-[#0b1c30] uppercase mb-1">
                Boletim Conexões VIP
              </h4>
              <p className="text-xs text-gray-600 mb-4">
                Receba resumos de negócios e cotações de Goiás todas as manhãs no seu e-mail.
              </p>
              <Link
                to="/#boletim"
                className="block w-full py-2.5 rounded-xl bg-[#006d3f] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#00522e] transition-colors"
              >
                Cadastrar Grátis
              </Link>
            </div>
          </aside>
        </div>

        {/* SEÇÃO INFERIOR: LEIA TAMBÉM / MATÉRIAS RELACIONADAS */}
        <section className="mt-16 pt-10 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-6 rounded bg-[#006d3f]"></div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] uppercase tracking-tight">
                LEIA TAMBÉM
              </h2>
            </div>
            <Link
              to="/categoria/todas"
              className="text-xs font-bold uppercase tracking-wider text-[#006d3f] hover:underline"
            >
              Ver mais notícias &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/materia/${rel.id}`)}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 cursor-pointer group flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="h-44 w-full overflow-hidden bg-gray-100">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#006d3f]">
                      {rel.category}
                    </span>
                    <h3 className="text-sm font-bold text-[#0b1c30] group-hover:text-[#006d3f] transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                  </div>
                </div>
                <div className="px-5 pb-4 text-xs text-gray-400 flex items-center justify-between">
                  <span>{rel.publishedAt}</span>
                  <span className="text-[#006d3f] font-semibold flex items-center gap-0.5">
                    Ler <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
