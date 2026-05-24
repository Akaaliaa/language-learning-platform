import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LearningArea from "./components/LearningArea";
import AdminPanel from "./components/AdminPanel";
import QuizSection from "./components/QuizSection";

function App() {
  const [lessons, setLessons] = useState([]);
  const [vocabulary, setVocabulary] = useState([]);

  const [page, setPage] = useState("learning");

  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [selectedAdminLessonId, setSelectedAdminLessonId] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    fetchLessons();
    fetchVocabulary();
  }, []);

  const fetchLessons = () => {
    fetch("http://localhost:5000/lessons")
      .then((response) => response.json())
      .then((data) => setLessons(data));
  };

  const fetchVocabulary = () => {
    fetch("http://localhost:5000/vocabulary")
      .then((response) => response.json())
      .then((data) => setVocabulary(data));
  };

  const registerUser = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      }),
    });

    alert("Account created successfully");

    setRegisterUsername("");
    setRegisterEmail("");
    setRegisterPassword("");
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    });

    const data = await response.json();

    if (data.username) {
      setLoggedInUser(data.username);
      setPage("learning");
    } else {
      alert("Login failed");
    }
  };

  const logout = () => {
    setLoggedInUser("");
    setLoginEmail("");
    setLoginPassword("");
    setPage("learning");
  };

  const addLesson = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill lesson title and description.");
      return;
    }

    await fetch("http://localhost:5000/lessons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    setTitle("");
    setDescription("");

    fetchLessons();
  };

  const addVocabulary = async (e) => {
    e.preventDefault();

    if (!selectedAdminLessonId || !word || !meaning) {
      alert("Please choose lesson and fill vocabulary fields.");
      return;
    }

    await fetch("http://localhost:5000/vocabulary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lesson_id: Number(selectedAdminLessonId),
        word,
        meaning,
      }),
    });

    setWord("");
    setMeaning("");

    fetchVocabulary();
  };

  const authContainerStyle = {
    minHeight: "100vh",
    background: "#020617",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  };

  const authBoxStyle = {
    width: "430px",
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "20px",
    padding: "40px",
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
    width: "100%",
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  if (!loggedInUser) {
    return (
      <div style={authContainerStyle}>
        <div style={authBoxStyle}>
          <h1
            style={{
              textAlign: "center",
              fontSize: "40px",
              marginBottom: "45px",
              lineHeight: "1.2",
            }}
          >
            Language Learning Platform
          </h1>

          <h2>Login</h2>

          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>
              Login
            </button>
          </form>

          <div
            style={{
              height: "1px",
              background: "#1e293b",
              margin: "30px 0",
            }}
          />

          <h2>Create Account</h2>

          <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <Navbar onLogout={logout} />

      <div style={{ padding: "40px" }}>
        <div style={{ marginBottom: "30px" }}>
          <button
            onClick={() => setPage("learning")}
            style={{
              background: page === "learning" ? "#2563eb" : "#334155",
              color: "white",
              border: "none",
              padding: "14px 24px",
              borderRadius: "10px",
              marginRight: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Learning Area
          </button>

          <button
            onClick={() => setPage("admin")}
            style={{
              background: page === "admin" ? "#9333ea" : "#334155",
              color: "white",
              border: "none",
              padding: "14px 24px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Open Admin Panel
          </button>
        </div>

        {page === "learning" && (
          <LearningArea
            lessons={lessons}
            vocabulary={vocabulary}
            selectedLessonId={selectedLessonId}
            setSelectedLessonId={setSelectedLessonId}
            setPage={setPage}
          />
        )}

        {page === "admin" && (
          <AdminPanel
            lessons={lessons}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            addLesson={addLesson}
            selectedAdminLessonId={selectedAdminLessonId}
            setSelectedAdminLessonId={setSelectedAdminLessonId}
            word={word}
            setWord={setWord}
            meaning={meaning}
            setMeaning={setMeaning}
            addVocabulary={addVocabulary}
          />
        )}

        {page === "quiz" && (
          <QuizSection
            vocabulary={vocabulary}
            selectedLessonId={selectedLessonId}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;