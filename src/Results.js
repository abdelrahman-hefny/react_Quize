import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Results = (props) => {
  const { correctAnswers, totalQuestions } = props;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const stars = Array.from({ length: Math.round(correctAnswers / 2) }, (_, index) => (
    <FontAwesomeIcon key={index} icon={faStar} />
  ));

  return (
    <div className="results">
      <h2>Results</h2>
      <p>{`You got ${correctAnswers} out of ${totalQuestions} questions correct.`}</p>
      <p>{`Percentage: ${percentage}%`}</p>
      <div className="stars">{stars}</div>
    </div>
  );
};

export default Results;
