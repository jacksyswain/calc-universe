import { useState } from "react";
import { useStore } from "../store/useStore";

export default function AccordionCalculator({ calc }) {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const addHistory = useStore((s) => s.addHistory);

  const handleChange = (name, value) => {
    setInputs((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const handleCalculate = () => {
    setError("");

    for (let input of calc.inputs) {
      if (
        inputs[input.name] === undefined ||
        inputs[input.name] === ""
      ) {
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

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      
      {/* 🧊 Glass Card */}
      <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-gray-200 dark:border-white/20 shadow-xl rounded-3xl p-6 transition-all">

        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {calc.title}
          </h3>

          {calc.formulaLabel && (
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              {calc.formulaLabel}
            </p>
          )}
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {calc.inputs.map((input) => (
            <div key={input.name} className="relative">
              
              {/* Label */}
              <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">
                {input.label}
                {input.unit && (
                  <span className="ml-1 text-gray-400">
                    ({input.unit})
                  </span>
                )}
              </label>

              {/* Input Field */}
              <input
                type="number"
                value={inputs[input.name] || ""}
                placeholder={`Enter ${input.label}`}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-white dark:bg-white/5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-800 dark:text-white placeholder-gray-400"
                onChange={(e) =>
                  handleChange(input.name, e.target.value)
                }
              />
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCalculate}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:scale-[1.02] transition-all"
          >
            Calculate
          </button>

          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
          >
            Reset
          </button>
        </div>

        {/* Result */}
        {result !== null && (
          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200 dark:border-green-700 text-center transition-all">
            
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Result
            </p>

            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
              {result}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Calculated instantly ⚡
            </p>
          </div>
        )}
      </div>
    </div>
  );
}