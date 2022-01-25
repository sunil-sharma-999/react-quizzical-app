import { useEffect, useState } from 'react';
import Questions from './components/Questions';

export default function App() {
  const [data, setData] = useState();
  const [page, setpage] = useState(1);
  const [submission, setsubmission] = useState([]);
  const [results, setResults] = useState([]);
  const [play, setplay] = useState(0);

  useEffect(() => {
    if (submission.length > 0) {
      setResults(
        data.map((d, index) => {
          return {
            bool: d.correct_answer === submission[index].answer,
            answer: d.correct_answer,
          };
        }),
      );
    }
  }, [submission, data]);

  useEffect(() => {
    setsubmission([]);
    setResults([]);

    fetch(
      'https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy&category=31',
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      })
      .catch((err) => setData(err));
  }, [play]);

  return (
    <main className="App">
      <div className="wrap">
        {page === 1 ? (
          <div className="start-page">
            <h1 className="brand">Quizzical</h1>
            <p className="text">Check Your Knowledge! </p>
            <button onClick={() => setpage(2)}>Start Quiz</button>
          </div>
        ) : (
          data && (
            <Questions
              data={data}
              setsubmission={setsubmission}
              results={results}
              setResults={setResults}
              setplay={setplay}
            />
          )
        )}
      </div>
    </main>
  );
}
