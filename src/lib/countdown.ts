export function formatCountdown(due: string, now = new Date()) {
  const ms = new Date(due).getTime() - now.getTime();
  const totalSeconds = Math.floor(Math.abs(ms) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const label = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  return ms < 0 ? `overdue by ${label}` : label;
}

export function isOverdue(due: string, now = new Date()) {
  return new Date(due).getTime() < now.getTime();
}

export function formatDate(due: string) {
  return new Date(due).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function daysLeft(due: string, now = new Date()) {
  const ms = new Date(due).getTime() - now.getTime();
  const days = Math.ceil(ms / 86_400_000);
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return "Today";
  return `${days}d`;
}

export function daysLeftNum(due: string, now = new Date()) {
  const ms = new Date(due).getTime() - now.getTime();
  return Math.ceil(ms / 86_400_000);
}
