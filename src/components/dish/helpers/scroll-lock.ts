let lockCount = 0;
let savedScrollY = 0;

export function lockScroll() {
  if (typeof window === 'undefined') return;
  if (lockCount === 0) {
    savedScrollY = window.scrollY || window.pageYOffset || 0;
    const body = document.body as HTMLBodyElement;
    const docEl = document.documentElement as HTMLElement;
    body.style.position = 'fixed';
    body.style.top = `-${savedScrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    docEl.style.overscrollBehaviorY = 'none';
  }
  lockCount += 1;
}

export function unlockScroll() {
  if (typeof window === 'undefined') return;
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount === 0) {
    const body = document.body as HTMLBodyElement;
    const docEl = document.documentElement as HTMLElement;
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';
    body.style.overflow = '';
    docEl.style.overscrollBehaviorY = '';
    // Restore scroll
    window.scrollTo({ top: savedScrollY });
  }
}

