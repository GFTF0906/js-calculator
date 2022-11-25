// DOM ELEMENTS
const calcKeys = document.querySelectorAll('.key');
const display = document.querySelector('.display');

// FUNCTIONS
const clearDisplay = (digit) => {
  if (digit === 'c') display.textContent = display.textContent.slice(0, -1);
  else display.textContent = '';
};

const calcResult = (expression) => {
  const regexExpr = /^([\d]+)(\+|\/|-|\*|%)([\d]+)$/gm;

  if (!regexExpr.test(expression) || expression.startsWith('*') || expression.startsWith('/') || expression.startsWith('%')) {
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

calcKeys.forEach(key => {
  key.addEventListener('click', e => {
    const id = e.target.id;
    
    const regexClear = /(a?c)/g;
    
    if (id === '=') {
      calcResult(display.textContent);
    } else if (regexClear.test(id)) {
      clearDisplay(id);
    } else {
      display.textContent += id;   
    }
        
  });
});
