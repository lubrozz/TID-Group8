import "../../homePage.css";

import NavigateButton from "./NavigateButton";

export default function WelcomeSplash() {
  return (
    <div className="centerSplash">
      <div className="headerWrapper">
        <h1 className="mainHeader">Welcome</h1>
        <h2 className="subHeader">
          This is a safe and private space where you can chat and share your
          thoughts.
        </h2>
      </div>
      <div className="buttonWrapper">
        <NavigateButton
          styleClass="oldChatButton"
          page="/new-child-chat"
          buttonText="Old chat"
          buttonIcon={<span>&#10560;</span>}
        />
        <NavigateButton
          styleClass="newChatButton"
          page="/new-child-chat"
          buttonText="New Chat"
          buttonIcon={<span>&#10140;</span>}
        />
      </div>
    </div>
  );
}
