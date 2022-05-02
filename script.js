function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return Math.round((+a * +b) * 10e9) / 10e9;
}

function divide(a, b) {
    return Math.round((+a / +b) * 10e9) / 10e9;
}

function operate(a, b, operator) {
    const output = document.querySelector(".output p");
    let answer;

    output.textContent = "";
    switch (operator) {
        case "+":
            answer = add(a, b);
            if (answer > 1000000) {
                output.textContent = answer.toExponential(6);
            } else {
                output.textContent = parseFloat(answer.toFixed(6));
            }
            calculator.ans = output.textContent;
            break;
        case "-":
            answer = subtract(a, b);
            if (answer > 1000000) {
                output.textContent = answer.toExponential(6);
            } else {
                output.textContent = parseFloat(answer.toFixed(6));
            }
            calculator.ans = output.textContent;
            break;
        case "*":
            answer = multiply(a, b);
            if (answer > 1000000) {
                output.textContent = answer.toExponential(6);
            } else {
                output.textContent = parseFloat(answer.toFixed(6));
            }
            calculator.ans = output.textContent;
            break;
        case "/":
            answer = divide(a, b);
            if (answer > 1000000) {
                output.textContent = answer.toExponential(6);
            } else {
                output.textContent = parseFloat(answer.toFixed(6));
            }
            calculator.ans = output.textContent;
            break;
        case "=":
            operate(a, b, operator);
            return "";
    }

    return answer;
}


const screen = document.querySelector(".input p");
const btns = [...document.querySelectorAll("button")];
for (const btn of btns) {
    btn.addEventListener('click', display);
}

const calculator = {
    firstNum: 0,
    secondNum: 0,
};

function display() {
    console.table(calculator);
    calculator.textContent = this.textContent;
    switch (this.classList[0]) {
        case "number":
            number();
            break;
        case "operator":
            operator();
            break;
        case "misc":
            misc();
            break;
        case "AC":
            AC();
            break;
        case "DEL":
            DEL();
            break;
    }
}

function number() {
    // If user chooses a number after calculation and not an operator
    // reset and start anew, hence this if statement
    if (screen.textContent == "") {
        calculator.firstNum = 0;
    }
    screen.textContent += calculator.textContent;
    if (!calculator.operator) {
        const output = document.querySelector(".output p");
        output.textContent = "";
        calculator.firstNum += calculator.textContent;
    } else {
        calculator.secondNum += calculator.textContent;
    }
}

function operator() {
    if (!calculator.operator) {
        if (calculator.textContent != "=") {
            screen.textContent += calculator.textContent;
            calculator.operator = calculator.textContent;
        } else if (calculator.textContent == "=") {
            const output = document.querySelector(".output p");
            calculator.ans = +parseFloat(calculator.firstNum);
            output.textContent = +parseFloat(calculator.firstNum);
            calculator.secondNum = 0;
            screen.textContent = "";
        }
    } else {
        // run IF the last input was NOT an operator
        if (!isNaN(+screen.textContent.charAt(screen.textContent.length - 1))) {
            calculator.firstNum = operate(calculator.firstNum,
                calculator.secondNum, calculator.operator);
            calculator.secondNum = 0;
            screen.textContent = ""// USE ans in text INSTEAD
            if (calculator.textContent != "=") {
                screen.textContent += calculator.textContent;
                calculator.operator = calculator.textContent;
            }
        } else {
            // nothing happens because you repeated an operator
        }
        if (calculator.textContent == "=") {
            delete calculator.operator;
        }
    }
}

// all clear
function AC() {
    screen.textContent = "";
    delete calculator.operator;
    calculator.firstNum = 0;
    calculator.secondNum = 0;
    const output = document.querySelector(".output p");
    output.textContent = "";
}

// delete only last input
function DEL() {
    const toDelete = screen.textContent.charAt(screen.textContent.length - 1);
    if (isNaN(+toDelete)) {
        delete calculator.operator;
    } else {
        if (calculator.secondNum == 0) {
            calculator.firstNum = calculator.firstNum.slice(0,
                calculator.firstNum.length - 1);
        } else {
            calculator.secondNum = calculator.secondNum.slice(0,
                calculator.secondNum.length - 1);
        }
    }
    screen.textContent = screen.textContent.slice(0, -1);

}

function misc() {
    if (calculator.textContent == ".") {
        screen.textContent += calculator.textContent;
        if (!calculator.operator) {
            calculator.firstNum += calculator.textContent;
        } else {
            calculator.secondNum += calculator.textContent;
        }
    } else {
        /*
        if (!calculator.operator) {
        calculator.firstNum -= 2 * calculator.firstNum;
        screen.textContent = calculator.firstNum;
        } */
        if (typeof (calculator.ans) != "undefined") {
            screen.textContent += calculator.ans;
            if (!calculator.operator) {
                calculator.firstNum = calculator.ans;
            } else {
                calculator.secondNum = calculator.ans;
            }
        }
    }
}
