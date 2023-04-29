import React, { useState } from 'react';

const Question = (props) => {

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const { question, answers, onAnswerSelected } = props;

    const handleAnswerSelected = (answer) => {
        setSelectedAnswer(answer);
        onAnswerSelected(answer);
    };

    return (
        <div className="question">
            <h2>{question}</h2>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index} onClick={() => handleAnswerSelected(answer)}>
                        {answer}
                    </li>
                ))}
            </ul>
            {selectedAnswer && (
                <button className="next" onClick={() => setSelectedAnswer(null)}>
                    Next
                </button>
            )}
        </div>
    );
};

export default Question;
