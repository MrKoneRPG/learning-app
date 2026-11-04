import { useState, useEffect } from "react";
import LearningEntry from "./components/LearningEntry";
import type { LearningEntryData } from "./types/LearningEntryData";
import './App.css';


 function App() {
  const studentName: string = "Atte Huotari";

 
const [serverEntries, setServerEntries] = useState<LearningEntryData[]>([]);
const [loadError, setLoadError] = useState("");
const [message, setMessage] = useState("");
async function loadServerEntries() {
  setLoadError("");

  try {
    const response = await fetch(
      "http://localhost:3001/api/entries"
    );

    if (!response.ok) {
      throw new Error("Could not load entries");
    }

    const data: LearningEntryData[] =
      await response.json();

    setServerEntries(data);
  } catch (error) {
    setLoadError(
      "Could not connect to the backend."
    );

    throw error;
  }
}
async function handleAddEntry() {
  setMessage("");

  if (
    topic.trim() === "" ||
    learned.trim() === "" ||
    coffein.trim() === "" ||
    confidence < 1 ||
    confidence > 5
  ) {
    setMessage("Täytäs kohdat oikein :D");
    return;
  }

  const newEntry = {
    topic,
    date,
    learned,
    confidence,
    category: coffein,
  };

  try {
    const response = await fetch(
      "http://localhost:3001/api/entries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      }
    );

    if (!response.ok) {
      throw new Error();
    }
  } catch {
    setMessage("Tallennus epäonnistui.");
    return;
  }

  setTopic("");
  setDate("");
  setLearned("");
  setConfidence(1);
  setCoffein("");

  try {
    await loadServerEntries();
    setMessage("Merkintä tallennettu.");
  } catch {
    setMessage(
      "Merkintä tallennettiin mutta listaa ei voitu päivittää."
    );
  }
}
const [topic, setTopic] = useState("");
const [date, setDate] = useState("");
const [learned, setLearned] = useState("");
const [confidence, setConfidence] = useState(1);
const [coffein, setCoffein] = useState("");
useEffect(() => {
  let ignore = false;

  async function loadInitialEntries() {
    try {
      const response = await fetch(
        "http://localhost:3001/api/entries"
      );

      if (!response.ok) {
        throw new Error("Could not load entries");
      }

      const data: LearningEntryData[] =
        await response.json();

      if (!ignore) {
        setServerEntries(data);
      }
    } catch {
      if (!ignore) {
        setLoadError(
          "Could not load entries from backend."
        );
      }
    }
  }

  void loadInitialEntries();

  return () => {
    ignore = true;
  };
}, []);

  return (
    <main>
      <h1>My Learning</h1>
      <p>Fullstack Project</p>
      <p>Student: {studentName}</p>

    {serverEntries.map((entry) => (
      <LearningEntry
      key={entry.id}
      entry={entry}
      />
    ))}

    <form>
      <div>
        <label htmlFor="topic">Topic</label>
        <input id="topic" value={topic} onChange={(event) => setTopic(event.target.value)}/>
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input id="date" value={date} onChange={(event) => setDate(event.target.value)}/>
      </div>
      <div>
        <label htmlFor="learned">Mitä opit</label>
        <textarea id="learned" value={learned} onChange={(event) => setLearned(event.target.value)}/>
      </div>
      <div>
        <label htmlFor="confidence">Confidence</label>
        <input id="confidence" type="number" min="1" max="5" value={confidence} onChange={(event) => setConfidence(Number(event.target.value))}/>
      </div>
      <div>
      <label htmlFor="coffein">Koffeinin käyttö</label>
        <textarea id="coffein" value={coffein} onChange={(event) => setCoffein(event.target.value)}/>
      </div>
      <button type="button" onClick={handleAddEntry}>Lisää osio</button>

    </form>
<section>
  <h2>Entries from the backend</h2>
  <button type="button" onClick={loadServerEntries}>
    Load from backend
  </button>
  <button type="button" onClick={handleAddEntry}>
  Lisää osio
</button>

{message && <p>{message}</p>}
  {loadError && <p>{loadError}</p>}
  <ul>
    {serverEntries.map((entry) => (
      <li key={entry.id}>{entry.topic}</li>
    ))}
  </ul>

</section>
    </main>
  );
}


export default App;

