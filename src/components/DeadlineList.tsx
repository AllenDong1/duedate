import { formatCountdown } from "@/lib/countdown";
import type { Deadline } from "@/lib/types";

type Props = {
  rows: Deadline[];
  now: Date;
  onRemove: (id: string) => void;
};

export function DeadlineList({ rows, now, onRemove }: Props) {
  return (
    <ul>
      {rows.map((r) => (
        <li key={r.id}>
          <div>
            <strong>{r.title}</strong>
            <div>{formatCountdown(r.due, now)}</div>
          </div>
          <button type="button" onClick={() => onRemove(r.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
