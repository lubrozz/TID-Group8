import "../styles/homePage.css";
import LinkButton from "../Components/Shared/LinkButton";

const ExamWelcomePage = () => {
  return (
    <div className="homePage">
      <h2>Technical Interaction Design Exam - Group 8</h2>
      <p>Created by</p>
      <p>Lukas Corlin Østergaard (luoe@itu.dk)</p>
      <p>Magnus Mølgaard Andersen (mande@itu.dk)</p>
      <p>Shi Chen (shic@itu.dk)</p>
      <div className="top">
        <p>
          These buttons direct you to the pages for our two respective users.
        </p>
        <p>
          Please open each of them in separate tabs. Ideally have one of the two
          tabs either in incognito or in a separate browser.
        </p>
        <div className="buttons-container">
          <LinkButton
            styleName={"toProfLoginButton"}
            page={"/prof-login"}
            buttonText={"Go to Professional Login Page"}
          />
          <LinkButton
            styleName={"toProfButton"}
            page={"/child-home"}
            buttonText={"Go to Child home page"}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamWelcomePage;
