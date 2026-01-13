import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { Lock, Mail, Eye, EyeOff, CreditCard } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('admin@gateway.com');
  const [password, setPassword] = useState('Admin@123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center px-4 py-12">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 fade-in">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-dark-900">VenoPay</h1>
                <p className="text-xs text-primary-500 font-semibold">Gateway de Pagamentos</p>
              </div>
            </div>
          </div>

          {/* Título */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-dark-900 mb-2">Bem-vindo de volta</h2>
            <p className="text-dark-500">Faça login para acessar sua conta</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-dark-900 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-dark-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 border border-dark-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-dark-50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-dark-900 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-dark-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-12 py-3 border border-dark-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-dark-50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-dark-400 hover:text-dark-600 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-lg transition transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Rodapé com credenciais */}
          <div className="mt-8 pt-8 border-t border-dark-200">
            <div className="bg-primary-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-primary-700 mb-2">Credenciais de Teste:</p>
              <div className="space-y-1 text-xs text-primary-600">
                <p><span className="font-mono">admin@gateway.com</span></p>
                <p><span className="font-mono">Admin@123</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-8">
          <p className="text-dark-400 text-sm">
            © 2024 VenoPay. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
