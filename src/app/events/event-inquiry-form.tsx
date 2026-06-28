"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useId, useState, type FormEvent } from "react";

import { balinjeraCopy, type BalinjeraLang } from "../balinjera-content";
import styles from "../balinjera-events.module.css";

export function EventInquiryForm({ lang }: { lang: BalinjeraLang }) {
  const copy = balinjeraCopy[lang].eventsPage.form;
  const rawId = useId();
  const formId = rawId.replace(/:/g, "");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      date: data.get("date"),
      guests: data.get("guests"),
      message: data.get("message"),
      consent: data.get("consent") === "on",
      lang,
    };

    setStatus("sending");

    try {
      const response = await fetch("/api/event-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
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
            <label htmlFor={`${formId}-guests`}>
              {copy.fields.guests.label}
            </label>
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
            />
          </div>
        </div>

        <label className={styles["eventFormConsent"]}>
          <input name="consent" type="checkbox" required />
          <span>{copy.consent}</span>
        </label>

        <div className={styles["eventFormActions"]}>
          <button type="submit" disabled={status === "sending"}>
            <span>{status === "sending" ? copy.sending : copy.submit}</span>
            <Send aria-hidden="true" />
          </button>

          {status === "error" ? (
            <p role="status" aria-live="polite">
              {copy.error}
            </p>
          ) : null}
        </div>
      </form>

      {status === "success" ? (
        <div
          className={styles["successOverlay"]}
          role="dialog"
          aria-modal="true"
          aria-label={copy.success}
        >
          <div className={styles["successModal"]}>
            <CheckCircle2
              className={styles["successIcon"]}
              aria-hidden="true"
            />
            <p>{copy.success}</p>
            <button type="button" onClick={() => setStatus("idle")}>
              OK
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
