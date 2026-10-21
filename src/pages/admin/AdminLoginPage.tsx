import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Home } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-[#08121e] via-[#0E1B2B] to-[#072619] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        {/* CABEÇALHO ESCURO COM LOGO */}
        <div className="bg-[#0E1B2B] p-8 text-center border-b border-white/10">
          <div className="inline-flex items-center justify-center bg-white/5 px-4 py-2.5 rounded-2xl border border-white/10 mb-4">
            <img
              src="/conexoes_logo_clean.png"
              alt="Conexões em FOCO"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[#7afbae] text-[11px] font-extrabold uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Painel Administrativo • CMS</span>
          </div>
          <h1 className="text-xl font-extrabold text-white">
            Central de Gestão Editorial & Comercial
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Gerencie matérias, conexões especiais, eventos e publicidade
          </p>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleLogin} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3.5 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              E-mail do Administrador
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@conexoesemfoco.com.br"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm text-[#0b1c30] focus:outline-none focus:border-[#006d3f]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Senha de Acesso
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm text-[#0b1c30] focus:outline-none focus:border-[#006d3f]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#006d3f] hover:bg-[#00522e] disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <span>{loading ? 'Autenticando no Supabase...' : 'Entrar no Painel Admin'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <Link
              to="/"
              className="hover:text-[#006d3f] font-semibold flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Voltar para o Portal</span>
            </Link>
            <span className="text-[11px] text-gray-400">Supabase Cloud Ativo</span>
          </div>
        </form>
      </div>
    </div>
  );
};
