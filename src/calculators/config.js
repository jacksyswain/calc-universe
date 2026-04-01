export const calculators = [
  {
    id: "bmi",
    title: "BMI Calculator",
    inputs: [
      { name: "height", label: "Height (m)" },
      { name: "weight", label: "Weight (kg)" },
    ],
    calculate: ({ height, weight }) =>
      (weight / (height * height)).toFixed(2),
  },

  {
    id: "age",
    title: "Age Calculator",
    inputs: [{ name: "birthYear", label: "Birth Year" }],
    calculate: ({ birthYear }) =>
      new Date().getFullYear() - birthYear,
  },

  {
    id: "si",
    title: "Simple Interest",
    inputs: [
      { name: "principal", label: "Principal" },
      { name: "rate", label: "Rate (%)" },
      { name: "time", label: "Time (years)" },
    ],
    calculate: ({ principal, rate, time }) =>
      (principal * rate * time) / 100,
  },

  {
    id: "percentage",
    title: "Percentage",
    inputs: [
      { name: "value", label: "Value" },
      { name: "total", label: "Total" },
    ],
    calculate: ({ value, total }) =>
      ((value / total) * 100).toFixed(2) + "%",
  },

  {
    id: "temp",
    title: "Temperature (C → F)",
    inputs: [{ name: "celsius", label: "Celsius" }],
    calculate: ({ celsius }) =>
      (celsius * 9) / 5 + 32,
  },
];