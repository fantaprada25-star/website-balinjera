import { Utensils } from "lucide-react";

import {
  BALINJERA_ORDER_HREF,
  balinjeraCopy,
  type BalinjeraLang,
} from "../balinjera-content";
import { ReserveSection, SiteButton } from "../balinjera-shell";

import styles from "./about.module.css";

function AboutHero({
  body,
  eyebrow,
  highlights,
  lang,
  story,
  storyTitle,
  title,
}: {
  body: string;
  eyebrow: string;
  highlights: readonly string[];
  lang: BalinjeraLang;
  story: string;
  storyTitle: string;
  title: string;
}) {
  return (
    <section className={styles["aboutEditorialHero"]}>
      <div className={styles["aboutHeroGrid"]}>
        <div className={styles["aboutHeroMain"]} data-balinjera-animate="hero">
          <h1>{title}</h1>
          <p>{body}</p>
          <SiteButton href={BALINJERA_ORDER_HREF} lang={lang}>
            {balinjeraCopy[lang].orderLabel}
          </SiteButton>
        </div>
        <aside
          className={styles["aboutHeroAside"]}
          data-balinjera-animate="card"
        >
          <p className={styles["eyebrow"]}>{eyebrow}</p>
          <div className={styles["aboutHeroMark"]} aria-hidden="true">
            <Utensils />
          </div>
          <div className={styles["aboutHeroStory"]}>
            <h2>{storyTitle}</h2>
            <p>{story}</p>
          </div>
        </aside>
        <div
          className={styles["aboutHeroHighlights"]}
          data-balinjera-animate="card"
        >
          {highlights.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutPageContent({ lang }: { lang: BalinjeraLang }) {
  const copy = balinjeraCopy[lang];
  const page = copy.aboutPage;

  return (
    <>
      <AboutHero
        body={page.body}
        eyebrow={page.eyebrow}
        highlights={page.highlights}
        lang={lang}
        story={page.story}
        storyTitle={page.storyTitle}
        title={page.title}
      />

      <section className={styles["detailSection"]}>
        <div className={styles["detailIntro"]} data-balinjera-animate="fade-up">
          <Utensils aria-hidden="true" />
          <h2>{page.storyTitle}</h2>
          <p>{page.story}</p>
        </div>
        <div className={styles["detailList"]}>
          {page.highlights.map((item) => (
            <article
              className={styles["detailItem"]}
              data-balinjera-animate="card"
              key={item}
            >
              <span />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <ReserveSection lang={lang} />
    </>
  );
}
