import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface OrderIdentifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (identifier: string) => void;
}

export function OrderIdentifierModal({ isOpen, onClose, onSubmit }: OrderIdentifierModalProps) {
  const [identifier, setIdentifier] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when modal opens - enhanced for mobile
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Multiple attempts to ensure mobile keyboard appears
      const focusInput = () => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.click(); // Additional trigger for mobile
        }
      };

      // Immediate focus
      focusInput();
      
      // Delayed focus for better mobile compatibility
      const timer1 = setTimeout(focusInput, 50);
      const timer2 = setTimeout(focusInput, 200);
      const timer3 = setTimeout(focusInput, 500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen]);

  // Reset identifier when modal opens
  useEffect(() => {
    if (isOpen) {
      setIdentifier('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.trim()) {
      onSubmit(identifier.trim());
      onClose();
      setIdentifier('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">Finalize Order</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="identifier" className="block text-sm font-medium text-foreground mb-2">
              Table number or customer name
            </label>
            <input
              ref={inputRef}
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g., Table 5 or John Doe"
              autoComplete="off"
              autoFocus
              inputMode="text"
              enterKeyHint="done"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!identifier.trim()}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}