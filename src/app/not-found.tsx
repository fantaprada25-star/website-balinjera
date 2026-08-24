import Link from "next/link";

import { balinjeraCopy } from "./balinjera-content";
import { BalinjeraFrame } from "./balinjera-shell";

export default function NotFound() {
  const copy = balinjeraCopy.he;

  return (
    <BalinjeraFrame active="home" currentPath="/" lang="he">
      <section style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
        <h1>הדף לא נמצא</h1>
        <p>העמוד שחיפשתם לא קיים או שהוסר. אפשר לחזור לדף הבית או לתפריט.</p>
        <p>
          <Link href="/">{copy.nav[0]?.label}</Link>
          {" · "}
          <Link href="/menu">{copy.menuCta}</Link>
        </p>
      </section>
    </BalinjeraFrame>
  );
}
