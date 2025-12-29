import "../styles/homePage.css";
import WelcomeSplash from "../Components/Shared/WelcomeSplash";

const HomePage = () => {
  return (
    <div className="container">
      <div className="homePage">
        <div className="center">
          <WelcomeSplash />
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
};

export default HomePage;
