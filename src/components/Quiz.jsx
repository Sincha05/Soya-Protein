import React, { useState, useEffect } from "react";

export default function Quiz() {
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [questionCount, setQuestionCount] = useState(0);

  // Load data
  useEffect(() => {
    fetch("/ISL_Gifs.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  // Timer logic
  useEffect(() => {
    if (!question || answer) return;
    if (timeLeft === 0) {
      setAnswer("wrong");
      setAttempted((prev) => prev + 1);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, question, answer]);

  const generateQuestion = () => {
    if (data.length < 4) return;
    if (questionCount >= 10) return;

    const entry = data[Math.floor(Math.random() * data.length)];
    const correctWord = entry.word;

    let wrongOptions = data
      .filter((d) => d.word !== correctWord)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((d) => d.word);

    let allOptions = [...wrongOptions, correctWord].sort(
      () => 0.5 - Math.random()
    );

    setQuestion(entry);
    setOptions(allOptions);
    setAnswer(null);
    setChosen(null);
    setTimeLeft(60);
    setQuestionCount((prev) => prev + 1);
  };

  const handleAnswer = (opt) => {
    if (answer) return;
    setChosen(opt);
    const isCorrect = opt === question.word;
    setAnswer(isCorrect ? "correct" : "wrong");
    setAttempted((prev) => prev + 1);
    if (isCorrect) setScore((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900"></div>
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="60" height="60" viewBox="0 0 60 60" className="absolute inset-0 h-full w-full">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-emerald-400" />
          </svg>
        </div>

        {/* Subtle Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-teal-500/8 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        
        {/* Professional Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            ISL Assessment
          </h1>
          <p className="text-xl text-slate-300 font-medium">
            Master Indian Sign Language through interactive learning
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="w-full max-w-4xl mb-8">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-emerald-500/20 shadow-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">{Math.min(questionCount, 10)}</div>
                  <div className="text-sm text-slate-400">Question</div>
                </div>
                <div className="w-px h-12 bg-slate-600"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">{score}</div>
                  <div className="text-sm text-slate-400">Correct</div>
                </div>
                <div className="w-px h-12 bg-slate-600"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{attempted}</div>
                  <div className="text-sm text-slate-400">Attempted</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`px-6 py-3 rounded-xl font-bold text-lg ${
                  timeLeft > 30 ? 'bg-emerald-500/20 text-emerald-400' : 
                  timeLeft > 10 ? 'bg-amber-500/20 text-amber-400' : 
                  'bg-red-500/20 text-red-400 animate-pulse'
                }`}>
                  {timeLeft}s
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Interface */}
        {questionCount >= 10 ? (
          <div className="w-full max-w-2xl">
            <div className="bg-slate-800/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-emerald-500/30">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Assessment Complete</h2>
                <div className="text-6xl font-bold text-emerald-400 mb-6">{score}/{attempted}</div>
                <p className="text-xl text-slate-300 mb-8">
                  {score >= 8 ? "Excellent Performance" : 
                   score >= 6 ? "Good Understanding" : 
                   score >= 4 ? "Fair Progress" : "Needs Improvement"}
                </p>
                <button
                  onClick={() => {
                    setScore(0);
                    setAttempted(0);
                    setQuestionCount(0);
                    setQuestion(null);
                  }}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                >
                  Start New Assessment
                </button>
              </div>
            </div>
          </div>
        ) : question ? (
          <div className="w-full max-w-5xl">
            <div className="bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-emerald-500/30">
              
              {/* Question Display */}
              <div className="text-center mb-10">
                <div className="inline-block p-6 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-xl border border-emerald-500/20">
                  <img 
                    src={question.gif || question.image} 
                    alt="Sign Language Gesture"
                    className="w-80 h-80 object-contain rounded-xl bg-white/5 shadow-inner"
                  />
                </div>
                <p className="text-lg font-medium text-slate-300 mt-6">
                  Identify the correct sign language interpretation
                </p>
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    className={`
                      p-6 rounded-xl font-semibold text-lg border-2 transition-all duration-300 transform
                      ${answer 
                        ? opt === question.word
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-105 shadow-lg shadow-emerald-500/25"
                          : chosen === opt
                          ? "bg-red-500/20 border-red-500 text-red-400 scale-95"
                          : "bg-slate-700/50 border-slate-600 text-slate-400"
                        : "bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50 hover:border-emerald-500/50 hover:scale-105 hover:shadow-lg cursor-pointer"
                      }
                    `}
                    disabled={!!answer}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {answer && (
                <div className={`text-center text-xl font-semibold mb-6 ${
                  answer === "correct" ? "text-emerald-400" : "text-red-400"
                }`}>
                  {answer === "correct" ? "Correct Answer" : "Incorrect"}
                </div>
              )}

              {/* Navigation */}
              <div className="text-center">
                <button
                  onClick={generateQuestion}
                  disabled={!answer}
                  className={`
                    font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-300 transform
                    ${answer 
                      ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-500 hover:to-cyan-500 hover:scale-105 shadow-lg hover:shadow-teal-500/25" 
                      : "bg-slate-600 text-slate-400 cursor-not-allowed"
                    }
                  `}
                >
                  {questionCount < 10 ? "Continue" : "Complete Assessment"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xl text-slate-300 font-medium mb-10 max-w-2xl mx-auto">
                Test your Indian Sign Language knowledge with this comprehensive assessment. 
                Each question challenges your understanding of ISL gestures and meanings.
              </p>
            </div>
            <button
              onClick={generateQuestion}
              className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-semibold text-xl px-12 py-6 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-emerald-500/25"
            >
              Begin Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}