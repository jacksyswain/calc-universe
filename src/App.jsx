import { useState } from "react";
import { calculators } from "./calculators/config";
import CalculatorCard from "./components/CalculatorCard";
import AccordionCalculator from "./components/AccordionCalculator";

export default function App() {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        All-in-One Calculator
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {calculators.map((calc) => (
          <CalculatorCard
            key={calc.id}
            calc={calc}
            onClick={() =>
              setActive(active === calc.id ? null : calc.id)
            }
          />
        ))}
      </div>

      {/* ACCORDION */}
      {calculators.map(
        (calc) =>
          active === calc.id && (
            <AccordionCalculator key={calc.id} calc={calc} />
          )
      )}
    </div>
  );
}