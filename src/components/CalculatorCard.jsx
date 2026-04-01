export default function CalculatorCard({ calc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-white rounded-xl shadow hover:scale-105 cursor-pointer transition"
    >
      <h2 className="text-lg font-semibold text-center">
        {calc.title}
      </h2>
    </div>
  );
}