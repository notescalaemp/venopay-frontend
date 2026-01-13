/**
 * Application-wide constants
 */

export const APP_MESSAGES = {
  // Success
  SUCCESS_CREATED: 'Created successfully',
  SUCCESS_UPDATED: 'Updated successfully',
  SUCCESS_DELETED: 'Deleted successfully',
  SUCCESS_FETCHED: 'Fetched successfully',

  // Auth
  AUTH_INVALID_CREDENTIALS: 'Invalid credentials',
  AUTH_USER_NOT_ACTIVE: 'User is not active',
  AUTH_EMAIL_EXISTS: 'Email already registered',
  AUTH_UNAUTHORIZED: 'Unauthorized access',

  // User
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User already exists',

  // Seller
  SELLER_NOT_FOUND: 'Seller not found',
  SELLER_NOT_ACTIVE: 'Seller account is not active',

  // Manager
  MANAGER_NOT_FOUND: 'Manager not found',

  // Admin
  ADMIN_ONLY: 'This operation requires admin privileges',

  // General
  INTERNAL_ERROR: 'Internal server error',
  NOT_FOUND: 'Resource not found',
  CONFLICT: 'Resource already exists',
};

export const BCRYPT_ROUNDS = 12;
export const JWT_DECODE_OPTIONS = { complete: false };
