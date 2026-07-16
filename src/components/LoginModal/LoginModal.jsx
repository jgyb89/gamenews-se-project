import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "../Modal/Modal.css";
import signInArtwork from "../../images/sign-in-artwork.png";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister, onLogin }) => {
  const overlayRef = useRef(null);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    identifier: "",
    password: "",
  });

  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;

    let ctx = gsap.context(() => {
      const c1 = "#EC0057";
      const c2 = "#EA53ED";
      const c3 = "#323BED";
      const c4 = "#6253ED";

      const tlBg = gsap.timeline({ repeat: -1, yoyo: true });

      tlBg
        .to(overlayRef.current, {
          backgroundColor: c2,
          duration: 4,
          ease: "power1.inOut",
        })
        .to(overlayRef.current, {
          backgroundColor: c3,
          duration: 4,
          ease: "power1.inOut",
        })
        .to(overlayRef.current, {
          backgroundColor: c4,
          duration: 4,
          ease: "power1.inOut",
        })
        .to(overlayRef.current, {
          backgroundColor: c1,
          duration: 4,
          ease: "power1.inOut",
        });
    }, overlayRef);

    return () => ctx.revert();
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "identifier" && !value.trim())
      error = "Username or Email is required";
    if (name === "password" && !value) error = "Password is required";
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "identifier") setIdentifier(value);
    if (name === "password") setPassword(value);

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const identifierError = validateField("identifier", identifier);
    const passwordError = validateField("password", password);

    if (identifierError || passwordError) {
      setErrors({
        identifier: identifierError,
        password: passwordError,
      });
      return;
    }

    onLogin({ identifier, password });
  };

  if (!isOpen) return null;

  return (
    <div className="modal" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal__container">
        <button
          className="modal__close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="modal__content">
          <div className="modal__form-section">
            <h2 className="modal__title">Log in</h2>
            <form className="modal__form" onSubmit={handleSubmit} noValidate>
              <div className="modal__input-group">
                <label className="modal__label" htmlFor="login-identifier">
                  Username / Email *
                </label>
                <input
                  id="login-identifier"
                  type="text"
                  name="identifier"
                  className={`modal__input ${errors.identifier ? "modal__input_type_error" : ""}`}
                  value={identifier}
                  onChange={handleChange}
                  placeholder="Enter username or email"
                  required
                />
                {errors.identifier && (
                  <span className="modal__error">{errors.identifier}</span>
                )}
              </div>

              <div className="modal__input-group">
                <label className="modal__label" htmlFor="login-password">
                  Password *
                </label>
                <input
                  id="login-password"
                  type="password"
                  name="password"
                  className={`modal__input ${errors.password ? "modal__input_type_error" : ""}`}
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
                {errors.password && (
                  <span className="modal__error">{errors.password}</span>
                )}
              </div>

              <button type="submit" className="modal__submit-btn">
                Log in
              </button>
            </form>
            <p className="modal__toggle-text">
              Don't have an account?{" "}
              <span className="modal__toggle-link" onClick={onSwitchToRegister}>
                Sign up Here
              </span>
            </p>
          </div>
          <div className="modal__artwork-section">
            <img
              src={signInArtwork}
              alt="Collage of gaming characters"
              className="modal__artwork-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
