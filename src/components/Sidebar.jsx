export default function Sidebar({ calculators, active, setActive }) {
  return (
    <div className="w-64 h-screen bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-4">Calculators</h2>

      {calculators.map((calc) => (
        <div
          key={calc.id}
          onClick={() => setActive(calc)}
          className={`p-3 rounded-lg cursor-pointer mb-2 ${
            active?.id === calc.id
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {calc.title}
        </div>
      ))}
    </div>
  );
}