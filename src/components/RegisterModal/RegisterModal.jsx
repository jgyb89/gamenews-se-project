import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password, username });
  };

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="modal__fieldset">
        <label className="modal__label">
          Email
          <input
            type="email"
            className="modal__input"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="modal__label">
          Password
          <input
            type="password"
            className="modal__input"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="modal__label">
          Username
          <input
            type="text"
            className="modal__input"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="2"
            maxLength="30"
          />
        </label>
      </fieldset>
      <button type="submit" className="modal__submit-button">
        Sign up
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
