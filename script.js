function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return Math.round((+a * +b)*1000)/1000;
}

function divide(a, b) {
    return Math.round((+a / +b) * 1000) / 1000;
}

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            inputOne = add(a, b); // EVALUATE AND DISPLAY
            console.log(inputOne);
            break;
        case "-":
            inputOne = subtract(a, b); // EVALUATE AND DISPLAY
            console.log(inputOne);
            break;
        case "*":
            inputOne = multiply(a, b); // EVALUATE AND DISPLAY
            console.log(inputOne);
            break;
        case "/":
            inputOne = divide(a, b); // EVALUATE AND DISPLAY
            console.log(inputOne);
            break;
    }
}



let inputOne = prompt("Choose a number");
let operator = prompt("Choose an operator");
let inputTwo = prompt("Choose a number");

operate(inputOne, inputTwo, operator);