// ----------------------- Elements (Globals Const) ---------------------
const calcDisplayElem = document.querySelector(".calc-display");
const numberElems = document.querySelectorAll(".number");
const bopElems = document.querySelectorAll(".binary-op");



// -------------------------- Global Consts -------------------------------
const BOPS = ["+", "-", "\u00D7", "\u00F7"];
const DEBUG = true;



// -------------------------- Global States -----------------------------
const stack = [];



// -------------------------- Helper Functions --------------------------
function updateDisplay(x) {
    calcDisplayElem.textContent = x;
}

function evaluateOperation(op, x, y) {
    x = parseInt(x);
    y = parseInt(y);

    if (op == "+") return x + y;
    
    else if (op == "-") return x - y;
    
    else if (op == "\u00D7") return x * y;
    
    else if (op == "\u00F7") {
        if (y == 0) {
            throw new Error("Zero Division")
        }
        return x / y;
    }

    else throw new Error("Operation Not Supported!!");
}



// -------------------------- Events Listeners --------------------------
numberElems.forEach(element => {
    element.addEventListener('click', (e) => {
        const currNumberKey = e.target.textContent;
        const lastOperation = stack.pop();

        printDebug(stack, currNumberKey);

        let localRes = undefined;

        if (BOPS.includes(lastOperation)) {
            const otherOperand = stack.pop();
            localRes = evaluateOperation(lastOperation, otherOperand, currNumberKey);
        } else {
            localRes = currNumberKey;
        }

        stack.push(localRes);
        updateDisplay(localRes);
    });
});

bopElems.forEach(element => {
    element.addEventListener('click', (e) => {
        let currBopKey = e.target.textContent;
        let lastOperation = stack.pop();
        stack.push(lastOperation);  // we push it again cuz, we haven't evaluate it yet.. just take a seek into stack with this two lines.

        if (BOPS.includes(lastOperation)) {
            console.warn(`Dismissed last binary opeator input({$currBopKey}). cuz, too many operator without signnificat operand`);
            return;
        }

        printDebug(stack, currBopKey);
        stack.push(currBopKey);
    });
});



// ------------------------- Dumb Function (just exists) ----------------
function printDebug(...x) {
    if (DEBUG) console.log(...x);
}

