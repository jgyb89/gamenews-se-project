const NewsCard = ({ news }) => {
  return (
    <li className="news-card">
      <article className="news-card__article">
        <a href={news.article_url} target="_blank" rel="noreferrer" className="news-card__link">
          <img src={news.thumbnail} alt={news.title} className="news-card__thumbnail" />
          <h2 className="news-card__title">{news.title}</h2>
          <p className="news-card__description">{news.short_description}</p>
        </a>
      </article>
    </li>
  );
};

export default NewsCard;
