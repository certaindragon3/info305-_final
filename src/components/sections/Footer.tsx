'use client';

import React from "react";

const waveInstances = [
  { gradientId: "footerGradientPrimary", pathId: "footerWavePathPrimary", hidden: false },
  { gradientId: "footerGradientSecondary", pathId: "footerWavePathSecondary", hidden: true },
];

const LOOP_DURATION_MS = 30000;

export default function Footer(): React.ReactElement {
  const loopText = "Jiesen Huang — Solution Always Prevails. \u00A0\u2022\u00A0 ";
  // build a long repeating string to ensure smooth loop
  const repeated = new Array(8).fill(loopText).join(" ");
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const primaryWaveRef = React.useRef<SVGSVGElement | null>(null);
  const animationFrame = React.useRef<number | null>(null);
  const lastTimestamp = React.useRef<number | null>(null);
  const offsetRef = React.useRef(0);
  const [waveWidth, setWaveWidth] = React.useState(0);

  // keep svg width in sync with responsive layout
  React.useEffect(() => {
    if (!primaryWaveRef.current) return;

    const updateWidth = () => {
      const width = primaryWaveRef.current?.getBoundingClientRect().width ?? 0;
      setWaveWidth(width);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(primaryWaveRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // drive marquee translation via rAF to avoid CSS animation reset seams
  React.useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!trackRef.current || waveWidth === 0 || prefersReducedMotion) {
      return;
    }

    const pxPerMs = waveWidth / LOOP_DURATION_MS;

    const step = (timestamp: number) => {
      if (lastTimestamp.current == null) {
        lastTimestamp.current = timestamp;
        animationFrame.current = requestAnimationFrame(step);
        return;
      }

      const delta = timestamp - lastTimestamp.current;
      lastTimestamp.current = timestamp;
      offsetRef.current -= delta * pxPerMs;

      if (offsetRef.current <= -waveWidth) {
        offsetRef.current += waveWidth;
      }

      trackRef.current!.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      animationFrame.current = requestAnimationFrame(step);
    };

    animationFrame.current = requestAnimationFrame(step);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      lastTimestamp.current = null;
      offsetRef.current = 0;
      if (trackRef.current) {
        trackRef.current.style.transform = "";
      }
    };
  }, [waveWidth]);

  return (
    <footer id="site-footer" className="footer-root relative w-full pt-16">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="pointer-events-none -mx-6 sm:-mx-8 lg:-mx-0">
          <div className="footer-wave-viewport rounded-2xl shadow-2xl shadow-orange-500/10 overflow-hidden">
            <div className="footer-wave-track" ref={trackRef}>
              {waveInstances.map(({ gradientId, pathId, hidden }, index) => (
                <FooterWaveSvg
                  key={pathId}
                  repeated={repeated}
                  gradientId={gradientId}
                  pathId={pathId}
                  hidden={hidden}
                  ref={index === 0 ? primaryWaveRef : undefined}
                />
              ))}
            </div>
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

type FooterWaveSvgProps = {
  repeated: string;
  gradientId: string;
  pathId: string;
  hidden?: boolean;
};

const FooterWaveSvg = React.forwardRef<SVGSVGElement, FooterWaveSvgProps>(function FooterWaveSvg(
  { repeated, gradientId, pathId, hidden },
  ref,
) {
  return (
    <svg
      role={hidden ? undefined : "img"}
      aria-hidden={hidden}
      aria-label={hidden ? undefined : "Animated footer signature"}
      className="footer-wave-svg h-20 w-full flex-shrink-0"
      viewBox="0 0 1200 80"
      preserveAspectRatio="xMidYMid slice"
      ref={ref}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" x2="100%">
          <stop offset="0%" stopColor="#FB923C" stopOpacity="1" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="1" />
        </linearGradient>
        <path id={pathId} d="M0 40 C 150 10, 350 70, 600 40 C 850 10, 1050 70, 1200 40" />
      </defs>

      <text fontSize={20} fontFamily="var(--font-sans)" fontWeight="600" fill={`url(#${gradientId})`}>
        <textPath href={`#${pathId}`} startOffset="0%">
          {repeated}
        </textPath>
      </text>
    </svg>
  );
});
