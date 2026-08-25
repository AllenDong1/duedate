import type { Deadline, NewDeadline } from "@/lib/types";

const KEY = "duedate.deadlines";

function read(): Deadline[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Deadline[]) : [];
  } catch {
    return [];
  }
}

function write(rows: Deadline[]) {
  localStorage.setItem(KEY, JSON.stringify(rows));
}

export function listDeadlines(): Deadline[] {
  return read().sort((a, b) => a.due.localeCompare(b.due));
}

export function addDeadline(input: NewDeadline): Deadline {
  const row: Deadline = {
    id: crypto.randomUUID(),
    title: input.title,
    due: input.due,
    created: new Date().toISOString(),
  };
  const rows = read();
  rows.push(row);
  write(rows);
  return row;
}

export function updateDeadline(id: string, fields: Partial<NewDeadline>) {
  const rows = read().map((r) =>
    r.id === id ? { ...r, ...fields } : r,
  );
  write(rows);
}

export function removeDeadline(id: string) {
  write(read().filter((r) => r.id !== id));
}
