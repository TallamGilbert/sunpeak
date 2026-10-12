import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-site py-24 sm:py-32">
      <p className="eyebrow text-forest-700">Error 404</p>
      <h1 className="mt-4 max-w-2xl text-4xl leading-[1.08] font-extrabold sm:text-5xl">
        We couldn’t find that page.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-text">
        The page may have moved, or the link may be incorrect. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-col gap-3 xs:flex-row">
        <ButtonLink href="/" size="lg" variant="secondary">
          Go to homepage
        </ButtonLink>
        <ButtonLink href="/solutions" size="lg" variant="outline">
          Explore solutions
        </ButtonLink>
      </div>
    </section>
  );
}
