import { FormEvent, useEffect, useState } from "react";
import "./App.css";

type Teacher = {
  id: number;
  name: string;
  email: string;
};

type Question = {
  id: number;
  category: string;
  question: string;
  answer: string;
  pointValue: number;
  status: string;
  teacher: Teacher;
};

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [pointValue, setPointValue] = useState(1);

  const pointValues = [1,2,3,4,5];
  const categories = [
    "Genesis",
    "Exodus",
    "Vocab",
    "New Testament",
    "Paul",
    "Judges"    
  ];

  async function loadQuestions() {
    const response = await fetch("http://localhost:3000/questions");
    const data = await response.json();
    setQuestions(data);
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await fetch("http://localhost:3000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherName,
        teacherEmail,
        category,
        question,
        answer,
        pointValue,
      }),
    });

    setQuestion("");
    setAnswer("");

    await loadQuestions();
  }

  return (
    <main>
      <h1>Sunday School Jeopardy</h1>

      <section>
        <h2>Add Question</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Teacher name"
            value={teacherName}
            onChange={(event) => setTeacherName(event.target.value)}
          />

          <input
            placeholder="Teacher email"
            value={teacherEmail}
            onChange={(event) => setTeacherEmail(event.target.value)}
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="" disabled>
              Category
            </option>

            {categories.map((categoryName) => (
              <option key={categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </select>

          <input
            placeholder="Question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />

          <input
            placeholder="Answer"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
          />

          <select
            value={pointValue}
            onChange={(event) => setPointValue(Number(event.target.value))}
          >
            {pointValues.map((value) => (
              <option key={value} value={value}>
                {value}
                </option>
            ))}
          </select>

          <button type="submit">Save Question</button>
        </form>
      </section>

      <section>
        <h2>Questions</h2>

        {questions.map((question) => (
          <div key={question.id}>
            <h3>
              {question.category} - {question.pointValue}
            </h3>
            <p>
              <strong>Question:</strong> {question.question}
            </p>
            <p>
              <strong>Answer:</strong> {question.answer}
            </p>
            <p>
              <strong>Teacher:</strong> {question.teacher.name}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
