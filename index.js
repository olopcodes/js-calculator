// variables for the calculator
// Convert buttons NodeList to an array
//var btnsArr = Array.from(btns);
const inputField = document.querySelector('#numberInput');
inputField.style.textAlign = 'right';
const numberBtns = document.querySelectorAll('#calculator-numbers button');
const numberBtnsArray = Array.from(numberBtns);
const operationsBtns = document.querySelectorAll('#calculator-operations button');
const operationsBtnsArray = Array.from(operationsBtns);

const calculator = new Calculator(inputField, numberBtnsArray, operationsBtnsArray);