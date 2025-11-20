"use client";

import { useEffect } from "react";

/**
 * Some browsers (Reader Mode, accessibility extensions) inject inline styles on
 * <html> or <body> before React hydrates, which leads to "tree hydrated but
 * attributes didn't match" warnings. This client-only helper strips those
 * attributes once the app is mounted so the DOM snapshot matches the server
 * render.
 */
export function HydrationStyleReset() {
  useEffect(() => {
    document.documentElement.removeAttribute("style");
    document.body.removeAttribute("style");
  }, []);

  return null;
}
