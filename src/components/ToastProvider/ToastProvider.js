import React from "react";
import ToastShelf from "../ToastShelf";
import useEscapeKey from "../../hooks/use-escape-key";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const timeoutIds = toasts.map(({ id }) =>
      setTimeout(() => removeToast(id), 5000),
    );

    return () => timeoutIds.forEach(clearTimeout);
  }, [toasts]);

  useEscapeKey(() => {
    setToasts([]);
  });

  function addToast(message, variant) {
    const id = crypto.randomUUID();
    setToasts((prevToasts) => [...prevToasts, { id, message, variant }]);
  }

  function removeToast(id) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastShelf toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
