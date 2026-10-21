import LearningEntry from "./components/LearningEntry";


function App() {
  const studentName: string = "Atte Huotari";

  return (
    <main>
      <h1>My Learning</h1>
      <p>Fullstack Project</p>
      <p>Student: {studentName}</p>

      <LearningEntry
  topic="React Components"
  date="2026-10-19"
  learned="Components help divide the UI into reusable parts."
  confidence={3}
  coffein="Ei tarpeeksi"
/>
<LearningEntry
  topic="NPM toimintaan"
  date="2026-10-21"
  learned="Miten saa NPM asennettua"
  confidence={4}
  coffein="5 kuppia kahvia"
/>
    </main>
  );
}


export default App;