import type { FormEvent } from "react";

type Props = {
  onAdd: (e: FormEvent<HTMLFormElement>) => void;
};

export function AddForm({ onAdd }: Props) {
  return (
    <form onSubmit={onAdd}>
      <input name="title" placeholder="Title" required />
      <input name="due" type="datetime-local" required />
      <button type="submit">Add</button>
    </form>
  );
}
