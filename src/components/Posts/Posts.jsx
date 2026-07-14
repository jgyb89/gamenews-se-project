import { useState } from "react";
import "./Posts.css";
// We can use a mock avatar and placeholder image to match the mockup
import bethesdaAvatar from "../../assets/gamenews-logo-white.svg"; 

const mockPosts = [
  {
    id: 1,
    avatar: bethesdaAvatar, // or any placeholder
    username: "bethesdagamestudios",
    gameTitle: "Indiana Jones",
    media: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1200", 
    description: "Uncover one of history's greatest mysteries in Indiana Jones and the Great Circle™, a first-person, single-player adventure set between the events of Raiders of the Lost Ark™ and The Last Crusade™. The year is 1937, sinister forces are scouring the globe for the secret to an ancient power connected to the Great Circle, and only one person can stop them - Indiana Jones.",
  },
  {
    id: 2,
    avatar: bethesdaAvatar,
    username: "bethesdagamestudios",
    gameTitle: "Starfield",
    media: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=1200", 
    description: "Explore the stars in our biggest update yet. Dive into new uncharted territories and uncover the mysteries of the universe in Starfield's latest expansion. This update brings massive performance improvements, new storylines, and a fully revamped crafting system.",
  }
];

const Post = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Truncate logic
  const characterLimit = 100;
  const shouldTruncate = post.description.length > characterLimit;
  const displayText = !isExpanded && shouldTruncate 
    ? post.description.substring(0, characterLimit) 
    : post.description;

  return (
    <article className="post">
      <header className="post__header">
        <div className="post__header-left">
          <div className="post__avatar-container">
            <img src={post.avatar} alt={post.username} className="post__avatar" />
          </div>
          <div className="post__header-info">
            <h3 className="post__username">{post.username}</h3>
            <p className="post__game-title">{post.gameTitle}</p>
          </div>
        </div>
        <button className="post__settings-button" type="button">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      <div className="post__media-container">
        <img src={post.media} alt={`${post.gameTitle} media`} className="post__media" />
      </div>

      <div className="post__actions">
        <div className="post__actions-left">
          <button className="post__action-button" type="button">
            <span className="material-symbols-outlined">favorite</span>
          </button>
          <button className="post__action-button" type="button">
            <span className="material-symbols-outlined">chat_bubble</span>
          </button>
          <button className="post__action-button" type="button">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
        <button className="post__action-button" type="button">
          <span className="material-symbols-outlined">bookmark</span>
        </button>
      </div>

      <div className="post__description">
        <p className="post__description-text">
          {displayText}
          {shouldTruncate && !isExpanded && (
            <span 
              className="post__description-more" 
              onClick={() => setIsExpanded(true)}
            >
              {" ...more"}
            </span>
          )}
          {shouldTruncate && isExpanded && (
            <span 
              className="post__description-less" 
              onClick={() => setIsExpanded(false)}
            >
              {" show less"}
            </span>
          )}
        </p>
      </div>
      
      <hr className="post__divider" />
    </article>
  );
};

const Posts = () => {
  return (
    <div className="posts-feed">
      {mockPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
