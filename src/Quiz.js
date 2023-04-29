import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import "./Quiz.css";
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: [
      { id: 1, answer: "London" },
      { id: 2, answer: "Paris", correct: true },
      { id: 3, answer: "Madrid" },
    ],
  },
  {
    id: 2,
    question: "What is the largest planet in our solar system?",
    options: [
      { id: 1, answer: "Jupiter", correct: true },
      { id: 2, answer: "Saturn" },
      { id: 3, answer: "Earth" },
    ],
  },
  {
    id: 3,
    question: "What is the highest mountain in the world?",
    options: [
      { id: 1, answer: "Mount Kilimanjaro" },
      { id: 2, answer: "Mount Everest", correct: true },
      { id: 3, answer: "Mount Fuji" },
    ],
  },
];

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const handleAnswer = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
    setSelectedOptionId(optionId);
  };

  const handleNextQuestion = () => {
    setSelectedOptionId(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setCurrentQuestion(1);
    setShowResults(false);
  };
  const getIncorrectlyAnsweredQuestions = () => {
    const incorrectQuestions = [];
    for (let i = 0; i < questions.length; i++) {
      const { id, options } = questions[i];
      const answerId = answers[id];
      const selectedOption = options.find((option) => option.id === answerId);
      if (selectedOption && !selectedOption.correct) {
        incorrectQuestions.push({
          ...questions[i],
          selectedOptionId: selectedOption.id,
        });
      }
    }
    return incorrectQuestions;
  };
  const getCorrectAnswersCount = () => {
    let count = 0;
    for (let i = 0; i < questions.length; i++) {
      const { id, options } = questions[i];
      const answerId = answers[id];
      const selectedOption = options.find((option) => option.id === answerId);
      if (selectedOption && selectedOption.correct) {
        count++;
      }
    }
    return count;
  };

  const renderQuiz = () => {
    const currentQuestionData = questions.find(
      (question) => question.id === currentQuestion
    );
    return (
      <Container>
        <h3>{currentQuestionData.question}</h3>
        <FormGroup>
          {currentQuestionData.options.map((option) => (
            <FormGroup check key={option.id}>
              <Label check>
                <Input
                  type="radio"
                  name={`question${currentQuestion}`}
                  value={option.id}
                  onChange={() => handleAnswer(currentQuestion, option.id)}
                  checked={answers[currentQuestion] === option.id}
                />
                <div className={selectedOptionId === option.id ? "selected" : ""}>
                  {option.answer}
                </div>
              </Label>
            </FormGroup>
          ))}
        </FormGroup>
        {currentQuestion < questions.length ? (
          <Button color="primary" onClick={handleNextQuestion}>
            Next Question
          </Button>
        ) : (
          <Button color="success" onClick={handleFinishQuiz}>
            Finish Quiz
          </Button>
        )}
        {!answers[currentQuestion] && (
          <p className="text-danger">Please select an answer.</p>
        )}
      </Container>
    );
  };

  const renderResults = () => {
    const correctlyAnsweredCount = getCorrectAnswersCount();
    const incorrectlyAnsweredQuestions = getIncorrectlyAnsweredQuestions();
    return (
      <Container>
        <h3>
          You got {correctlyAnsweredCount} out of {questions.length} questions
          correct!
        </h3>
        <h4>Incorrectly Answered Questions:</h4>
        {incorrectlyAnsweredQuestions.map((question) => (
          <div key={question.id}>
            <p>{question.question}</p>
            <p style={{ backgroundColor: " #ff000075", color: "" }}>
              {
                question.options.find(
                  (option) => option.id === answers[question.id]
                ).answer
              }
            </p>{" "}
            <p style={{ backgroundColor: "green", color: "" }}>
              {question.options.find((option) => option.correct).answer}
            </p>
          </div>
        ))}
        <Button color="primary" onClick={handleResetQuiz}>
          Start Again
        </Button>
      </Container>
    );
  };

  return (
    <Container>
      <div>
        <h1>Quiz</h1>
        {showResults ? renderResults() : renderQuiz()}
      </div>
    </Container>
  );
};

export default Quiz;
