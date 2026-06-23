import {
  Accessibility,
  BookOpenText,
  CalendarDays,
  ChevronRight,
  Clock,
  Globe2,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

import {
  BALINJERA_ACCESSIBILITY_HREF,
  BALINJERA_EMAIL,
  BALINJERA_ORDER_HREF,
  BALINJERA_PHONE_DISPLAY,
  BALINJERA_PHONE_HREF,
  SITEKEPT_URL,
  balinjeraCopy,
  hrefWithLang,
  languageLabels,
  type BalinjeraBlogPost,
  type BalinjeraFooterLine,
  type BalinjeraLang,
  type BalinjeraPageKey,
} from "./balinjera-content";
import { BalinjeraMotion } from "./balinjera-motion";
import styles from "./balinjera.module.css";
import { EventInquiryForm } from "./events/event-inquiry-form";

type FrameProps = {
  active: BalinjeraPageKey;
  children: ReactNode;
  currentPath: string;
  lang: BalinjeraLang;
};

const WHATSAPP_HREF = "https://api.whatsapp.com/send?phone=9720559655559";
const EVENTS_CONTACT_HREF = "/events#event-inquiry";

function arrowFor() {
  return <ChevronRight className={styles["arrowIcon"]} aria-hidden="true" />;
}

function splitLines(value: string) {
  return value.split("\n").map((line) => (
    <span key={line}>
      {line}
      <br />
    </span>
  ));
}

function renderFooterLine(line: BalinjeraFooterLine, lang: BalinjeraLang) {
  if (typeof line === "string") {
    return <p key={line}>{line}</p>;
  }

  if (line.href.startsWith("/")) {
    return (
      <Link
        className={styles["footerLineLink"]}
        key={line.label}
        href={hrefWithLang(line.href, lang)}
      >
        {line.label}
      </Link>
    );
  }

  return (
    <a
      className={styles["footerLineLink"]}
      key={line.label}
      href={line.href}
      rel={line.href.startsWith("http") ? "noreferrer" : undefined}
      target={line.href.startsWith("http") ? "_blank" : undefined}
    >
      {line.label}
    </a>
  );
}

function SiteButton({
  children,
  href,
  lang,
  brown = false,
}: {
  brown?: boolean;
  children: ReactNode;
  href: string;
  lang: BalinjeraLang;
}) {
  const className = `${styles["button"]} ${brown ? styles["buttonBrown"] : ""}`;
  const content = (
    <>
      <span>{children}</span>
      {arrowFor()}
    </>
  );

  if (href.startsWith("http")) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={hrefWithLang(href, lang)}>
      {content}
    </Link>
  );
}

function SiteHeader({
  active,
  currentPath,
  lang,
}: {
  active: BalinjeraPageKey;
  currentPath: string;
  lang: BalinjeraLang;
}) {
  const copy = balinjeraCopy[lang];
  const nextLang: BalinjeraLang = lang === "he" ? "en" : "he";

  const renderNavLinks = () =>
    copy.nav.map((item) => {
      const isActive = item.key === active;
      const className = isActive ? styles["navActive"] : undefined;
      const href = item.href;

      if (href.startsWith("http")) {
        return (
          <a
            aria-current={isActive ? "page" : undefined}
            className={className}
            href={href}
            key={item.key}
            rel="noreferrer"
            target="_blank"
          >
            {item.label}
          </a>
        );
      }

      return (
        <Link
          aria-current={isActive ? "page" : undefined}
          className={className}
          href={hrefWithLang(href, lang)}
          key={item.key}
        >
          {item.label}
        </Link>
      );
    });

  return (
    <header className={styles["header"]}>
      <div className={styles["headerInner"]}>
        <Link
          className={styles["logoLink"]}
          href={hrefWithLang("/", lang)}
          aria-label="Balinjera"
        >
          <Image
            src="/balinjera/logo.png"
            alt="Balinjera"
            width={209}
            height={59}
            priority
          />
        </Link>

        <nav className={styles["nav"]} aria-label={copy.navLabel}>
          {renderNavLinks()}
          <Link
            className={`${styles["languageSwitch"]} ${styles["mobileLanguage"]}`}
            href={hrefWithLang(currentPath, nextLang)}
            aria-label={languageLabels[lang].switchLabel}
          >
            <Globe2 aria-hidden="true" />
            <span>{languageLabels[lang].switchTo}</span>
          </Link>
        </nav>

        <div className={styles["headerActions"]}>
          <Link
            className={styles["languageSwitch"]}
            href={hrefWithLang(currentPath, nextLang)}
            aria-label={languageLabels[lang].switchLabel}
          >
            <Globe2 aria-hidden="true" />
            <span>{languageLabels[lang].switchTo}</span>
          </Link>
        </div>

        <details className={styles["mobileMenu"]}>
          <summary aria-label={copy.menuLabel}>
            <Menu aria-hidden="true" />
          </summary>
          <div className={styles["mobileMenuPanel"]}>
            {renderNavLinks()}
            <Link
              className={styles["languageSwitch"]}
              href={hrefWithLang(currentPath, nextLang)}
              aria-label={languageLabels[lang].switchLabel}
            >
              <Globe2 aria-hidden="true" />
              <span>{languageLabels[lang].switchTo}</span>
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}

function Footer({ lang }: { lang: BalinjeraLang }) {
  const copy = balinjeraCopy[lang];

  return (
    <footer className={styles["footer"]} id="footer">
      <div className={styles["footerBrand"]}>
        <Image
          src="/balinjera/logo.png"
          alt="Balinjera"
          width={185}
          height={58}
        />
        <p>{splitLines(copy.footerTagline)}</p>
        <a href={SITEKEPT_URL} target="_blank" rel="noreferrer">
          {copy.madeBy}
        </a>
      </div>

      {copy.footerColumns.map((column) => (
        <div className={styles["footerColumn"]} key={column.title}>
          <h3>{column.title}</h3>
          <div className={styles["footerLines"]}>
            {column.lines.map((line) => renderFooterLine(line, lang))}
          </div>
        </div>
      ))}

      <div className={styles["footerColumn"]}>
        <h3>{copy.follow}</h3>
        <div className={styles["socials"]}>
          <a
            className={styles["socialBrown"]}
            href="https://www.instagram.com/ethiopianfoodrestaurant/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Instagram aria-hidden="true" />
          </a>
          <a
            className={styles["socialGold"]}
            href="https://www.facebook.com/Traditional.Ethiopian.Cuisine/?locale=he_IL"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            f
          </a>
        </div>
      </div>
    </footer>
  );
}

function FloatingActions({ lang }: { lang: BalinjeraLang }) {
  const copy = balinjeraCopy[lang].quick;

  return (
    <>
      <Link
        className={styles["accessibility"]}
        href={hrefWithLang(BALINJERA_ACCESSIBILITY_HREF, lang)}
        aria-label={copy.accessibility}
      >
        <Accessibility aria-hidden="true" />
      </Link>
      <div className={styles["quickActions"]} aria-label={copy.actions}>
        <a
          className={`${styles["quickAction"]} ${styles["woltAction"]}`}
          href={BALINJERA_ORDER_HREF}
          target="_blank"
          rel="noreferrer"
          aria-label={copy.wolt}
        >
          Wolt
        </a>
        <a
          className={`${styles["quickAction"]} ${styles["whatsappAction"]}`}
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noreferrer"
          aria-label={copy.whatsapp}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16.01 3.5A12.37 12.37 0 0 0 5.5 22.43L4 28l5.7-1.49A12.33 12.33 0 0 0 16 28.1 12.3 12.3 0 0 0 16.01 3.5Zm7.22 17.64c-.3.83-1.74 1.57-2.43 1.67-.62.1-1.4.14-2.27-.14-.52-.16-1.2-.39-2.06-.76-3.63-1.56-5.99-5.2-6.17-5.45-.18-.24-1.47-1.95-1.47-3.72s.93-2.64 1.26-3c.33-.36.72-.45.96-.45h.69c.22.01.52-.08.82.63.3.72 1.04 2.5 1.13 2.69.09.18.15.4.03.64-.12.25-.18.4-.36.61-.18.21-.38.47-.54.63-.18.18-.36.38-.15.74.21.36.93 1.53 1.99 2.48 1.37 1.22 2.52 1.6 2.88 1.78.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.1.99 2.46 1.17.36.18.6.27.69.42.09.15.09.87-.21 1.7Z" />
          </svg>
        </a>
      </div>
    </>
  );
}

export function BalinjeraFrame({
  active,
  children,
  currentPath,
  lang,
}: FrameProps) {
  const language = languageLabels[lang];

  return (
    <main
      className={styles["root"]}
      data-balinjera-root
      dir={language.dir}
      lang={lang}
    >
      <BalinjeraMotion />
      <SiteHeader active={active} currentPath={currentPath} lang={lang} />
      {children}
      <Footer lang={lang} />
      <FloatingActions lang={lang} />
    </main>
  );
}

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
        <div className={`${styles["splitCopy"]} ${styles["introCopy"]}`}>
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
              const cardClass = `${styles["featureCard"]} ${index === 1 ? styles["cardGold"] : styles["cardBrown"]}`;
              const cardBody = (
                <>
                  <span
                    className={`${styles["cardMedia"]} ${mediaClass}`}
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
        <div className={`${styles["splitCopy"]} ${styles["offerCopy"]}`}>
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
          className={`${styles["splitImage"]} ${styles["injeraImage"]}`}
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
        <div className={`${styles["splitCopy"]} ${styles["nameCopy"]}`}>
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

export function ReserveSection({
  actionHref = BALINJERA_ORDER_HREF,
  actionLabel,
  lang,
  showImage = true,
}: {
  actionHref?: string;
  actionLabel?: ReactNode;
  lang: BalinjeraLang;
  showImage?: boolean;
}) {
  const copy = balinjeraCopy[lang];

  return (
    <section className={styles["reserveSection"]}>
      <div className={styles["reserveBar"]} data-balinjera-animate="fade-up">
        <div className={styles["reserveText"]}>
          {copy.readyTitle.map((line) => (
            <h2 key={line}>{line}</h2>
          ))}
        </div>
        <SiteButton href={actionHref} lang={lang} brown>
          {actionLabel ?? copy.orderLabel}
        </SiteButton>
      </div>
      {showImage ? (
        <div className={styles["teamImage"]} data-balinjera-animate="image" />
      ) : null}
    </section>
  );
}

function PageHero({
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
          className={`${styles["subHeroImage"]} ${imageClass ?? ""}`}
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

function EventsHero({
  body,
  eyebrow,
  lang,
  options,
  title,
}: {
  body: string;
  eyebrow: string;
  lang: BalinjeraLang;
  options: readonly string[];
  title: string;
}) {
  const copy = balinjeraCopy[lang];

  return (
    <section className={styles["eventsInvitationHero"]}>
      <div className={styles["eventsHeroCopy"]} data-balinjera-animate="hero">
        <p className={styles["eyebrow"]}>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
        <SiteButton href={EVENTS_CONTACT_HREF} lang={lang} brown>
          {copy.contactLabel}
        </SiteButton>
      </div>
      <div className={styles["eventsHeroMedia"]} data-balinjera-animate="image">
        <div className={styles["eventsHeroPhoto"]} aria-hidden="true" />
      </div>
      <div
        className={styles["eventsHeroOptions"]}
        data-balinjera-animate="card"
      >
        {options.map((item) => (
          <article key={item}>
            <CalendarDays aria-hidden="true" />
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

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

function BlogHero({
  body,
  eyebrow,
  lang,
  posts,
  title,
}: {
  body: string;
  eyebrow: string;
  lang: BalinjeraLang;
  posts: readonly BalinjeraBlogPost[];
  title: string;
}) {
  return (
    <section className={styles["blogMastheadHero"]}>
      <div className={styles["blogHeroIntro"]} data-balinjera-animate="hero">
        <p className={styles["eyebrow"]}>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
      <div className={styles["blogHeroRail"]} data-balinjera-animate="card">
        {posts.map((post, index) => (
          <Link
            className={styles["blogHeroPostLink"]}
            href={hrefWithLang(`/blog/${post.slug}`, lang)}
            key={post.title}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <BookOpenText aria-hidden="true" />
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </div>
          </Link>
        ))}
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

export function AccessibilityPageContent({ lang }: { lang: BalinjeraLang }) {
  const page = balinjeraCopy[lang].accessibilityPage;

  return (
    <>
      <PageHero
        actionHref={`${BALINJERA_ACCESSIBILITY_HREF}#accessibility-statement`}
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
              <a href={page.wcagHref} target="_blank" rel="noreferrer">
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
                <a href={`mailto:${BALINJERA_EMAIL}`}>
                  {page.emailLabel}: <span dir="ltr">{BALINJERA_EMAIL}</span>
                </a>
                <a href={BALINJERA_PHONE_HREF}>
                  {page.phoneLabel}: <span dir="ltr">{BALINJERA_PHONE_DISPLAY}</span>
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

export function EventsPageContent({ lang }: { lang: BalinjeraLang }) {
  const copy = balinjeraCopy[lang];
  const page = copy.eventsPage;

  return (
    <>
      <EventsHero
        body={page.body}
        eyebrow={page.eyebrow}
        lang={lang}
        options={page.options}
        title={page.title}
      />

      <section className={styles["eventDetailSection"]}>
        <div className={styles["eventOptions"]}>
          {page.options.map((item) => (
            <article
              className={styles["eventOption"]}
              data-balinjera-animate="card"
              key={item}
            >
              <CalendarDays aria-hidden="true" />
              <p>{item}</p>
            </article>
          ))}
        </div>
        <div className={styles["eventContactStack"]}>
          <div className={styles["eventCta"]} data-balinjera-animate="fade-up">
            <Clock aria-hidden="true" />
            <h2>{page.ctaTitle}</h2>
            <p>{page.ctaBody}</p>
            <div className={styles["contactRows"]}>
              <a href={BALINJERA_PHONE_HREF}>
                <Phone aria-hidden="true" />
                <span dir="ltr">{BALINJERA_PHONE_DISPLAY}</span>
              </a>
              <a
                href="https://maps.google.com/?q=%D7%9E%D7%9C%D7%9F%204%20%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin aria-hidden="true" />
                <span>{copy.footerColumns[0].lines.join(", ")}</span>
              </a>
            </div>
          </div>
        </div>
        <div className={styles["eventInquiryLayout"]}>
          <EventInquiryForm lang={lang} />
          <aside
            className={styles["eventSeoPanel"]}
            data-balinjera-animate="fade-up"
          >
            <p className={styles["eyebrow"]}>{page.eventSeo.eyebrow}</p>
            <h2>{page.eventSeo.title}</h2>
            {page.eventSeo.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </aside>
        </div>
      </section>

      <ReserveSection lang={lang} />
    </>
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

export function BlogPageContent({ lang }: { lang: BalinjeraLang }) {
  const page = balinjeraCopy[lang].blogPage;

  return (
    <>
      <BlogHero
        body={page.body}
        eyebrow={page.eyebrow}
        lang={lang}
        posts={page.posts}
        title={page.title}
      />

      <ReserveSection lang={lang} />
    </>
  );
}

export function BlogArticlePageContent({
  lang,
  post,
}: {
  lang: BalinjeraLang;
  post: BalinjeraBlogPost;
}) {
  const page = balinjeraCopy[lang].blogPage;

  return (
    <>
      <section className={styles["articleTopBar"]}>
        <Link
          className={styles["articleBackLink"]}
          href={hrefWithLang("/blog", lang)}
        >
          {arrowFor()}
          <span>{page.backLabel}</span>
        </Link>
      </section>

      <PageHero
        body={post.excerpt}
        eyebrow={page.articleEyebrow}
        imageClass={styles["blogHeroImage"]}
        lang={lang}
        sectionClass={styles["articleHero"]}
        showImage={false}
        title={post.title}
      />

      <section className={styles["articleSection"]}>
        <article className={styles["articleBody"]}>
          <div className={styles["articleText"]}>
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {(() => {
              const relatedPost = page.posts.find((p) => p.slug !== post.slug)
              if (!relatedPost) return null
              const label = lang === 'he' ? 'לקריאה נוספת' : 'Further reading'
              return (
                <div className={styles['blogReadMore']}>
                  <span>{label}:</span>
                  <Link href={hrefWithLang(`/blog/${relatedPost.slug}`, lang)}>
                    {relatedPost.title}
                  </Link>
                </div>
              )
            })()}
          </div>
        </article>
      </section>

      <ReserveSection lang={lang} showImage={false} />
    </>
  );
}
