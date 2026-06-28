import type { ReactNode } from "react";

import styles from "./balinjera-article.module.css";
import {
  BALINJERA_ORDER_HREF,
  balinjeraCopy,
  type BalinjeraLang,
} from "./balinjera-content";
import { SiteButton } from "./balinjera-shell";

export function PageHero({
  actionHref = BALINJERA_ORDER_HREF,
  actionLabel,
  body,
  eyebrow,
  imageClass,
  lang,
  sectionClass,
  showImage = true,
  title,
}: {
  actionHref?: string;
  actionLabel?: ReactNode;
  body: string;
  eyebrow: string;
  imageClass: string | undefined;
  lang: BalinjeraLang;
  sectionClass?: string | undefined;
  showImage?: boolean;
  title: string;
}) {
  const className = [
    styles["subHero"],
    showImage ? undefined : styles["subHeroNoImage"],
    sectionClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={className}>
      {showImage ? (
        <div
          className={[styles["subHeroImage"], imageClass ?? ""].join(" ")}
          data-balinjera-animate="image"
        />
      ) : null}
      <div className={styles["subHeroCopy"]} data-balinjera-animate="hero">
        <p className={styles["eyebrow"]}>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
        <SiteButton href={actionHref} lang={lang}>
          {actionLabel ?? balinjeraCopy[lang].orderLabel}
        </SiteButton>
      </div>
    </section>
  );
}
