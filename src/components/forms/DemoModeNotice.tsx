import { Note } from "@/components/ui/Note";

/** Shown above lead forms when no LEAD_WEBHOOK_URL is configured. */
export function DemoModeNotice() {
  if (process.env.LEAD_WEBHOOK_URL) return null;
  return (
    <Note className="mb-8 border-forest/20 bg-sage/50">
      <strong className="font-semibold text-ink">Demo mode.</strong> The form validates your entries, but nothing is sent or stored because no lead-capture backend is configured.
    </Note>
  );
}
