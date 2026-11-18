import { cn } from "@/lib/utils";

function star(cx: number, cy: number, outer: number, points = 7) {
  const inner = outer * 0.4;
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / points;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(2)},${(cy + Math.sin(a) * r).toFixed(2)}`);
  }
  return pts.join(" ");
}

/** Crux — decorative only. Not a flag, not an official mark. */
export function SouthernCross({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 80"
      className={cn("overflow-visible text-gold", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g transform="rotate(-14 32 40)" fill="currentColor">
        <polygon points={star(32, 11, 9.4)} />
        <polygon points={star(32, 68, 10.4)} />
        <polygon points={star(10, 38, 8.3)} />
        <polygon points={star(54, 34, 7.3)} />
        <polygon points={star(38, 42, 4, 5)} />
      </g>
    </svg>
  );
}
