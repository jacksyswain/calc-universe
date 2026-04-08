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

  // DISTANCE
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
  // 📐 AREA (MORE TYPES)
  {
    id: "area-advanced",
    title: "Area Converter",
    icon: "📐",
    category: "Math",

    inputs: [
      {
        name: "value",
        label: "Area",
        units: ["sqm", "sqft"],
        defaultUnit: "sqm",
      },
    ],

    calculate: ({ value, unit }) => {
      if (!value) return null;

      let sqm = unit === "sqft" ? value * 0.092903 : value;

      return {
        sqm: +sqm.toFixed(2),
        sqft: +(sqm * 10.7639).toFixed(2),
      };
    },
  },

  // 🚗 SPEED CONVERTER
  {
    id: "speed",
    title: "Speed Converter",
    icon: "🚗",
    category: "Conversion",

    inputs: [
      {
        name: "value",
        label: "Speed",
        units: ["kmh", "mph"],
        defaultUnit: "kmh",
      },
    ],

    calculate: ({ value, unit }) => {
      if (!value) return null;

      let kmh = unit === "mph" ? value * 1.60934 : value;

      return {
        kmh: +kmh.toFixed(2),
        mph: +(kmh * 0.621371).toFixed(2),
      };
    },
  },

  // 🧮 POWER CALCULATOR
  {
    id: "power",
    title: "Power Calculator",
    icon: "⚡",
    category: "Math",

    inputs: [
      { name: "base", label: "Base" },
      { name: "exponent", label: "Exponent" },
    ],

    calculate: ({ base, exponent }) =>
      base && exponent ? Math.pow(base, exponent) : null,
  },

  // 📦 VOLUME (CUBE)
  {
    id: "volume",
    title: "Volume (Cube)",
    icon: "📦",
    category: "Math",

    inputs: [
      { name: "side", label: "Side" },
    ],

    calculate: ({ side }) =>
      side ? +(side * side * side).toFixed(2) : null,
  },

  // 🧠 BMI IDEAL WEIGHT
  {
    id: "ideal-weight",
    title: "Ideal Weight",
    icon: "🧠",
    category: "Health",

    inputs: [
      {
        name: "height",
        label: "Height",
        units: ["cm"],
        defaultUnit: "cm",
      },
    ],

    calculate: ({ height }) => {
      if (!height) return null;

      // Devine formula approx
      const ideal = 50 + 0.9 * (height - 152);

      return {
        idealWeight: +ideal.toFixed(2),
      };
    },
  },

  // 💸 DISCOUNT CALCULATOR
  {
    id: "discount",
    title: "Discount Calculator",
    icon: "💸",
    category: "Finance",

    inputs: [
      { name: "price", label: "Original Price" },
      { name: "discount", label: "Discount (%)" },
    ],

    calculate: ({ price, discount }) => {
      if (!price || !discount) return null;

      const saved = (price * discount) / 100;
      const final = price - saved;

      return {
        saved: +saved.toFixed(2),
        finalPrice: +final.toFixed(2),
      };
    },
  },

  // 🔢 RANDOM NUMBER
  {
    id: "random",
    title: "Random Number Generator",
    icon: "🎲",
    category: "General",

    inputs: [
      { name: "min", label: "Min" },
      { name: "max", label: "Max" },
    ],

    calculate: ({ min, max }) => {
      if (min === undefined || max === undefined) return null;

      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
  // 🧮 FACTORIAL
  {
    id: "factorial",
    title: "Factorial Calculator",
    icon: "🧮",
    category: "Math",

    inputs: [
      { name: "number", label: "Number" },
    ],

    calculate: ({ number }) => {
      if (number === undefined || number < 0) return null;

      let result = 1;
      for (let i = 1; i <= number; i++) {
        result *= i;
      }

      return result;
    },
  },

  // 🔢 PRIME CHECK
  {
    id: "prime",
    title: "Prime Checker",
    icon: "🔢",
    category: "Math",

    inputs: [
      { name: "number", label: "Number" },
    ],

    calculate: ({ number }) => {
      if (!number || number < 2) return "Not Prime";

      for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return "Not Prime";
      }

      return "Prime";
    },
  },

  // 📅 DAYS BETWEEN DATES
  {
    id: "days-between",
    title: "Days Between Dates",
    icon: "📅",
    category: "General",

    inputs: [
      { name: "start", label: "Start Date (YYYY-MM-DD)" },
      { name: "end", label: "End Date (YYYY-MM-DD)" },
    ],

    calculate: ({ start, end }) => {
      if (!start || !end) return null;

      const d1 = new Date(start);
      const d2 = new Date(end);

      const diff =
        Math.abs(d2 - d1) / (1000 * 60 * 60 * 24);

      return Math.floor(diff);
    },
  },

  // 💳 LOAN INTEREST TOTAL
  {
    id: "loan-total",
    title: "Loan Total Interest",
    icon: "💳",
    category: "Finance",

    inputs: [
      { name: "principal", label: "Principal" },
      { name: "rate", label: "Rate (%)" },
      { name: "years", label: "Years" },
    ],

    calculate: ({ principal, rate, years }) => {
      if (!principal || !rate || !years) return null;

      const interest = (principal * rate * years) / 100;

      return {
        interest: +interest.toFixed(2),
        total: +(principal + interest).toFixed(2),
      };
    },
  },

  // 📈 PROFIT / LOSS
  {
    id: "profit-loss",
    title: "Profit & Loss",
    icon: "📈",
    category: "Finance",

    inputs: [
      { name: "cost", label: "Cost Price" },
      { name: "selling", label: "Selling Price" },
    ],

    calculate: ({ cost, selling }) => {
      if (!cost || !selling) return null;

      const diff = selling - cost;
      const percent = (diff / cost) * 100;

      return {
        type: diff > 0 ? "Profit" : "Loss",
        amount: Math.abs(diff).toFixed(2),
        percent: Math.abs(percent).toFixed(2),
      };
    },
  },

  // 🧪 BMI CATEGORY EXPLAINER
  {
    id: "bmi-info",
    title: "BMI Info",
    icon: "🧪",
    category: "Health",

    inputs: [
      { name: "bmi", label: "Enter BMI" },
    ],

    calculate: ({ bmi }) => {
      if (!bmi) return null;

      if (bmi < 18.5) return "Underweight";
      if (bmi < 25) return "Normal";
      if (bmi < 30) return "Overweight";
      return "Obese";
    },
  },

  // 🔋 ELECTRICITY BILL
  {
    id: "electricity",
    title: "Electricity Bill",
    icon: "🔋",
    category: "General",

    inputs: [
      { name: "units", label: "Units Consumed" },
      { name: "rate", label: "Rate per Unit" },
    ],

    calculate: ({ units, rate }) => {
      if (!units || !rate) return null;

      const total = units * rate;

      return {
        bill: total.toFixed(2),
      };
    },
  },

  // 🧊 CYLINDER VOLUME
  {
    id: "cylinder",
    title: "Cylinder Volume",
    icon: "🧊",
    category: "Math",

    inputs: [
      { name: "radius", label: "Radius" },
      { name: "height", label: "Height" },
    ],

    calculate: ({ radius, height }) => {
      if (!radius || !height) return null;

      return +(Math.PI * radius * radius * height).toFixed(2);
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