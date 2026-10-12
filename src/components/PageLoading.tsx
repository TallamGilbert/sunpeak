/** Placeholder shown while a dynamic detail page streams in. */
export function PageLoading({ dark = false }: { dark?: boolean }) {
  const bar = dark ? "bg-white/15" : "bg-line";
  return (
    <div role="status" aria-label="Loading page" className={dark ? "bg-forest" : "bg-surface"}>
      <div className="container-site flex min-h-[30rem] flex-col justify-center gap-5 py-16 motion-safe:animate-pulse sm:min-h-[34rem] lg:min-h-[38rem]">
        <div className={`h-3 w-40 rounded-xs ${bar}`} />
        <div className={`h-12 w-full max-w-xl rounded-xs ${bar}`} />
        <div className={`h-12 w-3/4 max-w-md rounded-xs ${bar}`} />
        <div className={`h-4 w-full max-w-lg rounded-xs ${bar}`} />
        <div className={`h-4 w-2/3 max-w-md rounded-xs ${bar}`} />
      </div>
    </div>
  );
}
