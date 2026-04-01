import { useState } from "react";
import { useStore } from "../store/useStore";

export default function AccordionCalculator({ calc }) {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const addHistory = useStore((s) => s.addHistory);

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: Number(value) });
  };

  const handleCalculate = () => {
    const res = calc.calculate(inputs);
    setResult(res);
    addHistory({ type: calc.title, result: res });
  };

  return (
    <div className="mt-4 p-4 border rounded-xl bg-gray-50">
      <h3 className="font-bold mb-2">{calc.title}</h3>

      {calc.inputs.map((input) => (
        <input
          key={input.name}
          type="number"
          placeholder={input.label}
          className="w-full p-2 border mb-2 rounded"
          onChange={(e) =>
            handleChange(input.name, e.target.value)
          }
        />
      ))}

      <button
        onClick={handleCalculate}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Calculate
      </button>

      {result !== null && (
        <p className="mt-3 font-semibold">
          Result: {result}
        </p>
      )}
    </div>
  );
}