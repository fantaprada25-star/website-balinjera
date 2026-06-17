"use client";

import { useEffect } from "react";

export function BalinjeraMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-balinjera-root]");

    if (!root) {
      return;
    }

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>("[data-balinjera-animate]")
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    root.classList.add("motion-ready");

    elements.forEach((element, index) => {
      element.style.setProperty(
        "--motion-delay",
        `${Math.min(index % 5, 4) * 55}ms`
      );
    });

    const revealVisibleElements = () => {
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((element) => {
        if (element.classList.contains("is-visible")) {
          return;
        }

        const rect = element.getBoundingClientRect();

        if (rect.top < viewportHeight * 0.92 && rect.bottom > 0) {
          element.classList.add("is-visible");
        }
      });
    };

    const animationFrame = window.requestAnimationFrame(revealVisibleElements);

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => {
        window.cancelAnimationFrame(animationFrame);
        root.classList.remove("motion-ready");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", revealVisibleElements, { passive: true });
    window.addEventListener("resize", revealVisibleElements);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", revealVisibleElements);
      window.removeEventListener("resize", revealVisibleElements);
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
