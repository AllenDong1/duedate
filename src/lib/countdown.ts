export function formatCountdown(dueAt: string, now = new Date()) {
  const ms = new Date(dueAt).getTime() - now.getTime();
  const totalSeconds = Math.floor(Math.abs(ms) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const label = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  return ms < 0 ? `overdue by ${label}` : label;
}
