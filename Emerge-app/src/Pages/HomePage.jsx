import ToProfButton from "../Components/Shared/ToProfButton";
import WelcomeSplash from "../Components/Shared/WelcomeSplash";

const HomePage = () => {
  return (
    <>
      <body
        className="child-splash-bg"
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header className="child-splash-bg">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            <div style={{ verticalAlign: "middle" }}>
              <h2>A provisional landing page for the child's point of view</h2>
            </div>
            <ToProfButton />
          </div>
        </header>
        <main>
          <WelcomeSplash />
        </main>
      </body>
    </>
  );
};

export default HomePage;
