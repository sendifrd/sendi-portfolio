import Image from "next/image";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/** Profile photo from data/profile.ts, or an initials monogram until one is added. */
export function Avatar({ size = 64, className }: { size?: number; className?: string }) {
  if (profile.photo) {
    return (
      <Image
        src={profile.photo.src}
        alt={profile.photo.alt}
        width={size}
        height={size}
        className={cn("shrink-0 rounded-2xl object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#0F172A] to-blue-600 font-display font-bold text-white",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {profile.initials}
    </span>
  );
}
