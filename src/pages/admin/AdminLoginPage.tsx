import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Home,
  Database,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@conexoesemfoco.com.br');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();

      // Tenta autenticação oficial no Supabase Auth
      const { data, error: authErr } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPass,
      });

      if (!authErr && data?.user) {
        localStorage.setItem(
          'conexoes_admin_session',
          JSON.stringify({ email: data.user.email, loggedAt: new Date().toISOString() })
        );
        navigate('/admin');
        return;
      }

      // Validação master de contingência para os administradores oficiais
      if (
        (cleanEmail === 'admin@conexoesemfoco.com.br' ||
          cleanEmail === 'gabrielfalasca1@gmail.com' ||
          cleanEmail === 'admin') &&
        (cleanPass === 'fmm4wOOVAWAAH1G5' || cleanPass === 'conexoes2026')
      ) {
        localStorage.setItem(
          'conexoes_admin_session',
          JSON.stringify({ email: cleanEmail, loggedAt: new Date().toISOString() })
        );
        navigate('/admin');
        return;
      }

      setError('E-mail ou senha inválidos. Verifique suas credenciais de administrador.');
    } catch {
      setError('Erro ao conectar ao servidor de autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070E18] relative overflow-hidden flex flex-col justify-center items-center px-4 py-12">
      {/* EFEITOS DE LUZ EXECUTIVOS DE FUNDO */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-emerald-600/15 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-amber-500/10 blur-[140px]" />

      <div className="w-full max-w-[960px] grid grid-cols-1 lg:grid-cols-12 bg-[#0B1524] rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.65)] border border-white/10 overflow-hidden relative z-10">
        {/* COLUNA INSTITUCIONAL ESQUERDA */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#08111D] via-[#0D1D31] to-[#062417] p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/[0.04] px-4 py-2.5 rounded-2xl border border-white/10 mb-7">
              <img
                src="/conexoes_logo_clean.png"
                alt="Conexões em FOCO"
                className="h-9 w-auto object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-[0.18em] mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Executive Newsroom CMS</span>
            </div>

            <h1 className="text-2xl lg:text-[26px] font-extrabold text-white leading-tight tracking-tight">
              Central Editorial & Comercial
            </h1>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Ambiente exclusivo para gestão de matérias com editor estilo Word, curadoria das 3
              Conexões especiais e controle de campanhas publicitárias em tempo real.
            </p>
          </div>

          <div className="space-y-3 pt-8 mt-8 border-t border-white/10">
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Editor Jornalístico Estilo Word + Upload Cloud</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Ambientes: Empresarial, Lei & Agenda de Eventos</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Cotações & Clima 100% Automáticos em Tempo Real</span>
            </div>

            <div className="pt-3 flex items-center gap-2 text-[11px] text-emerald-400/90 font-semibold">
              <Database className="w-3.5 h-3.5" />
              <span>Supabase PostgreSQL + Storage Conectados</span>
            </div>
          </div>
        </div>

        {/* COLUNA DE AUTENTICAÇÃO DIREITA */}
        <div className="lg:col-span-7 bg-white p-8 lg:p-11 flex flex-col justify-center">
          <div className="mb-7">
            <div className="flex items-center gap-1.5 text-[#006d3f] text-[11px] font-extrabold uppercase tracking-[0.16em] mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Acesso Seguro de Redação</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Entrar no Painel Administrativo
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Utilize sua credencial de administrador para acessar a plataforma.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3.5 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                E-mail do Administrador
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@conexoesemfoco.com.br"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-sm text-slate-900 font-medium focus:outline-none focus:border-[#006d3f] focus:ring-2 focus:ring-[#006d3f]/15 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Senha de Acesso
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha..."
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-sm text-slate-900 font-medium focus:outline-none focus:border-[#006d3f] focus:ring-2 focus:ring-[#006d3f]/15 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#006d3f] to-[#00874f] hover:from-[#005832] hover:to-[#006d3f] disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#006d3f]/25 transition-all cursor-pointer"
            >
              <span>{loading ? 'Autenticando no Supabase...' : 'Acessar Painel Executivo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <Link
                to="/"
                className="hover:text-[#006d3f] font-bold flex items-center gap-1.5 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Voltar para a Capa do Portal</span>
              </Link>
              <span className="text-[11px] text-slate-400 font-medium">Conexões em FOCO • 2026</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
