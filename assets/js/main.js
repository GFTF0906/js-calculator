// DOM ELEMENTS
const calcKeys = document.querySelectorAll('.key');
const display = document.querySelector('.display');

// FUNCTIONS
const clearDisplay = (digit) => {
  if (digit === 'c') display.textContent = display.textContent.slice(0, -1);
  else {
    display.style.fontSize = '1.5rem';
    display.textContent = '';
  }
};

const calcResult = (expression) => {
  const regexExpr = /^(-?[\d]+)(,[\d]+)?(\.[\d]+)?(\+|\/|-|\*|%)([\d]+)(,[\d]+)?(\.[\d]+)?$/gm;

  if (!regexExpr.test(expression)) {
    display.textContent = '';
    alert('Please, type a valid expression.');
    return;
  }

  const regexComma = /,/g;
  const result = Function(`return ${expression.trim()}`)(); 

  if (regexComma.test(expression)) {
    const newExpr = expression.replaceAll(',', '.');
    const result = Function(`return ${newExpr.trim()}`)();    

    display.textContent = result.toFixed(2);
  } else {
    display.textContent = result.toFixed(2);
  }

};

const resize = () => {
  display.textContent.length >= 9 ? display.style.fontSize = '0.8rem' : display.style.fontSize;
  display.textContent.length >= 20 ? display.style.fontSize = '0.6rem' : display.style.fontSize;
  display.textContent.length >= 27 ? display.style.fontSize = '0.1rem' : display.style.fontSize;
};

const checkAction = (digit) => {
  const regexClear = /(a?c)/g;

  if (digit === '=') {
    calcResult(display.textContent);
  } else if (regexClear.test(digit)) {
    clearDisplay(digit);
  } else {
    display.textContent += digit;
  }
};

const checkClick = () => {
  calcKeys.forEach(key => {
    key.addEventListener('click', e => {
      resize();

      const id = e.target.id;
      checkAction(id);        
    });
  });
};

const checkKeyDown = () => {
  const possibleKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '%', '/', '*', '-', '+', ',', 'Backspace', 'Delete', 'Enter'];

  document.addEventListener('keydown', (e) => {
    resize();
    
    if (possibleKeys.includes(e.key)) {
      const digit = e.key === 'Backspace' ? 'c' : e.key === 'Delete' ? 'ac' : e.key === 'Enter' ? '=' : e.key;
      checkAction(digit);
    }
  });

};

const init = () => {
  checkClick();
  checkKeyDown();
};

init();
