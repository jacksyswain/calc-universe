export const calculators = [
  // 🧠 BMI (MULTI-UNIT)
  {
    id: "bmi",
    title: "BMI Calculator",
    icon: "⚖️",
    category: "Health",
    description: "Calculate your Body Mass Index",

    inputs: [
      {
        name: "height",
        label: "Height",
        units: ["cm", "m", "ft"],
        defaultUnit: "cm",
      },
      {
        name: "weight",
        label: "Weight",
        units: ["kg", "lb"],
        defaultUnit: "kg",
      },
    ],

    normalize: ({ height, heightUnit, weight, weightUnit }) => {
      let h = height;
      let w = weight;

      if (heightUnit === "cm") h = height / 100;
      if (heightUnit === "ft") h = height * 0.3048;

      if (weightUnit === "lb") w = weight * 0.453592;

      return { height: h, weight: w };
    },

    calculate: ({ height, weight }) => {
      if (!height || !weight) return null;
      return +(weight / (height * height)).toFixed(2);
    },

    ranges: [
      { label: "Underweight", min: 0, max: 18.5 },
      { label: "Normal", min: 18.5, max: 24.9 },
      { label: "Overweight", min: 25, max: 29.9 },
      { label: "Obese", min: 30, max: Infinity },
    ],
  },

  // 🎂 AGE (ACCURATE VERSION 🔥)
  {
    id: "age",
    title: "Age Calculator",
    icon: "🎂",
    category: "General",
    description: "Calculate exact age (years, months, days)",

    inputs: [
      { name: "day", label: "Day" },
      { name: "month", label: "Month" },
      { name: "year", label: "Year" },
    ],

    calculate: ({ day, month, year }) => {
      if (!day || !month || !year) return null;

      const today = new Date();
      const birth = new Date(year, month - 1, day);

      if (birth > today) return "Invalid Date";

      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();

      if (days < 0) {
        months--;
        const prevMonthDays = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        ).getDate();
        days += prevMonthDays;
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      return {
        years,
        months,
        days,
      };
    },
  },

  // 💰 SIMPLE INTEREST
  {
    id: "si",
    title: "Simple Interest",
    icon: "💸",
    category: "Finance",

    inputs: [
      { name: "principal", label: "Principal (₹)" },
      { name: "rate", label: "Rate (%)" },
      { name: "time", label: "Time (years)" },
    ],

    calculate: ({ principal, rate, time }) =>
      principal && rate && time
        ? +((principal * rate * time) / 100).toFixed(2)
        : null,
  },

  // 🏦 EMI
  {
    id: "emi",
    title: "EMI Calculator",
    icon: "🏦",
    category: "Finance",

    inputs: [
      { name: "loan", label: "Loan (₹)" },
      { name: "rate", label: "Rate (%)" },
      { name: "months", label: "Months" },
    ],

    calculate: ({ loan, rate, months }) => {
      if (!loan || !rate || !months) return null;

      const r = rate / 12 / 100;
      return +(
        (loan * r * Math.pow(1 + r, months)) /
        (Math.pow(1 + r, months) - 1)
      ).toFixed(2);
    },
  },

  // 📊 PERCENTAGE
  {
    id: "percentage",
    title: "Percentage",
    icon: "📊",
    category: "Math",

    inputs: [
      { name: "value", label: "Value" },
      { name: "total", label: "Total" },
    ],

    calculate: ({ value, total }) =>
      value && total ? +((value / total) * 100).toFixed(2) : null,

    ranges: [
      { label: "Low", min: 0, max: 40 },
      { label: "Average", min: 40, max: 75 },
      { label: "Good", min: 75, max: 100 },
    ],
  },

  // 🌡️ TEMPERATURE
  {
    id: "temp",
    title: "Temperature",
    icon: "🌡️",
    category: "Conversion",

    inputs: [{ name: "celsius", label: "Celsius (°C)" }],

    calculate: ({ celsius }) =>
      celsius !== undefined
        ? +((celsius * 9) / 5 + 32).toFixed(2)
        : null,
  },

  // 🧾 GST
  {
    id: "gst",
    title: "GST Calculator",
    icon: "🧾",
    category: "Finance",

    inputs: [
      { name: "amount", label: "Amount (₹)" },
      { name: "rate", label: "GST (%)" },
    ],

    calculate: ({ amount, rate }) => {
      if (!amount || !rate) return null;

      const gst = (amount * rate) / 100;

      return {
        gst: +gst.toFixed(2),
        total: +(amount + gst).toFixed(2),
      };
    },
  },

  // 📏 DISTANCE
  {
    id: "distance",
    title: "Distance Converter",
    icon: "📏",
    category: "Conversion",

    inputs: [
      {
        name: "value",
        label: "Distance",
        units: ["km", "mile"],
        defaultUnit: "km",
      },
    ],

    calculate: ({ value, unit }) => {
      if (!value) return null;

      let km = unit === "mile" ? value * 1.60934 : value;

      return {
        km: +km.toFixed(2),
        mile: +(km / 1.60934).toFixed(2),
      };
    },
  },

  // ⚖️ WEIGHT
  {
    id: "weight",
    title: "Weight Converter",
    icon: "⚖️",
    category: "Conversion",

    inputs: [
      {
        name: "value",
        label: "Weight",
        units: ["kg", "lb"],
        defaultUnit: "kg",
      },
    ],

    calculate: ({ value, unit }) => {
      if (!value) return null;

      let kg = unit === "lb" ? value * 0.453592 : value;

      return {
        kg: +kg.toFixed(2),
        lb: +(kg / 0.453592).toFixed(2),
      };
    },
  },

  //  TIME
  {
    id: "time",
    title: "Time Converter",
    icon: "⏱️",
    category: "Conversion",

    inputs: [
      {
        name: "value",
        label: "Time",
        units: ["seconds", "minutes", "hours"],
        defaultUnit: "seconds",
      },
    ],

    calculate: ({ value, unit }) => {
      if (!value) return null;

      let sec =
        unit === "minutes"
          ? value * 60
          : unit === "hours"
          ? value * 3600
          : value;

      return {
        seconds: sec,
        minutes: +(sec / 60).toFixed(2),
        hours: +(sec / 3600).toFixed(2),
      };
    },
  },
];