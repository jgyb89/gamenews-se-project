import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const RegisterModal = ({ isOpen, onClose, onRegister, onSwitchToLogin }) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  // Reset form fields when the modal opens/closes to prevent stale data
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      // Pass the bound values to the App.jsx handler
      onRegister(values.name, values.avatar, values.email, values.password);
    }
  };

  return (
    <ModalWithForm
      name="register"
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
          minLength="8"
          required
        />
        <span className="modal__error">{errors.password}</span>
      </div>

      <div className="modal__input-wrapper">
        <label className="modal__label">Name</label>
        <input
          type="text"
          name="name"
          className={`modal__input ${errors.name ? "modal__input_type_error" : ""}`}
          placeholder="Enter your name"
          value={values.name || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="modal__error">{errors.name}</span>
      </div>

      <div className="modal__input-wrapper">
        <label className="modal__label">Avatar URL</label>
        <input
          type="url"
          name="avatar"
          className={`modal__input ${errors.avatar ? "modal__input_type_error" : ""}`}
          placeholder="Enter avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.avatar}</span>
      </div>

      <button 
        type="submit" 
        className={`modal__submit-btn ${!isValid ? "modal__submit-btn_disabled" : ""}`} 
        disabled={!isValid}
      >
        Sign Up
      </button>

      <div className="modal__switch-wrapper">
        <p className="modal__switch-text">
          Already have an account?{" "}
          <button type="button" className="modal__switch-btn" onClick={onSwitchToLogin}>
            Log in here
          </button>
        </p>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
