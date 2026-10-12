import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type Tone = "paper" | "white" | "sage" | "forest";

const tones: Record<Tone, string> = {
  paper: "bg-paper",
  white: "bg-surface",
  sage: "bg-sage",
  forest: "bg-forest text-white on-dark",
};

export function Section({
  tone = "paper",
  className = "",
  id,
  labelledBy,
  backgroundImage,
  children,
}: {
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
  /** Decorative image shown faintly behind the content, washed out with the section's tone. */
  backgroundImage?: StaticImageData;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${tones[tone]} py-16 sm:py-20 lg:py-24 ${backgroundImage ? "relative isolate overflow-hidden" : ""} ${className}`}
    >
      {backgroundImage && (
        <>
          <Image src={backgroundImage} alt="" fill sizes="100vw" className="-z-20 object-cover brightness-150 contrast-50 grayscale" />
          <div aria-hidden className={`absolute inset-0 -z-10 opacity-[0.94] ${tones[tone].split(" ")[0]}`} />
        </>
      )}
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  dark = false,
  as: Heading = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  dark?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${dark ? "text-lime" : "text-forest-700"}`}>{eyebrow}</p>
      )}
      <Heading
        id={id}
        className={`text-3xl font-bold leading-[1.15] sm:text-4xl ${dark ? "text-white!" : ""}`}
      >
        {title}
      </Heading>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-on-forest-muted" : "text-muted-text"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
