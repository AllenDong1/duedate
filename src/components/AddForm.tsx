import { useState, type FormEvent } from "react";
import { minDate } from "@/lib/util";

type Props = {
  onAdd: (e: FormEvent<HTMLFormElement>) => void;
};

export function AddForm({ onAdd }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="add-section">
      <button
        type="button"
        className="icon-btn add-btn"
        onClick={() => setOpen(!open)}
      >
        <span className="add-icon" />
        <span className="btn-txt">Add</span>
      </button>

      {open && (
        <form onSubmit={(e) => { onAdd(e); setOpen(false); }}>
          <input name="title" placeholder="Title" required />
          <input name="due" type="date" min={minDate()} required />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
}
