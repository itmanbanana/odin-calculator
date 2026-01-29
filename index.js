const add = (a, b) => { return a + b; }
const subtract = (a, b) => { return a - b; }
const multiply = (a, b) => { return a * b; }
const divide = (a, b) => { return a / b; } 

function doBinaryOperation(a, b, op) {
    switch(op) {
        case '+': return String(add(a, b));       
        case '-': return String(subtract(a, b));       
        case '\u00D7': return String(multiply(a, b));       
        case '\u00F7': 
            if (b !== 0) return String(divide(a, b));
            return "Divide by 0 error";
        default: return "Operation not recognized";       
    }
}

let firstNum = '';
let secondNum = '';
let operator = '';

// Number buttons
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        updateNumbers(btn.textContent);
        updateCalcDisplay((operator === '' || bufferedSecondNum !== '') ? firstNum : secondNum);
    });
});

function updateNumbers(num) {
    if (num === '0' && (firstNum === '' || secondNum === '')) return;
    if (bufferedSecondNum !== '') firstNum = '';

    if (operator === '' || bufferedSecondNum !== '') firstNum += num;
    else secondNum += num;
}

// Equals button
let equalsButton = document.querySelector(".equals");

let bufferedSecondNum = '';

equalsButton.addEventListener("click", (e) => {
    e.preventDefault();
    logState();
    
    if (operator === '') return;
    
    if (bufferedSecondNum === '') {
        bufferedSecondNum = secondNum;
        secondNum = '';
    }

    let result = doBinaryOperation(Number(firstNum), Number(bufferedSecondNum), operator);
    firstNum = result;
    updateCalcDisplay(result);
});

// Operator buttons
let binaryOpButtons = document.querySelectorAll(".binary-op");
binaryOpButtons.forEach((op) => {
    op.addEventListener("click", (e) => {
        e.preventDefault(); 
        logState();

        if (operator === '') {
            operator = op.textContent;
            return;
        }
        if (operator === op.textContent) return;
        
        let result = doBinaryOperation(Number(firstNum), Number(secondNum), operator);
        
        operator = op.textContent;
        firstNum = result;
        bufferedSecondNum = '';
        secondNum = '';
        
        updateCalcDisplay(result);
    });
});

let unaryOpButtons = document.querySelectorAll(".unary-op");

// Display and clearing
let calcDisplay = document.querySelector(".calc-display");

let calcClearButton = document.querySelector(".clear");
calcClearButton.addEventListener("click", clearCalc);

function updateCalcDisplay(display) {
    calcDisplay.textContent = display; 
}

function logState() {
    console.log(`First num: ${firstNum}`);
    console.log(`Second num: ${secondNum}`);
    console.log(`Buffered second num: ${bufferedSecondNum}`);
    console.log(`Operator: ${operator}`);
}

function clearCalc() {
    firstNum = '';
    secondNum = '';
    operator = '';
    bufferedOp = '';
    bufferedSecondNum = '';
    updateCalcDisplay();
}