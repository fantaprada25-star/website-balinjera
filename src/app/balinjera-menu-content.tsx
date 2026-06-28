import { Utensils } from "lucide-react";

import { balinjeraCopy, type BalinjeraLang } from "./balinjera-content";
import styles from "./balinjera-menu.module.css";
import { ReserveSection, SiteButton } from "./balinjera-shell";

function MenuHero({
  body,
  lang,
  sections,
  title,
}: {
  body: string;
  lang: BalinjeraLang;
  sections: readonly { readonly title: string }[];
  title: string;
}) {
  const copy = balinjeraCopy[lang];

  return (
    <section
      className={styles["menuBoardHero"]}
      data-balinjera-scroll-hero="menu"
    >
      <div className={styles["menuHeroCopy"]} data-balinjera-animate="hero">
        <p className={styles["eyebrow"]}>{copy.menuCta}</p>
        <h1>{title}</h1>
        <p>{body}</p>
        <SiteButton href="/menu#menu-sections" lang={lang}>
          {copy.menuCta}
        </SiteButton>
      </div>
      <div className={styles["menuHeroBoard"]} data-balinjera-animate="card">
        {sections.slice(0, 5).map((section, index) => (
          <article key={section.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{section.title}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MenuPageContent({ lang }: { lang: BalinjeraLang }) {
  const copy = balinjeraCopy[lang];
  const page = copy.menuPage;

  return (
    <>
      <MenuHero
        body={page.body}
        lang={lang}
        sections={page.sections}
        title={page.title}
      />

      <section className={styles["menuPageSection"]} id="menu-sections">
        <div
          className={styles["menuPageHeader"]}
          data-balinjera-animate="fade-up"
        >
          <Utensils aria-hidden="true" />
          <h2>{copy.menuCta}</h2>
        </div>
        <div className={styles["menuSections"]}>
          {page.sections.map((section) => (
            <section
              className={styles["menuGroup"]}
              data-balinjera-animate="card"
              key={section.title}
            >
              <h3>{section.title}</h3>
              <div className={styles["menuItems"]}>
                {section.items.map((item) => (
                  <article className={styles["menuItem"]} key={item.name}>
                    <div className={styles["menuItemText"]}>
                      <h4>{item.name}</h4>
                      {"description" in item ? <p>{item.description}</p> : null}
                    </div>
                    <p className={styles["menuPrice"]}>{item.price}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <ReserveSection lang={lang} />
    </>
  );
}
