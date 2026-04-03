export const calculators = [
  // 🧠 BMI
  {
    id: "bmi",
    title: "BMI Calculator",
    icon: "⚖️",
    category: "Health",
    description: "Calculate your Body Mass Index",
    formulaLabel: "BMI = weight / height²",

    inputs: [
      { name: "height", label: "Height", unit: "m", min: 0 },
      { name: "weight", label: "Weight", unit: "kg", min: 0 },
    ],

    calculate: ({ height, weight }) => {
      if (!height || !weight) return null;
      return +(weight / (height * height)).toFixed(2);
    },

    ranges: [
      { label: "Underweight", min: 0, max: 18.5, color: "blue" },
      { label: "Normal", min: 18.5, max: 24.9, color: "green" },
      { label: "Overweight", min: 25, max: 29.9, color: "yellow" },
      { label: "Obese", min: 30, max: Infinity, color: "red" },
    ],
  },

  // 🎂 Age
  {
    id: "age",
    title: "Age Calculator",
    icon: "🎂",
    category: "General",
    description: "Calculate your current age",
    formulaLabel: "Age = Current Year - Birth Year",

    inputs: [
      { name: "birthYear", label: "Birth Year", min: 1900 },
    ],

    calculate: ({ birthYear }) => {
      if (!birthYear) return null;
      return new Date().getFullYear() - birthYear;
    },
  },

  // 💰 Simple Interest
  {
    id: "si",
    title: "Simple Interest",
    icon: "💸",
    category: "Finance",
    description: "Calculate simple interest",
    formulaLabel: "SI = (P × R × T) / 100",

    inputs: [
      { name: "principal", label: "Principal", unit: "₹" },
      { name: "rate", label: "Rate", unit: "%" },
      { name: "time", label: "Time", unit: "years" },
    ],

    calculate: ({ principal, rate, time }) => {
      if (!principal || !rate || !time) return null;
      return +((principal * rate * time) / 100).toFixed(2);
    },
  },

  // 🏦 EMI
  {
    id: "emi",
    title: "EMI Calculator",
    icon: "🏦",
    category: "Finance",
    description: "Monthly loan EMI calculation",
    formulaLabel: "EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]",

    inputs: [
      { name: "loan", label: "Loan Amount", unit: "₹" },
      { name: "rate", label: "Interest Rate (%)" },
      { name: "months", label: "Duration (months)" },
    ],

    calculate: ({ loan, rate, months }) => {
      if (!loan || !rate || !months) return null;

      const r = rate / 12 / 100;
      const emi =
        (loan * r * Math.pow(1 + r, months)) /
        (Math.pow(1 + r, months) - 1);

      return +emi.toFixed(2);
    },
  },

  // 📊 Percentage
  {
    id: "percentage",
    title: "Percentage",
    icon: "📊",
    category: "Math",
    description: "Calculate percentage values",
    formulaLabel: "(value / total) × 100",

    inputs: [
      { name: "value", label: "Value" },
      { name: "total", label: "Total" },
    ],

    calculate: ({ value, total }) => {
      if (!value || !total) return null;
      return +((value / total) * 100).toFixed(2);
    },

    ranges: [
      { label: "Low", min: 0, max: 40, color: "red" },
      { label: "Average", min: 40, max: 75, color: "yellow" },
      { label: "Good", min: 75, max: 100, color: "green" },
    ],
  },

  // 🌡️ Temperature
  {
    id: "temp",
    title: "Temperature",
    icon: "🌡️",
    category: "Conversion",
    description: "Convert Celsius to Fahrenheit",
    formulaLabel: "F = (C × 9/5) + 32",

    inputs: [
      { name: "celsius", label: "Celsius", unit: "°C" },
    ],

    calculate: ({ celsius }) => {
      if (celsius === undefined) return null;
      return +((celsius * 9) / 5 + 32).toFixed(2);
    },
  },

  // 🧾 GST
  {
    id: "gst",
    title: "GST Calculator",
    icon: "🧾",
    category: "Finance",
    description: "Calculate GST and total amount",
    formulaLabel: "GST = (Amount × Rate) / 100",

    inputs: [
      { name: "amount", label: "Amount", unit: "₹" },
      { name: "rate", label: "GST Rate (%)" },
    ],

    calculate: ({ amount, rate }) => {
      if (!amount || !rate) return null;

      const gst = (amount * rate) / 100;
      const total = amount + gst;

      return {
        gst: +gst.toFixed(2),
        total: +total.toFixed(2),
      };
    },
  },

  // 📏 Distance
  {
    id: "distance",
    title: "Distance Converter",
    icon: "📏",
    category: "Conversion",
    description: "Convert kilometers to miles",

    inputs: [
      { name: "km", label: "Kilometers", unit: "km" },
    ],

    calculate: ({ km }) => {
      if (!km) return null;
      return +(km * 0.621371).toFixed(2);
    },
  },

  // 📐 Area
  {
    id: "area",
    title: "Area (Rectangle)",
    icon: "📐",
    category: "Math",
    description: "Calculate rectangular area",

    inputs: [
      { name: "length", label: "Length" },
      { name: "width", label: "Width" },
    ],

    calculate: ({ length, width }) => {
      if (!length || !width) return null;
      return +(length * width).toFixed(2);
    },
  },
];