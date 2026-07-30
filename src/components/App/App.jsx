import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header";

import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import NewsPage from "../NewsPage/NewsPage";
import Profile from "../Profile/Profile";
import "./App.css";
import Main from "../Main/Main";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getLatestNews, getGiveaways } from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLightMode, setIsLightMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const toggleTheme = () => setIsLightMode(!isLightMode);

  const [news, setNews] = useState([]);
  const [giveaways, setGiveaways] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }

    auth.checkToken(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error("Token validation failed:", err);
        localStorage.removeItem("jwt"); 
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  useEffect(() => {
    getLatestNews()
      .then((data) => {
        setNews(data.slice(0, 9));
      })
      .catch((err) => {
        console.error("News fetch error, using mock data", err);
        setNews(
          Array.from({ length: 9 }, (_, i) => ({
            id: `news-${i}`,
            title: `Mock News Title ${i + 1}`,
            short_description: `This is a mock description for news ${i + 1}.`,
            thumbnail: "https://via.placeholder.com/300x150",
            article_url: "#",
          })),
        );
        setApiError(
          "Using mock data due to API error (CORS or network issue).",
        );
      });

    getGiveaways()
      .then((data) => {
        setGiveaways(data.slice(0, 9));
      })
      .catch((err) => {
        console.error("Giveaways fetch error, using mock data", err);
        setGiveaways(
          Array.from({ length: 9 }, (_, i) => ({
            id: `giveaway-${i}`,
            title: `Mock Giveaway Title ${i + 1}`,
            short_description: `This is a mock description for giveaway ${i + 1}.`,
            thumbnail: "https://via.placeholder.com/300x150",
            giveaway_url: "#",
          })),
        );
        setApiError(
          "Using mock data due to API error (CORS or network issue).",
        );
      });
  }, []);

  const handleCloseModal = () => setActiveModal("");
  const handleOpenLogin = () => setActiveModal("login");
  const handleOpenRegister = () => setActiveModal("register");

  const handleLogin = (email, password) => {
    auth.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return auth.checkToken(data.token);
        }
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className={`page ${isLightMode ? "light-mode" : ""}`}>
        <Sidebar
          isLoggedIn={isLoggedIn}
          handleOpenModal={handleOpenLogin}
          isLightMode={isLightMode}
          toggleTheme={toggleTheme}
          handleLogout={handleLogout}
        />
      <div className="page__content">
        <Header isLoggedIn={isLoggedIn} handleOpenModal={handleOpenLogin} handleLogout={handleLogout} />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={handleCloseModal}
          onSwitchToLogin={handleOpenLogin}
          onRegister={console.log}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={handleCloseModal}
          onSwitchToRegister={handleOpenRegister}
          onLogin={handleLogin}
        />

          <Routes>
            <Route
              path="/"
              element={<Main newsData={news} apiError={apiError} />}
            />
            <Route path="/register" />
            <Route
              path="/news"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} handleOpenLoginModal={handleOpenLogin}>
                  <NewsPage
                    news={news}
                    giveaways={giveaways}
                    apiError={apiError}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} handleOpenLoginModal={handleOpenLogin}>
                  <Profile currentUser={currentUser} handleLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
          </Routes>

        <Footer />
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
