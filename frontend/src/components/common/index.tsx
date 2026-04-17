import React from 'react';

/**
 * Componentes Comunes/UI
 * SOLID: SRP - Cada componente tiene una única responsabilidad
 * Diseño: 2 colores - Gris oscuro (#1F2937) y Blanco (#FFFFFF)
 */

// ============================================
// BUTTON COMPONENT
// ============================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-gray-800 hover:bg-gray-900 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const baseClasses = 'font-semibold rounded transition duration-200';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      style={{
        backgroundColor: variant === 'primary' ? '#1F2937' : '#e5e7eb',
        color: variant === 'primary' ? '#FFFFFF' : '#1F2937',
      }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
};

// ============================================
// ALERT COMPONENT
// ============================================

export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const typeStyles = {
    success: { bg: '#ecfdf5', border: '#10b981', text: '#065f46' },
    error: { bg: '#fef2f2', border: '#ef4444', text: '#7f1d1d' },
    warning: { bg: '#fffbeb', border: '#f59e0b', text: '#92400e' },
    info: { bg: '#eff6ff', border: '#3b82f6', text: '#1e3a8a' },
  };

  const style = typeStyles[type];

  return (
    <div
      className="border-l-4 p-4 mb-4"
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
        color: style.text,
      }}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <p>{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 font-bold text-lg"
            style={{ color: style.text }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================
// INPUT COMPONENT
// ============================================

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1" style={{ color: '#1F2937' }}>
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${className}`}
        style={{
          borderColor: error ? '#ef4444' : '#d1d5db',
          focusRing: '#1F2937',
        }}
        {...props}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  );
};

// ============================================
// CARD COMPONENT
// ============================================

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <div
      className={`rounded-lg shadow-md p-6 ${className}`}
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '4px solid #1F2937',
      }}
    >
      {title && (
        <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2937' }}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

// ============================================
// LOADING SPINNER
// ============================================

export const Spinner: React.FC = () => (
  <div className="flex justify-center items-center">
    <div
      className="animate-spin rounded-full h-12 w-12 border-b-2"
      style={{ borderColor: '#1F2937' }}
    ></div>
  </div>
);

// ============================================
// EMPTY STATE
// ============================================

export interface EmptyStateProps {
  message: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  action,
}) => (
  <div className="text-center py-12">
    <p className="mb-4" style={{ color: '#6b7280' }}>
      {message}
    </p>
    {action}
  </div>
);
