import { useEffect, useRef } from "react";

interface NuiMessage<T = unknown> {
  type?: string;
  action?: string;
  payload?: T;
  data?: T;
}

export function useNuiEvent<T = unknown>(event: string, handler: (payload: T) => void) {
  const saved = useRef(handler);
  useEffect(() => { saved.current = handler; }, [handler]);
  useEffect(() => {
    const listener = (e: MessageEvent<NuiMessage<T>>) => {
      const body = e.data ?? {};
      if ((body.type ?? body.action) === event) {
        saved.current((body.payload ?? body.data) as T);
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [event]);
}
