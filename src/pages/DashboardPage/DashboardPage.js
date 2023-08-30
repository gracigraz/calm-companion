import Mood from "../../components/Mood/Mood";
import Toolkit from "../../components/Toolkit/Toolkit";
import AbcQuestionnaire from "../../components/AbcQuestionnaire/AbcQuestionnaire";

function DashboardPage() {
  return (
    <>
      <main className="dashboard">
        <h1 className="dashboard__title">Hey Friend! </h1>
        <div className="dashboard__container">
          <h4 className="dashboard__error">How are you today?!</h4>
          <h4>Test</h4>
          {/* <Mood />
          <Toolkit /> */}
          {/* <AbcQuestionnaire /> */}
        </div>
      </main>
    </>
  );
}

export default DashboardPage;
