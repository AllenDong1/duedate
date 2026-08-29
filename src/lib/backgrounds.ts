export type BgId = "classic" | "custom";

export const CLASSIC = {
  id: "classic" as const,
  label: "Classic",
  swatch: "conic-gradient(from 135deg, hsl(27deg 93% 60%), #00a6ff, #ff0056, #6500ff, hsl(27deg 93% 60%))",
};

export const COLOR_MAP = [
  "#e63946", "#f4a261", "#e9c46a", "#2a9d8f",
  "#457b9d", "#7209b7", "#f72585", "#4361ee",
  "#4cc9f0", "#588157", "#3a5a40", "#94a3b8",
];

const BG_KEY = "duedate.bg";
const COLOR_KEY = "duedate.bgColor";

export type BgSelection =
  | { type: "preset"; id: "classic" }
  | { type: "custom"; color: string };

export function readSelection(): BgSelection {
  const bg = localStorage.getItem(BG_KEY);
  const color = localStorage.getItem(COLOR_KEY);

  if (bg === "custom" && color && /^#[0-9a-f]{6}$/i.test(color)) {
    return { type: "custom", color };
  }

  return { type: "preset", id: "classic" };
}

export function writeSelection(selection: BgSelection) {
  if (selection.type === "custom") {
    localStorage.setItem(BG_KEY, "custom");
    localStorage.setItem(COLOR_KEY, selection.color);
    return;
  }

  localStorage.setItem(BG_KEY, "classic");
  localStorage.removeItem(COLOR_KEY);
}

export function getSwatch(selection: BgSelection): string {
  if (selection.type === "custom") return selection.color;
  return CLASSIC.swatch;
}

export function getLabel(selection: BgSelection): string {
  if (selection.type === "custom") return "Custom";
  return CLASSIC.label;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function hexToRgb(hex: string) {
  const raw = hex.replace("#", "");
  const value = Number.parseInt(raw, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}

function mix(hex: string, target: "white" | "black", amount: number) {
  const { r, g, b } = hexToRgb(hex);
  const t = target === "white" ? 255 : 0;
  return rgbToHex(
    r + (t - r) * amount,
    g + (t - g) * amount,
    b + (t - b) * amount,
  );
}

export function applyCustomColor(color: string) {
  const root = document.documentElement;
  root.style.setProperty("--custom-page-bg-light", mix(color, "white", 0.88));
  root.style.setProperty("--custom-page-bg-dark", mix(color, "black", 0.82));
  root.style.setProperty("--custom-card-from", mix(color, "black", 0.45));
  root.style.setProperty("--custom-card-to", mix(color, "black", 0.72));
  root.style.setProperty("--custom-glow-1", mix(color, "white", 0.2));
  root.style.setProperty("--custom-glow-2", color);
  root.style.setProperty("--custom-glow-3", mix(color, "white", 0.35));
  root.style.setProperty("--custom-glow-4", mix(color, "black", 0.25));
  root.style.setProperty(
    "--switch-track",
    `linear-gradient(135deg, ${mix(color, "white", 0.35)}, ${color} 55%, ${mix(color, "black", 0.15)})`,
  );
  root.style.setProperty(
    "--switch-track-active",
    `linear-gradient(135deg, ${mix(color, "black", 0.45)}, ${mix(color, "black", 0.72)})`,
  );
  root.style.setProperty("--switch-moon", mix(color, "white", 0.25));
  root.style.setProperty("--switch-sun", mix(color, "white", 0.55));
  root.style.setProperty("--switch-focus", mix(color, "white", 0.4));
}

export function clearCustomColor() {
  const root = document.documentElement;
  for (const name of [
    "--custom-page-bg-light",
    "--custom-page-bg-dark",
    "--custom-card-from",
    "--custom-card-to",
    "--custom-glow-1",
    "--custom-glow-2",
    "--custom-glow-3",
    "--custom-glow-4",
    "--switch-track",
    "--switch-track-active",
    "--switch-moon",
    "--switch-sun",
    "--switch-focus",
  ]) {
    root.style.removeProperty(name);
  }
}

export function applySelection(selection: BgSelection) {
  if (selection.type === "custom") {
    document.documentElement.setAttribute("data-bg", "custom");
    applyCustomColor(selection.color);
    return;
  }

  clearCustomColor();
  document.documentElement.setAttribute("data-bg", "classic");
}
