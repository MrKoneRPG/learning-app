type LearningEntryProps = {
  topic: string;
  date: string;
  learned: string;
  confidence: number;
  coffein: string;
};

function LearningEntry({ topic,date,learned,confidence,coffein, }: LearningEntryProps) {
  return (
    <article>
      <h2>{topic}</h2>
      <p>Date: {date}</p>
      <p>{learned}</p>
      <p>Confidence: {confidence} / 5</p>
      <p>How much coffein intake: {coffein}</p>
    </article>
  );
}

export default LearningEntry;