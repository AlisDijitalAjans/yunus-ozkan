"use client";

import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    cursor.style.display = "block";

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX - 20;
    let cursorY = mouseY - 20;
    let currentW = 40;
    let currentH = 40;
    let animationId: number;
    let snappedEl: HTMLElement | null = null;
    let isSnapped = false;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    const resetStyle = () => {
      cursor.style.borderRadius = "50%";
      cursor.style.background =
        "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 100%)";
      cursor.style.border = "1px solid rgba(213, 179, 107, 0.4)";
      cursor.style.boxShadow =
        "0 0 0 1px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(213, 179, 107, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)";
    };

    const setSnapStyle = (borderRadius: string) => {
      cursor.style.borderRadius = borderRadius;
      cursor.style.background =
        "linear-gradient(135deg, rgba(213, 179, 107, 0.12) 0%, rgba(213, 179, 107, 0.06) 50%, rgba(255, 255, 255, 0.03) 100%)";
      cursor.style.border = "1px solid rgba(213, 179, 107, 0.5)";
      cursor.style.boxShadow =
        "0 0 0 2px rgba(213, 179, 107, 0.4), 0 8px 30px rgba(213, 179, 107, 0.4), inset 0 0 20px rgba(213, 179, 107, 0.15)";
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const findInteractive = (target: HTMLElement): HTMLElement | null => {
      return target.closest("a, button, input, textarea, select, .btn-primary") as HTMLElement | null;
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = findInteractive(e.target as HTMLElement);
      if (el) {
        snappedEl = el;
        isSnapped = true;
        const computed = getComputedStyle(el);
        setSnapStyle(computed.borderRadius || "8px");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const el = findInteractive(e.target as HTMLElement);
      if (el) {
        snappedEl = null;
        isSnapped = false;
        resetStyle();
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function animate() {
      let targetX: number;
      let targetY: number;
      let targetW: number;
      let targetH: number;
      let speed: number;

      if (isSnapped && snappedEl) {
        const rect = snappedEl.getBoundingClientRect();
        const pad = 6;
        targetX = rect.left - pad;
        targetY = rect.top - pad;
        targetW = rect.width + pad * 2;
        targetH = rect.height + pad * 2;
        speed = 0.18;
      } else {
        targetW = 40;
        targetH = 40;
        // Mouse pozisyonundan yarı boyutu çıkar (merkezleme)
        targetX = mouseX - targetW / 2;
        targetY = mouseY - targetH / 2;
        speed = 0.12;
      }

      cursorX = lerp(cursorX, targetX, speed);
      cursorY = lerp(cursorY, targetY, speed);
      currentW = lerp(currentW, targetW, speed);
      currentH = lerp(currentH, targetH, speed);

      cursor!.style.left = cursorX + "px";
      cursor!.style.top = cursorY + "px";
      cursor!.style.width = currentW + "px";
      cursor!.style.height = currentH + "px";

      animationId = requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        display: "none",
        position: "fixed",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 100%)",
        border: "1px solid rgba(213, 179, 107, 0.4)",
        boxShadow:
          "0 0 0 1px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(213, 179, 107, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)",
        pointerEvents: "none",
        zIndex: 99998,
        transition:
          "border-radius 0.4s ease, background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease",
        opacity: 0.9,
      }}
    />
  );
}
