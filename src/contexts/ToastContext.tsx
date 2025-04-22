import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
} from "react";

const TOAST_TIMEOUT_DURATION = 3000;

interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  showToast: (message: string, type: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

let toastIdCounter = 0;

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info") => {
      const id = toastIdCounter++;
      const newToast: ToastMessage = { id, message, type };

      setToasts((currentToasts) => [...currentToasts, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, TOAST_TIMEOUT_DURATION);
    },
    [removeToast]
  );

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastRenderer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

interface ToastRendererProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

const ToastRenderer = ({ toasts, removeToast }: ToastRendererProps) => {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  const baseClasses =
    "flex items-center justify-between max-w-xs p-4 rounded-lg shadow-md";
  const typeClasses = {
    success:
      "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    error: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  };
  const closeButtonClasses =
    "ml-4 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md shrink-0";

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`${baseClasses} ${typeClasses[type] || typeClasses.info}`}
    >
      <span className="break-words">{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close toast"
        className={closeButtonClasses}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
