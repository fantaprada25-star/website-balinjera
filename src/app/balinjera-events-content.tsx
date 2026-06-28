import { CalendarDays, Clock, MapPin, Phone } from "lucide-react";

import {
  BALINJERA_PHONE_DISPLAY,
  BALINJERA_PHONE_HREF,
  balinjeraCopy,
  type BalinjeraLang,
} from "./balinjera-content";
import styles from "./balinjera-events.module.css";
import { ReserveSection, SiteButton } from "./balinjera-shell";
import { EventInquiryForm } from "./events/event-inquiry-form";

const EVENTS_CONTACT_HREF = "/events#event-inquiry";

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
                rel="noopener noreferrer"
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
