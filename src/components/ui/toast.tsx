'use client';

import * as React from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), 3000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({
  toast,
  onRemove,
}) => {
  const { type, title, description, id } = toast;

  const icon = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertCircle,
    info: Info,
  }[type];

  const bgColor = {
    success: 'border-l-success bg-success-light/10',
    error: 'border-l-destructive bg-destructive-light/10',
    warning: 'border-l-primary bg-primary-light/10',
    info: 'border-l-primary bg-primary-light/10',
  }[type];

  const iconColor = {
    success: 'text-success',
    error: 'text-destructive',
    warning: 'text-primary',
    info: 'text-primary',
  }[type];

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-md border bg-background p-4 shadow-elevation-3 max-w-sm',
        bgColor,
        'border-l-4 animate-in slide-in-from-right-4 fade-in duration-300'
      )}
    >
      <div className="mt-0.5">
        {icon && React.createElement(icon, { className: cn('h-5 w-5', iconColor) })}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-text-primary">{title}</h4>
        {description && (
          <p className="text-xs text-text-secondary mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={() => onRemove(id)}
        className="text-text-tertiary hover:text-text-primary transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
