import { Id, toast, ToastContent, ToastOptions } from 'react-toastify';

interface ToastifyFn<TData = unknown> {
  (content: ToastContent<TData>, options?: ToastOptions<{}> | undefined): Id;
}

export const showSuccess: ToastifyFn = (content, options = {}) => {
  const {
    position = toast.POSITION.TOP_CENTER,
    autoClose = 3000,
    hideProgressBar = true,
  } = options;
  return toast.success(content, {
    ...options,
    position,
    autoClose,
    hideProgressBar,
  });
};

export const showError: ToastifyFn = (content, options) =>
  toast.error(content, {
    ...options,
    position: toast.POSITION.TOP_CENTER,
  });
