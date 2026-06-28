import styles from "./balinjera-article.module.css";
import {
  BALINJERA_ACCESSIBILITY_HREF,
  BALINJERA_EMAIL,
  BALINJERA_PHONE_DISPLAY,
  BALINJERA_PHONE_HREF,
  balinjeraCopy,
  type BalinjeraLang,
} from "./balinjera-content";
import { PageHero } from "./balinjera-page-hero";
import { ReserveSection } from "./balinjera-shell";

export function AccessibilityPageContent({ lang }: { lang: BalinjeraLang }) {
  const page = balinjeraCopy[lang].accessibilityPage;

  return (
    <>
      <PageHero
        actionHref={BALINJERA_ACCESSIBILITY_HREF + "#accessibility-statement"}
        actionLabel={page.actionLabel}
        body={page.body}
        eyebrow={page.eyebrow}
        imageClass={styles["accessibilityHeroImage"]}
        lang={lang}
        sectionClass={styles["articleHero"]}
        title={page.title}
      />

      <section
        className={styles["articleSection"]}
        id="accessibility-statement"
      >
        <article className={styles["articleBody"]}>
          <div className={styles["articleText"]}>
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              <a href={page.wcagHref} target="_blank" rel="noopener noreferrer">
                {page.wcagLabel}
              </a>
            </p>

            {page.sections.map((section) => (
              <section
                className={styles["accessibilitySection"]}
                key={section.title}
              >
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {"list" in section ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section className={styles["accessibilitySection"]}>
              <h2>{page.contactLabel}</h2>
              <div className={styles["accessibilityContactLinks"]}>
                <a href={"mailto:" + BALINJERA_EMAIL}>
                  {page.emailLabel}: <span dir="ltr">{BALINJERA_EMAIL}</span>
                </a>
                <a href={BALINJERA_PHONE_HREF}>
                  {page.phoneLabel}:{" "}
                  <span dir="ltr">{BALINJERA_PHONE_DISPLAY}</span>
                </a>
              </div>
              <p>{page.updated}</p>
            </section>
          </div>
        </article>
      </section>

      <ReserveSection lang={lang} />
    </>
  );
}
