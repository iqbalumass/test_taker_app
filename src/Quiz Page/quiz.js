import React, { useState, useEffect } from 'react';
import { questions } from '../Questions Page/questions';
import { useParams } from 'react-router-dom';
import './quiz.css';
import { useNavigate } from 'react-router-dom';

let nextId=0;
const Quiz = () => {
  const { subject } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [Actualanswer,setActualanswer]=useState([]);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const totalTime = 10 * 60; // 10 minutes for quiz
  const [timer, setTimer] = useState(totalTime);
  const navigate = useNavigate();


  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else if (!isQuizFinished) {
      // If the timer runs out quiz ends
      setIsQuizFinished(true);
    }
  }, [timer, isQuizFinished]);

  const handleAnswerSelection = (choice) => {
    setSelectedAnswer(choice);
  };

  const handleSubmitAnswer = () => {
    // Check the answer only if one is selected
    if (selectedAnswer) {
      setActualanswer([
        ...Actualanswer,
        { id: nextId++, name: selectedAnswer }
      ]);
      if (selectedAnswer === questions[subject][currentQuestionIndex].correctAnswer) {
        setScore(score + 1);
      }
      // Advance to the next question 
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions[subject].length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        setIsQuizFinished(true); // Mark the quiz as finished
      }
      setSelectedAnswer(null); 
    }
  };
   
 if (isQuizFinished) {
    return (
      <div>
        <h1>Quiz Finished!</h1>
        <p>Your score is {score} out of {questions[subject].length}.</p>
        <button onClick={() => navigate('/subjectList')}>Return to Subject List</button>
        <h1>Review Your answers:</h1>
        <div className='grid-container'>
         <div className='grid-item'>
          { questions[subject].map(item => (
        <h6 key={item.Questionnum}>Correct Answer for Question {item.Questionnum} is {item.correctAnswer}</h6>
      ))}
        </div>
        <div className='grid-item'>
        {Actualanswer.map(x => (
          <h6 key={x.id}>Selected Answer for Question {x.id+1} is {x.name}</h6>
        ))}
        </div>
       </div>
      </div>
    );
  }

  if (!questions[subject]) {
    return <div>Subject not found</div>;
  }

  const choiceLabels = ['a', 'b', 'c', 'd']; 

  return (
    <div>
      <h1>{subject} Quiz</h1>
      <div className="question-block">
        <p>
          <strong>Question {currentQuestionIndex + 1}:</strong>
          {` ${questions[subject][currentQuestionIndex].question}`}
        </p>
        <ol className="choices-list">
          {questions[subject][currentQuestionIndex].choices.map((choice, index) => (
            <li key={index} className="choice-item">
              <button
                className={`choice-button ${selectedAnswer === choice ? 'selected' : ''}`}
                onClick={() => handleAnswerSelection(choice)}
              >
                <span className="choice-label">{choiceLabels[index]}</span> {choice}
              </button>
            </li>
          ))}
        </ol>
        <button className="submit-button" onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
          Submit
        </button>
        <p>Total time remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')} minutes</p>
      </div>
    </div>
  );
};

export default Quiz;
