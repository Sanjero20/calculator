let var1 = null;
let var2 = null;
let total = null;

const upper_screen = document.querySelector(".upper-display");
const lower_screen = document.querySelector(".lower-display");
const buttons = document.querySelectorAll(".numbers");
const clear = document.getElementById('btn-clear');
const bSpace = document.getElementById('btn-backspace');


buttons.forEach(button => {
  button.onclick = function(e) {
    appendString(button.textContent);
  }
})

clear.onclick = clearAll;
bSpace.onclick = backSpace;


function appendString(next) {
  let str = lower_screen.textContent;
  lower_screen.innerHTML = `${str}${next}`
}

function clearAll() {
  upper_screen.innerHTML = "";
  lower_screen.innerHTML = "";
}
function backSpace() {
  let str = lower_screen.textContent;
  let part = str.substring(0, str.length-1);
  lower_screen.innerHTML = part;
}
