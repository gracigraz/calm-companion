import "./Contacts.scss";

function Contacts() {
  const handleCall = () => {
    window.location.href = "tel:911";
  };
  return (
    <div className="contacts">
      <div className="contacts__container" onClick={handleCall}>
        <div className="contacts__avatar"></div>
        <p className="contacts__nickname"></p>
      </div>
    </div>
  );
}
export default Contacts;
