import { useEffect, useRef } from 'react';

/**
 * useScrollAnimation — attaches IntersectionObserver to add 'visible' class
 * when elements with className 'animate-on-scroll' enter the viewport.
 */
export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/**
 * useCounter — animates a number from 0 to target
 */
export function useCounter(target, duration = 2000, start = false) {
  const ref = useRef(null);

  useEffect(() => {
    if (!start) return;
    let current = 0;
    const step  = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      if (ref.current) ref.current.textContent = Math.floor(current).toLocaleString();
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, start]);

  return ref;
}
