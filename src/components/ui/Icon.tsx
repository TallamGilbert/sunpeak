import { BatteryCharging, Building2, Combine, Droplets, House, PlugZap, type LucideProps } from "lucide-react";

import type { IconName } from "@/lib/solutions";

const map = {
  home: House,
  building: Building2,
  hybrid: Combine,
  battery: BatteryCharging,
  water: Droplets,
  backup: PlugZap,
} satisfies Record<IconName, unknown>;

export function SolutionIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = map[name];
  return <Component aria-hidden strokeWidth={1.75} {...props} />;
}
