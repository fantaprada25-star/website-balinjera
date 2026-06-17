"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

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
  theme?: "espresso" | "balinjera";
  children?: ReactNode;
}

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

const themeClasses = {
  espresso: {
    root: "overflow-x-hidden bg-[#5a3a2b] transition-colors duration-700 ease-in-out",
    backgroundOverlay: "absolute inset-0 bg-[#5a3a2b]/18",
    container:
      "relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-start px-4 sm:px-6 lg:px-8",
    mediaFrame:
      "absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-[4px] transition-none",
    mediaRadius: "rounded-[4px]",
    mediaShadow: "0 0 50px rgba(90, 58, 43, 0.36)",
    videoOverlay: "absolute inset-0 rounded-[4px] bg-[#5a3a2b]/40",
    imageOverlay: "absolute inset-0 rounded-[4px] bg-[#5a3a2b]/56",
    date: "text-2xl font-black text-[#f6f1e7]",
    scrollHint: "text-center text-sm font-black text-[#f6f1e7]/82",
    title:
      "text-4xl leading-none font-black text-[#f6f1e7] transition-none md:text-6xl lg:text-8xl",
    body: "max-w-2xl text-center text-base leading-7 font-black text-[#f6f1e7]/82 md:text-lg",
    contentSection: "flex w-full flex-col px-0 py-10 md:px-6 lg:py-20",
  },
  balinjera: {
    root: "overflow-x-hidden bg-[#fffde7] transition-colors duration-700 ease-in-out",
    backgroundOverlay: "absolute inset-0 bg-[#003b1b]/30",
    container:
      "relative z-10 mx-auto flex w-full max-w-[1720px] flex-col items-center justify-start px-5 sm:px-8 lg:px-12",
    mediaFrame:
      "absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-[4px] transition-none",
    mediaRadius: "rounded-[4px]",
    mediaShadow: "0 0 54px rgba(0, 59, 27, 0.34)",
    videoOverlay: "absolute inset-0 rounded-[4px] bg-[#003b1b]/42",
    imageOverlay: "absolute inset-0 rounded-[4px] bg-[#003b1b]/46",
    date: "text-xl font-black text-[#eeab00] drop-shadow-[0_2px_8px_rgba(0,59,27,0.45)] md:text-2xl",
    scrollHint:
      "text-center text-sm font-black text-[#fffde7]/86 drop-shadow-[0_2px_8px_rgba(0,59,27,0.42)]",
    title:
      "text-4xl leading-none font-black text-[#fffde7] drop-shadow-[0_3px_14px_rgba(0,59,27,0.55)] transition-none md:text-6xl lg:text-8xl",
    body: "max-w-3xl text-center text-base leading-7 font-black text-[#fffde7]/88 drop-shadow-[0_2px_10px_rgba(0,59,27,0.46)] md:text-lg lg:text-xl",
    contentSection: "flex w-full flex-col px-0 py-0",
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

      if (!mediaFullyExpandedRef.current) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [expandOnHash, setExpandedState, touchStartY, updateProgress]);

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

  return (
    <div className={classes.root}>
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt=""
              width={1920}
              height={1080}
              className="h-screen w-screen object-cover object-center"
              priority
            />
            <div className={classes.backgroundOverlay} />
          </motion.div>

          <div className={classes.container}>
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center">
              <div
                className={classes.mediaFrame}
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: classes.mediaShadow,
                }}
              >
                {mediaType === "video" ? (
                  <div className="pointer-events-none relative h-full w-full">
                    {isYoutubeVideo ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={getYoutubeEmbedSrc(mediaSrc)}
                        className={`h-full w-full ${classes.mediaRadius}`}
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
                        className={`h-full w-full object-cover ${classes.mediaRadius}`}
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
                  <div className="relative h-full w-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      className={`h-full w-full object-cover ${classes.mediaRadius}`}
                    />
                    <motion.div
                      className={classes.imageOverlay}
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="relative z-10 mt-4 flex flex-col items-center text-center transition-none">
                  {date ? (
                    <p
                      className={classes.date}
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
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
                className={`relative z-10 flex w-full flex-col items-center justify-center gap-4 text-center transition-none ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <motion.h2
                  className={classes.title}
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {renderTextLines(firstPart)}
                </motion.h2>
                {restPart ? (
                  <motion.h2
                    className={`${classes.title} text-center`}
                    style={{ transform: `translateX(${textTranslateX}vw)` }}
                  >
                    {renderTextLines(restPart)}
                  </motion.h2>
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
  );
}
