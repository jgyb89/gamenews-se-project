import './Card.css';

const Card = ({ item }) => {
  const linkUrl = item.article_url || item.giveaway_url || "#";

  return (
    <article className="card">
      <a href={linkUrl} target="_blank" rel="noreferrer" className="card__link">
        <img className="card__image" src={item.thumbnail} alt={item.title} />
        <div className="card__content">
          <h3 className="card__title">{item.title}</h3>
          <p className="card__description">{item.short_description}</p>
        </div>
      </a>
    </article>
  );
};

export default Card;
