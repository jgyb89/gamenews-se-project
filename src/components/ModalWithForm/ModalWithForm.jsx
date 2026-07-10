import { useModalClose } from "../../hooks/useModalClose";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon.svg";

const ModalWithForm = ({
  children,
  title,
  isOpen,
  onClose,
  onSubmit,
}) => {
  useModalClose(isOpen, onClose);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="modal__content">
        <button className="modal__close-button" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Close modal" className="modal__close-icon" />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
