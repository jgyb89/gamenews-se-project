import "./Main.css";
import Posts from "../Posts/Posts";
import RightSidebar from "../RightSidebar/RightSidebar";

const Main = ({ newsData, isLoading, apiError }) => {
  return (
    <main className="main-content">
      <div className="main-content__posts">
        <Posts />
      </div>
      <div className="main-content__right-sidebar">
        <RightSidebar newsData={newsData} isLoading={isLoading} apiError={apiError} />
      </div>
    </main>
  );
};

export default Main;
