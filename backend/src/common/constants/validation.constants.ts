/**
 * Validation constants
 */

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PHONE_REGEX = /^(\+55)?(\d{2})?(\d{4,5})(\d{4})$/;

export const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
export const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
