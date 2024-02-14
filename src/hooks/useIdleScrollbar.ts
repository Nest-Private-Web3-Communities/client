import React, { useEffect, useRef } from "react";

export default function useIdleScrollbar(
  ref: React.MutableRefObject<HTMLElement>,
  options?: { timeout?: number }
) {
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    ref.current.classList.add("scrollbar-idle");
    ref.current.addEventListener("scroll", () => {
      ref.current.classList.add("scrollbar-active");
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        ref.current.classList.remove("scrollbar-active");
      }, options?.timeout || 700);
    });
  }, []);
}
