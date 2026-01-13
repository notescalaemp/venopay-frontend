/**
 * Audit action types
 */
export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'READ' | 'LOGIN' | 'LOGOUT';

export type AuditContext = {
  userId: string;
  userEmail: string;
  userRole: string;
  ipAddress?: string;
  userAgent?: string;
};
