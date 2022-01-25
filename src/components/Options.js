import React from 'react';
import { nanoid } from 'nanoid';

const Options = ({ result, quiz, convert }) => {
  return (
    <div className="options">
      {quiz.options.map((option, optionIndex) => {
        const nano = nanoid();
        return (
          <div className="option" key={optionIndex}>
            <input
              type="radio"
              name={`q${quiz.id}`}
              id={nano}
              defaultValue={option}
              required={true}
            />
            <label
              className={`label ${
                result ? (option === result.answer ? 'true' : 'false rest') : ''
              }`}
              htmlFor={nano}>
              {convert(option)}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Options;
