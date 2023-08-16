const minValue = 0;
const maxValue = 3999;
const firstTest1313 = "MCCCXIII";
const secondTest1414 = "MCDXIV";
const romanSymbols = new Map([
  [1, "I"],
  [5, "V"],
  [10, "X"],
  [50, "L"],
  [100, "C"],
  [500, "D"],
  [1000, "M"],
]);

const getRomanNumber = (digit, number) => {
  if (number === 0) return;

  switch (digit) {
    case 1: {
      const one = romanSymbols.get(1);
      const five = romanSymbols.get(5);
      switch (number) {
        case 1:
        case 2:
        case 3: {
          return one.repeat(number);
        }
        case 4: {
          return one + five;
        }
        case 5: {
          return five;
        }
        case 6:
        case 7:
        case 8: {
          return five + one.repeat(number - 5);
        }
        case 9: {
          return one + romanSymbols.get(10);
        }
        default:
          break;
      }
      break;
    }
    case 2: {
      const ten = romanSymbols.get(10);
      const fifty = romanSymbols.get(50);

      switch (number) {
        case 1:
        case 2:
        case 3: {
          return ten.repeat(number);
        }
        case 4: {
          return ten + fifty;
        }
        case 5: {
          return fifty;
        }
        case 6:
        case 7:
        case 8: {
          return fifty + ten.repeat(number - 5);
        }
        case 9: {
          return ten + romanSymbols.get(100);
        }
        default:
          break;
      }
      break;
    }
    case 3: {
      const hundred = romanSymbols.get(100);
      const fiveHundred = romanSymbols.get(500);

      switch (number) {
        case 1:
        case 2:
        case 3: {
          return hundred.repeat(number);
        }
        case 4: {
          return hundred + fiveHundred;
        }
        case 5: {
          return fiveHundred;
        }
        case 6:
        case 7:
        case 8: {
          return fiveHundred + hundred.repeat(number - 5);
        }
        case 9: {
          return hundred + romanSymbols.get(1000);
        }
        default:
          break;
      }
      break;
    }
    case 4: {
      if (number === 1 || number === 2 || number === 3) {
        return romanSymbols.get(1000).repeat(number);
      }
      break;
    }
    default:
      break;
  }
};

const arabicToRoman = document.getElementById("arabic-to-roman");
const romanToArabic = document.getElementById("roman-to-arabic");

arabicToRoman.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = +e.target[0].value;
  const output = document.getElementById("arabic-to-roman-result");
  output.innerText = "";

  if (!value || value < minValue || value > maxValue) {
    return;
  }

  let romanValue = "";

  const strArabic = value.toString();
  for (let i = 0; i < strArabic.length; i++) {
    romanValue += getRomanNumber(strArabic.length - i, +strArabic[i]);
  }

  output.innerText = "Result: " + romanValue;
});

romanToArabic.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = e.target[0].value;
  const output = document.getElementById("roman-to-arabic-result");
  output.innerText = "";

  if (!value) {
    return;
  }

  const arrayOfValues = value.split("");
  const romanSymbolsArray = [...romanSymbols.values()];

  arrayOfValues.forEach((symbol) => {
    if (!romanSymbolsArray.includes(symbol)) {
      output.innerText = "Error: The roman number is incorrect";
      return;
    }
  });

  if (output.innerText.startsWith("Error")) {
    return;
  }

  const convertedValues = arrayOfValues.map(
    (symbol) =>
      [...romanSymbols.entries()].filter((arr) => arr.includes(symbol))[0][0]
  );
  const arabicValue = convertedValues.reduce((acc, value, i, arr) => {
    let res = value;
    if (i !== arr.length - 1 && value < arr[i + 1]) {
      res = -value;
    }

    return (acc += res);
  }, 0);

  output.innerText = "Result: " + arabicValue;
});
