"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import styles from "./scroll-expansion-hero.module.css";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  body?: ReactNode;
  expandOnHash?: boolean;
  preserveTitleLines?: boolean;
  priorityMedia?: boolean;
  theme?: "espresso" | "balinjera";
  children?: ReactNode;
}

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const themeClasses = {
  espresso: {
    root: cx(styles["root"], styles["rootEspresso"]),
    backgroundOverlay: cx(
      styles["backgroundOverlay"],
      styles["backgroundOverlayEspresso"]
    ),
    container: cx(styles["container"], styles["containerEspresso"]),
    mediaFrame: styles["mediaFrame"] ?? "",
    mediaRadius: styles["mediaRadius"] ?? "",
    mediaShadow: "0 0 50px rgba(90, 58, 43, 0.36)",
    videoOverlay: cx(styles["mediaOverlay"], styles["videoOverlayEspresso"]),
    imageOverlay: cx(styles["mediaOverlay"], styles["imageOverlayEspresso"]),
    date: cx(styles["date"], styles["dateEspresso"]),
    scrollHint: cx(styles["scrollHint"], styles["scrollHintEspresso"]),
    title: cx(styles["title"], styles["titleEspresso"]),
    body: cx(styles["body"], styles["bodyEspresso"]),
    contentSection: cx(
      styles["contentSection"],
      styles["contentSectionEspresso"]
    ),
  },
  balinjera: {
    root: cx(styles["root"], styles["rootBalinjera"]),
    backgroundOverlay: cx(
      styles["backgroundOverlay"],
      styles["backgroundOverlayBalinjera"]
    ),
    container: cx(styles["container"], styles["containerBalinjera"]),
    mediaFrame: styles["mediaFrame"] ?? "",
    mediaRadius: styles["mediaRadius"] ?? "",
    mediaShadow: "0 0 54px rgba(0, 59, 27, 0.34)",
    videoOverlay: cx(styles["mediaOverlay"], styles["videoOverlayBalinjera"]),
    imageOverlay: cx(styles["mediaOverlay"], styles["imageOverlayBalinjera"]),
    date: cx(styles["date"], styles["dateBalinjera"]),
    scrollHint: cx(styles["scrollHint"], styles["scrollHintBalinjera"]),
    title: cx(styles["title"], styles["titleBalinjera"]),
    body: cx(styles["body"], styles["bodyBalinjera"]),
    contentSection: cx(
      styles["contentSection"],
      styles["contentSectionBalinjera"]
    ),
  },
} satisfies Record<
  NonNullable<ScrollExpandMediaProps["theme"]>,
  {
    root: string;
    backgroundOverlay: string;
    container: string;
    mediaFrame: string;
    mediaRadius: string;
    mediaShadow: string;
    videoOverlay: string;
    imageOverlay: string;
    date: string;
    scrollHint: string;
    title: string;
    body: string;
    contentSection: string;
  }
>;

function getTitleParts(title?: string, preserveTitleLines = false) {
  if (!title) {
    return { firstPart: "", restPart: "" };
  }

  if (preserveTitleLines) {
    const lines = title
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return {
      firstPart: lines.at(0) ?? "",
      restPart: lines.slice(1).join("\n"),
    };
  }

  const words = title.replace(/\s+/g, " ").trim().split(" ");

  return {
    firstPart: words.at(0) ?? "",
    restPart: words.slice(1).join(" "),
  };
}

function renderTextLines(value: string) {
  return value.split("\n").map((line, index, lines) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

function getYoutubeEmbedSrc(mediaSrc: string) {
  try {
    const url = new URL(mediaSrc);
    const videoId =
      url.searchParams.get("v") ??
      url.pathname.split("/").filter(Boolean).at(-1) ??
      "";
    const baseSrc = mediaSrc.includes("embed")
      ? mediaSrc
      : `https://www.youtube.com/embed/${videoId}`;
    const joiner = baseSrc.includes("?") ? "&" : "?";

    return `${baseSrc}${joiner}autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=${videoId}`;
  } catch {
    return mediaSrc;
  }
}

export default function ScrollExpandMedia({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
  body,
  expandOnHash = false,
  preserveTitleLines = false,
  priorityMedia = false,
  theme = "espresso",
  children,
}: ScrollExpandMediaProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);

  const scrollProgressRef = useRef(0);
  const mediaFullyExpandedRef = useRef(false);
  const touchStartYRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const setExpandedState = useCallback((expanded: boolean) => {
    mediaFullyExpandedRef.current = expanded;
    setMediaFullyExpanded(expanded);
  }, []);

  const updateProgress = useCallback(
    (nextProgress: number) => {
      const clampedProgress = clampProgress(nextProgress);

      scrollProgressRef.current = clampedProgress;
      setScrollProgress(clampedProgress);

      if (clampedProgress >= 1) {
        setExpandedState(true);
        setShowContent(true);
      } else {
        setExpandedState(false);

        if (clampedProgress < 0.75) {
          setShowContent(false);
        }
      }
    },
    [setExpandedState]
  );

  useEffect(() => {
    const shouldStartExpanded = expandOnHash && window.location.hash.length > 0;

    scrollProgressRef.current = shouldStartExpanded ? 1 : 0;
    setScrollProgress(shouldStartExpanded ? 1 : 0);
    setShowContent(shouldStartExpanded);
    setExpandedState(shouldStartExpanded);
  }, [expandOnHash, mediaType, setExpandedState]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      updateProgress(1);
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 767px)");

    // Mobile: native scroll drives a local track, so the first swipe reaches
    // the browser scroll pipeline without any touchmove preventDefault.
    if (mobileQuery.matches) {
      if (expandOnHash && window.location.hash.length > 0) {
        updateProgress(1);
        return;
      }

      let frame = 0;
      const handleMobileScroll = () => {
        if (frame) {
          return;
        }

        frame = window.requestAnimationFrame(() => {
          frame = 0;

          const track = trackRef.current;

          if (!track) {
            return;
          }

          const distance = track.offsetHeight - window.innerHeight;

          if (distance <= 0) {
            updateProgress(1);
            return;
          }

          const scrolled = Math.min(
            Math.max(-track.getBoundingClientRect().top, 0),
            distance
          );
          updateProgress(scrolled / distance);
        });
      };

      handleMobileScroll();
      window.addEventListener("scroll", handleMobileScroll, { passive: true });
      window.addEventListener("resize", handleMobileScroll);

      return () => {
        if (frame) {
          window.cancelAnimationFrame(frame);
        }
        window.removeEventListener("scroll", handleMobileScroll);
        window.removeEventListener("resize", handleMobileScroll);
      };
    }

    const handleWheel = (event: globalThis.WheelEvent) => {
      if (
        mediaFullyExpandedRef.current &&
        event.deltaY < 0 &&
        window.scrollY <= 5
      ) {
        setExpandedState(false);
        event.preventDefault();
        return;
      }

      if (!mediaFullyExpandedRef.current) {
        event.preventDefault();
        updateProgress(scrollProgressRef.current + event.deltaY * 0.0009);
      }
    };

    const handleTouchStart = (event: globalThis.TouchEvent) => {
      const firstTouch = event.touches.item(0);

      if (!firstTouch) {
        return;
      }

      touchStartYRef.current = firstTouch.clientY;
      setTouchStartY(firstTouch.clientY);
    };

    const handleTouchMove = (event: globalThis.TouchEvent) => {
      if (!touchStartYRef.current) {
        return;
      }

      const firstTouch = event.touches.item(0);

      if (!firstTouch) {
        return;
      }

      const deltaY = touchStartYRef.current - firstTouch.clientY;

      if (
        mediaFullyExpandedRef.current &&
        deltaY < -20 &&
        window.scrollY <= 5
      ) {
        setExpandedState(false);
        event.preventDefault();
        return;
      }

      if (!mediaFullyExpandedRef.current) {
        event.preventDefault();

        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        updateProgress(scrollProgressRef.current + deltaY * scrollFactor);
        touchStartYRef.current = firstTouch.clientY;
        setTouchStartY(firstTouch.clientY);
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = 0;
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (expandOnHash && window.location.hash.length > 0) {
        return;
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "PageDown" || e.key === "ArrowDown") {
        if (!mediaFullyExpandedRef.current) {
          e.preventDefault();
          updateProgress(Math.min(scrollProgressRef.current + 0.25, 1));
        }
      }
      if (
        (e.key === "PageUp" || e.key === "ArrowUp") &&
        scrollProgressRef.current > 0 &&
        !mediaFullyExpandedRef.current
      ) {
        e.preventDefault();
        updateProgress(Math.max(scrollProgressRef.current - 0.25, 0));
      }
      if (e.key === "End" || e.key === "Enter") {
        if (!mediaFullyExpandedRef.current) updateProgress(1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKey);
    };
  }, [
    expandOnHash,
    isMobileState,
    setExpandedState,
    touchStartY,
    updateProgress,
  ]);

  useEffect(() => {
    if (!expandOnHash) {
      return;
    }

    const revealHashTarget = () => {
      const hash = window.location.hash;

      if (!hash) {
        return;
      }

      updateProgress(1);

      window.requestAnimationFrame(() => {
        const targetId = decodeURIComponent(hash.slice(1));
        document.getElementById(targetId)?.scrollIntoView({ block: "start" });
      });
    };

    revealHashTarget();
    window.addEventListener("hashchange", revealHashTarget);

    return () => window.removeEventListener("hashchange", revealHashTarget);
  }, [expandOnHash, updateProgress]);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const { firstPart, restPart } = getTitleParts(title, preserveTitleLines);
  const isYoutubeVideo =
    mediaSrc.includes("youtube.com") || mediaSrc.includes("youtu.be");
  const classes = themeClasses[theme];
  const mediaFrameStyle = {
    "--media-width": `${mediaWidth}px`,
    "--media-height": `${mediaHeight}px`,
    "--media-shadow": classes.mediaShadow,
  } as CSSProperties;

  return (
    <div className={classes.root}>
      <div ref={trackRef} className={styles["track"]}>
        <section className={styles["section"]}>
          <div className={styles["stage"]}>
            <motion.div
              className={styles["background"]}
              initial={false}
              animate={{ opacity: 1 - scrollProgress }}
              transition={{ duration: 0.1 }}
            >
              <Image
                src={bgImageSrc}
                alt=""
                width={1920}
                height={1080}
                className={styles["backgroundImage"]}
                sizes="100vw"
                quality={60}
                priority
              />
              <div className={classes.backgroundOverlay} />
            </motion.div>

            <div className={classes.container}>
              <div className={styles["viewport"]}>
                <div
                  className={classes.mediaFrame}
                  style={mediaFrameStyle}
                >
                  {mediaType === "video" ? (
                    <div className={styles["mediaSurfaceFrame"]}>
                      {isYoutubeVideo ? (
                        <iframe
                          width="100%"
                          height="100%"
                          src={getYoutubeEmbedSrc(mediaSrc)}
                          className={cx(
                            styles["mediaSurface"],
                            classes.mediaRadius
                          )}
                          title={title || "Video content"}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={mediaSrc}
                          poster={posterSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                          className={cx(
                            styles["mediaSurfaceCover"],
                            classes.mediaRadius
                          )}
                          controls={false}
                          disablePictureInPicture
                        />
                      )}
                      <motion.div
                        className={classes.videoOverlay}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className={styles["mediaSurfaceWrap"]}>
                      <Image
                        src={mediaSrc}
                        alt={title || "Media content"}
                        width={1280}
                        height={720}
                        className={cx(
                          styles["mediaSurfaceCover"],
                          classes.mediaRadius
                        )}
                        sizes="(max-width: 767px) 95vw, 85vw"
                        quality={60}
                        priority={priorityMedia}
                      />
                      <motion.div
                        className={classes.imageOverlay}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )}

                  <div className={styles["mediaMeta"]}>
                    {date ? (
                      <p
                        className={classes.date}
                        style={{
                          transform: `translateX(-${textTranslateX}vw)`,
                        }}
                      >
                        {date}
                      </p>
                    ) : null}
                    {scrollToExpand ? (
                      <p
                        className={classes.scrollHint}
                        style={{ transform: `translateX(${textTranslateX}vw)` }}
                      >
                        {scrollToExpand}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div
                  className={cx(
                    styles["textLayer"],
                    textBlend
                      ? styles["textBlendDifference"]
                      : styles["textBlendNormal"]
                  )}
                >
                  <motion.h1
                    className={classes.title}
                    style={{ transform: `translateX(-${textTranslateX}vw)` }}
                  >
                    {renderTextLines(firstPart)}
                  </motion.h1>
                  {restPart ? (
                    <motion.h1
                      className={classes.title}
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {renderTextLines(restPart)}
                    </motion.h1>
                  ) : null}
                  {body ? (
                    <motion.div
                      className={classes.body}
                      initial={false}
                      animate={{
                        opacity: Math.max(1 - scrollProgress * 1.35, 0),
                        y: scrollProgress * 24,
                      }}
                      transition={{ duration: 0.12 }}
                    >
                      {body}
                    </motion.div>
                  ) : null}
                </div>
              </div>

              {children ? (
                <motion.section
                  className={classes.contentSection}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: showContent ? 1 : 0,
                  }}
                  transition={{ duration: 0.7 }}
                >
                  {children}
                </motion.section>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
