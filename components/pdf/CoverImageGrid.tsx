import { tokens } from "@/design/tokens";

const ROLE_ORDER = [
  "hero_main",
  "hero_secondary",
  "work_process",
  "place_space",
  "people_scene",
  "detail_texture"
] as const;

export default function CoverImageGrid({
  images
}: {
  images: { role: string; src: string; alt?: string }[];
}) {
  const map = new Map(images.map((i) => [i.role, i]));
  const ordered = ROLE_ORDER.map((r) => map.get(r)).filter(Boolean) as typeof images;

  const g = tokens.p01.grid;

  return (
    <div
      style={{
        position: "absolute",
        left: g.left,
        top: g.top,
        width: g.width,
        height: g.height,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        gap: g.gap
      }}
    >
      {ordered.map((img, i) => (
        <div key={i} style={{ borderRadius: g.radius, overflow: "hidden" }}>
          <img src={img.src} alt={img.alt ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ))}
    </div>
  );
}