const calculator = document.querySelector(".container");
const display = document.querySelector(".display");

let firstNum = "0";
let secondNum = null;
let operator = null;

calculator.addEventListener("click", calcExpression);

function calcExpression(e) {
  const button = e.target;

  if (button.value === "%" && secondNum === null) {
    firstNum = parseFloat((firstNum / 100).toFixed(3)).toString();
    display.textContent = firstNum;
  }

  if (button.value === "+/-" && secondNum === null && firstNum !== "0") {
    if (firstNum.split("").includes("-")) return;
    firstNum = "-" + firstNum;
    display.textContent = firstNum;
  }

  if (button.value === "AC") {
    firstNum = "0";
    secondNum = null;
    operator = null;
    display.textContent = "0";
  }

  calculate(button);

  if (operator) {
    setSecondNum(button);
  } else {
    setFirstNum(button);
  }

  if (firstNum) {
    if (button.classList.contains("func-2") && button.value !== "=") {
      operator = button.textContent;
    }
  }
}

function calculate(button) {
  if (firstNum && operator && secondNum && !checkIsNumOrPoint(button)) {
    switch (operator) {
      case "+":
        operate(firstNum, secondNum, add);
        break;
      case "-":
        operate(firstNum, secondNum, subtract);
        break;
      case "X":
        operate(firstNum, secondNum, multiply);
        break;
      case "/":
        operate(firstNum, secondNum, divide);
        break;
    }

    firstNum = display.textContent;
    secondNum = null;
    operator = null;
  }
}

function checkIsNumOrPoint(button) {
  return (
    button.classList.contains("digit") || button.classList.contains("point")
  );
}

function hasPoint(number) {
  const splitNumber = number.split("");

  return splitNumber.includes(".");
}

function setFirstNum(button) {
  if (checkIsNumOrPoint(button)) {
    if (
      (firstNum && firstNum !== "0") ||
      (firstNum === "0" && button.value === ".")
    ) {
      if (hasPoint(firstNum) && button.value === ".") {
        return;
      } else {
        firstNum += button.value;
      }
    } else {
      if (button.value === ".") {
        return;
      } else {
        firstNum = button.value;
      }
    }

    display.textContent = firstNum;
  }
}

function setSecondNum(button) {
  if (checkIsNumOrPoint(button)) {
    if (secondNum) {
      if (hasPoint(secondNum) && button.value === ".") {
        return;
      } else {
        secondNum += button.value;
      }
    } else {
      if (button.value === ".") {
        return;
      } else {
        secondNum = button.value;
      }
    }

    display.textContent = secondNum;
  }
}

function operate(firstNum, secondNum, operator) {
  const result = operator(Number(firstNum), Number(secondNum)).toFixed(3);
  display.textContent = parseFloat(result);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
