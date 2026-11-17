import Link from "next/link";
import { Download } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { getCvLink } from "@/lib/links";

/** "Download CV" — downloads the PDF if provided, otherwise opens the printable CV page. */
export function CvButton({
  variant = "default",
  size,
  className,
  label = "Download CV",
}: Pick<ButtonProps, "variant" | "size" | "className"> & { label?: string }) {
  const cv = getCvLink();
  return (
    <Button asChild variant={variant} size={size} className={className}>
      {cv.download ? (
        <a href={cv.href} download>
          <Download aria-hidden="true" />
          {label}
        </a>
      ) : (
        <Link href={cv.href}>
          <Download aria-hidden="true" />
          {label}
        </Link>
      )}
    </Button>
  );
}
