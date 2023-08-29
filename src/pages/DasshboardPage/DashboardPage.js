import Chat from "../../components/Chat/Chat";
import "./DashboardPage.scss";

function DashboardPage() {
  return (
    <>
      <main className="dashboard">
        <h1 className="dashboard__title">Hey Friend! </h1>
        <div className="dashboard__container">
          <h4 className="dashboard__error">How are you today?!</h4>
          <Mood />
        </div>
      </main>
    </>
  );
}

export default DashboardPage;
