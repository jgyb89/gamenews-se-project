import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({ handleLogout }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <div className="profile__sidebar">
        <img
          className="profile__avatar"
          src={currentUser?.avatar || "https://via.placeholder.com/100"}
          alt="User Avatar"
        />
        <p className="profile__name">{currentUser?.name || "User"}</p>

        {/* Attach the handleLogout function to the onClick event */}
        <button className="profile__logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className="profile__content">
        {/* User's posts/items will go here */}
        <h2>My Items</h2>
        <p>No items found.</p>
      </div>
    </div>
  );
}

export default Profile;
