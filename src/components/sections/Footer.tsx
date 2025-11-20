import React from "react";

export default function Footer(): React.ReactElement {
  const loopText = "Jiesen Huang — Solution Always Prevails. \u00A0\u2022\u00A0 ";
  // build a long repeating string to ensure smooth loop
  const repeated = new Array(8).fill(loopText).join(" ");

  return (
    <footer id="site-footer" className="footer-root relative w-full pt-16">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="pointer-events-none -mx-6 sm:-mx-8 lg:-mx-0">
          <div className="footer-wave-viewport rounded-2xl shadow-2xl shadow-orange-500/10 overflow-hidden">
            <svg
              role="img"
              aria-label="Animated footer signature"
              className="w-full h-20"
              viewBox="0 0 1200 80"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="g1" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#FB923C" stopOpacity="1" />
                  <stop offset="100%" stopColor="#F97316" stopOpacity="1" />
                </linearGradient>
                <path id="wavePath" d="M0 40 C 150 10, 350 70, 600 40 C 850 10, 1050 70, 1200 40" />
              </defs>

              {/* Repeating track - animated using existing animate-scroll util */}
              <g
                className="animate-scroll"
                style={{
                  // @ts-ignore custom property for animation duration
                  ["--animation-duration" as any]: "30s",
                  willChange: "transform",
                }}
              >
                {/* We render two identical textPaths side by side so animation appears seamless */}
                <g transform="translate(0,0)">
                  <text
                    fontSize={20}
                    fontFamily="var(--font-sans)"
                    fontWeight="600"
                    fill="url(#g1)"
                    // Removed drop-shadow filter for performance
                  >
                    <textPath href="#wavePath" startOffset="0%">
                      {repeated}
                    </textPath>
                  </text>
                </g>

                <g transform="translate(1200,0)">
                  <text
                    fontSize={20}
                    fontFamily="var(--font-sans)"
                    fontWeight="600"
                    fill="url(#g1)"
                    // Removed drop-shadow filter for performance
                  >
                    <textPath href="#wavePath" startOffset="0%">
                      {repeated}
                    </textPath>
                  </text>
                </g>
              </g>
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
            <a className="text-orange-400 hover:text-orange-500" href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
