import { X } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

/**
 * Accessible modal dialog rendered in a React portal.
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {string} title
 * @param {'sm'|'md'|'lg'} size
 */
export default function Modal({ open, onClose, title, size = 'md', children }) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const widths = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full ${widths[size]} rounded-2xl bg-white shadow-modal`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 id="modal-title" className="text-base font-semibold text-slate-800">
            {title}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X size={18} />
          </Button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
