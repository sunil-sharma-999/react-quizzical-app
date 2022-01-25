import React, { useEffect } from 'react';
import { useState } from 'react';
import Options from './Options';
import Footer from './Footer';

const Questions = ({ data, setsubmission, results, setplay }) => {
  const [newData, setnewData] = useState();
  const btnClickHandler = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      document
        .querySelectorAll('input[type="radio"]')
        .forEach((b) => (b.disabled = false));
      document.querySelector('form').reset();
      setplay((prev) => !prev);
      setnewData(null);
    } else {
      const form = new FormData(e.target.parentElement.parentElement);
      setsubmission(
        newData.map((d) => {
          return { id: d.id, answer: form.get(`q${d.id}`) };
        }),
      );
      document
        .querySelectorAll('input[type="radio"]')
        .forEach((b) => (b.disabled = true));
    }
  };

  useEffect(() => {
    setnewData(
      data.map((q, i) => {
        const randIndex = Math.floor(Math.random() * 4);
        const options = q.incorrect_answers;
        options.splice(randIndex, 0, q.correct_answer);
        return {
          id: i + 1,
          options,
          question: q.question,
          answer: q.correct_answer,
        };
      }),
    );
  }, [data]);

  const convert = (str) => {
    return str
      .replace(/&amp;/g, '&')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&#039;/g, "'")
      .replace(/&quot;/g, '"');
  };

  return (
    <>
      <a
        className="q-link"
        href="https://linktr.ee/Sunil.sharma.9"
        target="_blank"
        rel="noopener noreferrer">
        <h1 className="brand">Quizzical</h1>
      </a>
      {newData ? (
        <form className="quiz-wrap">
          {newData.map((quiz, quizIndex) => {
            return (
              <React.Fragment key={quiz.id}>
                <div className="quiz" name={`quiz${quiz.id}`}>
                  <p className="q">{`${quiz.id}) ` + convert(quiz.question)}</p>
                  <Options
                    result={results[quizIndex]}
                    convert={convert}
                    quiz={quiz}
                    quizIndex={quizIndex}
                  />
                </div>
                <hr />
              </React.Fragment>
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
