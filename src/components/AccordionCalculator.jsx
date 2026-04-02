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

    // validation
    for (let input of calc.inputs) {
      if (
        inputs[input.name] === undefined ||
        inputs[input.name] === ""
      ) {
        setError("Please fill all fields");
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
    } catch (err) {
      setError("Calculation error");
    }
  };

  const handleReset = () => {
    setInputs({});
    setResult(null);
    setError("");
  };

  return (
    <div className="mt-6 p-6 rounded-2xl bg-white shadow-lg border">
      
      {/* 🧠 Title */}
      <h3 className="text-xl font-bold text-center mb-2">
        {calc.title}
      </h3>

      {/* 📐 Formula */}
      {calc.formulaLabel && (
        <p className="text-center text-sm text-gray-500 mb-4">
          {calc.formulaLabel}
        </p>
      )}

      {/* 🔢 Inputs */}
      <div className="space-y-3">
        {calc.inputs.map((input) => (
          <div key={input.name} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              {input.label} {input.unit && `(${input.unit})`}
            </label>

            <input
              type="number"
              value={inputs[input.name] || ""}
              placeholder={`Enter ${input.label}`}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                handleChange(input.name, e.target.value)
              }
            />
          </div>
        ))}
      </div>

      {/* ⚠️ Error */}
      {error && (
        <p className="text-red-500 text-sm mt-3 text-center">
          {error}
        </p>
      )}

      {/* 🔘 Buttons */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={handleCalculate}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
        >
          Calculate
        </button>

        <button
          onClick={handleReset}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-black py-2 rounded-lg font-semibold transition"
        >
          Reset
        </button>
      </div>

      {/* 📊 Result */}
      {result !== null && (
        <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-xl text-center animate-fade-in">
          <p className="text-gray-600 text-sm">Result</p>
          <p className="text-2xl font-bold text-green-600">
            {result}
          </p>
        </div>
      )}
    </div>
  );
}