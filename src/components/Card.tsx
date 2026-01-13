import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl p-6 shadow-sm border border-dark-100
        ${hoverable ? 'hover:shadow-md transition cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function CardHeader({ title, description, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-dark-900">{title}</h3>
        {description && (
          <p className="text-sm text-dark-500 mt-1">{description}</p>
        )}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={className}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`border-t border-dark-200 pt-6 mt-6 ${className}`}>
      {children}
    </div>
  );
}
