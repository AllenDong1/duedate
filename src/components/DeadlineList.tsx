import { useState } from "react";
import { daysLeft, daysLeftNum, isOverdue } from "@/lib/countdown";
import { minDate } from "@/lib/util";
import { BackgroundPicker } from "@/components/BackgroundPicker";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Deadline } from "@/lib/types";

type Props = {
  rows: Deadline[];
  now: Date;
  onEdit: (id: string, title: string, due: string) => void;
  onRemove: (id: string) => void;
};

function EditPanel({
  item,
  onSave,
  onDelete,
  onClose,
}: {
  item: Deadline;
  onSave: (title: string, due: string) => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(item.title);
  const [due, setDue] = useState(item.due.slice(0, 10));

  return (
    <div className="edit-panel">
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input
        type="date"
        value={due}
        min={minDate()}
        onChange={(e) => setDue(e.target.value)}
      />
      <div className="edit-actions">
        <button type="button" onClick={() => onSave(title.trim(), new Date(due + "T23:59:59").toISOString())}>
          Save
        </button>
        <button type="button" className="btn-danger" onClick={onDelete}>
          Delete
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export function DeadlineList({ rows, now, onEdit, onRemove }: Props) {
  const [editing, setEditing] = useState<string | null>(null);
  const [listOpen, setListOpen] = useState(false);

  if (rows.length === 0) {
    return (
      <div className="m2 empty-circle">
        <ThemeToggle />
        <BackgroundPicker />
        <span className="circle-label">No deadlines yet</span>
      </div>
    );
  }

  const first = rows[0];

  return (
    <>
      <div className={`m2 ${isOverdue(first.due, now) ? "overdue" : ""}`}>
        <ThemeToggle />
        <BackgroundPicker />
        <span className="circle-title">{first.title}</span>
        <span className="circle-days">
          <span className="num">{daysLeftNum(first.due, now)}</span>
          <span className="unit">Days</span>
        </span>
      </div>

      <button
        type="button"
        className="list-toggle"
        onClick={() => setListOpen(!listOpen)}
      >
        {listOpen ? "▲ hide" : `▼ ${rows.length} item${rows.length > 1 ? "s" : ""}`}
      </button>

      {listOpen && (
        <ul className="rest">
          {rows.map((r) => (
            <li key={r.id} className={isOverdue(r.due, now) ? "overdue" : ""}>
              <span className="rest-title">{r.title}</span>
              <span className="date">{daysLeft(r.due, now)}</span>
              <button
                type="button"
                className="edit-button small"
                onClick={() => setEditing(editing === r.id ? null : r.id)}
              >
                <svg className="edit-svgIcon" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.8 3.8-9.3 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 410.3 95.2l14.3-14.3c25-25 25-65.5 0-90.5L391 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                </svg>
              </button>
              {editing === r.id && (
                <EditPanel
                  item={r}
                  onSave={(t, d) => { onEdit(r.id, t, d); setEditing(null); }}
                  onDelete={() => { onRemove(r.id); setEditing(null); }}
                  onClose={() => setEditing(null)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
