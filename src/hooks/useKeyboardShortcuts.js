import { useEffect, useCallback } from 'react';

/**
 * Hook for handling keyboard shortcuts
 * @param {Object} shortcuts - Object with shortcut key patterns and their handlers
 * @param {boolean} enabled - Whether shortcuts are enabled
 */
const useKeyboardShortcuts = (shortcuts, enabled = true) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (!enabled) return;

      // Don't trigger shortcuts when typing in inputs
      const target = event.target;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Allow Escape key in inputs
        if (event.key !== 'Escape') return;
      }

      Object.entries(shortcuts).forEach(([pattern, handler]) => {
        const keys = pattern.toLowerCase().split('+');
        const requiresCtrl = keys.includes('ctrl') || keys.includes('cmd');
        const requiresShift = keys.includes('shift');
        const requiresAlt = keys.includes('alt');
        const key = keys.filter(
          (k) => !['ctrl', 'cmd', 'shift', 'alt'].includes(k)
        )[0];

        const ctrlPressed = event.ctrlKey || event.metaKey;
        const shiftPressed = event.shiftKey;
        const altPressed = event.altKey;

        if (
          (requiresCtrl === ctrlPressed || (!requiresCtrl && !ctrlPressed)) &&
          (requiresShift === shiftPressed || (!requiresShift && !shiftPressed)) &&
          (requiresAlt === altPressed || (!requiresAlt && !altPressed)) &&
          event.key.toLowerCase() === key
        ) {
          event.preventDefault();
          handler(event);
        }
      });
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

export default useKeyboardShortcuts;
