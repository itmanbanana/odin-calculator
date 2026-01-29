// ----------------------- Elements (Globals Const) ---------------------
const calcDisplayElem = document.querySelector(".calc-display");
const numberElems = document.querySelectorAll(".number");
const bopElems = document.querySelectorAll(".binary-op")


// -------------------------- Global Consts -------------------------------
const BOPS = ["+", "-", "\u00D7", "\u00F7"];


// -------------------------- Global States -----------------------------
const stack = [];


// -------------------------- Helper Functions --------------------------
function updateDisplay(x) {
    calcDisplayElem.textContent = x;
}

function evaluateOperation(op, x, y) {
    if (op == "+") {
        return x + y;
    } else if (op == "-") {
        return x - y;
    } else if (op == "\u00D7") {
        return x * y;
    } else if (op == "\u00F7") {
        return x / y;
    } else {
        throw new Error("Operation Not Supported!!");
    }
}

function printDebug(...x) {
    console.log(...x)
}


// -------------------------- Events Listeners --------------------------
numberElems.forEach(element => {
    element.addEventListener('click', (e) => {
        const currNumberKey = e.target.textContent;
        const lastOperation = stack.pop();

        printDebug(stack, currNumberKey);

        if (BOPS.includes(lastOperation)) {
            const otherOperand = stack.pop();
            let localRes = evaluateOperation(lastOperation, otherOperand, currNumberKey);
            stack.push(localRes);
            updateDisplay(localRes);
            return;
        }

        stack.push(currNumberKey);
        updateDisplay(currNumberKey);
    });
});

bopElems.forEach(element => {
    element.addEventListener('click', (e) => {
        let currKey = e.target.textContent;

        printDebug(stack, currKey);
        stack.push(currKey);
    })
})
