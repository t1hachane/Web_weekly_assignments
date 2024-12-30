const display = document.getElementById('display');

function clearOne() {
  display.value = display.value.slice(0, -1);
}
function clearAll() {
  display.value = '';
}
function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
}
function square() {
  try {
    display.value = Math.pow(parseFloat(display.value), 2);
  } catch (error) {
    display.value = 'Error';
  }
}

function percent() {
  display.value = parseFloat(display.value) / 100;
}
function updateDisplay(value) {
  display.value += value;
  display.scrollLeft = display.scrollWidth;
}

document.querySelectorAll('.btn-operator').forEach(button => {
  button.addEventListener('click', () => {
    if (button.id === 'clear-one') clearOne();
    else if (button.id === 'clear-all') clearAll();
    else if (button.id === 'square') {
      square();
      updateDisplay("²");
    }
    else if (button.id === 'percent') {
      percent();
    }
    else updateDisplay(button.textContent);
  });
});


document.querySelectorAll('.btn-number').forEach(button => {
  button.addEventListener('click', () => {
    updateDisplay(button.innerText);
  });
});

document.getElementById('equal').addEventListener('click', calculate);