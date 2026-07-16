import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "../Modal/Modal.css";
import signInArtwork from "../../assets/sign-in-artwork.png";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, onRegister }) => {
  const overlayRef = useRef(null);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");

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

  const checkPasswordStrength = (pwd) => {
    if (!pwd) return "";
    let strength = "weak";
    if (
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /\d/.test(pwd) &&
      /[!@#$%^&*]/.test(pwd)
    ) {
      strength = "strong";
    } else if (pwd.length >= 6 && (/[A-Z]/.test(pwd) || /\d/.test(pwd))) {
      strength = "medium";
    }
    return strength;
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "fullName" && !value.trim()) error = "Full Name is required";
    if (name === "username" && !value.trim()) error = "Username is required";
    if (name === "password" && !value) error = "Password is required";
    if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        error = "Invalid email format";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fullName") setFullName(value);
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "phone") setPhone(value);
    if (name === "password") {
      setPassword(value);
      setPasswordStrength(checkPasswordStrength(value));
    }

    if (name !== "phone") {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullNameError = validateField("fullName", fullName);
    const usernameError = validateField("username", username);
    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);

    if (fullNameError || usernameError || emailError || passwordError) {
      setErrors({
        fullName: fullNameError,
        username: usernameError,
        email: emailError,
        password: passwordError,
      });
      return;
    }

    onRegister({ fullName, username, email, password, phone });
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
            <h2 className="modal__title">Sign up</h2>
            <form className="modal__form" onSubmit={handleSubmit} noValidate>
              <div className="modal__input-group">
                <label className="modal__label" htmlFor="register-fullname">
                  Full Name *
                </label>
                <input
                  id="register-fullname"
                  type="text"
                  name="fullName"
                  className={`modal__input ${errors.fullName ? "modal__input_type_error" : ""}`}
                  value={fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <span className="modal__error">{errors.fullName}</span>
                )}
              </div>

              <div className="modal__input-group">
                <label className="modal__label" htmlFor="register-username">
                  Username *
                </label>
                <input
                  id="register-username"
                  type="text"
                  name="username"
                  className={`modal__input ${errors.username ? "modal__input_type_error" : ""}`}
                  value={username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <span className="modal__error">{errors.username}</span>
                )}
              </div>

              <div className="modal__input-group">
                <label className="modal__label" htmlFor="register-email">
                  Email *
                </label>
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  className={`modal__input ${errors.email ? "modal__input_type_error" : ""}`}
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <span className="modal__error">{errors.email}</span>
                )}
              </div>

              <div className="modal__input-group">
                <label className="modal__label" htmlFor="register-password">
                  Password *
                </label>
                <input
                  id="register-password"
                  type="password"
                  name="password"
                  className={`modal__input ${errors.password ? "modal__input_type_error" : ""}`}
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                {passwordStrength && (
                  <div
                    className={`modal__password-strength modal__password-strength_level_${passwordStrength}`}
                  >
                    Strength: {passwordStrength}
                  </div>
                )}
                {errors.password && (
                  <span className="modal__error">{errors.password}</span>
                )}
              </div>

              <div className="modal__input-group">
                <label className="modal__label" htmlFor="register-phone">
                  Phone
                </label>
                <input
                  id="register-phone"
                  type="tel"
                  name="phone"
                  className="modal__input"
                  value={phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <button type="submit" className="modal__submit-btn">
                Sign up
              </button>
            </form>
            <p className="modal__toggle-text">
              Already have an account?{" "}
              <span className="modal__toggle-link" onClick={onSwitchToLogin}>
                Log in here
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

export default RegisterModal;
