import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { AdminGate } from "./admin-gate";

/**
 * Hidden admin entry.
 *
 * Conditions:
 * 1. Tap 6 times within 4 seconds
 * 2. Start long press within 13 seconds
 * 3. Hold continuously for 10 seconds
 */

export function LockTrigger() {
  const [open, setOpen] = useState(false);

  const tapCountRef = useRef(0);
  const firstTapAtRef = useRef(0);

  const tapWindowTimerRef = useRef<number | null>(null);

  const armedRef = useRef(false);
  const armWindowRef = useRef<number | null>(null);

  const pressTimerRef = useRef<number | null>(null);

  const pressStartPosRef = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const clearTimers = () => {
    if (tapWindowTimerRef.current) {
      window.clearTimeout(tapWindowTimerRef.current);
      tapWindowTimerRef.current = null;
    }

    if (armWindowRef.current) {
      window.clearTimeout(armWindowRef.current);
      armWindowRef.current = null;
    }

    if (pressTimerRef.current) {
      window.clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  const reset = () => {
    tapCountRef.current = 0;
    firstTapAtRef.current = 0;

    armedRef.current = false;

    pressStartPosRef.current = null;

    clearTimers();
  };

  useEffect(() => {
    const onScroll = () => {
      if (pressTimerRef.current) {
        reset();
      }
    };

    const onDocPointer = (
      e: PointerEvent
    ) => {
      const el =
        e.target as HTMLElement | null;

      if (
        !el?.closest?.(
          "[data-lock-trigger]"
        )
      ) {
        if (
          armedRef.current ||
          tapCountRef.current > 0
        ) {
          reset();
        }
      }
    };

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    document.addEventListener(
      "pointerdown",
      onDocPointer
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      document.removeEventListener(
        "pointerdown",
        onDocPointer
      );

      clearTimers();
    };
  }, []);

  const registerTap = () => {
    const now = Date.now();

    if (
      tapCountRef.current === 0 ||
      now - firstTapAtRef.current >
      4000
    ) {
      tapCountRef.current = 1;
      firstTapAtRef.current = now;

      if (
        tapWindowTimerRef.current
      ) {
        window.clearTimeout(
          tapWindowTimerRef.current
        );
      }

      tapWindowTimerRef.current =
        window.setTimeout(() => {
          if (
            !armedRef.current
          ) {
            tapCountRef.current = 0;
            firstTapAtRef.current = 0;
          }
        }, 4000);

      return;
    }

    tapCountRef.current += 1;

    if (
      tapCountRef.current >= 6
    ) {
      armedRef.current = true;

      tapCountRef.current = 0;

      if (armWindowRef.current) {
        window.clearTimeout(
          armWindowRef.current
        );
      }

      armWindowRef.current =
        window.setTimeout(() => {
          armedRef.current = false;
        }, 13000);
    }
  };

  const startLongPress = (
    x: number,
    y: number
  ) => {
    if (!armedRef.current) return;

    pressStartPosRef.current = {
      x,
      y,
    };

    if (pressTimerRef.current) {
      window.clearTimeout(
        pressTimerRef.current
      );
    }

    pressTimerRef.current =
      window.setTimeout(() => {
        setOpen(true);

        reset();
      }, 10000);
  };

  const cancelLongPress = () => {
    if (pressTimerRef.current) {
      window.clearTimeout(
        pressTimerRef.current
      );

      pressTimerRef.current =
        null;

      pressStartPosRef.current =
        null;
    }
  };

  const onPointerDown = (
    e: React.PointerEvent
  ) => {
    e.preventDefault();

    registerTap();

    startLongPress(
      e.clientX,
      e.clientY
    );
  };

  const onPointerMove = (
    e: React.PointerEvent
  ) => {
    if (
      !pressTimerRef.current ||
      !pressStartPosRef.current
    ) {
      return;
    }

    const dx =
      e.clientX -
      pressStartPosRef.current.x;

    const dy =
      e.clientY -
      pressStartPosRef.current.y;

    if (
      Math.hypot(dx, dy) > 25
    ) {
      cancelLongPress();
    }
  };

  const onPointerUp = () =>
    cancelLongPress();

  return (
    <>
      {!open && (
        <button
          data-lock-trigger
          aria-label="Admin Lock"
          tabIndex={-1}
          type="button"
          onPointerDown={
            onPointerDown
          }
          onPointerMove={
            onPointerMove
          }
          onPointerUp={
            onPointerUp
          }
          onPointerCancel={
            onPointerUp
          }
          onPointerLeave={
            onPointerUp
          }
          onContextMenu={(e) =>
            e.preventDefault()
          }
          style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            zIndex: 999999,
            border: "none",
            background:
              "transparent",
            color:
              "rgba(25,25,25,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "center",
            cursor: "pointer",
            opacity: 0.55,
            transition:
              "all 0.3s ease",
            WebkitTapHighlightColor:
              "transparent",
            touchAction: "none",
            userSelect: "none",
            padding: "2px",
          }}
        >
          <Sparkles
            size={14}
            strokeWidth={1.8}
          />
        </button>
      )}

      {open && (
        <AdminGate
          onClose={() =>
            setOpen(false)
          }
        />
      )}
    </>
  );
}