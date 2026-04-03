import { useState } from "react";
import { calculators } from "./calculators/config";
import Sidebar from "./components/Sidebar";
import AccordionCalculator from "./components/AccordionCalculator";

export default function App() {
  const [active, setActive] = useState(calculators[0]);

  return (
    <div className="flex">
      <Sidebar
        calculators={calculators}
        active={active}
        setActive={setActive}
      />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <AccordionCalculator calc={active} />
      </div>
    </div>
  );
}