import { UserRole } from '@prisma/client';

/**
 * Authenticated user type passed through request
 */
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  iat?: number;
  exp?: number;
};
