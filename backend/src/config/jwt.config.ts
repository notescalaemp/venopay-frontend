import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-minimum-32-characters-long',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-jwt-key-minimum-32-characters',
  accessExpire: process.env.JWT_ACCESS_EXPIRE || '15m',
  refreshExpire: process.env.JWT_REFRESH_EXPIRE || '7d',
}));
