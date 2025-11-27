import "../styles/homePage.css";
import WelcomeSplash from "../Components/Shared/WelcomeSplash";
import LinkButton from "../Components/Shared/LinkButton";
import { useState } from "react";
import OldChatModal from "../Components/Shared/OldChatModal";

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="container">
      <div className="homePage">
        <div className="top">
          <div className="texts">
            <h2>A provisional landing page for the child's point of view</h2>
          </div>

          <div className="buttons-container">
            <LinkButton
              styleName={"toProfButton"}
              page={"/prof-chat"}
              buttonText={"Go to Professional Chat"}
            />
            <LinkButton
              styleName={"toProfLoginButton"}
              page={"/prof-login"}
              buttonText={"Got to Professional Login Page"}
            />
          </div>
        </div>
        <div className="center">
          <WelcomeSplash onOldChatClick={() => setModalOpen(true)} />

          <OldChatModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
};

export default HomePage;
