import React, { useCallback, useEffect, useReducer } from 'react';
import QuizContext from './quiz-context';

const convert = (str) => {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"');
};
const deafultQuizState = { newData: [], results: [] };
const quizReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case 'ADD_QUIZ':
      return { newData: action.payload, results: [] };
    case 'LOADING':
      return { ...state, loading: action.payload };

    case 'RESULT':
      return {
        ...state,
        results: state.newData.map((data, index) => {
          return {
            bool: data.answer === action.payload[index].answer,
            answer: data.answer,
          };
        }),
      };
    default:
      return deafultQuizState;
  }
};

const QuizProvider = (props) => {
  const [quizState, dispatchQuizAction] = useReducer(
    quizReducer,
    deafultQuizState,
  );
  const getResults = (submission) => {
    dispatchQuizAction({ type: 'RESULT', payload: submission });
  };
  const getNewData = useCallback(() => {
    dispatchQuizAction({ type: 'LOADING', payload: true });
    fetch(
      'https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy&category=31',
    )
      .then((res) => res.json())
      .then((data) => {
        const newData = data.results.map((quiz, index) => {
          const randIndex = Math.floor(Math.random() * 4);
          const options = quiz.incorrect_answers;
          options.splice(randIndex, 0, quiz.correct_answer);
          return {
            id: index + 1,
            options,
            question: convert(quiz.question),
            answer: convert(quiz.correct_answer),
          };
        });
        dispatchQuizAction({ type: 'ADD_QUIZ', payload: newData });
        dispatchQuizAction({ type: 'LOADING', payload: false });
      })
      .catch((err) => console.log(err));
  }, []);

  const quizContext = {
    newData: quizState.newData,
    results: quizState.results,
    loading: quizState.loading,
    getNewData,
    getResults,
  };

  useEffect(() => {
    getNewData();
  }, [getNewData]);

  return (
    <QuizContext.Provider value={quizContext}>
      {props.children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
