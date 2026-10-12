import { ButtonLink } from "@/components/ui/Button";

export function CtaBand({
  title = "Let’s find the right solar solution for your property.",
  body = "Tell us how you use power, what matters most to you and what you’d like solar to do. We’ll talk you through the options in plain language. No technical knowledge needed.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="on-dark bg-forest">
      <div className="container-site py-16 sm:py-20 lg:py-24">
        <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span aria-hidden className="mb-6 block h-1 w-12 bg-lime" />
            <h2 id="cta-heading" className="text-3xl leading-[1.12] font-extrabold text-white! sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-on-forest-muted">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch xl:flex-row xl:justify-end">
            <ButtonLink href="/request-a-quote" size="lg" arrow>
              Get a Solar Quote
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline-light">
              Contact Our Team
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
