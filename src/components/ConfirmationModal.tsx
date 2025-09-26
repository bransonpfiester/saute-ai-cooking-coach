'use client';

import { useEffect } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'info' | 'danger';
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Continue',
  cancelText = 'Cancel',
  type = 'warning'
}: ConfirmationModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: '⚠️',
          iconBg: 'from-red-400 to-red-500',
          confirmBg: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
          border: 'border-red-200',
          titleColor: 'text-red-800'
        };
      case 'info':
        return {
          icon: 'ℹ️',
          iconBg: 'from-blue-400 to-blue-500',
          confirmBg: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
          border: 'border-blue-200',
          titleColor: 'text-blue-800'
        };
      default: // warning
        return {
          icon: '⚠️',
          iconBg: 'from-amber-400 to-orange-500',
          confirmBg: 'from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700',
          border: 'border-amber-200',
          titleColor: 'text-amber-800'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-md mx-4 w-full transform transition-all">
        <div className="p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className={`w-16 h-16 bg-gradient-to-br ${styles.iconBg} rounded-3xl flex items-center justify-center shadow-lg`}>
              <span className="text-2xl">{styles.icon}</span>
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h3 className={`text-xl font-bold ${styles.titleColor} mb-3`}>
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-300 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-6 py-3 bg-gradient-to-r ${styles.confirmBg} text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
