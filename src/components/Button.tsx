import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const variantClasses = {
  primary:
    'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white',
  secondary:
    'bg-dark-200 hover:bg-dark-300 text-dark-900',
  danger:
    'bg-red-500 hover:bg-red-600 text-white',
  outline:
    'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        font-semibold rounded-lg transition transform hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
