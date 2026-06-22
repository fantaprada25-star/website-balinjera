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
    const menuScrollHeroes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-balinjera-scroll-hero='menu']")
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

      menuScrollHeroes.forEach((hero) => {
        const rect = hero.getBoundingClientRect();
        const travel = Math.max(rect.height * 0.64, viewportHeight * 0.38);
        const progress = Math.min(Math.max(-rect.top / travel, 0), 1);

        hero.style.setProperty("--menu-copy-y", `${-8 * progress}px`);
        hero.style.setProperty(
          "--menu-copy-scale",
          `${1 - 0.024 * progress}`
        );
        hero.style.setProperty(
          "--menu-copy-opacity",
          `${Math.max(0, 1 - 1.45 * progress)}`
        );
        hero.style.setProperty("--menu-board-y", `${-18 * progress}px`);
        hero.style.setProperty(
          "--menu-board-scale",
          `${1 - 0.04 * progress}`
        );
        hero.style.setProperty(
          "--menu-board-opacity",
          `${Math.max(0.08, 1 - 1.25 * progress)}`
        );
        hero.style.setProperty(
          "--menu-board-saturate",
          `${1 + 0.14 * progress}`
        );
      });

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
