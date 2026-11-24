import slots from "./site-image-slots.json";
import edits from "./site-image-edits.json";

export function siteImage(key: string, fallback: string): string {
  const slot = slots.find(item => item.key === key);
  if (!slot) return fallback;
  return (edits as Record<string, string>)[key] ?? slot.image;
}
