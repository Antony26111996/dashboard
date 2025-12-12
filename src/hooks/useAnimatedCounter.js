import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for animated number counting
 * @param {number} end - The target number to count to
 * @param {number} duration - Animation duration in milliseconds
 * @param {boolean} startOnMount - Whether to start animation on mount
 * @returns {number} - The current animated value
 */
const useAnimatedCounter = (end, duration = 1500, startOnMount = true) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!startOnMount) return;

    // Parse the end value - handle currency strings like "$12,345.67"
    let targetValue = end;
    if (typeof end === 'string') {
      // Remove currency symbols and commas
      const cleanedValue = end.replace(/[$,]/g, '');
      targetValue = parseFloat(cleanedValue) || 0;
    }

    if (targetValue === 0) {
      setCount(0);
      return;
    }

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

      // Easing function for smooth animation (ease-out-cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      countRef.current = easeOutCubic * targetValue;
      setCount(countRef.current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, startOnMount]);

  return count;
};

export default useAnimatedCounter;
