"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useEffect } from "react";

type WebVitalsMetric = Parameters<Parameters<typeof useReportWebVitals>[0]>[0];

type EventParams = Record<string, string | number>;

type TrackedClickName =
  | "phone_click"
  | "whatsapp_click"
  | "order_click"
  | "directions_click";

// Local view of the GA queue: @next/third-parties already declares a global
// `dataLayer` type, so no second global declaration here.
const gaWindow = () => window as unknown as { dataLayer?: unknown[] };

// Same shape as the gtag() stub GA installs. gtag.js replays the `arguments`
// objects queued on dataLayer (arrays are ignored), so nothing is lost if an
// event fires before gtag.js has loaded.
const gtag = function () {
  const target = gaWindow();
  target.dataLayer = target.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  target.dataLayer.push(arguments);
} as (...command: ["event", string, EventParams]) => void;

// The URL is the source of truth for the language: <html lang> comes from the
// root layout and can be stale after a client-side navigation.
function currentPageLang() {
  return new URLSearchParams(window.location.search).get("lang") === "en"
    ? "en"
    : "he";
}

function currentPageType() {
  const path = window.location.pathname;

  if (path === "/") return "home";
  if (path.startsWith("/blog/")) return "article";

  return path.slice(1).split("/")[0] || "other";
}

export function trackEvent(name: string, params: EventParams = {}) {
  gtag("event", name, { page_lang: currentPageLang(), ...params });
}

function classifyClick(href: string): TrackedClickName | null {
  if (href.toLowerCase().startsWith("tel:")) return "phone_click";

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");
  const isHost = (domain: string) =>
    host === domain || host.endsWith(`.${domain}`);

  if (isHost("wa.me") || isHost("whatsapp.com")) {
    return "whatsapp_click";
  }
  if (isHost("wolt.com")) return "order_click";
  if (
    host === "maps.google.com" ||
    host === "maps.app.goo.gl" ||
    isHost("waze.com") ||
    (/^google\.[a-z.]+$/.test(host) && url.pathname.startsWith("/maps"))
  ) {
    return "directions_click";
  }

  return null;
}

// Module-level handler: useReportWebVitals re-subscribes whenever the callback
// identity changes, which would send duplicate web_vitals events.
function reportWebVitals(metric: WebVitalsMetric) {
  // FID is deprecated in favour of INP.
  if (metric.name === "FID") return;

  trackEvent("web_vitals", {
    metric_name: metric.name,
    // CLS is unitless; scale it so it survives GA4's integer reports.
    metric_value: Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value
    ),
    metric_rating: metric.rating,
    metric_id: metric.id,
    page_type: currentPageType(),
  });
}

export function BalinjeraAnalytics() {
  useReportWebVitals(reportWebVitals);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      const name = anchor
        ? classifyClick(anchor.getAttribute("href") ?? "")
        : null;

      if (!anchor || !name) return;

      trackEvent(name, {
        link_url: anchor.href,
        page_type: currentPageType(),
        ...(name === "order_click" ? { method: "wolt" } : {}),
      });
    }

    document.addEventListener("click", handleClick, { capture: true });

    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
