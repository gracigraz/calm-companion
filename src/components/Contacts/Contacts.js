import "./Contacts.scss";

function Contacts() {
  const handleCall = () => {
    window.location.href = "tel:911";
  };
  return (
    <div className="contacts">
      <h4>
        Just jot down the names and phone numbers of people like friends,
        family, professionals, or anyone else you could get in touch with in
        case of a crisis!
      </h4>
      <div className="contacts__container" onClick={handleCall}>
        <div className="contacts__avatar"></div>
        <p className="contacts__nickname"></p>
      </div>
      <input placeholder="Name" />
      <input placeholder="Phone Number" />
      <button>+ Add Help</button>
    </div>
  );
}
export default Contacts;
