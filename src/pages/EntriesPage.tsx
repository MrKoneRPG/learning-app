import { useEffect, useState } from "react";
import { useLearningStore } from "../store/userLearningStore";
import LearningEntry from "../components/LearningEntry";
import { loadEntries } from "../api/entries";


export default function EntriesPage() {
  const serverEntries = useLearningStore((state) => state.entries);
  

  const [loadError, setLoadError] = useState("");
  const [message, setMessage] = useState("");

  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [learned, setLearned] = useState("");
  const [confidence, setConfidence] = useState(1);
  const [coffein, setCoffein] = useState("");


  
  async function handleAddEntry() {
    setMessage("");

   if (
    topic.trim() === "" ||
    learned.trim() === "" ||
    coffein.trim() === "" ||
    confidence < 1 ||
    confidence > 5
  ) {
    setMessage("Täytä kaikki kentät.");
    return;
  }

  const newEntry = {
    topic,
    date,
    learned,
    confidence,
    coffein,
  };

    try {
      const response = await fetch("http://localhost:3001/api/entries",
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

      await loadEntries();

      setMessage("Entry saved.");

      setTopic("");
      setDate("");
      setLearned("");
      setConfidence(1);
      setCoffein("");

    } catch {
      setMessage("Saving failed.");
    }
  }

  useEffect(() => {
  async function fetchData() {
    try {
      await loadEntries();
    } catch {
      setLoadError("Could not connect to backend.");
    }
  }

  fetchData();
}, []);


  return (
    <main>
      <h1>Learning Entries</h1>

      {serverEntries.map((entry) => (
        <LearningEntry
          key={entry.id}
          entry={entry}
        />
      ))}

      <form>
        <div>
            <label>Topic</label>
        <input
          value={topic}
          onChange={(e) =>
            setTopic(e.target.value)
          }
          placeholder="Topic"
        />
        </div>

          <div>
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
          </div>

          <div>
            <label>Mitä opin?</label>
            <textarea value={learned}  onChange={(e) => setLearned(e.target.value)}/>
          </div>

          <div>
            <label>Confidence</label>
            <input type="number" min="1" max="5" value={confidence} 
            onChange={(e) => setConfidence(Number(e.target.value))}/>
          </div>

          <div>
            <label>Coffein</label>
            <textarea value={coffein} onChange={(e) => setCoffein(e.target.value)}/>
          </div>
        <button
          type="button"
          onClick={handleAddEntry}
        >
          Add Entry
        </button>
      </form>

      {message && <p>{message}</p>}
      {loadError && <p>{loadError}</p>}
    </main>
  );
}
