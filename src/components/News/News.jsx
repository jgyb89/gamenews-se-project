import "./News.css";
import Preloader from "../Preloader/Preloader";
import NewsCard from "./NewsCard";

const News = ({ newsData, isLoading, apiError }) => {
  return (
    <section className="news">
      <h1 className="news__title">All MMO News</h1>
      {isLoading ? (
        <Preloader />
      ) : apiError ? (
        <p className="news__error">{apiError}</p>
      ) : (
        <ul className="news__list">
          {newsData.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default News;
