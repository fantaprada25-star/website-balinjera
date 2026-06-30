import {
  Accessibility,
  ChevronRight,
  Globe2,
  Instagram,
  Menu,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  BALINJERA_ACCESSIBILITY_HREF,
  BALINJERA_ORDER_HREF,
  SITEKEPT_URL,
  balinjeraCopy,
  hrefWithLang,
  languageLabels,
  type BalinjeraFooterLine,
  type BalinjeraLang,
  type BalinjeraPageKey,
} from "./balinjera-content";
import { BalinjeraMotion } from "./balinjera-motion";
import styles from "./balinjera.module.css";

type FrameProps = {
  active: BalinjeraPageKey;
  children: ReactNode;
  currentPath: string;
  lang: BalinjeraLang;
};

const WHATSAPP_HREF = "https://api.whatsapp.com/send?phone=9720559655559";

export function arrowFor() {
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

export function SiteButton({
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
  const className = [
    styles["button"],
    brown ? styles["buttonBrown"] : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      <span>{children}</span>
      {arrowFor()}
    </>
  );

  if (href.startsWith("http")) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
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
            rel="noopener noreferrer"
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
            sizes="(max-width: 767px) 150px, 209px"
            quality={55}
            priority
          />
        </Link>

        <nav className={styles["nav"]} aria-label={copy.navLabel}>
          {renderNavLinks()}
          <Link
            className={[
              styles["languageSwitch"],
              styles["mobileLanguage"],
            ].join(" ")}
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
          sizes="155px"
          quality={55}
        />
        <p>{splitLines(copy.footerTagline)}</p>
        <a href={SITEKEPT_URL} target="_blank" rel="noopener noreferrer">
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
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram aria-hidden="true" />
          </a>
          <a
            className={styles["socialGold"]}
            href="https://www.facebook.com/Traditional.Ethiopian.Cuisine/?locale=he_IL"
            target="_blank"
            rel="noopener noreferrer"
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
          className={[styles["quickAction"], styles["woltAction"]].join(" ")}
          href={BALINJERA_ORDER_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={copy.wolt}
        >
          Wolt
        </a>
        <a
          className={[styles["quickAction"], styles["whatsappAction"]].join(
            " "
          )}
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
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
