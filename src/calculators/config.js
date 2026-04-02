export const calculators = [
  {
    id: "bmi",
    title: "BMI Calculator",
    category: "Health",
    formulaLabel: "BMI = weight / height²",
    inputs: [
      { name: "height", label: "Height", unit: "m", min: 0 },
      { name: "weight", label: "Weight", unit: "kg", min: 0 },
    ],
    calculate: ({ height, weight }) => {
      if (!height || !weight) return "Enter valid values";
      return (weight / (height * height)).toFixed(2);
    },
  },

  {
    id: "age",
    title: "Age Calculator",
    category: "General",
    formulaLabel: "Age = Current Year - Birth Year",
    inputs: [
      { name: "birthYear", label: "Birth Year", min: 1900 },
    ],
    calculate: ({ birthYear }) => {
      if (!birthYear) return "Enter valid year";
      return new Date().getFullYear() - birthYear + " years";
    },
  },

  {
    id: "si",
    title: "Simple Interest",
    category: "Finance",
    formulaLabel: "SI = (P × R × T) / 100",
    inputs: [
      { name: "principal", label: "Principal", unit: "₹" },
      { name: "rate", label: "Rate", unit: "%" },
      { name: "time", label: "Time", unit: "years" },
    ],
    calculate: ({ principal, rate, time }) => {
      if (!principal || !rate || !time) return "Invalid input";
      return ((principal * rate * time) / 100).toFixed(2);
    },
  },

  {
    id: "emi",
    title: "EMI Calculator",
    category: "Finance",
    formulaLabel: "EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]",
    inputs: [
      { name: "loan", label: "Loan Amount", unit: "₹" },
      { name: "rate", label: "Interest Rate (annual %)" },
      { name: "months", label: "Duration (months)" },
    ],
    calculate: ({ loan, rate, months }) => {
      if (!loan || !rate || !months) return "Invalid input";

      const r = rate / 12 / 100;
      const emi =
        (loan * r * Math.pow(1 + r, months)) /
        (Math.pow(1 + r, months) - 1);

      return emi.toFixed(2);
    },
  },

  {
    id: "percentage",
    title: "Percentage",
    category: "Math",
    formulaLabel: "(value / total) × 100",
    inputs: [
      { name: "value", label: "Value" },
      { name: "total", label: "Total" },
    ],
    calculate: ({ value, total }) => {
      if (!value || !total) return "Invalid input";
      return ((value / total) * 100).toFixed(2) + " %";
    },
  },

  {
    id: "temp",
    title: "Temperature",
    category: "Conversion",
    formulaLabel: "F = (C × 9/5) + 32",
    inputs: [
      { name: "celsius", label: "Celsius", unit: "°C" },
    ],
    calculate: ({ celsius }) => {
      if (celsius === undefined) return "Invalid input";
      return ((celsius * 9) / 5 + 32).toFixed(2) + " °F";
    },
  },

  {
    id: "gst",
    title: "GST Calculator",
    category: "Finance",
    formulaLabel: "GST = (Amount × Rate) / 100",
    inputs: [
      { name: "amount", label: "Amount", unit: "₹" },
      { name: "rate", label: "GST Rate (%)" },
    ],
    calculate: ({ amount, rate }) => {
      if (!amount || !rate) return "Invalid input";

      const gst = (amount * rate) / 100;
      const total = Number(amount) + gst;

      return `GST: ₹${gst.toFixed(2)} | Total: ₹${total.toFixed(2)}`;
    },
  },

  {
    id: "distance",
    title: "Distance Converter",
    category: "Conversion",
    formulaLabel: "km → miles",
    inputs: [
      { name: "km", label: "Kilometers", unit: "km" },
    ],
    calculate: ({ km }) => {
      if (!km) return "Invalid input";
      return (km * 0.621371).toFixed(2) + " miles";
    },
  },

  {
    id: "area",
    title: "Area (Rectangle)",
    category: "Math",
    formulaLabel: "Area = length × width",
    inputs: [
      { name: "length", label: "Length" },
      { name: "width", label: "Width" },
    ],
    calculate: ({ length, width }) => {
      if (!length || !width) return "Invalid input";
      return (length * width).toFixed(2);
    },
  },
];