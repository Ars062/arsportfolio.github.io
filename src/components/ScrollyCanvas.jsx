import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 36;

const frameSrc = (i) =>
  `${import.meta.env.BASE_URL}sequence/frame_${String(i).padStart(3, "0")}.webp`;

const images = new Array(FRAME_COUNT);
const subscribers = new Set();
let started = false;

const notify = () => subscribers.forEach((cb) => cb());

function preloadFrames() {
  if (started) return;
  started = true;
  for (let i = 0; i < FRAME_COUNT; i++) {
    const img = new Image();
    img.decoding = "async";
    img.src = frameSrc(i);
    img.onload = notify;
    images[i] = img;
  }
}

function getFrame(index) {
  const img = images[index];
  return img && img.complete && img.naturalWidth ? img : null;
}

function useFrameIndex() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const next = Math.round(progress * (FRAME_COUNT - 1));
      setIndex((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return index;
}

function useLoadTick() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const cb = () => setTick((t) => t + 1);
    subscribers.add(cb);
    return () => {
      subscribers.delete(cb);
    };
  }, []);
  return tick;
}

export function ScrollyCanvas() {
  const canvasRef = useRef(null);
  const readyRef = useRef(false);
  const index = useFrameIndex();
  const tick = useLoadTick();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    preloadFrames();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: false });

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      const pw = Math.round(w * dpr);
      const ph = Math.round(h * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const img = getFrame(index);
      if (!img) return;
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      if (!readyRef.current) {
        readyRef.current = true;
        setReady(true);
      }
    };

    render();
    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, [index, tick]);

  return (
    <div className="page-frames" aria-hidden="true">
      <canvas className="page-frames-canvas" ref={canvasRef} />
      <div className="page-frames-scrim" />
      <div className={`page-frames-loader${ready ? " is-ready" : ""}`} />
    </div>
  );
}
