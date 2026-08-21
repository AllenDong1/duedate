import { describe, expect, it } from "vitest";
import { formatCountdown } from "@/lib/countdown";

describe("formatCountdown", () => {
  it("formats remaining time until a deadline", () => {
    const now = new Date("2026-08-21T12:00:00.000Z");
    const dueAt = "2026-08-22T14:05:07.000Z";

    expect(formatCountdown(dueAt, now)).toBe("1d 2h 5m 7s");
  });

  it("formats overdue deadlines", () => {
    const now = new Date("2026-08-21T12:00:00.000Z");
    const dueAt = "2026-08-21T11:59:50.000Z";

    expect(formatCountdown(dueAt, now)).toBe("overdue by 0d 0h 0m 10s");
  });
});
