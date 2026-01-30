const add = (a, b) => { return a + b; }
const subtract = (a, b) => { return b - a; }
const multiply = (a, b) => { return a * b; }
const divide = (a, b) => { return b / a; } 

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

function doUnaryOperation(a, op) {
    switch(op) {
        case '\u221A': // Square root
            return String(Math.sqrt(a));
        case '\u00B1': // Plus minus
            a /= -1;
            return String(a);
        default: return "Operation not recognized";    
    }
}

let displayNum = '';
let memoryNum = '';
let operator = '';

const MAX_NUM_LENGTH = 12;

// Display, clearing, and memory
let calcDisplay = document.querySelector(".calc-display");

let calcClearButton = document.querySelector(".clear");
calcClearButton.addEventListener("click", clearCalc);

function refreshDisplay(display) { 
    display = display.slice(0, MAX_NUM_LENGTH);
    calcDisplay.textContent = display; 
}

function logState() {
    console.log(`displayNum: ${displayNum}`);
    console.log(`memoryNum: ${memoryNum}`);
    console.log(`operator: ${operator}`);
}

function clearCalc() {
    displayNum = '';
    memoryNum = '';
    operator = '';
    refreshDisplay('');
}

function checkInput(digit) {
    return ((digit !== '0' || displayNum.length > 0) 
            && displayNum.length < MAX_NUM_LENGTH);
}

function shiftMemory() {
    memoryNum = displayNum;
    displayNum = '';
}

// Number buttons
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        let digit = btn.textContent;
        if (checkInput(digit)) {
            if (equalsJustPressed) displayNum = '';
            if (displayNum !== calcDisplay.textContent) memoryNum = calcDisplay.textContent;
            displayNum += digit;
            refreshDisplay(displayNum);
            logState();
        } 

        equalsJustPressed = false;
    });
});

let decimalPointButton = document.querySelector(".decimal-point");
decimalPointButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (displayNum.includes('.')) return;
    if (equalsJustPressed) displayNum = '';
    if (displayNum !== calcDisplay.textContent) memoryNum = calcDisplay.textContent;
    displayNum = (displayNum === '') ? '0.' : displayNum + '.';
    refreshDisplay(displayNum);
    logState();

    equalsJustPressed = false;
});

// Equals button
let equalsButton = document.querySelector(".equals");
let equalsJustPressed = false;

equalsButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (memoryNum !== '') {
        let result = doBinaryOperation(Number(displayNum), Number(memoryNum), operator);
        displayNum = result.slice(0, MAX_NUM_LENGTH);
        refreshDisplay(result);
    }

    equalsJustPressed = true;
    logState();
});

// Operator buttons
let binaryOpButtons = document.querySelectorAll(".binary-op");
binaryOpButtons.forEach((op) => {
    op.addEventListener("click", (e) => {
        e.preventDefault(); 

        if (memoryNum !== '' && displayNum !== '') {
            let result = doBinaryOperation(Number(displayNum), Number(memoryNum), operator);
            refreshDisplay(result);
        }

        operator = op.textContent;
        shiftMemory();
        logState();

        equalsJustPressed = false;
    });
});

let unaryOpButtons = document.querySelectorAll(".unary-op");
unaryOpButtons.forEach((op) => {
    op.addEventListener("click", (e) => {
        e.preventDefault();

        if (displayNum !== '') {
            let result = doUnaryOperation(displayNum, op.textContent);
            displayNum = result.slice(0, MAX_NUM_LENGTH);
            refreshDisplay(result);
        }
        
        logState();
        equalsJustPressed = false;
    })
})