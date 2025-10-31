import "../homePage.css";
import ToProfButton from "../Components/Shared/ToProfButton";
import WelcomeSplash from "../Components/Shared/WelcomeSplash";

const HomePage = () => {
  return (
    <div className="container">
      <div className="homePage">
        <div className="top">
          <div className="texts">
            <h2>A provisional landing page for the child's point of view</h2>
          </div>
          <ToProfButton />
        </div>
        <div className="center">
          <WelcomeSplash />
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
};

export default HomePage;
