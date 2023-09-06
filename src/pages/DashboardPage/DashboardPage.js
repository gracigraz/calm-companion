import Mood from "../../components/Mood/Mood";
import Toolkit from "../../components/Toolkit/Toolkit";
import Nav from "../../components/Nav/Nav";
import "./DashboardPage.scss";

function DashboardPage() {
  return (
    <>
      <main className="dashboard">
        <h1 className="dashboard__title">Hey Friend! </h1>
        <div className="dashboard__container">
          <p className="dashboard__intro">
            Just so you know – every time you make an entry in your log, you're
            moving a bit closer to feeling awesome again. You got this! 😉
          </p>
          <Mood />
          <Toolkit />
        </div>
      </main>
      <Nav />
    </>
  );
}

export default DashboardPage;
