import { useState, useEffect } from "react";

export default function Quiz() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState(null);

  // Load flashcards JSON
  useEffect(() => {
    fetch("/ISL_Gifs.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  // Create a quiz question based on search input
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

    // pick 3 random wrong options
    let wrongOptions = data
      .filter((d) => d.word !== entry.word && (d.gif || d.image))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // shuffle correct + wrong options
    let allOptions = [...wrongOptions, entry].sort(() => 0.5 - Math.random());

    setQuestion(entry);
    setOptions(allOptions);
    setAnswer(null);
  };

  const handleAnswer = (opt) => {
    setAnswer(opt.word === question.word ? "correct" : "wrong");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ISL Quiz</h1>

      {/* Search box */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a word or letter..."
          className="border px-3 py-2 flex-1 rounded"
        />
        <button
          onClick={generateQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start Quiz
        </button>
      </div>

      {/* Quiz Question */}
      {question && (
        <div className="mt-4">
          <p className="font-semibold mb-4">
            Which of these signs represents:{" "}
            <span className="text-blue-600">{question.word}</span>?
          </p>

          {/* Options (4 photos) */}
          <div className="grid grid-cols-2 gap-4">
            {options.map((opt, idx) => {
              const src = opt.gif || opt.image;
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className="border rounded overflow-hidden hover:scale-105 transition"
                >
                  <img
                    src={src}
                    alt={opt.word}
                    className="w-40 h-40 object-contain"
                  />
                </button>
              );
            })}
          </div>

          {/* Answer feedback */}
          {answer && (
            <div className="mt-4">
              {answer === "correct" ? (
                <p className="text-green-600 font-bold">✅ Correct!</p>
              ) : (
                <p className="text-red-600 font-bold">❌ Wrong!</p>
              )}
              <div className="mt-2">
                <p className="font-semibold">Correct Answer:</p>
                <img
                  src={question.gif || question.image}
                  alt={question.word}
                  className="w-40 h-40 object-contain mt-2"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
