import { useState } from 'react';
import Questions from './components/Questions';
import QuizProvider from './store/QuizProvider';

export default function App() {
  const [page, setpage] = useState(1);
  return (
    <QuizProvider>
      <main className="App">
        <div className="wrap">
          {page === 1 ? (
            <div className="start-page">
              <h1 className="brand">Quizzical</h1>
              <p className="text">Check Your Knowledge! </p>
              <button onClick={() => setpage(2)}>Start Quiz</button>
            </div>
          ) : (
            <Questions />
          )}
        </div>
      </main>
    </QuizProvider>
  );
}
