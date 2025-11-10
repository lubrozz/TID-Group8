import "../homePage.css";
import WelcomeSplash from "../Components/Shared/WelcomeSplash";
import NavigateButton from "../Components/Shared/NavigateButton";

const HomePage = () => {
  return (
    <div className="container">
      <div className="homePage">
        <div className="top">
          <div className="texts">
            <h2>A provisional landing page for the child's point of view</h2>
          </div>
          <NavigateButton
            styleClass="toProfButton"
            page="/prof-chat"
            buttonText="Go to Professional Chat"
          />
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
