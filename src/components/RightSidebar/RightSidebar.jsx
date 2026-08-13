import "./RightSidebar.css";
import Preloader from "../Preloader/Preloader";

const RightSidebar = ({ newsData, isLoading, apiError }) => {
  // Slice to get top 4 articles
  const topNews = newsData.slice(0, 4);

  return (
    <aside className="right-sidebar">
      <h2 className="right-sidebar__title">Latest News</h2>
      {isLoading ? (
        <Preloader />
      ) : apiError ? (
        <p className="right-sidebar__error">{apiError}</p>
      ) : (
        <ul className="right-sidebar__list">
          {topNews.map((news) => (
            <li key={news.id} className="right-sidebar__item">
              <a
                href={news.article_url}
                target="_blank"
                rel="noreferrer"
                className="right-sidebar__link"
              >
                <div className="right-sidebar__thumbnail-container">
                  <img
                    src={news.thumbnail}
                    alt={news.title}
                    className="right-sidebar__thumbnail"
                  />
                </div>
                {news.date && (
                  <span className="right-sidebar__date">
                    {new Date(news.date).toLocaleDateString("en-US") !==
                    "Invalid Date"
                      ? new Date(news.date).toLocaleDateString("en-US")
                      : news.date}
                  </span>
                )}
                <h3 className="right-sidebar__item-title">{news.title}</h3>
              </a>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default RightSidebar;
