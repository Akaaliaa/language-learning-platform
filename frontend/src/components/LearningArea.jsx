function LearningArea({
  lessons,
  vocabulary,
  selectedLessonId,
  setSelectedLessonId,
  setPage,
}) {
  const selectedLesson = lessons.find(
    (lesson) => lesson.id === Number(selectedLessonId)
  );

  const filteredVocabulary = vocabulary.filter(
    (item) => item.lesson_id === Number(selectedLessonId)
  );

  const cardStyle = {
    flex: 1,
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "18px",
    padding: "28px",
    minHeight: "260px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "24px",
  };

  const selectStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#020617",
    color: "white",
    fontSize: "16px",
    boxSizing: "border-box",
    marginTop: "20px",
  };

  return (
    <div style={{ marginTop: "45px" }}>
      <div style={{ textAlign: "center", marginBottom: "45px" }}>
        <h1
          style={{
            fontSize: "52px",
            marginBottom: "24px",
            lineHeight: "1.15",
          }}
        >
          Learning Area
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "20px",
            marginTop: "0",
            lineHeight: "1.6",
          }}
        >
          Choose a lesson, study vocabulary, and start a quiz.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "stretch",
        }}
      >
        <div style={cardStyle}>
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
              marginBottom: "20px",
            }}
          >
            🎓
          </div>

          <h2>Select Lesson</h2>

          <p style={{ color: "#94a3b8", lineHeight: "1.7" }}>
            Select the lesson you want to study.
          </p>

          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            style={selectStyle}
          >
            <option value="">Choose lesson</option>

            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.title}
              </option>
            ))}
          </select>

          {selectedLesson && (
            <p style={{ marginTop: "20px", color: "#cbd5e1" }}>
              Selected: <strong>{selectedLesson.title}</strong>
            </p>
          )}
        </div>

        <div style={cardStyle}>
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
              marginBottom: "20px",
            }}
          >
            📖
          </div>

          <h2>See Vocabulary</h2>

          {!selectedLessonId && (
            <p style={{ color: "#94a3b8", lineHeight: "1.7" }}>
              Please select a lesson first.
            </p>
          )}

          {selectedLessonId && filteredVocabulary.length === 0 && (
            <p style={{ color: "#94a3b8", lineHeight: "1.7" }}>
              No vocabulary found for this lesson.
            </p>
          )}

          {filteredVocabulary.slice(0, 8).map((item) => (
            <div
              key={item.id}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #1e293b",
                color: "#e2e8f0",
              }}
            >
              <strong>{item.word}</strong> — {item.meaning}
            </div>
          ))}
        </div>

        <div style={cardStyle}>
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#9333ea",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
              marginBottom: "20px",
            }}
          >
            ❓
          </div>

          <h2>Start Quiz</h2>

          <p style={{ color: "#94a3b8", lineHeight: "1.7" }}>
            The quiz is generated automatically from the selected lesson
            vocabulary.
          </p>

          <div style={{ marginTop: "20px", color: "#e2e8f0" }}>
            Available Words: {filteredVocabulary.length}
          </div>

          <button
            onClick={() => setPage("quiz")}
            disabled={filteredVocabulary.length < 4}
            style={{
              ...buttonStyle,
              background: filteredVocabulary.length >= 4 ? "#9333ea" : "#475569",
              cursor: filteredVocabulary.length >= 4 ? "pointer" : "not-allowed",
            }}
          >
            Start Quiz
          </button>

          {filteredVocabulary.length < 4 && (
            <p style={{ color: "#f87171", fontSize: "14px", marginTop: "15px" }}>
              At least 4 vocabulary words are needed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LearningArea;