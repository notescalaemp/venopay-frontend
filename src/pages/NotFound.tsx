import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center px-4">
      <div className="text-center">
        <AlertTriangle className="w-20 h-20 text-primary-500 mx-auto mb-6 animate-bounce" />
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Página não encontrada
        </h2>
        <p className="text-dark-300 mb-8 max-w-md mx-auto">
          Desculpe, a página que você está procurando não existe ou foi removida.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
        >
          <Home className="w-5 h-5" />
          Voltar para Dashboard
        </Link>
      </div>
    </div>
  );
}
