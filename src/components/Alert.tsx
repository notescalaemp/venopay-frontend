import { ReactNode } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
}

const alertConfig = {
  success: {
    icon: CheckCircle,
    bg: 'bg-green-50',
    border: 'border-green-200',
    title: 'text-green-900',
    text: 'text-green-700',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-red-50',
    border: 'border-red-200',
    title: 'text-red-900',
    text: 'text-red-700',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    title: 'text-yellow-900',
    text: 'text-yellow-700',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    title: 'text-blue-900',
    text: 'text-blue-700',
  },
};

export function Alert({
  type = 'info',
  title,
  message,
  onClose,
}: AlertProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg border ${config.bg} ${config.border}`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.text}`} />
      <div className="flex-1">
        {title && (
          <h3 className={`font-semibold text-sm ${config.title}`}>{title}</h3>
        )}
        <p className={`text-sm ${config.text} ${title ? 'mt-1' : ''}`}>
          {message}
        </p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 text-lg font-semibold ${config.text} hover:opacity-70`}
        >
          ×
        </button>
      )}
    </div>
  );
}
