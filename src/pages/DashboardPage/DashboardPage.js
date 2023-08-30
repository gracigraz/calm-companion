import Mood from "../../components/Mood/Mood";
import Toolkit from "../../components/Toolkit/Toolkit";
import AbcQuestionnaire from "../../components/AbcQuestionnaire/AbcQuestionnaire";
import Nav from "../../components/Nav/Nav";

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
          {/* <AbcQuestionnaire /> */}
        </div>
      </main>
      <Nav />
    </>
  );
}

export default DashboardPage;
