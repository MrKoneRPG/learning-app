import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

const entries = [
  {
    topic: "React Components",
    date: "2026-10-20",
    learned: "How props work",
    confidence: 4
  },
  {
    topic: "TypeScript",
    date: "2026-10-21",
    learned: "Using interfaces and types",
    confidence: 5
  },
  {
    topic: "Express",
    date: "2026-10-22",
    learned: "Creating API routes",
    confidence: 3
  }
];

app.get("/entries", (_req, res) => {
  res.json(entries);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});