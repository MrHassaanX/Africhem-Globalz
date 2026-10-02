export const LAUNCH_DEADLINE = "2026-10-20T01:09:37+05:30";
export const LAUNCH_DEADLINE_MS = new Date(LAUNCH_DEADLINE).getTime();

export type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getTimeRemaining(now: number): TimeRemaining {
  const totalSeconds = Math.max(
    0,
    Math.ceil((LAUNCH_DEADLINE_MS - now) / 1000),
  );

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}
