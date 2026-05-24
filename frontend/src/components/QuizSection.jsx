import { useEffect, useState } from "react";

function QuizSection({ vocabulary, selectedLessonId, setPage }) {
  const [quizItems, setQuizItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const lessonVocabulary = vocabulary.filter(
    (item) => item.lesson_id === Number(selectedLessonId)
  );

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const limitedWords = shuffleArray(lessonVocabulary).slice(0, 10);

    const generatedQuiz = limitedWords.map((item) => {
      const wrongOptions = shuffleArray(
        lessonVocabulary
          .filter((word) => word.id !== item.id)
          .map((word) => word.meaning)
      ).slice(0, 3);

      const options = shuffleArray([item.meaning, ...wrongOptions]);

      return {
        id: item.id,
        word: item.word,
        correctAnswer: item.meaning,
        options,
      };
    });

    setQuizItems(generatedQuiz);
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer("");
  }, [selectedLessonId]);

  const buttonStyle = {
    display: "block",
    marginBottom: "12px",
    padding: "14px",
    width: "100%",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const chooseAnswer = (answer) => {
    if (answered) {
      return;
    }

    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === quizItems[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer("");
    setCurrentIndex(currentIndex + 1);
  };

  if (!selectedLessonId) {
    return (
      <div style={{ color: "white" }}>
        <h1>Please select a lesson first.</h1>

        <button onClick={() => setPage("learning")} style={buttonStyle}>
          Back to Learning Area
        </button>
      </div>
    );
  }

  if (lessonVocabulary.length < 4) {
    return (
      <div style={{ color: "white" }}>
        <h1>Not enough vocabulary for quiz.</h1>
        <p>At least 4 vocabulary words are needed.</p>

        <button onClick={() => setPage("learning")} style={buttonStyle}>
          Back to Learning Area
        </button>
      </div>
    );
  }

  if (quizItems.length === 0) {
    return <h1 style={{ color: "white" }}>Loading quiz...</h1>;
  }

  if (currentIndex >= quizItems.length) {
    return (
      <div
        style={{
          maxWidth: "700px",
          margin: "60px auto",
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "18px",
          padding: "35px",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>Quiz Finished</h1>

        <h2>
          Your Score: {score} / {quizItems.length}
        </h2>

        <button onClick={() => setPage("learning")} style={buttonStyle}>
          Back to Learning Area
        </button>
      </div>
    );
  }

  const currentQuestion = quizItems[currentIndex];

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "60px auto",
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "18px",
        padding: "35px",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>Quiz</h1>

      <p style={{ color: "#94a3b8", fontSize: "18px" }}>
        Question {currentIndex + 1} / {quizItems.length}
      </p>

      <h2 style={{ marginTop: "35px", marginBottom: "25px" }}>
        What is the meaning of "{currentQuestion.word}"?
      </h2>

      {currentQuestion.options.map((option) => {
        let background = "#2563eb";

        if (answered && option === currentQuestion.correctAnswer) {
          background = "#16a34a";
        }

        if (
          answered &&
          option === selectedAnswer &&
          option !== currentQuestion.correctAnswer
        ) {
          background = "#dc2626";
        }

        return (
          <button
            key={option}
            onClick={() => chooseAnswer(option)}
            style={{
              ...buttonStyle,
              backgroundColor: background,
            }}
          >
            {option}
          </button>
        );
      })}

      {answered && (
        <button
          onClick={nextQuestion}
          style={{
            ...buttonStyle,
            backgroundColor: "#9333ea",
            marginTop: "25px",
          }}
        >
          Next Question
        </button>
      )}

      <h3 style={{ marginTop: "30px" }}>Score: {score}</h3>
    </div>
  );
}

export default QuizSection;