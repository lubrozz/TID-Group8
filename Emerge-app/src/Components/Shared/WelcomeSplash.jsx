import "../../homePage.css";

import OldChatButton from "./OldChatButton";
import NewChatButton from "./NewChatbutton";

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
        <OldChatButton />
        <NewChatButton />
      </div>
    </div>
  );
}
