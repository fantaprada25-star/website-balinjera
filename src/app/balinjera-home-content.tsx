import Image from "next/image";
import Link from "next/link";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

import {
  BALINJERA_ORDER_HREF,
  balinjeraCopy,
  hrefWithLang,
  type BalinjeraLang,
} from "./balinjera-content";
import styles from "./balinjera-home.module.css";
import { ReserveSection, SiteButton, arrowFor } from "./balinjera-shell";

export function HomePageContent({ lang }: { lang: BalinjeraLang }) {
  const copy = balinjeraCopy[lang];

  return (
    <>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/balinjera/hero.jpg"
        bgImageSrc="/balinjera/hero.jpg"
        title={copy.hero.title}
        date={copy.hero.eyebrow}
        body={copy.hero.body}
        expandOnHash
        preserveTitleLines
        theme="balinjera"
      />

      <section className={styles["foodIntro"]} id="about">
        <div className={[styles["splitCopy"], styles["introCopy"]].join(" ")}>
          <div className={styles["copyBlock"]}>
            <h2>{copy.intro.title}</h2>
            <p>{copy.intro.body}</p>
            <SiteButton href="/menu" lang={lang}>
              {copy.menuCta}
            </SiteButton>
          </div>
        </div>
      </section>

      <section className={styles["featureSection"]} id="menu">
        <div className={styles["cardsColumn"]}>
          <div className={styles["cardsGrid"]}>
            {copy.featureCards.map((card, index) => {
              const cardHref = "href" in card ? card.href : undefined;
              const mediaClass =
                card.media === "event"
                  ? styles["cardMediaEvent"]
                  : card.media === "products"
                    ? styles["cardMediaProducts"]
                    : styles["cardMediaRestaurant"];
              const cardClass = [
                styles["featureCard"],
                index === 1 ? styles["cardGold"] : styles["cardBrown"],
              ].join(" ");
              const cardBody = (
                <>
                  <span
                    className={[styles["cardMedia"], mediaClass].join(" ")}
                    aria-hidden="true"
                  />
                  <span className={styles["cardContent"]}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    {cardHref ? (
                      <span className={styles["cardArrow"]}>{arrowFor()}</span>
                    ) : null}
                  </span>
                </>
              );

              if (cardHref) {
                return (
                  <Link
                    className={cardClass}
                    data-balinjera-animate="card"
                    href={hrefWithLang(cardHref, lang)}
                    key={card.title}
                  >
                    {cardBody}
                  </Link>
                );
              }

              return (
                <article
                  className={cardClass}
                  data-balinjera-animate="card"
                  key={card.title}
                >
                  {cardBody}
                </article>
              );
            })}
          </div>
        </div>
        <div className={[styles["splitCopy"], styles["offerCopy"]].join(" ")}>
          <div className={styles["copyBlock"]} data-balinjera-animate="fade-up">
            <p className={styles["eyebrow"]}>{copy.featureSeo.eyebrow}</p>
            <h2>{copy.featureSeo.title}</h2>
            {copy.featureSeo.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <span
            className={styles["offerImage"]}
            data-balinjera-animate="image"
            aria-hidden="true"
          />
        </div>
      </section>

      <section className={styles["nameSection"]}>
        <div
          className={[styles["splitImage"], styles["injeraImage"]].join(" ")}
          data-balinjera-animate="image"
        >
          <Image
            className={styles["figure"]}
            src="/balinjera/figure.png"
            alt=""
            width={179}
            height={560}
          />
        </div>
        <div className={[styles["splitCopy"], styles["nameCopy"]].join(" ")}>
          <div className={styles["copyBlock"]} data-balinjera-animate="fade-up">
            <h2>{copy.name.title}</h2>
            <p>{copy.name.body}</p>
            <SiteButton href={BALINJERA_ORDER_HREF} lang={lang}>
              {copy.orderWolt}
            </SiteButton>
          </div>
        </div>
      </section>

      <section className={styles["testimonialSection"]}>
        <div className={styles["quoteMark"]} aria-hidden="true">
          <span>“</span>
        </div>
        <blockquote data-balinjera-animate="fade-up">
          {copy.quote.body}
        </blockquote>
        <cite>{copy.quote.cite}</cite>
      </section>

      <ReserveSection lang={lang} />
    </>
  );
}
