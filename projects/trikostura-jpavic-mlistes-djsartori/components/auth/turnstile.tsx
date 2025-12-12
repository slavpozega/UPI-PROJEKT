"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

type TurnstileCaptchaProps = {
  onToken: (token: string) => void;
  resetKey?: string | number;
};

export function TurnstileCaptcha({ onToken, resetKey }: TurnstileCaptchaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) {
      const msg = "NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set";
      console.error(msg);
      setError("Turnstile nije konfiguriran. Dodajte site key u env i restartajte app.");
      return;
    }

    let widgetId: string | null = null;

    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile) return;

      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => onToken(token),
        "error-callback": () => onToken(""),
        "expired-callback": () => onToken(""),
      });
    };

    const ensureScript = () => {
      const existingScript = document.querySelector(
        'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
      ) as HTMLScriptElement | null;

      if (existingScript && window.turnstile) {
        renderWidget();
        return;
      }

      if (existingScript && !window.turnstile) {
        window.onTurnstileLoad = () => renderWidget();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
      script.async = true;
      script.defer = true;
      window.onTurnstileLoad = () => renderWidget();
      document.body.appendChild(script);
    };

    ensureScript();

    return () => {
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [onToken, resetKey]);

  return <div ref={containerRef} className="cf-turnstile" />;
  return error ? (
    <div className="text-sm text-red-500">{error}</div>
  ) : (
    <div ref={containerRef} className="cf-turnstile" />
  );
}
