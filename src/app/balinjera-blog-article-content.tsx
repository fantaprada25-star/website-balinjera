import Link from "next/link";

import styles from "./balinjera-article.module.css";
import {
  balinjeraCopy,
  hrefWithLang,
  type BalinjeraBlogPost,
  type BalinjeraLang,
} from "./balinjera-content";
import { PageHero } from "./balinjera-page-hero";
import { ReserveSection, arrowFor } from "./balinjera-shell";

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
            {post.body.map((section) => (
              <div key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ))}
            <div className={styles["blogReadMore"]}>
              <Link href={hrefWithLang(post.relatedLink.path, lang)}>
                {post.relatedLink.label}
              </Link>
            </div>
            {(() => {
              const relatedPost = page.posts.find((p) => p.slug !== post.slug);
              if (!relatedPost) return null;
              const label = lang === "he" ? "לקריאה נוספת" : "Further reading";
              return (
                <div className={styles["blogReadMore"]}>
                  <span>{label}:</span>
                  <Link href={hrefWithLang("/blog/" + relatedPost.slug, lang)}>
                    {relatedPost.title}
                  </Link>
                </div>
              );
            })()}
          </div>
        </article>
      </section>

      <ReserveSection lang={lang} showImage={false} />
    </>
  );
}
