import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import NewsPage from "../NewsPage/NewsPage";

import "./App.css";
import Main from "../Main/Main";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { MMOBOMB_API_BASE_URL } from "../../utils/constants";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const [news, setNews] = useState([]);
  const [giveaways, setGiveaways] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${MMOBOMB_API_BASE_URL}/latestnews`);
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setNews(data.slice(0, 9));
      } catch (err) {
        console.error("News fetch error, using mock data", err);
        setNews(Array.from({ length: 9 }, (_, i) => ({
          id: `news-${i}`,
          title: `Mock News Title ${i + 1}`,
          short_description: `This is a mock description for news ${i + 1}.`,
          thumbnail: "https://via.placeholder.com/300x150",
          article_url: "#"
        })));
        setApiError("Using mock data due to API error (CORS or network issue).");
      }
    };

    const fetchGiveaways = async () => {
      try {
        const res = await fetch(`${MMOBOMB_API_BASE_URL}/giveaways`);
        if (!res.ok) throw new Error("Failed to fetch giveaways");
        const data = await res.json();
        setGiveaways(data.slice(0, 9));
      } catch (err) {
        console.error("Giveaways fetch error, using mock data", err);
        setGiveaways(Array.from({ length: 9 }, (_, i) => ({
          id: `giveaway-${i}`,
          title: `Mock Giveaway Title ${i + 1}`,
          short_description: `This is a mock description for giveaway ${i + 1}.`,
          thumbnail: "https://via.placeholder.com/300x150",
          giveaway_url: "#"
        })));
        setApiError("Using mock data due to API error (CORS or network issue).");
      }
    };

    fetchNews();
    fetchGiveaways();
  }, []);

  const handleCloseModal = () => setActiveModal("");
  const handleOpenLogin = () => setActiveModal("login");
  const handleOpenRegister = () => setActiveModal("register");

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
            <Route path="/" element={<Main newsData={news} apiError={apiError} />} />
            <Route path="/register" />
            <Route
              path="/news"
              element={
                <NewsPage
                  news={news}
                  giveaways={giveaways}
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
