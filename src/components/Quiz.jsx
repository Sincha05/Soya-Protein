import { useState, useEffect } from "react";

export default function Quiz() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    fetch("/ISL_Gifs.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const generateQuestion = () => {
    if (!search.trim()) return;

    const normalized = search.toLowerCase();
    const entry = data.find((d) =>
      d.searchKeys.some((k) => k.includes(normalized))
    );

    if (!entry) {
      setQuestion(null);
      setOptions([]);
      return;
    }

    let wrongOptions = data
      .filter((d) => d.word !== entry.word && (d.gif || d.image))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    let allOptions = [...wrongOptions, entry].sort(() => 0.5 - Math.random());

    setQuestion(entry);
    setOptions(allOptions);
    setAnswer(null);
  };

  const handleAnswer = (opt) => {
    setAnswer(opt.word === question.word ? "correct" : "wrong");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 p-6">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-8 animate-pulse">
        🖐 ISL Quiz
      </h1>

      {/* Search Box */}
      <div className="flex w-full max-w-xl gap-4 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a word or letter..."
          className="flex-1 px-4 py-3 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
        />
        <button
          onClick={generateQuestion}
          className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow hover:bg-purple-700 transition transform hover:scale-105"
        >
          Start Quiz
        </button>
      </div>

      {/* Quiz Question */}
      {question && (
        <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <p className="text-lg font-semibold mb-6 text-gray-800 text-center">
            Which sign represents:{" "}
            <span className="text-purple-600 font-bold">{question.word}</span>?
          </p>

          {/* Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
            {options.map((opt, idx) => {
              const src = opt.gif || opt.image;
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className={`flex items-center justify-center bg-gray-50 rounded-xl shadow-md p-2 hover:scale-105 transition-transform border-2 ${
                    answer
                      ? opt.word === question.word
                        ? "border-green-500"
                        : "border-gray-200"
                      : "border-purple-200"
                  }`}
                >
                  <img
                    src={src}
                    alt="Option"
                    className="w-28 h-28 object-contain rounded-md"
                  />
                </button>
              );
            })}
          </div>

          {/* Answer Feedback */}
          {answer && (
            <div
              className={`mt-6 flex flex-col md:flex-row items-center gap-6 p-4 rounded-xl border-l-4 ${
                answer === "correct"
                  ? "bg-green-50 border-green-500"
                  : "bg-red-50 border-red-500"
              }`}
            >
              <p
                className={`text-lg font-bold ${
                  answer === "correct" ? "text-green-700" : "text-red-700"
                }`}
              >
                {answer === "correct" ? "✅ Correct!" : "❌ Wrong!"}
              </p>
              <div className="flex flex-col items-center">
                <p className="font-medium text-gray-700 text-sm">Correct Answer:</p>
                <img
                  src={question.gif || question.image}
                  alt="Correct Answer"
                  className="w-28 h-28 object-contain rounded-md shadow"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {!question && search && (
        <p className="text-center mt-6 text-gray-500 text-lg">
          No results found for "{search}"
        </p>
      )}
    </div>
  );
}
