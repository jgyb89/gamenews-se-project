import Carousel from '../Carousel/Carousel';
import './NewsPage.css';

const NewsPage = ({ news, giveaways, apiError }) => {
  return (
    <div className="news-page">
      {apiError && (
        <div className="news-page__error">
          <p>{apiError}</p>
        </div>
      )}
      <Carousel title="Latest News" items={news} />
      <hr className="news-page__divider" />
      <Carousel title="Live MMO Giveaways" items={giveaways} />
    </div>
  );
};

export default NewsPage;
