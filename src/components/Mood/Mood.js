import "./Mood.scss";

function Mood() {
  const [mood, setMood] = useState(0);

  const handleMoodChange = (newMood) => {
    setMood(newMood);
  };

  const handleSaveMood = async () => {
    try {
      // Save the mood to Firebase Firestore
      await db.collection("moods").add({
        mood: mood,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log("Mood saved to Firebase:", mood);

      // Reset the mood to 0 after saving
      setMood(0);
    } catch (error) {
      console.error("Error saving mood:", error);
    }
  };

  return (
    <div className="mood">
      <h4 className="mood__title">
        Hey, just so you know – every time you make an entry in your log, you're
        moving a bit closer to feeling awesome again. Keep it up! You got this!
        😉
      </h4>
      <div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${mood}%` }}></div>
        </div>

        <div className="mood__buttons">
          <button onClick={() => handleMoodChange(20)}>Awful</button>
          <button onClick={() => handleMoodChange(40)}>Bad</button>
          <button onClick={() => handleMoodChange(60)}>Fine</button>
          <button onClick={() => handleMoodChange(80)}>Good</button>
          <button onClick={() => handleMoodChange(100)}>Amazing</button>
        </div>

        <button onClick={handleSaveMood}>Save Mood</button>
      </div>
    </div>
  );
}
export default Mood;
