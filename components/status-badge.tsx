import { CheckCircle2, CircleDashed, Clock, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { isDev } from "@/lib/site";
import type { FeatureStatus, ProjectStatus } from "@/lib/types";

const config = {
  completed: { label: "Completed", variant: "success", Icon: CheckCircle2 },
  "in-development": { label: "In Development", variant: "progress", Icon: Clock },
  planning: { label: "Planning", variant: "planned", Icon: CircleDashed },
  planned: { label: "Planned", variant: "planned", Icon: CircleDashed },
  unconfirmed: { label: "Status to confirm", variant: "warning", Icon: HelpCircle },
} as const;

/**
 * Status chip. `unconfirmed` is only rendered in development so that an
 * unknown status is never published as a claim.
 */
export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus | FeatureStatus;
  className?: string;
}) {
  if (status === "unconfirmed" && !isDev) return null;
  const { label, variant, Icon } = config[status];
  return (
    <Badge variant={variant} className={className}>
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </Badge>
  );
}
