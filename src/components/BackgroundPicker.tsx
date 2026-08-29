import { useEffect, useRef, useState } from "react";
import {
  CLASSIC,
  COLOR_MAP,
  applySelection,
  getLabel,
  getSwatch,
  readSelection,
  writeSelection,
  type BgSelection,
} from "@/lib/backgrounds";

export function BackgroundPicker() {
  const [selection, setSelection] = useState<BgSelection>(readSelection);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applySelection(selection);
    writeSelection(selection);
  }, [selection]);

  useEffect(() => {
    if (!open) return;
    function close(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  function selectClassic() {
    setSelection({ type: "preset", id: "classic" });
    setOpen(false);
  }

  function selectColor(color: string) {
    setSelection({ type: "custom", color });
    setOpen(false);
  }

  const swatch = getSwatch(selection);
  const label = getLabel(selection);
  const customColor = selection.type === "custom" ? selection.color : null;

  return (
    <div
      ref={rootRef}
      className={`bg-picker${open ? " open" : ""}`}
      role="group"
      aria-label="Background style"
    >
      <button
        type="button"
        className="bg-swatch active"
        style={{ background: swatch }}
        title={`Style: ${label}`}
        aria-label={`Style: ${label}. Click to change.`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      />

      {open && (
        <div className="bg-panel">
          <button
            type="button"
            className={`bg-swatch${selection.type === "preset" ? " active" : ""}`}
            style={{ background: CLASSIC.swatch }}
            title={CLASSIC.label}
            aria-label={CLASSIC.label}
            aria-pressed={selection.type === "preset"}
            onClick={selectClassic}
          />

          <div className="bg-colors" role="group" aria-label="Color map">
            {COLOR_MAP.map((color) => (
              <button
                key={color}
                type="button"
                className={`bg-color${customColor === color ? " active" : ""}`}
                style={{ background: color }}
                title={color}
                aria-label={color}
                aria-pressed={customColor === color}
                onClick={() => selectColor(color)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
