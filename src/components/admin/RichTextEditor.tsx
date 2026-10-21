import React, { useRef, useEffect, useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Link as LinkIcon,
  Video,
  Type,
  Highlighter,
  Undo,
  Redo,
  Eye,
  Edit3,
  Upload,
  Loader2,
  Minus,
  Sparkles,
} from 'lucide-react';
import { uploadMediaFile } from '../../lib/supabase';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string, plainParagraphs: string[]) => void;
  placeholder?: string;
}

const TEXT_COLORS = [
  { label: 'Padrão Escuro', color: '#0b1c30' },
  { label: 'Verde Conexões', color: '#006d3f' },
  { label: 'Azul Institucional', color: '#004E86' },
  { label: 'Vermelho Urgente', color: '#dc2626' },
  { label: 'Dourado Agro', color: '#b45309' },
  { label: 'Cinza Editorial', color: '#475569' },
];

const HIGHLIGHT_COLORS = [
  { label: 'Sem Grifo', color: 'transparent' },
  { label: 'Verde Suave', color: '#dcfce7' },
  { label: 'Amarelo Marca-Texto', color: '#fef08a' },
  { label: 'Azul Claro', color: '#dbeafe' },
  { label: 'Rosa Alerta', color: '#ffe4e6' },
];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Comece a escrever sua matéria aqui... Use a barra acima (estilo Word) para formatar títulos, tamanhos de letra, negrito, citações e inserir fotos no meio do texto.',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageCaptionInput, setImageCaptionInput] = useState('');
  const [imageWidthChoice, setImageWidthChoice] = useState<'100%' | '75%' | '50%'>('100%');
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const savedRangeRef = useRef<Range | null>(null);

  // Sincroniza valor externo quando muda de artigo
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '<p><br></p>';
    }
  }, [value]);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedRangeRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
  };

  const emitChange = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    // Extrai parágrafos limpos para fallback / resumo
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const blocks = Array.from(temp.querySelectorAll('p, h1, h2, h3, h4, blockquote, li'))
      .map((el) => el.textContent?.trim() || '')
      .filter(Boolean);
    const plainParagraphs =
      blocks.length > 0
        ? blocks
        : (temp.textContent || '')
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean);

    onChange(html, plainParagraphs);
  };

  const execCmd = (command: string, arg?: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    restoreSelection();
    document.execCommand(command, false, arg);
    saveSelection();
    emitChange();
  };

  const applyFontSizePx = (sizePx: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    // Usa fontSize 7 temporário e substitui pelo span com font-size exato em px
    document.execCommand('fontSize', false, '7');
    const fontElements = editorRef.current.querySelectorAll('font[size="7"]');
    fontElements.forEach((el) => {
      const span = document.createElement('span');
      span.style.fontSize = sizePx;
      span.style.lineHeight = '1.45';
      span.innerHTML = el.innerHTML;
      el.parentNode?.replaceChild(span, el);
    });
    saveSelection();
    emitChange();
  };

  const stepFontSize = (delta: number) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    let currentPx = 18;
    const anchorEl =
      sel.anchorNode?.nodeType === Node.ELEMENT_NODE
        ? (sel.anchorNode as HTMLElement)
        : sel.anchorNode?.parentElement;
    if (anchorEl) {
      const computed = window.getComputedStyle(anchorEl).fontSize;
      if (computed) {
        currentPx = parseInt(computed, 10) || 18;
      }
    }
    const nextPx = Math.min(48, Math.max(12, currentPx + delta));
    applyFontSizePx(`${nextPx}px`);
  };

  const insertJournalisticQuote = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    restoreSelection();
    const selectedText =
      window.getSelection()?.toString().trim() ||
      'Digite aqui a frase ou destaque importante do entrevistado...';
    const html = `
      <blockquote style="border-left: 4px solid #006d3f; background: #f0fdf4; padding: 16px 20px; border-radius: 0 12px 12px 0; margin: 18px 0; font-style: italic; font-weight: 600; color: #0b1c30;">
        "${selectedText}"
      </blockquote>
      <p><br></p>
    `;
    document.execCommand('insertHTML', false, html);
    emitChange();
  };

  const insertLink = () => {
    saveSelection();
    const url = window.prompt('Digite ou cole o link (URL):', 'https://');
    if (url && url !== 'https://') {
      restoreSelection();
      document.execCommand('createLink', false, url);
      emitChange();
    }
  };

  const insertYoutubeVideo = () => {
    saveSelection();
    const url = window.prompt(
      'Cole o link do vídeo do YouTube (ex: https://www.youtube.com/watch?v=...):'
    );
    if (!url) return;
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const videoId = match ? match[1] : null;
    if (!videoId) {
      alert('Link do YouTube inválido. Verifique o endereço e tente novamente.');
      return;
    }
    restoreSelection();
    const embedHtml = `
      <div style="margin: 20px 0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <iframe width="100%" height="420" src="https://www.youtube.com/embed/${videoId}" title="Vídeo YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="display:block; width:100%;"></iframe>
      </div>
      <p><br></p>
    `;
    document.execCommand('insertHTML', false, embedHtml);
    emitChange();
  };

  const handleUploadInlineImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const uploadedUrl = await uploadMediaFile(file, 'inline');
      setImageUrlInput(uploadedUrl);
    } catch (err) {
      console.error('Erro ao subir imagem:', err);
      alert('Não foi possível enviar a imagem.');
    } finally {
      setUploadingImage(false);
    }
  };

  const confirmInsertImageInText = () => {
    if (!imageUrlInput.trim()) return;
    restoreSelection();
    const captionHtml = imageCaptionInput.trim()
      ? `<figcaption style="font-size: 12px; color: #64748b; text-align: center; margin-top: 6px; font-style: italic;">📷 ${imageCaptionInput.trim()}</figcaption>`
      : '';
    const figureHtml = `
      <figure style="width: ${imageWidthChoice}; margin: 20px auto; text-align: center;">
        <img src="${imageUrlInput.trim()}" alt="${imageCaptionInput.trim() || 'Imagem da matéria'}" style="width: 100%; height: auto; border-radius: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.08); display: block; margin: 0 auto;" />
        ${captionHtml}
      </figure>
      <p><br></p>
    `;
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('insertHTML', false, figureHtml);
      emitChange();
    }
    setImageUrlInput('');
    setImageCaptionInput('');
    setShowImageModal(false);
  };

  return (
    <div className="border border-gray-300 rounded-2xl bg-white shadow-sm overflow-hidden">
      {/* BARRA DE FERRAMENTAS ESTILO WORD / PORTAL DE NOTÍCIAS */}
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 border-b border-gray-200 p-2.5 flex flex-wrap items-center gap-1.5 sticky top-0 z-20">
        {/* DESFAZER / REFAZER */}
        <button
          type="button"
          onClick={() => execCmd('undo')}
          title="Desfazer (Ctrl+Z)"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700 transition-all"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCmd('redo')}
          title="Refazer (Ctrl+Y)"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700 transition-all"
        >
          <Redo className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-gray-300 mx-1" />

        {/* SELETOR DE ESTILO DE TÍTULO / PARÁGRAFO */}
        <select
          aria-label="Estilo do parágrafo ou título"
          onChange={(e) => {
            execCmd('formatBlock', e.target.value);
            e.target.value = '';
          }}
          defaultValue=""
          className="px-2.5 py-1.5 text-xs font-bold text-[#0b1c30] bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#006d3f]"
        >
          <option value="" disabled>
            Formato do Bloco...
          </option>
          <option value="P">Texto Normal (Parágrafo)</option>
          <option value="H1">Título Grande (H1)</option>
          <option value="H2">Subtítulo de Seção (H2)</option>
          <option value="H3">Tópico Destaque (H3)</option>
        </select>

        {/* SELETOR DE TAMANHO DE FONTE + BOTÕES A+ e A- ESTILO WORD */}
        <select
          aria-label="Tamanho da letra"
          onChange={(e) => {
            if (e.target.value) applyFontSizePx(e.target.value);
            e.target.value = '';
          }}
          defaultValue=""
          className="px-2.5 py-1.5 text-xs font-bold text-[#0b1c30] bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#006d3f]"
        >
          <option value="" disabled>
            Tamanho da Letra
          </option>
          <option value="14px">14px (Pequeno)</option>
          <option value="16px">16px (Normal)</option>
          <option value="18px">18px (Leitura Ideal)</option>
          <option value="22px">22px (Subtítulo)</option>
          <option value="26px">26px (Título Médio)</option>
          <option value="32px">32px (Título Grande)</option>
          <option value="40px">40px (Manchete Extra)</option>
        </select>

        <button
          type="button"
          onClick={() => stepFontSize(2)}
          title="Aumentar tamanho da letra selecionada (Estilo Word A+)"
          className="px-2 py-1 rounded-lg bg-white border border-gray-300 hover:bg-emerald-50 hover:border-[#006d3f] text-xs font-extrabold text-[#0b1c30] transition-all"
        >
          A+
        </button>
        <button
          type="button"
          onClick={() => stepFontSize(-2)}
          title="Diminuir tamanho da letra selecionada (Estilo Word A-)"
          className="px-2 py-1 rounded-lg bg-white border border-gray-300 hover:bg-emerald-50 hover:border-[#006d3f] text-[11px] font-bold text-gray-600 transition-all"
        >
          A-
        </button>

        <div className="h-5 w-px bg-gray-300 mx-1" />

        {/* NEGRITO, ITÁLICO, SUBLINHADO, TACHADO */}
        <button
          type="button"
          onClick={() => execCmd('bold')}
          title="Negrito (Ctrl+B)"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-800 font-bold transition-all"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCmd('italic')}
          title="Itálico (Ctrl+I)"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-800 transition-all"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCmd('underline')}
          title="Sublinhado (Ctrl+U)"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-800 transition-all"
        >
          <Underline className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCmd('strikeThrough')}
          title="Riscado"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-800 transition-all"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        {/* COR DO TEXTO */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              saveSelection();
              setShowColorMenu((prev) => !prev);
              setShowHighlightMenu(false);
            }}
            title="Cor da Letra"
            className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-800 flex items-center gap-0.5 transition-all"
          >
            <Type className="w-4 h-4 text-[#006d3f]" />
          </button>
          {showColorMenu && (
            <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-30 w-44 space-y-1">
              <div className="text-[10px] font-bold uppercase text-gray-400 px-2 py-0.5">
                Cor da Letra
              </div>
              {TEXT_COLORS.map((c) => (
                <button
                  key={c.color}
                  type="button"
                  onClick={() => {
                    execCmd('foreColor', c.color);
                    setShowColorMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-lg hover:bg-gray-50 text-left"
                >
                  <span
                    className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="font-semibold text-gray-700">{c.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MARCA-TEXTO / GRIFO */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              saveSelection();
              setShowHighlightMenu((prev) => !prev);
              setShowColorMenu(false);
            }}
            title="Marca-Texto (Grifar)"
            className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-800 flex items-center gap-0.5 transition-all"
          >
            <Highlighter className="w-4 h-4 text-amber-600" />
          </button>
          {showHighlightMenu && (
            <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-30 w-44 space-y-1">
              <div className="text-[10px] font-bold uppercase text-gray-400 px-2 py-0.5">
                Cor do Marca-Texto
              </div>
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => {
                    execCmd('hiliteColor', c.color);
                    setShowHighlightMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-lg hover:bg-gray-50 text-left"
                >
                  <span
                    className="w-4 h-4 rounded border border-gray-300 shrink-0"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="font-semibold text-gray-700">{c.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="h-5 w-px bg-gray-300 mx-1" />

        {/* ALINHAMENTOS */}
        <button
          type="button"
          onClick={() => execCmd('justifyLeft')}
          title="Alinhar à Esquerda"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCmd('justifyCenter')}
          title="Centralizar"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCmd('justifyRight')}
          title="Alinhar à Direita"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCmd('justifyFull')}
          title="Justificar Texto"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700"
        >
          <AlignJustify className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-gray-300 mx-1" />

        {/* LISTAS E CITAÇÃO */}
        <button
          type="button"
          onClick={() => execCmd('insertUnorderedList')}
          title="Lista com Marcadores"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCmd('insertOrderedList')}
          title="Lista Numerada"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={insertJournalisticQuote}
          title="Inserir Citação Jornalística com Barra Verde"
          className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#006d3f] text-xs font-bold flex items-center gap-1 border border-emerald-200"
        >
          <Quote className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Citação</span>
        </button>

        <div className="h-5 w-px bg-gray-300 mx-1" />

        {/* INSERIR IMAGEM NO MEIO DO TEXTO, VÍDEO E LINK */}
        <button
          type="button"
          onClick={() => {
            saveSelection();
            setShowImageModal(true);
          }}
          className="px-2.5 py-1.5 rounded-lg bg-[#0E1B2B] hover:bg-[#1a2f4a] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#7afbae]" />
          <span>+ Foto no Texto</span>
        </button>

        <button
          type="button"
          onClick={insertYoutubeVideo}
          title="Inserir Vídeo do YouTube"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-red-600"
        >
          <Video className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={insertLink}
          title="Inserir Link"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-blue-600"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => execCmd('insertHorizontalRule')}
          title="Inserir Linha Divisória"
          className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-600"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* BOTÃO PREVIEW À DIREITA */}
        <button
          type="button"
          onClick={() => setPreviewMode((prev) => !prev)}
          className={`ml-auto px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
            previewMode
              ? 'bg-[#006d3f] text-white border-[#006d3f]'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {previewMode ? (
            <>
              <Edit3 className="w-3.5 h-3.5" />
              <span>Voltar ao Editor</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Como Fica</span>
            </>
          )}
        </button>
      </div>

      {/* MODAL PARA INSERIR FOTO NO MEIO DA MATÉRIA */}
      {showImageModal && (
        <div className="bg-[#f8fafc] border-b border-gray-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0b1c30] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#006d3f]" />
              Inserir Fotografia ou Imagem Dentro do Texto
            </h4>
            <button
              type="button"
              onClick={() => setShowImageModal(false)}
              className="text-xs text-gray-500 hover:text-gray-800 font-bold"
            >
              Fechar ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                Enviar do Computador (Supabase Storage) ou Colar Link:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  placeholder="https://... ou clique em Subir Foto"
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-[#006d3f]"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUploadInlineImage}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={uploadingImage}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 rounded-lg bg-[#006d3f] hover:bg-[#00522e] text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
                >
                  {uploadingImage ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>{uploadingImage ? 'Enviando...' : 'Subir do PC'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                Legenda / Crédito da Foto (Opcional):
              </label>
              <input
                type="text"
                value={imageCaptionInput}
                onChange={(e) => setImageCaptionInput(e.target.value)}
                placeholder="Ex: Colheita de soja em Rio Verde (Foto: Divulgação)"
                className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-[#006d3f]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-gray-600">Tamanho da Foto no Texto:</span>
              {(['100%', '75%', '50%'] as const).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setImageWidthChoice(w)}
                  className={`px-2.5 py-1 rounded-md font-bold border ${
                    imageWidthChoice === w
                      ? 'bg-[#0E1B2B] text-white border-[#0E1B2B]'
                      : 'bg-white text-gray-600 border-gray-300'
                  }`}
                >
                  {w === '100%' ? 'Largura Total (100%)' : w === '75%' ? 'Média (75%)' : 'Pequena (50%)'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={confirmInsertImageInText}
              disabled={!imageUrlInput.trim()}
              className="px-4 py-2 rounded-lg bg-[#23B26D] hover:bg-[#1fa162] disabled:opacity-40 text-white text-xs font-extrabold uppercase tracking-wider shadow-sm"
            >
              Inserir Foto no Texto Agora
            </button>
          </div>
        </div>
      )}

      {/* ÁREA DE EDIÇÃO WYSIWYG OU PREVIEW */}
      {previewMode ? (
        <div className="p-6 sm:p-8 min-h-[380px] bg-[#fcfdff]">
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#006d3f] mb-4 pb-2 border-b border-gray-100">
            Pré-visualização Real da Matéria no Portal
          </div>
          <div
            className="article-rich-content prose prose-lg max-w-none text-[#1E293B] leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={emitChange}
          onKeyUp={saveSelection}
          onMouseUp={saveSelection}
          data-placeholder={placeholder}
          className="article-rich-content p-6 sm:p-8 min-h-[380px] max-h-[680px] overflow-y-auto focus:outline-none text-[#1E293B] text-base sm:text-lg leading-relaxed"
        />
      )}
    </div>
  );
};
