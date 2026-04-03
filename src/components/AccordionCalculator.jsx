import { useState } from "react";
import { useStore } from "../store/useStore";

export default function AccordionCalculator({ calc }) {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const addHistory = useStore((s) => s.addHistory);

  // 🧠 handle input
  const handleChange = (name, value) => {
    setInputs((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  // 🧠 calculate
  const handleCalculate = () => {
    setError("");

    for (let input of calc.inputs) {
      if (!inputs[input.name] && inputs[input.name] !== 0) {
        setError("Please fill all required fields");
        return;
      }
    }

    try {
      const res = calc.calculate(inputs);
      setResult(res);

      addHistory({
        type: calc.title,
        result: res,
        time: new Date().toLocaleString(),
      });
    } catch {
      setError("Something went wrong");
    }
  };

  const handleReset = () => {
    setInputs({});
    setResult(null);
    setError("");
  };

  // 📊 detect category (for BMI / Percentage etc.)
  const getCategory = () => {
    if (!calc.ranges || typeof result !== "number") return null;

    return calc.ranges.find(
      (r) => result >= r.min && result < r.max
    );
  };

  const category = getCategory();

  // 📊 progress %
  const progress =
    typeof result === "number" ? Math.min(result, 100) : 0;

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-gray-200 dark:border-white/20 shadow-xl rounded-3xl p-6">

        {/* 🔷 Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {calc.icon} {calc.title}
          </h3>

          {calc.description && (
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {calc.description}
            </p>
          )}

          {calc.formulaLabel && (
            <p className="text-xs text-gray-400 mt-1">
              {calc.formulaLabel}
            </p>
          )}
        </div>

        {/* 🔢 Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          {calc.inputs.map((input) => (
            <div key={input.name}>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                {input.label} {input.unit && `(${input.unit})`}
              </label>

              <input
                type="number"
                value={inputs[input.name] || ""}
                placeholder={`Enter ${input.label}`}
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-white dark:bg-white/5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e) =>
                  handleChange(input.name, e.target.value)
                }
              />
            </div>
          ))}
        </div>

        {/* ❌ Error */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        {/* 🔘 Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCalculate}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-[1.02] transition"
          >
            Calculate
          </button>

          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-white/20 transition"
          >
            Reset
          </button>
        </div>

        {/* 📊 Result */}
        {result !== null && (
          <div className="mt-6 space-y-4">

            {/* 🟢 Result Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200 dark:border-green-700 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Result
              </p>

              {/* handle object (GST) */}
              {typeof result === "object" ? (
                <div className="mt-2 text-lg font-semibold text-green-600 dark:text-green-400">
                  {Object.entries(result).map(([key, val]) => (
                    <p key={key}>
                      {key}: {val}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {result}
                </p>
              )}
            </div>

            {/* 📊 Stats */}
            {category && (
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Status
                </p>

                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {category.label}
                </p>
              </div>
            )}

            {/* 📈 Progress Bar */}
            {typeof result === "number" && (
              <div className="w-full bg-gray-200 dark:bg-white/10 h-2 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}