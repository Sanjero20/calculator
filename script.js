let temp;
let currentOperation = undefined;
let prevOperand = "";
let currOperand = "";

const upper_screen = document.querySelector(".upper-display");
const lower_screen = document.querySelector(".lower-display");

const buttons = document.querySelectorAll(".numbers");
const btnOperations = document.querySelectorAll(".operations")

const btnClear = document.getElementById('btn-clear');
const btnBSpace = document.getElementById('btn-backspace');
const btnEqual = document.getElementById('btn-equal');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    let number = button.textContent
    currOperand =  appendNumber(number);
    updateDisplay();
  })
})

btnOperations.forEach(button => {
  button.addEventListener('click', () => {
    selectOperation(button.textContent)
    updateDisplay();
  })
})

btnClear.addEventListener('click', () => {
  currOperand = "";
  prevOperand = "";
  updateDisplay();
})
btnBSpace.addEventListener('click', () => {
  checkForError();
  let str = getValue();
  currOperand = str.substring(0, str.length-1);
  updateDisplay();
})

btnEqual.addEventListener('click', () => {
  compute()
  updateDisplay()
})

// Calculator functions
function selectOperation(operation) {
  if (currOperand == "Math Error") return;
  if (currOperand === "") return;
  if (prevOperand !== "") {
    compute();
  }
  currentOperation = operation;
  prevOperand = currOperand;
  currOperand = "";
}

function compute() {
  let total;
  const a = parseFloat(prevOperand);
  const b = parseFloat(currOperand);
  if (isNaN(a) || isNaN(b)) return
  switch(currentOperation) {
    case "+":
      total = add(a, b);
      break;
    case "-":
      total = sub(a, b);
      break;
    case "×":
      total = mul(a, b);
      break;
    case "÷":
      total = div(a, b);
      break;
    case "%":
      total = mod(a, b);
      break;
    default:
      return;
  }
  currOperand = total;
  operation = undefined;
  prevOperand = "";
}

// Operation Functions
function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mul(a, b) { return a * b; }
function div(a, b) { 
  if (b <= 0) {
    return "Math Error";
  }
  return a / b; 
}
function mod(a, b) { return a % b; }

// Other functions 
function appendNumber(next) {
  checkForError();
  let str = getValue();
  if (next === "." && str.includes(".")) return;
  let value = `${str}${next}`
  return value;
}

function updateDisplay() {
  lower_screen.innerHTML = currOperand;
  upper_screen.innerHTML = prevOperand;

  if (prevOperand != "") {
    upper_screen.innerHTML = `${prevOperand} ${currentOperation}`;
  }
}

function clearAll() {
  currOperand = "";
  prevOperand = "";
  updateDisplay();
}

function getValue() {
  // Gets the current Operand
  let value = lower_screen.textContent.trim()
  return value;
}

function checkForError() {
  if (currOperand == "Math Error") {
    clearAll();
  }
}
