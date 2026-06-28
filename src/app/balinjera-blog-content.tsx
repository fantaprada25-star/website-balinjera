import { BookOpenText } from "lucide-react";
import Link from "next/link";

import styles from "./balinjera-blog.module.css";
import {
  balinjeraCopy,
  hrefWithLang,
  type BalinjeraBlogPost,
  type BalinjeraLang,
} from "./balinjera-content";
import { ReserveSection } from "./balinjera-shell";

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
            href={hrefWithLang("/blog/" + post.slug, lang)}
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
