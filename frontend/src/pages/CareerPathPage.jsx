import React, {useState} from "react";

import { submitSurvey } from "../services/plannerService";

const surveySteps = [
  {
    step: 1,
    question: "What is your favorite subject?",
    name: "favoriteSubject"
  },
  {
    step: 2,
    question: "What is your favorite hobby?",
    name: "favoriteHobby"
  },
  {
    step: 3,
    question: "What are you passionate about?",
    name: "passion"
  }
];
const totalSteps = surveySteps.length;

function CareerPathPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting these answers:", answers);

    try {
      const recommendations = await submitSurvey(answers);
      console.log("Received recommendations:", recommendations);
      alert("Survey submitted successfully! Check the console for results.");
    } catch (error) {
      console.error("Failed to submit Survey:", error);
      alert("Failed to submit survey. See console for details.");
    }
  };

  const currentQuestion = surveySteps.find(step => step.step === currentStep);








































































































































  
  return (
    <div>
      <h1>Career Planner Survey</h1>
      <p>Step {currentStep} of {totalSteps}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>{currentQuestion.question}</label>
          <input
            type="text"
            name={currentQuestion.name}
            value={answers[currentQuestion.name] || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          {currentStep > 1 && (
            <button type="button" onClick={handlePrev}>Previous</button>
          )}

          {currentStep < totalSteps ? (
            <button type="button" onClick={handleNext}>Next</button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>

      </form>
    </div>
  );
}

export default CareerPathPage;