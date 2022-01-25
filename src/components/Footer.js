import React from 'react';

const Footer = ({ results, btnClickHandler }) => {
  return (
    <div className="score-wrap">
      {results.length > 0 && (
        <p className="score">
          You scored {results.filter((r) => r.bool).length} correct answers
        </p>
      )}
      <button onClick={btnClickHandler}>
        {results.length > 0 ? 'Play Again' : 'Check Your Answers'}
      </button>
    </div>
  );
};

export default Footer;
