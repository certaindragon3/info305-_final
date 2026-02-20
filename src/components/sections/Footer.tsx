'use client';

import React from "react";

// How long one complete text loop takes (ms)
const LOOP_DURATION_MS = 28000;

// One unit of scrolling text. The trailing padding makes the join invisible.
const LOOP_TEXT = "Jiesen Huang — Solution Always Prevails. \u00A0\u2022\u00A0 ";

// Lots of repeats so the wave path is always fully covered, even at wide
// viewports where the path arc is much longer than one LOOP_TEXT.
const DISPLAY_TEXT = LOOP_TEXT.repeat(24);

/**
 * Footer wave marquee — design notes
 * ─────────────────────────────────
 * We use a SINGLE SVG with one <textPath>.  On mount we measure:
 *   • pathLen  = wave path arc length via getTotalLength()
 *   • textLen  = one LOOP_TEXT rendered width via getComputedTextLength()
 *
 * From these we derive:
 *   periodPct = (textLen / pathLen) × 100   [% of path length per loop unit]
 *
 * The rAF loop decrements startOffset by periodPct/LOOP_DURATION_MS each ms
 * and wraps at exactly −periodPct (not −100%).  Because the wrap distance
 * equals precisely one text repetition, the loop is always pixel-perfect —
 * no seam, no jump, regardless of font or viewport size.
 *
 * Why not CSS animation?  CSS cannot animate SVG startOffset (it is not a
 * CSS presentation attribute), and SMIL requires knowing the period at
 * author-time.  rAF + setAttribute is the only approach that can use the
 * runtime-measured period.  Safari handles this fine; any previous stutter
 * was caused by the tab-return large-delta bug, fixed by clamping delta.
 */
export default function Footer(): React.ReactElement {
  // Refs to SVG DOM nodes needed for measurement and animation
  const pathRef = React.useRef<SVGPathElement | null>(null);
  const measureRef = React.useRef<SVGTextElement | null>(null);
  const textPathRef = React.useRef<SVGTextPathElement | null>(null);

  const animRef = React.useRef<number | null>(null);
  const lastTsRef = React.useRef<number | null>(null);
  const offsetRef = React.useRef(0);

  React.useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;
    if (!pathRef.current || !measureRef.current || !textPathRef.current) return;

    // ── Measurement ─────────────────────────────────────────────────────────
    // Arc length of the wave path in SVG user units
    const pathLen = pathRef.current.getTotalLength();

    // Rendered width of one LOOP_TEXT repetition (straight-line baseline length)
    // This is safe to call on an always-mounted element (even if it is hidden).
    const textLen = measureRef.current.getComputedTextLength();

    // Period as a percentage of path length — this is our exact loop unit
    const periodPct = (textLen / pathLen) * 100;

    // Advance rate: periodPct per LOOP_DURATION_MS milliseconds
    const pctPerMs = periodPct / LOOP_DURATION_MS;

    // ── Animation loop ───────────────────────────────────────────────────────
    const step = (timestamp: number) => {
      if (lastTsRef.current == null) {
        lastTsRef.current = timestamp;
        animRef.current = requestAnimationFrame(step);
        return;
      }

      // Clamp delta to 100 ms max to survive tab-switch / background pauses
      // without a sudden visual jump.
      const delta = Math.min(timestamp - lastTsRef.current, 100);
      lastTsRef.current = timestamp;

      offsetRef.current -= delta * pctPerMs;

      // Modulo-wrap so the text loops seamlessly at exactly one period
      if (offsetRef.current <= -periodPct) {
        offsetRef.current += periodPct;
      }

      if (textPathRef.current) {
        textPathRef.current.setAttribute("startOffset", `${offsetRef.current}%`);
      }

      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      lastTsRef.current = null;
      offsetRef.current = 0;
      textPathRef.current?.setAttribute("startOffset", "0%");
    };
  }, []);

  return (
    <footer id="site-footer" className="footer-root relative w-full pt-16">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="pointer-events-none -mx-6 sm:-mx-8 lg:-mx-0">
          <div className="footer-wave-viewport rounded-2xl shadow-2xl shadow-orange-500/10 overflow-hidden">
            <svg
              role="img"
              aria-label="Animated footer signature"
              className="footer-wave-svg h-20 w-full"
              viewBox="0 0 1200 80"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="footerGradient" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#FB923C" stopOpacity="1" />
                  <stop offset="100%" stopColor="#F97316" stopOpacity="1" />
                </linearGradient>

                {/* Wave path — starts and ends at y=40 so the waveform tiles smoothly */}
                <path
                  ref={pathRef}
                  id="footerWavePath"
                  d="M0 40 C 150 10, 350 70, 600 40 C 850 10, 1050 70, 1200 40"
                />
              </defs>

              {/*
                Invisible measurement node — rendered off-screen (y=-200 puts it
                well above the clipping viewport).  getComputedTextLength() on this
                element gives us the exact pixel-width of one LOOP_TEXT repetition
                in SVG user units, which we use to compute the loop period.
              */}
              <text
                ref={measureRef}
                fontSize={20}
                fontFamily="var(--font-sans)"
                fontWeight="600"
                y="-200"
                aria-hidden="true"
              >
                {LOOP_TEXT}
              </text>

              {/* Visible scrolling text */}
              <text
                fontSize={20}
                fontFamily="var(--font-sans)"
                fontWeight="600"
                fill="url(#footerGradient)"
              >
                <textPath
                  href="#footerWavePath"
                  startOffset="0%"
                  ref={textPathRef}
                >
                  {DISPLAY_TEXT}
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        <div className="mt-6 flex w-full items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium footer-meta">Jiesen Huang • Acheng Restaurant Virtual Museum</p>
            <p className="mt-1 text-xs footer-meta">Preserving embodied culinary knowledge and situated craft.</p>
          </div>

          <div className="text-sm footer-meta">
            <span>© {new Date().getFullYear()}</span>
            <span className="mx-2">•</span>
            <a className="text-orange-400 hover:text-orange-500" href="mailto:jiesen.huang@duke.edu">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
