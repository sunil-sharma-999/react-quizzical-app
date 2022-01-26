import { createContext } from 'react';

const QuizContext = createContext({
  newData: [],
  results: [],
  getNewData: null,
  getResults: null,
  loading: true,
});

export default QuizContext;
