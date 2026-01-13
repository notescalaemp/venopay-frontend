// Configuração da aplicação
export const APP_CONFIG = {
  // API
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'VenoPay',

  // Autenticação
  AUTH: {
    TOKEN_KEY: 'accessToken',
    USER_KEY: 'user',
    REFRESH_TOKEN_KEY: 'refreshToken',
  },

  // Cores da marca
  COLORS: {
    PRIMARY: '#f97316', // Laranja
    DARK: '#111827', // Preto
    LIGHT: '#ffffff', // Branco
  },

  // Timeouts
  TIMEOUTS: {
    API_TIMEOUT: 30000, // 30s
    SESSION_TIMEOUT: 3600000, // 1h
  },

  // Paginação
  PAGINATION: {
    PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },

  // Roles disponíveis
  ROLES: {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    SELLER: 'SELLER',
    SUB_ACCOUNT: 'SUB_ACCOUNT',
  },
};

// Endpoints da API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify',
  },
  TRANSACTIONS: {
    LIST: '/transactions',
    DETAIL: (id: string) => `/transactions/${id}`,
    CREATE: '/transactions',
  },
  PAYMENTS: {
    LIST: '/payments',
    CREATE: '/payments',
    CONFIRM: (id: string) => `/payments/${id}/confirm`,
  },
  USERS: {
    LIST: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
  },
};

// Status de pagamentos
export const PAYMENT_STATUS = {
  PENDING: 'Pendente',
  APPROVED: 'Aprovado',
  DECLINED: 'Recusado',
  CANCELLED: 'Cancelado',
  REFUNDED: 'Reembolsado',
  COMPLETED: 'Concluída',
};

// Mensagens da aplicação
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login realizado com sucesso!',
    LOGOUT: 'Logout realizado com sucesso!',
    CREATE: 'Criado com sucesso!',
    UPDATE: 'Atualizado com sucesso!',
    DELETE: 'Deletado com sucesso!',
  },
  ERROR: {
    LOGIN_FAILED: 'Email ou senha incorretos',
    NETWORK_ERROR: 'Erro de conexão. Tente novamente.',
    SERVER_ERROR: 'Erro do servidor. Tente mais tarde.',
    UNAUTHORIZED: 'Você não tem permissão para acessar isto.',
  },
  LOADING: 'Carregando...',
  CONFIRM_DELETE: 'Tem certeza que deseja deletar?',
};
