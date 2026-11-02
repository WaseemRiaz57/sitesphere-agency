"use client";

import { useEffect, useState } from "react";

type Row = [label: string, value: string];

export default function DeviceCheck() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [ticks, setTicks] = useState(0);
  const [frames, setFrames] = useState(0);

  useEffect(() => {
    const onError = (e: ErrorEvent) => setErrors((list) => [...list, e.message]);
    const onRejection = (e: PromiseRejectionEvent) =>
      setErrors((list) => [...list, String(e.reason)]);
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    // Timers and animation frames: both drive the hero animation.
    const interval = setInterval(() => setTicks((t) => t + 1), 500);
    let raf = 0;
    let count = 0;
    const loop = () => {
      count += 1;
      if (count % 30 === 0) setFrames(count);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const read = () => {
      const panel = document.querySelector<HTMLElement>("[data-phase]");
      setRows([
        ["Scripts running", "yes"],
        ["Browser", navigator.userAgent],
        ["Screen width", `${window.innerWidth}px (device ${screen.width}px)`],
        ["Reduce motion", window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "ON" : "off"],
        ["Data saver", "connection" in navigator && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ? "ON" : "off"],
        ["IntersectionObserver", "IntersectionObserver" in window ? "yes" : "MISSING"],
        ["Page translated", document.documentElement.className.includes("translated") ? "YES" : "no"],
        ["Map phase", panel?.dataset.phase ?? "panel not found"],
        ["Map on screen", panel?.dataset.inView ?? "?"],
      ]);
    };
    read();
    const poll = setInterval(read, 300);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      clearInterval(interval);
      clearInterval(poll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="rounded-[var(--radius-panel)] bg-card p-5 text-sm shadow-lift">
      {rows === null ? (
        <p className="font-semibold text-[#c2410c]">
          Scripts are NOT running on this phone. The page is showing without JavaScript.
        </p>
      ) : (
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          {rows.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="font-semibold">{label}</dt>
              <dd className="break-all text-ink-soft">{value}</dd>
            </div>
          ))}
          <dt className="font-semibold">Timer ticks</dt>
          <dd className="text-ink-soft tabular-nums">{ticks}</dd>
          <dt className="font-semibold">Frames drawn</dt>
          <dd className="text-ink-soft tabular-nums">{frames}</dd>
          <dt className="font-semibold">Errors</dt>
          <dd className="break-all text-ink-soft">{errors.length ? errors.join(" | ") : "none"}</dd>
        </dl>
      )}
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper-deep" aria-hidden="true">
        <div className="h-full w-1/3 animate-[check-slide_1.6s_ease-in-out_infinite_alternate] rounded-full bg-cobalt" />
      </div>
      <p className="mt-1 text-xs text-ink-faint">The blue bar should slide back and forth (CSS animation test).</p>
    </div>
  );
}
