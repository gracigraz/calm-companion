import "./NotFoundPage.scss";
import Nav from "../../components/Nav/Nav";

function NotFoundPage() {
  return (
    <>
      <main className="not-found">
        <div className="not-found__round-container">
          <h1 className="not-found__error">404</h1>
        </div>
        <p className="not-found__message">
          Can't find what you're looking for, sorry! Don't worry thought,
          everything is STILL AWESOME
        </p>
      </main>
      <Nav />
    </>
  );
}

export default NotFoundPage;
