import { useEffect, useState } from "react";

export default function Typewriter({
  words,
  typeSpeed = 70,
  deleteSpeed = 35,
  pause = 1500,
  className = ""
}) {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduceMotion ? words[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const current = words[index % words.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause, reduceMotion]);

  return (
    <span className={`typewriter ${className}`}>
      <span className="typewriter-text">{text}</span>
      {!reduceMotion && <span className="typewriter-cursor" aria-hidden="true" />}
    </span>
  );
}
