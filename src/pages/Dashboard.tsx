import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Menu,
  X,
  Home,
  CreditCard,
  History,
  Settings,
  BarChart3,
  Wallet,
  TrendingUp,
  Users,
  Bell,
  Search,
} from 'lucide-react';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transactions', label: 'Transações', icon: History },
    { id: 'payments', label: 'Pagamentos', icon: CreditCard },
    { id: 'wallet', label: 'Carteira', icon: Wallet },
    { id: 'analytics', label: 'Análises', icon: BarChart3 },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const stats = [
    {
      title: 'Saldo Total',
      value: 'R$ 12.500,00',
      icon: Wallet,
      color: 'from-primary-500 to-primary-600',
    },
    {
      title: 'Transações Hoje',
      value: '24',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Usuários Ativos',
      value: '1.234',
      icon: Users,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Volume de Vendas',
      value: 'R$ 45.230,50',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const recentTransactions = [
    { id: 1, name: 'João Silva', amount: 'R$ 250,00', status: 'Concluída', date: '2024-01-12' },
    { id: 2, name: 'Maria Santos', amount: 'R$ 150,00', status: 'Pendente', date: '2024-01-12' },
    { id: 3, name: 'Pedro Costa', amount: 'R$ 320,00', status: 'Concluída', date: '2024-01-11' },
    { id: 4, name: 'Ana Oliveira', amount: 'R$ 180,00', status: 'Concluída', date: '2024-01-11' },
    { id: 5, name: 'Carlos Mendes', amount: 'R$ 420,00', status: 'Falhada', date: '2024-01-10' },
  ];

  return (
    <div className="min-h-screen bg-dark-50">
      {/* Header */}
      <header className="bg-white border-b border-dark-200 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-dark-100 rounded-lg transition md:hidden"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-dark-900" />
              ) : (
                <Menu className="w-6 h-6 text-dark-900" />
              )}
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-dark-900">VenoPay</h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-dark-100 px-4 py-2 rounded-lg">
              <Search className="w-4 h-4 text-dark-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent outline-none text-sm text-dark-900 placeholder-dark-400 w-32"
              />
            </div>

            <button className="relative p-2 hover:bg-dark-100 rounded-lg transition">
              <Bell className="w-6 h-6 text-dark-900" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-dark-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-dark-900">{user?.name}</p>
                <p className="text-xs text-dark-500 capitalize">{user?.role.toLowerCase()}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 rounded-lg transition"
              title="Sair"
            >
              <LogOut className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } bg-dark-900 text-white transition-all duration-300 overflow-hidden fixed md:static h-screen md:h-auto flex flex-col`}
        >
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                      : 'text-dark-300 hover:text-white hover:bg-dark-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="px-4 py-6 border-t border-dark-800">
            <div className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg text-center">
              <p className="text-xs text-white opacity-90 mb-2">Versão</p>
              <p className="text-sm font-bold text-white">1.0.0</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 fade-in">
              {/* Bem-vindo */}
              <div>
                <h2 className="text-3xl font-bold text-dark-900 mb-2">
                  Bem-vindo de volta, {user?.name}! 👋
                </h2>
                <p className="text-dark-500">
                  Aqui está um resumo do seu gateway de pagamentos
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-sm border border-dark-100 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p className="text-dark-500 text-sm font-medium mb-2">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-dark-900">
                        {stat.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Transações Recentes */}
              <div className="bg-white rounded-xl shadow-sm border border-dark-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-dark-900">
                    Transações Recentes
                  </h3>
                  <button className="text-primary-500 hover:text-primary-600 font-medium text-sm">
                    Ver todas
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-dark-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-dark-900">
                          Cliente
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-dark-900">
                          Valor
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-dark-900">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-dark-900">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((tx) => (
                        <tr
                          key={tx.id}
                          className="border-b border-dark-100 hover:bg-dark-50 transition"
                        >
                          <td className="py-4 px-4 text-sm text-dark-900 font-medium">
                            {tx.name}
                          </td>
                          <td className="py-4 px-4 text-sm text-dark-900 font-semibold">
                            {tx.amount}
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                tx.status === 'Concluída'
                                  ? 'bg-green-100 text-green-700'
                                  : tx.status === 'Pendente'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-dark-500">
                            {tx.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="fade-in">
              <div className="bg-white rounded-xl shadow-sm border border-dark-100 p-8">
                <h2 className="text-2xl font-bold text-dark-900 mb-6">
                  Histórico de Transações
                </h2>
                <div className="text-center text-dark-500 py-12">
                  <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Módulo de transações em desenvolvimento</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="fade-in">
              <div className="bg-white rounded-xl shadow-sm border border-dark-100 p-8">
                <h2 className="text-2xl font-bold text-dark-900 mb-6">
                  Gerenciamento de Pagamentos
                </h2>
                <div className="text-center text-dark-500 py-12">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Módulo de pagamentos em desenvolvimento</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="fade-in">
              <div className="bg-white rounded-xl shadow-sm border border-dark-100 p-8">
                <h2 className="text-2xl font-bold text-dark-900 mb-6">
                  Carteira Digital
                </h2>
                <div className="text-center text-dark-500 py-12">
                  <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Módulo de carteira em desenvolvimento</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="fade-in">
              <div className="bg-white rounded-xl shadow-sm border border-dark-100 p-8">
                <h2 className="text-2xl font-bold text-dark-900 mb-6">
                  Análises e Relatórios
                </h2>
                <div className="text-center text-dark-500 py-12">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Módulo de análises em desenvolvimento</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="fade-in">
              <div className="bg-white rounded-xl shadow-sm border border-dark-100 p-8">
                <h2 className="text-2xl font-bold text-dark-900 mb-6">
                  Gerenciamento de Usuários
                </h2>
                <div className="text-center text-dark-500 py-12">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Módulo de usuários em desenvolvimento</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="fade-in">
              <div className="bg-white rounded-xl shadow-sm border border-dark-100 p-8">
                <h2 className="text-2xl font-bold text-dark-900 mb-6">
                  Configurações
                </h2>
                <div className="text-center text-dark-500 py-12">
                  <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Módulo de configurações em desenvolvimento</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
