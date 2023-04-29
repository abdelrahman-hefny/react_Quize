import React, { useState } from 'react';
import { Form, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

function QuestionSystem() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'What is the capital of France?',
      options: [
        { id: 1, option: 'Paris', isCorrect: true },
        { id: 2, option: 'Rome', isCorrect: false },
        { id: 3, option: 'Berlin', isCorrect: false },
        { id: 4, option: 'London', isCorrect: false },
      ],
      selectedOptionId: null,
    },
    {
      id: 2,
      question: 'What is the largest planet in the solar system?',
      options: [
        { id: 1, option: 'Jupiter', isCorrect: true },
        { id: 2, option: 'Mars', isCorrect: false },
        { id: 3, option: 'Venus', isCorrect: false },
        { id: 4, option: 'Mercury', isCorrect: false },
      ],
      selectedOptionId: null,
    },
    {
      id: 3,
      question: 'What is the symbol for gold on the periodic table?',
      options: [
        { id: 1, option: 'Au', isCorrect: true },
        { id: 2, option: 'Ag', isCorrect: false },
        { id: 3, option: 'Cu', isCorrect: false },
        { id: 4, option: 'Pt', isCorrect: false },
      ],
      selectedOptionId: null,
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionChange = (questionIndex, optionId) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].selectedOptionId = optionId;
    setQuestions(newQuestions);
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setShowResults(true);
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleRestart = () => {
    setQuestions(questions.map((q) => ({ ...q, selectedOptionId: null })));
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (q.selectedOptionId !== null && q.options[q.selectedOptionId - 1].isCorrect) {
        score++;
      }
    });
    return score;
  };

  const renderResults = () => {
    const score = calculateScore();
    return (
      <div className="text-center">
        <h2>You scored {score} out of {questions.length}</h2>
        <Button variant="primary" onClick={handleRestart}>Restart Quiz</Button>
      </div>
    );
  };

  const renderQuestion = (question) => {
    const { id, question: questionText, options, selectedOptionId } = question;
    return (
      <div key={id}>
        <h3>{questionText}</h3>
        <Form>
          {options.map((option) => {
            const { id: optionId, option: optionText } = option;
            const isSelected = optionId === selectedOptionId;
            const isCorrect = isSelected && option.isCorrect;
            const isWrong = isSelected && !option.isCorrect;
            return (
              <Form.Check
                key={optionId}
                type="radio"
                label={optionText}
                checked={isSelected}
                onChange={() => handleOptionChange(currentQuestionIndex, optionId)}
              >
                {isSelected && (
                  <Badge className="ml-2" variant={isCorrect ? "success" : "danger"}>
                    <FontAwesomeIcon icon={isCorrect ? faCheck : faTimes} />
                  </Badge>
                )}
              </Form.Check>
            );
          })}
        </Form>
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="text-center mb-5">Question System</h1>
      {showResults ? renderResults() : renderQuestion(questions[currentQuestionIndex])}
      {!showResults && <Button variant="primary" onClick={handleNext}>Next Question</Button>}
    </div>
  );
}

export default QuestionSystem;




