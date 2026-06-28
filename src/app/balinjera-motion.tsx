"use client";

import { useEffect } from "react";

export function BalinjeraMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-balinjera-root]");

    if (!root) {
      return;
    }

    const animatedElements = new Set<HTMLElement>();
    const menuScrollHeroes = new Set<HTMLElement>();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame: number | null = null;
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    if (reducedMotion.matches) {
      root
        .querySelectorAll<HTMLElement>("[data-balinjera-animate]")
        .forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const viewportHeight = () =>
      window.innerHeight || document.documentElement.clientHeight;

    const revealIfVisible = (element: HTMLElement, height = viewportHeight()) => {
      if (element.classList.contains("is-visible")) {
        return;
      }

      const rect = element.getBoundingClientRect();

      if (rect.top < height && rect.bottom > 0) {
        element.classList.add("is-visible");
        observer?.unobserve(element);
      }
    };

    const setMotionDelay = (element: HTMLElement, index: number) => {
      element.style.setProperty(
        "--motion-delay",
        `${Math.min(index % 5, 4) * 55}ms`
      );
    };

    const registerMenuHero = (element: HTMLElement) => {
      menuScrollHeroes.add(element);
    };

    const registerAnimatedElement = (element: HTMLElement) => {
      if (animatedElements.has(element)) {
        return false;
      }

      setMotionDelay(element, animatedElements.size);
      animatedElements.add(element);
      revealIfVisible(element);
      observer?.observe(element);

      return true;
    };

    const collectAnimatedNodes = (node: Node) => {
      if (!(node instanceof HTMLElement)) {
        return false;
      }

      let changed = false;

      if (node.matches("[data-balinjera-scroll-hero='menu']")) {
        registerMenuHero(node);
        changed = true;
      }

      node
        .querySelectorAll<HTMLElement>("[data-balinjera-scroll-hero='menu']")
        .forEach((element) => {
          registerMenuHero(element);
          changed = true;
        });

      if (node.matches("[data-balinjera-animate]")) {
        changed = registerAnimatedElement(node) || changed;
      }

      node
        .querySelectorAll<HTMLElement>("[data-balinjera-animate]")
        .forEach((element) => {
          changed = registerAnimatedElement(element) || changed;
        });

      return changed;
    };

    const revealVisibleElements = () => {
      const height = viewportHeight();

      menuScrollHeroes.forEach((hero) => {
        if (!hero.isConnected) {
          menuScrollHeroes.delete(hero);
          return;
        }

        const rect = hero.getBoundingClientRect();
        const travel = Math.max(rect.height * 0.64, height * 0.38);
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

      animatedElements.forEach((element) => {
        if (!element.isConnected) {
          animatedElements.delete(element);
          return;
        }

        revealIfVisible(element, height);
      });
    };

    const scheduleReveal = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        revealVisibleElements();
      });
    };

    const initialElements = Array.from(
      root.querySelectorAll<HTMLElement>("[data-balinjera-animate]")
    );

    root
      .querySelectorAll<HTMLElement>("[data-balinjera-scroll-hero='menu']")
      .forEach(registerMenuHero);

    if (!("IntersectionObserver" in window)) {
      initialElements.forEach((element) => element.classList.add("is-visible"));

      mutationObserver =
        "MutationObserver" in window
          ? new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                  if (node instanceof HTMLElement) {
                    if (node.matches("[data-balinjera-animate]")) {
                      node.classList.add("is-visible");
                    }

                    node
                      .querySelectorAll<HTMLElement>("[data-balinjera-animate]")
                      .forEach((element) => element.classList.add("is-visible"));
                  }
                });
              });
            })
          : null;

      mutationObserver?.observe(root, { childList: true, subtree: true });

      return () => {
        mutationObserver?.disconnect();
      };
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.01,
      }
    );

    initialElements.forEach(registerAnimatedElement);
    root.classList.add("motion-ready");
    revealVisibleElements();
    scheduleReveal();

    mutationObserver =
      "MutationObserver" in window
        ? new MutationObserver((mutations) => {
            let changed = false;

            mutations.forEach((mutation) => {
              mutation.addedNodes.forEach((node) => {
                changed = collectAnimatedNodes(node) || changed;
              });
            });

            if (changed) {
              scheduleReveal();
            }
          })
        : null;

    mutationObserver?.observe(root, { childList: true, subtree: true });
    window.addEventListener("scroll", revealVisibleElements, { passive: true });
    window.addEventListener("resize", revealVisibleElements);

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", revealVisibleElements);
      window.removeEventListener("resize", revealVisibleElements);
      mutationObserver?.disconnect();
      observer?.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
