import { useEffect } from "react";

export function useModalClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    // basic close modal pressing escape key
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Add event listener
    document.addEventListener("keydown", handleEscape);

    return () => {
      // Remove event listener
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]); // Dependency array telling React when to re-run the effect
}
