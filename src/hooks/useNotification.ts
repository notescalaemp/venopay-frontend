import { useCallback } from 'react';
import { toast } from 'sonner';

export function useNotification() {
  const success = useCallback((message: string) => {
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
    });
  }, []);

  const error = useCallback((message: string) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
    });
  }, []);

  const warning = useCallback((message: string) => {
    toast.warning(message, {
      duration: 3000,
      position: 'top-right',
    });
  }, []);

  const info = useCallback((message: string) => {
    toast.info(message, {
      duration: 3000,
      position: 'top-right',
    });
  }, []);

  const loading = useCallback((message: string) => {
    return toast.loading(message, {
      position: 'top-right',
    });
  }, []);

  const dismiss = useCallback((id: string | number) => {
    toast.dismiss(id);
  }, []);

  const promise = useCallback(
    (promise: Promise<any>, messages: { loading: string; success: string; error: string }) => {
      toast.promise(promise, messages, {
        position: 'top-right',
      });
    },
    []
  );

  return {
    success,
    error,
    warning,
    info,
    loading,
    dismiss,
    promise,
  };
}
