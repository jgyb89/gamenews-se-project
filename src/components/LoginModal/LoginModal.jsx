import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToRegister }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onLogin(values.email, values.password);
    }
  };

  return (
    <ModalWithForm
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >

      
      <div className="modal__input-wrapper">
        <label className="modal__label">Email</label>
        <input
          type="email"
          name="email"
          className={`modal__input ${errors.email ? "modal__input_type_error" : ""}`}
          placeholder="Enter email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.email}</span>
      </div>

      <div className="modal__input-wrapper">
        <label className="modal__label">Password</label>
        <input
          type="password"
          name="password"
          className={`modal__input ${errors.password ? "modal__input_type_error" : ""}`}
          placeholder="Enter password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.password}</span>
      </div>

      <button 
        type="submit" 
        className={`modal__submit-btn ${!isValid ? "modal__submit-btn_disabled" : ""}`} 
        disabled={!isValid}
      >
        Log In
      </button>

      <div className="modal__switch-wrapper">
        <p className="modal__switch-text">
          Don't have an account?{" "}
          <button
            type="button"
            className="modal__switch-btn"
            onClick={onSwitchToRegister}
          >
            Sign up here
          </button>
        </p>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
