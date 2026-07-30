import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn, handleOpenLoginModal }) {
  // If the user is not logged in, trigger the login modal popup
  useEffect(() => {
    if (!isLoggedIn && handleOpenLoginModal) {
      handleOpenLoginModal();
    }
  }, [isLoggedIn, handleOpenLoginModal]);

  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
