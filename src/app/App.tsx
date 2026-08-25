import { useEffect, useState, type FormEvent } from "react";
import { AddForm } from "@/components/AddForm";
import { DeadlineList } from "@/components/DeadlineList";
import { addDeadline, listDeadlines, updateDeadline, removeDeadline } from "@/lib/store";
import type { Deadline } from "@/lib/types";

export default function App() {
  const [rows, setRows] = useState<Deadline[]>([]);
  const [now, setNow] = useState(() => new Date());

  function refresh() {
    setRows(listDeadlines());
  }

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const due = String(form.get("due") ?? "");
    if (!title || !due) return;

    addDeadline({ title, due: new Date(due + "T23:59:59").toISOString() });
    e.currentTarget.reset();
    refresh();
  }

  function onEdit(id: string, title: string, due: string) {
    if (!title || !due) return;
    updateDeadline(id, { title, due });
    refresh();
  }

  function onRemove(id: string) {
    removeDeadline(id);
    refresh();
  }

  return (
    <main>
      <DeadlineList rows={rows} now={now} onEdit={onEdit} onRemove={onRemove} />
      <AddForm onAdd={onAdd} />
    </main>
  );
}
