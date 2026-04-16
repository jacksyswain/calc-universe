import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";

export default function AccordionCalculator({ calc }) {
  const {
    addHistory,
    calculatorStates,
    setCalculatorState,
  } = useStore();

  const savedState = calculatorStates[calc.id] || {};

  const [inputs, setInputs] = useState(savedState.inputs || {});
  const [result, setResult] = useState(savedState.result || null);
  const [error, setError] = useState("");

  // 🔄 Restore when switching calculator
  useEffect(() => {
    const saved = calculatorStates[calc.id] || {};
    setInputs(saved.inputs || {});
    setResult(saved.result || null);
    setError("");
  }, [calc.id]);

  // 🧠 Handle value + unit
  const handleChange = (name, value) => {
    const updated = {
      ...inputs,
      [name]: value === "" ? "" : Number(value),
    };

    setInputs(updated);
    setCalculatorState(calc.id, { inputs: updated, result });
  };

  const handleUnitChange = (name, unit) => {
    const updated = {
      ...inputs,
      [`${name}Unit`]: unit,
    };

    setInputs(updated);
    setCalculatorState(calc.id, { inputs: updated, result });
  };

  // 🧠 Calculate
  const handleCalculate = () => {
    setError("");

    for (let input of calc.inputs) {
      if (!inputs[input.name] && inputs[input.name] !== 0) {
        setError("Please fill all required fields");
        return;
      }
    }

    try {
      // 🔥 Normalize if exists
      let finalInputs = inputs;
      if (calc.normalize) {
        finalInputs = calc.normalize(inputs);
      }

      // 🔥 Special case (unit-based converters)
      if (!calc.normalize) {
        calc.inputs.forEach((input) => {
          if (input.units) {
            finalInputs.unit = inputs[`${input.name}Unit`] || input.defaultUnit;
          }
        });
      }

      const res = calc.calculate(finalInputs);
      setResult(res);

      setCalculatorState(calc.id, {
        inputs,
        result: res,
      });

      addHistory({
        type: calc.title,
        result: res,
        time: new Date().toLocaleString(),
      });
    } catch {
      setError("Something went wrong");
    }
  };

  // 🔄 Reset
  const handleReset = () => {
    setInputs({});
    setResult(null);
    setError("");

    setCalculatorState(calc.id, {
      inputs: {},
      result: null,
    });
  };

  // 📊 Category detection
  const getCategory = () => {
    if (!calc.ranges || typeof result !== "number") return null;

    return calc.ranges.find(
      (r) => result >= r.min && result < r.max
    );
  };

  const category = getCategory();
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
        </div>

        {/* 🔢 Inputs with Units */}
        <div className="grid md:grid-cols-2 gap-4">
          {calc.inputs.map((input) => (
            <div key={input.name}>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                {input.label}
              </label>

              <div className="flex gap-2 mt-1">
                {/* Input */}
                <input
                  type="number"
                  value={inputs[input.name] || ""}
                  placeholder={`Enter ${input.label}`}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-white/20 bg-white dark:bg-white/5 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleChange(input.name, e.target.value)
                  }
                />

                {/* 🔥 Unit Dropdown */}
                {input.units && (
                  <select
                    value={
                      inputs[`${input.name}Unit`] ||
                      input.defaultUnit
                    }
                    onChange={(e) =>
                      handleUnitChange(
                        input.name,
                        e.target.value
                      )
                    }
                    className="px-2 py-2 rounded-xl border bg-gray-50 dark:bg-white/10"
                  >
                    {input.units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ❌ Error  handling */              }
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCalculate}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold"
          >
            Calculate
          </button>

          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-white/10"
          >
            Reset
          </button>
        </div>

        {/* 📊 Result           */}
        {result !== null && (
          <div className="mt-6 space-y-4">

            <div className="p-5 rounded-2xl bg-green-50 dark:bg-green-900/30 text-center">
              <p className="text-sm">Result</p>

              {typeof result === "object" ? (
                Object.entries(result).map(([k, v]) => (
                  <p key={k}>
                    {k}: {v}
                  </p>
                ))
              ) : (
                <p className="text-3xl font-bold">{result}</p>
              )}
            </div>

            {/* 📊 Stats */}
            {category && (
              <div className="p-3 bg-blue-50 text-center rounded-xl">
                {category.label}
              </div>
            )}

            
            {typeof result === "number" && (
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full"
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