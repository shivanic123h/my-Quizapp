import { useState, useEffect } from "react";

function App() {
  const quizData = {
    Python: [
      { question: "Python is ___ typed language?", options: ["Strongly", "Weakly"], answer: "Strongly" },
      { question: "Which function prints output in Python?", options: ["echo()", "print()", "cout", "console.log"], answer: "print()" },
      { question: "Which keyword is used to define a function in Python?", options: ["func", "def", "function", "lambda"], answer: "def" },
      { question: "What is the output of type(10)?", options: ["<class 'str'>", "<class 'float'>", "<class 'int'>", "<class 'bool'>"], answer: "<class 'int'>" },
      { question: "Which of these is a Python data structure?", options: ["List", "Table", "Tree", "Stack"], answer: "List" },
    ],

    Java: [
      { question: "Java is ___ language?", options: ["Compiled", "Interpreted", "Both", "None"], answer: "Both" },
      { question: "JVM stands for?", options: ["Java Virtual Machine", "Java Variable Method", "Just Verify Memory", "None"], answer: "Java Virtual Machine" },
      { question: "Which keyword is used to inherit a class in Java?", options: ["this", "super", "extends", "inherits"], answer: "extends" },
      { question: "Which company developed Java?", options: ["Sun Microsystems", "Microsoft", "Oracle", "IBM"], answer: "Sun Microsystems" },
      { question: "Which of these is not a Java feature?", options: ["Object-Oriented", "Platform Independent", "Use of pointers", "Secure"], answer: "Use of pointers" },
    ],

    "Web Development": [
      { question: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlink Text Mark Language", "None"], answer: "Hyper Text Markup Language" },
      { question: "CSS is used for?", options: ["Structure", "Design", "Functionality", "Database"], answer: "Design" },
      { question: "JavaScript is a ___ side scripting language?", options: ["Server", "Client", "Both", "None"], answer: "Client" },
      { question: "Which HTML tag is used to include JavaScript?", options: ["<script>", "<js>", "<javascript>", "<code>"], answer: "<script>" },
      { question: "Which CSS property controls text size?", options: ["font-style", "text-size", "font-size", "text-font"], answer: "font-size" },
    ],

    "Full Stack": [
      { question: "Full Stack developer works on ___?", options: ["Frontend", "Backend", "Both", "None"], answer: "Both" },
      { question: "Which is NOT a backend language?", options: ["Node.js", "Python", "PHP", "HTML"], answer: "HTML" },
      { question: "Which database is commonly used with MERN stack?", options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], answer: "MongoDB" },
      { question: "Which tool is used for version control?", options: ["Docker", "Git", "Jenkins", "React"], answer: "Git" },
      { question: "Which is a frontend JavaScript library?", options: ["Express", "Flask", "React", "Django"], answer: "React" },
    ],

    "Computer Network": [
      { question: "What does LAN stand for?", options: ["Local Area Network", "Large Area Network", "Light Area Network", "None"], answer: "Local Area Network" },
      { question: "Which device connects multiple networks?", options: ["Switch", "Router", "Hub", "Repeater"], answer: "Router" },
      { question: "Which protocol is used to send emails?", options: ["SMTP", "HTTP", "FTP", "SNMP"], answer: "SMTP" },
      { question: "IP stands for?", options: ["Internet Protocol", "Internal Process", "Internet Program", "Interconnected Path"], answer: "Internet Protocol" },
      { question: "Which layer of OSI model handles routing?", options: ["Transport Layer", "Network Layer", "Session Layer", "Physical Layer"], answer: "Network Layer" },
    ],
  };

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const [subject, setSubject] = useState("");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const questions = quizData[subject] || [];

  useEffect(() => {
    if (!subject || showResult) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [current, subject, showResult]);

  const handleRegister = () => {
    if (!email || !password) return alert("Please fill email and password");
    if (users.find((u) => u.email === email)) return alert("User already exists!");
    setUsers([...users, { email, password }]);
    alert("Registration successful! You can login now.");
    setEmail(""); setPassword(""); setIsRegistering(false);
  };

  const handleLogin = () => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const restartQuiz = () => {
    setSubject("");
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(10);
  };

  const handleAnswer = (option) => {
    if (option === questions[current].answer) setScore(score + 1);
    handleNext();
  };

  const handleNext = () => {
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setTimeLeft(10);
    } else {
      setShowResult(true);
    }
  };

  // ----- Login/Register Page -----
  if (!isLoggedIn) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.95)",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
          width: "350px",
          textAlign: "center",
        }}>
          <h2 style={{ marginBottom: "20px", color: "#333" }}>
            {isRegistering ? "Register" : "Login"}
          </h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc" }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc" }} />
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          <button onClick={isRegistering ? handleRegister : handleLogin}
            style={{
              width: "100%", padding: "12px", borderRadius: "8px", border: "none",
              background: "linear-gradient(to right, #4CAF50, #45a049)",
              color: "white", fontSize: "16px", cursor: "pointer", marginBottom: "10px"
            }}>
            {isRegistering ? "Register" : "Login"}
          </button>
          <p style={{ fontSize: "14px", cursor: "pointer", color: "#555" }}
            onClick={() => { setIsRegistering(!isRegistering); setLoginError(""); }}>
            {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
          </p>
        </div>
      </div>
    );
  }

  // ----- Subject Selection -----
  if (!subject) {
    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        minHeight: "100vh", flexDirection: "column", gap: "20px",
        backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <h1 style={{ color: "white", textShadow: "1px 1px 5px black" }}>Select a Subject</h1>
        {Object.keys(quizData).map((subj) => (
          <button key={subj} onClick={() => setSubject(subj)} style={{
            padding: "12px 25px", fontSize: "18px", borderRadius: "8px",
            cursor: "pointer", border: "none",
            background: "linear-gradient(to right, #4CAF50, #45a049)",
            color: "white"
          }}>{subj}</button>
        ))}
        <button onClick={() => setIsLoggedIn(false)} style={{
          marginTop: "10px", padding: "8px 20px", borderRadius: "6px",
          border: "none", cursor: "pointer"
        }}>Logout</button>
      </div>
    );
  }

  // ----- Quiz Page -----
  const progressPercent = ((current + 1) / questions.length) * 100;

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      minHeight: "100vh",
      backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      backgroundSize: "cover", backgroundPosition: "center", padding: "10px",
    }}>
      <div style={{
        width: "100%", maxWidth: "450px", background: "rgba(255,255,255,0.95)",
        padding: "30px", borderRadius: "15px", boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
        textAlign: "center",
      }}>
        <h1 style={{ marginBottom: "20px", color: "#333" }}>{subject} Quiz</h1>
        <div style={{ marginBottom: "15px" }}>
          <div style={{
            height: "10px", width: "100%", background: "#ddd",
            borderRadius: "5px", overflow: "hidden",
          }}>
            <div style={{
              height: "100%", width: `${progressPercent}%`,
              background: "#4CAF50", transition: "width 0.3s",
            }}></div>
          </div>
          <p>Question {current + 1} of {questions.length}</p>
        </div>

        {!showResult ? (
          <div>
            <h2>{questions[current].question}</h2>
            <p style={{ color: "red", fontWeight: "bold" }}>⏳ Time left: {timeLeft}s</p>
            {questions[current].options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)} style={{
                display: "block", margin: "10px auto", padding: "12px 20px",
                borderRadius: "8px", border: "1px solid gray", background: "#f9f9f9",
                cursor: "pointer", width: "80%", boxShadow: "0 5px 10px rgba(0,0,0,0.1)"
              }}>
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div>
            <h2>🎉 Quiz Finished!</h2>
            <p style={{ fontSize: "18px" }}>✅ Correct Answers: <b>{score}</b> / {questions.length}</p>
            <p style={{ fontSize: "18px" }}>📊 Percentage: <b>{((score / questions.length) * 100).toFixed(2)}%</b></p>
            <button onClick={restartQuiz} style={{
              marginTop: "20px", padding: "12px 25px",
              background: "linear-gradient(to right, #4CAF50, #45a049)",
              color: "white", fontSize: "16px", border: "none",
              borderRadius: "8px", cursor: "pointer"
            }}>
              🔄 Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
