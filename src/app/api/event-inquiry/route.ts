import { NextResponse } from "next/server";
import { Resend } from "resend";

import { BALINJERA_EMAIL } from "../../balinjera-content";

export const runtime = "nodejs";

type InquiryPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  date?: unknown;
  guests?: unknown;
  message?: unknown;
  consent?: unknown;
  lang?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 400 },
    );
  }

  const name = asString(payload.name);
  const email = asString(payload.email);
  const phone = asString(payload.phone);
  const date = asString(payload.date);
  const guests = asString(payload.guests);
  const message = asString(payload.message);
  const consent = payload.consent === true;
  const lang = payload.lang === "en" ? "en" : "he";

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailValid || !phone || !date || !guests || !message || !consent) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 400 },
    );
  }

  const apiKey = process.env["RESEND_API_KEY"];

  if (!apiKey) {
    console.error("event-inquiry: RESEND_API_KEY is not configured");
    return NextResponse.json({ ok: false, error: "config" }, { status: 500 });
  }

  const fromEmail = process.env["RESEND_FROM_EMAIL"] ?? "onboarding@resend.dev";
  const toEmail = process.env["RESEND_TO_EMAIL"] ?? BALINJERA_EMAIL;

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Date", date],
    ["Guests", guests],
    ["Language", lang],
    ["Message", message],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<h2>New event inquiry — Balinjera</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="font-weight:600;vertical-align:top">${escapeHtml(
          label,
        )}</td><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New event inquiry — ${name} (${guests} guests)`,
      text,
      html,
    });

    if (error) {
      console.error("event-inquiry: Resend error", error);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } catch (caught) {
    console.error("event-inquiry: send failed", caught);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
