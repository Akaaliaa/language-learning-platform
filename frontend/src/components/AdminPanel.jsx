import { useState } from "react";

function AdminPanel({
  lessons,
  title,
  setTitle,
  description,
  setDescription,
  addLesson,
  selectedAdminLessonId,
  setSelectedAdminLessonId,
  word,
  setWord,
  meaning,
  setMeaning,
  addVocabulary,
}) {
  const [adminSection, setAdminSection] = useState("lessons");

  const cardStyle = {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "18px",
    padding: "28px",
    marginBottom: "30px",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#020617",
    color: "white",
    marginBottom: "14px",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    color: "white",
    border: "none",
    padding: "14px 24px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginRight: "12px",
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h1 style={{ fontSize: "44px", marginBottom: "12px" }}>
        Admin Panel
      </h1>

      <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "30px" }}>
        Manage lessons and vocabulary.
      </p>

      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={() => setAdminSection("lessons")}
          style={{
            ...buttonStyle,
            background: adminSection === "lessons" ? "#2563eb" : "#334155",
          }}
        >
          Manage Lessons
        </button>

        <button
          onClick={() => setAdminSection("vocabulary")}
          style={{
            ...buttonStyle,
            background: adminSection === "vocabulary" ? "#16a34a" : "#334155",
          }}
        >
          Manage Vocabulary
        </button>
      </div>

      {adminSection === "lessons" && (
        <div style={cardStyle}>
          <h2>Add Lesson</h2>

          <form onSubmit={addLesson}>
            <input
              type="text"
              placeholder="Lesson title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />

            <textarea
              placeholder="Lesson description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ ...inputStyle, height: "120px" }}
            />

            <button
              type="submit"
              style={{ ...buttonStyle, background: "#2563eb" }}
            >
              Add Lesson
            </button>
          </form>

          <h3 style={{ marginTop: "30px" }}>Existing Lessons</h3>

          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              style={{
                padding: "14px 0",
                borderBottom: "1px solid #1e293b",
              }}
            >
              <strong>{lesson.title}</strong>
              <div style={{ color: "#94a3b8", marginTop: "5px" }}>
                {lesson.description}
              </div>
            </div>
          ))}
        </div>
      )}

      {adminSection === "vocabulary" && (
        <div style={cardStyle}>
          <h2>Add Vocabulary</h2>

          <form onSubmit={addVocabulary}>
            <select
              value={selectedAdminLessonId}
              onChange={(e) => setSelectedAdminLessonId(e.target.value)}
              style={inputStyle}
            >
              <option value="">Choose lesson</option>

              {lessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Meaning"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              style={inputStyle}
            />

            <button
              type="submit"
              style={{ ...buttonStyle, background: "#16a34a" }}
            >
              Add Vocabulary
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;