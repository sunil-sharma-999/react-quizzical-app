import { Fragment, useContext } from 'react';
import Options from './Options';
import Footer from './Footer';
import QuizContext from '../store/quiz-context';

const Questions = () => {
  const { newData, results, getResults, getNewData, loading } =
    useContext(QuizContext);

  const btnClickHandler = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      document
        .querySelectorAll('input[type="radio"]')
        .forEach((b) => (b.disabled = false));
      document.querySelector('form').reset();
      getNewData();
    } else {
      const form = new FormData(e.target.parentElement.parentElement);
      getResults(
        newData.map((d) => {
          return { id: d.id, answer: form.get(`q${d.id}`) };
        }),
      );

      document
        .querySelectorAll('input[type="radio"]')
        .forEach((b) => (b.disabled = true));
    }
  };

  console.log(loading);
  return (
    <>
      <a
        className="q-link"
        href="https://linktr.ee/Sunil.sharma.9"
        target="_blank"
        rel="noopener noreferrer">
        <h1 className="brand">Quizzical</h1>
      </a>
      {!loading ? (
        <form className="quiz-wrap">
          {newData.map((quiz, quizIndex) => {
            return (
              <Fragment key={quiz.id}>
                <div className="quiz" name={`quiz${quiz.id}`}>
                  <p className="q">{`${quiz.id}) ` + quiz.question}</p>
                  <Options
                    result={results[quizIndex]}
                    quiz={quiz}
                    quizIndex={quizIndex}
                  />
                </div>
                <hr />
              </Fragment>
            );
          })}
          <Footer results={results} btnClickHandler={btnClickHandler} />
        </form>
      ) : (
        <h4>loading...</h4>
      )}
    </>
  );
};

export default Questions;
