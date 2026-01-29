const add = (a, b) => { return a + b; }
const subtract = (a, b) => { return a - b; }
const multiply = (a, b) => { return a * b; }
const divide = (a, b) => { return a / b; }

function operate(a, b, op) {
    switch(op) {
        case '+': return add(a, b);       
        case '-': return subtract(a, b);       
        case '*': return multiply(a, b);       
        case '/': 
            if (b !== 0) return divide(a, b);
            return "Divide by 0 error";
        default: return "Operation not recognized";       
    }
}