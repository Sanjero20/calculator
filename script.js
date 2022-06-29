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
    appendNumber(number);
  })
})

btnOperations.forEach(button => {
  button.addEventListener('click', () => {
    selectOperation(button.textContent)
    updateDisplay();
  })
})

btnClear.addEventListener('click', clearAll)
btnBSpace.addEventListener('click', delNumber)
btnEqual.addEventListener('click', compute)

window.addEventListener('keydown', keyboardHandler);

// Calculator functions
function selectOperation(operation) {
  if (currOperand == "Math Error") return;
  if (operation === "-" && currOperand === "") {
    currOperand += operation;
    return;
  }
  if (currOperand === "-" && currOperand.length <= 1) return;

  if (currOperand === "" && operation !== "-") {
    currentOperation = operation;
    return;
  }

  if (prevOperand !== "") compute();
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
  if (total == "Math Error") {
    currOperand = total;
    operation = undefined;
    prevOperand = "";
  } else {
    currOperand = total;
    currOperand = Math.round(total * 100000) / 100000;
    operation = undefined;
    prevOperand = "";
  }

  updateDisplay()
}

// Operation Functions
function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mul(a, b) { return a * b; }
function div(a, b) { 
  if (b === 0) {
    return "Math Error";
  }
  return a / b; }
function mod(a, b) { 
  if (b === 0) {
    return "Math Error";
  }
  return a % b; }

// Other functions 
function appendNumber(next) {
  checkForError();
  let str = getValue();
  if (next === "." && str.includes(".")) return;
  currOperand = `${str}${next}`
  updateDisplay();
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

function delNumber() {
  checkForError();
  let str = getValue();
  currOperand = str.substring(0, str.length-1);
  updateDisplay();
}

function getValue() {
  return lower_screen.textContent.trim()
}

function checkForError() {
  if (currOperand == "Math Error") {
    clearAll();
  }
}

function keyboardHandler(e) {
  if (e.key >=0 && e.key <= 9 || e.key === '.') appendNumber(e.key)
  if (e.key === 'Backspace') delNumber()
  if (e.key === 'Escape') clearAll()
  if (e.key === 'Enter') compute()
  if (e.key === '+' || e.key === '-' 
   || e.key === '*' || e.key === '/' || e.key === '%') {
    console.log(e.key)
    let op = convertKeyboardOperation(e.key)
    selectOperation(op)
    updateDisplay()
    compute()
   }
}

function convertKeyboardOperation(key) {
  if (key === '+') return "+" 
  if (key === '-') return "-"
  if (key === '*') return "×" 
  if (key === '/') return "÷"
  if (key === '%') return "%"
}
