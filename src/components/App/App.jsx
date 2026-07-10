import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

import "./App.css";
import Main from "../Main/Main";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  
  // Initialize mock state as empty arrays per rubric
  const [newsItems, setNewsItems] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleOpenLogin = () => {
    setActiveModal("login");
  };

  return (
    <div className="page">
      <Sidebar isLoggedIn={false} handleOpenModal={handleOpenLogin} />
      <div className="page__content">
        <Header />
      <RegisterModal 
        isOpen={activeModal === "register"}
        onClose={handleCloseModal}
        onRegister={console.log}
      />
      <LoginModal 
        isOpen={activeModal === "login"}
        onClose={handleCloseModal}
        onLogin={console.log}
      />
      <Navigation>
        <Routes>
          <Route path="/" />
          <Route path="/register" />
        </Routes>
      </Navigation>
      <Main />
      <Footer />
      </div>
    </div>
  );
}

export default App;
