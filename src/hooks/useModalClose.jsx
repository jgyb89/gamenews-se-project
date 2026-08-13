import { useEffect } from "react";

export function useModalClose(isOpen, onClose) {
  useEffect(() => {
    // If the modal isn't open, don't attach the listeners
    if (!isOpen) return;

    // Handler for the Escape key
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Handler for clicking the background overlay
    const handleOverlayClick = (e) => {
      // Ensure we are clicking the dark overlay (.modal) and not the white form container inside it
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };

    // Attach listeners to the document
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlayClick);

    // Cleanup function to remove listeners when the modal closes or component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [isOpen, onClose]);
}
