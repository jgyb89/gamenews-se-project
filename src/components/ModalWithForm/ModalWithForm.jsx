import React from "react";
import "../Modal/Modal.css"; 
import closeIcon from "../../images/close-icon.svg";
import logo from "../../images/gamenews-logo-white.svg";
// Import the custom hook
import { useModalClose } from "../../hooks/useModalClose";

const ModalWithForm = ({
  name,
  isOpen,
  onClose,
  onSubmit,
  children,
}) => {
  // Initialize the hook to handle Escape and Overlay clicks
  useModalClose(isOpen, onClose);

  // If the modal isn't open, don't render it
  if (!isOpen) return null;

  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__container">
        
        {/* Close Button */}
        <button className="modal__close-btn" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>

        {/* LEFT SIDE: Form Section (flex: 1) */}
        <div className="modal__form-section">
          <img src={logo} alt="GameNews Logo" className="modal__logo" />
          
          <form className="modal__form" name={name} onSubmit={onSubmit}>
            {children}
          </form>
        </div>

        {/* RIGHT SIDE: Artwork Section (flex: 1.2) */}
        <div className="modal__artwork-section" />
        
      </div>
    </div>
  );
};

export default ModalWithForm;
