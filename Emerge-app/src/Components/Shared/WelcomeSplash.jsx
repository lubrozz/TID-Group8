import OldChatButton from "./OldChatButton";
import NewChatButton from "./NewChatbutton";

export default function WelcomeSplash() {
  return (
    <div className="splash-card">
      <div className="center-text" style={{ padding: "25px" }}>
        <div>
          <h3>Welcome</h3>
        </div>
        <div>
          <p>
            This is a safe and private space where you can chat and share your
            thoughts.
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <div>
          <OldChatButton />
        </div>
        <div>
          <NewChatButton />
        </div>
      </div>
    </div>
  );
}
