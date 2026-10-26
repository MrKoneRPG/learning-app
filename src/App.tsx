import { useState } from "react";
import LearningEntry from "./components/LearningEntry";
import type { LearningEntryData } from "./types/LearningEntryData";
import './App.css';

function App() {
  const studentName: string = "Atte Huotari";


  const initialEntries: LearningEntryData[] = [
  {
  id: 1,      
  topic:"React Components",
  date:"2026-10-19",
  learned:"Components help divide the UI into reusable parts.",
  confidence:3,
  coffein:"Ei tarpeeksi",
  },
  { 
  id: 2,
  topic:"NPM toimintaan",
  date:"2026-10-21",
  learned:"Miten saa NPM asennettua",
  confidence:4,
  coffein:"5 kuppia kahvia",
  },
];

function handleAddEntry(){
  if(
    topic.trim() === "" || learned.trim() === "" ||
    confidence < 1 || confidence > 5

  )
  {
    alert("Täytäs kohdat oikein:D");
    return;
  }

  const newEntry : LearningEntryData = {
    id: Date.now(),
    topic,
    date,
    learned,
    confidence,
    coffein,
  };

  setEntries((currentEntries) => [
    ...currentEntries,
    newEntry,
  ]);

  setTopic("");
  setDate("");
  setLearned("");
  setConfidence(1);
  setCoffein("");
}
const [topic, setTopic] = useState("");
const [date, setDate] = useState("");
const [learned, setLearned] = useState("");
const [confidence, setConfidence] = useState(1);
const [coffein, setCoffein] = useState("");
const [entries, setEntries] =
  useState<LearningEntryData[]>(initialEntries);

  return (
    <main>
      <h1>My Learning</h1>
      <p>Fullstack Project</p>
      <p>Student: {studentName}</p>

    {entries.map((entry) => (
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

    </main>
  );
}


export default App;

