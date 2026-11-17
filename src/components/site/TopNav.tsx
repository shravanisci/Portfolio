"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { MoonIcon, SunIcon } from "../Icons";
import { goTo } from "./split";

const BARS = [3, 7, 12, 4, 8, 6, 3];
const LINKS = [
  { label: "About", id: "about" },
  { label: "Research", id: "work" },
  { label: "Record", id: "record" },
  { label: "Contact", id: "contact" },
];

/** The visitor's own time and UTC offset (handles half- and quarter-hour zones). Not Shravani's location. */
function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    let id = 0;
    const start = () => {
      setNow(new Date());
      window.clearInterval(id);
      id = window.setInterval(() => setNow(new Date()), 1000);
    };
    const onVis = () => (document.hidden ? window.clearInterval(id) : start());
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  let label = "GMT";
  let time = "--:--:--";
  if (now) {
    const off = -now.getTimezoneOffset();
    const abs = Math.abs(off);
    const sign = off >= 0 ? "+" : "−";
    label = `GMT${sign}${String(Math.floor(abs / 60)).padStart(2, "0")}:${String(abs % 60).padStart(2, "0")}`;
    time = [now.getHours(), now.getMinutes(), now.getSeconds()].map((n) => String(n).padStart(2, "0")).join(":");
  }
  return (
    <div className="clock" aria-label="Your local time">
      <span className="clock-label">
        {label}
        <span className="clock-local">{" // LOCAL"}</span>
      </span>
      <span className="clock-time" suppressHydrationWarning>
        {time}
      </span>
    </div>
  );
}

const subscribeTheme = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const readTheme = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

/**
 * Switches theme behind a circle of the new page colour that grows from the toggle. The circle is
 * animated with transform and opacity only, so the GPU runs it smoothly even while the page repaints
 * underneath; the repaint (and the 3D protein's recolour) happens while the screen is covered, then
 * the circle fades away. Instant under reduced motion or a second click mid-switch.
 */
let switching = false;
function switchTheme(next: "light" | "dark", from: HTMLElement) {
  const root = document.documentElement;
  const apply = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  if (switching || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("animate" in HTMLElement.prototype)) {
    apply();
    return;
  }
  switching = true;
  const r = from.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.ceil(Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)));
  const wipe = document.createElement("div");
  wipe.className = "theme-wipe";
  wipe.setAttribute("aria-hidden", "true");
  Object.assign(wipe.style, {
    left: `${x - radius}px`,
    top: `${y - radius}px`,
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    background: next === "light" ? "#e8f8fa" : "#0f3038",
  });
  document.body.appendChild(wipe);
  root.classList.add("theme-vt", "theme-hold");

  const nextFrame = () => new Promise<void>((done) => requestAnimationFrame(() => requestAnimationFrame(() => done())));
  wipe
    .animate([{ transform: "scale(0)" }, { transform: "scale(1)" }], { duration: 520, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" })
    .finished.then(async () => {
      apply();
      root.classList.remove("theme-hold"); // lets the 3D protein recolour now, while still covered
      await nextFrame();
      return wipe.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 360, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }).finished;
    })
    .catch(apply)
    .finally(() => {
      wipe.remove();
      root.classList.remove("theme-vt", "theme-hold");
      switching = false;
    });
}

export function ThemeButton() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => null);
  const next = theme === "light" ? "dark" : "light";
  return (
    <button
      type="button"
      className="theme-btn"
      aria-label={`Switch to ${next} theme`}
      onClick={(e) => switchTheme(next, e.currentTarget)}
    >
      {theme === "light" ? <MoonIcon width={18} height={18} /> : <SunIcon width={18} height={18} />}
    </button>
  );
}

/** A menu label whose letters roll up to an accent copy on hover. Read once by screen readers. */
function RollLabel({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ display: "inline-flex" }}>
        {Array.from(text).map((c, i) => (
          <span key={i} className="rc">
            <span style={{ "--i": i } as CSSProperties}>
              <span>{c}</span>
              <span>{c}</span>
            </span>
          </span>
        ))}
      </span>
    </>
  );
}

export function TopNav() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  // Where focus goes after closing: a destination section, or back to the menu button.
  const returnTo = useRef<string | null>(null);
  const wasOpen = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const main = document.getElementById("main");
    const html = document.documentElement;
    if (open) {
      wasOpen.current = true;
      html.style.overflow = "hidden";
      main?.setAttribute("inert", "");
      rootRef.current?.querySelector<HTMLElement>(".menu-panel a")?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          setOpen(false);
          return;
        }
        if (e.key !== "Tab" || !rootRef.current) return;
        const items = Array.from(rootRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")).filter(
          (el) => el.offsetParent !== null || getComputedStyle(el).position === "fixed",
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
    html.style.overflow = "";
    main?.removeAttribute("inert");
    if (!wasOpen.current) return;
    wasOpen.current = false;
    const target = returnTo.current;
    returnTo.current = null;
    // Focus goes to the chosen destination, or back to the menu button.
    if (!target || !goTo(target)) btnRef.current?.focus();
  }, [open]);

  return (
    <div ref={rootRef} className={open ? "menu-open" : undefined}>
      <div className={`topnav${open ? " is-open" : ""}`}>
        <Clock />
        <button
          ref={btnRef}
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="menu-bars" aria-hidden="true">
            {BARS.map((h, i) => (
              <i key={i} style={{ "--h": `${h}px` } as CSSProperties} />
            ))}
          </span>
          <span aria-hidden="true">{open ? "CLOSE" : "MENU"}</span>
        </button>
        <div className="nav-right">
          <ThemeButton />
          <a
            className="pill"
            href="#contact"
            onClick={(e) => {
              if (open) {
                e.preventDefault();
                returnTo.current = "contact";
                close();
              }
            }}
          >
            Let&rsquo;s talk <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="menu-scrim" aria-hidden="true" onClick={close} />
      <nav id="site-menu" className="menu-panel" aria-label="Site" inert={!open}>
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="roll disp"
            onClick={(e) => {
              e.preventDefault();
              returnTo.current = l.id;
              close();
            }}
          >
            <RollLabel text={l.label} />
          </a>
        ))}
      </nav>
    </div>
  );
}
