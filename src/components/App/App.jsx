import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import RightSidebar from "../RightSidebar/RightSidebar";
import News from "../News/News";

import "./App.css";
import Main from "../Main/Main";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getLatestNews } from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");

  // Previous states
  const [newsItems, setNewsItems] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  // New API states
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Temporary mock data matching expected MMO API structure.
  // Can be used if the API is rate-limited or during UI building.
  const mockNews = [
    {
      id: 1,
      title: "Mock MMO Update",
      short_description: "This is a mock description.",
      article_url: "https://mock.com",
      thumbnail: "https://via.placeholder.com/150",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    getLatestNews()
      .then((data) => {
        setNewsData(data);
      })
      .catch((err) => {
        setApiError("Sorry, we could not load the latest news at this time.");
        console.error("API Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // Run on component mount

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleOpenLogin = () => {
    setActiveModal("login");
  };

  const handleOpenRegister = () => {
    setActiveModal("register");
  };

  return (
    <div className="page">
      <Sidebar isLoggedIn={false} handleOpenModal={handleOpenLogin} />
      <div className="page__content">
        <Header />
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
          onLogin={console.log}
        />
        <Navigation>
          <Routes>
            <Route path="/" element={<Main newsData={newsData} isLoading={isLoading} apiError={apiError} />} />
            <Route path="/register" />
            <Route
              path="/news"
              element={
                <News
                  newsData={newsData}
                  isLoading={isLoading}
                  apiError={apiError}
                />
              }
            />
          </Routes>
        </Navigation>

        <Footer />
      </div>
    </div>
  );
}

export default App;
