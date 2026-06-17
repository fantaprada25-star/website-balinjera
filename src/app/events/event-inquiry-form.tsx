"use client";

import { Send } from "lucide-react";
import { useId, useState, type FormEvent } from "react";

import { balinjeraCopy, type BalinjeraLang } from "../balinjera-content";
import styles from "../balinjera.module.css";

export function EventInquiryForm({ lang }: { lang: BalinjeraLang }) {
  const copy = balinjeraCopy[lang].eventsPage.form;
  const rawId = useId();
  const formId = rawId.replace(/:/g, "");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <form
      id="event-inquiry"
      className={styles["eventForm"]}
      onSubmit={handleSubmit}
      aria-describedby={`${formId}-description`}
    >
      <div className={styles["eventFormHeader"]}>
        <h2>{copy.title}</h2>
        <p id={`${formId}-description`}>{copy.body}</p>
      </div>

      <div className={styles["eventFormGrid"]}>
        <div className={styles["eventFormField"]}>
          <label htmlFor={`${formId}-name`}>{copy.fields.name.label}</label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder={copy.fields.name.placeholder}
            required
          />
        </div>

        <div className={styles["eventFormField"]}>
          <label htmlFor={`${formId}-email`}>{copy.fields.email.label}</label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            placeholder={copy.fields.email.placeholder}
            required
          />
        </div>

        <div className={styles["eventFormField"]}>
          <label htmlFor={`${formId}-phone`}>{copy.fields.phone.label}</label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder={copy.fields.phone.placeholder}
            required
          />
        </div>

        <div className={styles["eventFormField"]}>
          <label htmlFor={`${formId}-date`}>{copy.fields.date.label}</label>
          <input id={`${formId}-date`} name="date" type="date" required />
        </div>

        <div className={styles["eventFormField"]}>
          <label htmlFor={`${formId}-guests`}>{copy.fields.guests.label}</label>
          <input
            id={`${formId}-guests`}
            name="guests"
            type="number"
            min="1"
            inputMode="numeric"
            placeholder={copy.fields.guests.placeholder}
            required
          />
        </div>

        <div
          className={`${styles["eventFormField"]} ${styles["eventFormFieldWide"]}`}
        >
          <label htmlFor={`${formId}-message`}>
            {copy.fields.message.label}
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            placeholder={copy.fields.message.placeholder}
            required
          />
        </div>
      </div>

      <label className={styles["eventFormConsent"]}>
        <input name="consent" type="checkbox" required />
        <span>{copy.consent}</span>
      </label>

      <div className={styles["eventFormActions"]}>
        <button type="submit">
          <span>{copy.submit}</span>
          <Send aria-hidden="true" />
        </button>

        {submitted ? (
          <p role="status" aria-live="polite">
            {copy.success}
          </p>
        ) : null}
      </div>
    </form>
  );
}
