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
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #f7fafc 0%, #eef2f7 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "640px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow:
          "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
        padding: "28px",
      }}
    >
      <div style={{ marginBottom: "18px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            lineHeight: 1.2,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#0f172a",
          }}
        >
          Career Planner Survey
        </h1>
        <p
          style={{
            margin: "8px 0 0",
            color: "#475569",
            fontSize: "14px",
          }}
        >
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            height: "8px",
            background: "#e2e8f0",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(currentStep / totalSteps) * 100}%`,
              background:
                "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
              transition: "width 300ms ease",
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor={currentQuestion.name}
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#0f172a",
              fontWeight: 600,
            }}
          >
            {currentQuestion.question}
          </label>

          <input
            id={currentQuestion.name}
            type="text"
            name={currentQuestion.name}
            value={answers[currentQuestion.name] || ""}
            onChange={handleChange}
            placeholder="Type your answer…"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              outline: "none",
              fontSize: "16px",
              transition: "box-shadow 150ms ease, border-color 150ms ease",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#93c5fd";
              e.target.style.boxShadow =
                "0 0 0 4px rgba(59,130,246,0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow =
                "inset 0 1px 2px rgba(0,0,0,0.02)";
            }}
          />

          <small style={{ color: "#64748b", display: "block", marginTop: 8 }}>
            Be specific—your answers help tailor career recommendations.
          </small>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "24px",
          }}
        >
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                background: "#fff",
                color: "#0f172a",
                fontWeight: 600,
                cursor: "pointer",
                flex: "0 0 auto",
              }}
            >
              ← Previous
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: "none",
                background:
                  "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                flex: "0 0 auto",
                boxShadow:
                  "0 8px 24px rgba(37,99,235,0.25), 0 4px 12px rgba(124,58,237,0.15)",
              }}
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: "none",
                background:
                  "linear-gradient(90deg, #059669 0%, #10b981 100%)",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                flex: "0 0 auto",
                boxShadow:
                  "0 8px 24px rgba(5,150,105,0.25), 0 4px 12px rgba(16,185,129,0.15)",
              }}
            >
              Submit ✓
            </button>
          )}
        </div>
      </form>

      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          marginTop: "22px",
        }}
      >
        {Array.from({ length: totalSteps }).map((_, i) => {
          const active = i + 1 === currentStep;
          return (
            <span
              key={i}
              aria-hidden
              style={{
                width: active ? 14 : 10,
                height: active ? 14 : 10,
                borderRadius: "999px",
                background: active ? "#3b82f6" : "#cbd5e1",
                transform: active ? "scale(1)" : "scale(1)",
                transition: "all 200ms ease",
              }}
              title={`Step ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  </div>
);
}

export default CareerPathPage;