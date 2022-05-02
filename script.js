/*


*/

const calculator = {
    firstNum: 0,
    secondNum: 0,
};


const calcScreen = document.querySelector(".input p");
const btns = [...document.querySelectorAll("button")];

for (const btn of btns) {
    btn.addEventListener('click', () => {
        display(btn.textContent, btn.classList[0]);
    });
}

document.addEventListener('keydown', event => {
    event.preventDefault(); // shift + "n" or N does not work, so necessary
    if (!isNaN(event.key)) {
        display(event.key, "number");
    } else {
        switch (event.key) {
            case "A": // ALL CLEAR
                display("AC", "AC");
                break;
            case "Backspace":
                display("DEL", "DEL");
                break;
            case "N": // ANS
                display("Ans", "misc");
                break;
            case "/":
                display("/", "operator");
                break;
            case "*":
                display("*", "operator");
                break;
            case "+":
                display("+", "operator");
                break;
            case "-":
                display("-", "operator");
                break;
            case ".":
                display(".", "misc");
                break;
            case "F5": // preventDefault() is on and I like to F5 :D
                location.reload();
                break;
            case "Enter":
                display("=", "operator");
                break;
            default:
                console.log("Not supported");
        }
    }

});


function display(textContent, firstClass) {
    calculator.textContent = textContent; // change name maybe
    switch (firstClass) {
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
    console.table(calculator);
}

function number() {
    // If user chooses a number after calculation and not an operator
    // reset and start anew, hence this if statement
    if (calcScreen.textContent == "") {
        calculator.firstNum = 0;
    }
    calcScreen.textContent += calculator.textContent;
    if (!calculator.operator) {
        const output = document.querySelector(".output p");
        output.textContent = "";
        calculator.firstNum += calculator.textContent;
    } else {
        calculator.secondNum += calculator.textContent;
    }
}

// +, -, *, / and =
function operator() {
    if (!calculator.operator) {
        if (calculator.textContent != "=") {
            calcScreen.textContent += calculator.textContent;
            calculator.operator = calculator.textContent;
        } else if (calculator.textContent == "=") {
            const output = document.querySelector(".output p");
            // 09 => 9, leaved 0 before because of dot 
            // ( you can write .5 + .5 = 1)
            calculator.ans = +parseFloat(calculator.firstNum);
            output.textContent = +parseFloat(calculator.firstNum);
            calculator.secondNum = 0;
            calcScreen.textContent = ""; // necessary, for it causes bugs >:D
        }
    } else {
        // run IF the last input was NOT an operator
        if (!isNaN(+calcScreen.textContent.charAt(calcScreen.textContent.length - 1))) {
            calculator.firstNum = operate(calculator.firstNum,
                calculator.secondNum, calculator.operator);
            calculator.secondNum = 0;
            calcScreen.textContent = "";// USE ans in text INSTEAD
            if (calculator.textContent != "=") {
                calcScreen.textContent += calculator.textContent;
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
    calcScreen.textContent = "";
    delete calculator.operator;
    calculator.firstNum = 0;
    calculator.secondNum = 0;
    const output = document.querySelector(".output p");
    output.textContent = "";
}

// delete only last input
function DEL() {
    const toDelete = calcScreen.textContent.charAt(calcScreen.textContent.length - 1);
    if (isNaN(+toDelete) && toDelete != ".") {
        delete calculator.operator;
    } else {
        if (calculator.secondNum == 0) {
            if (toDelete == ".") { // big happened, rethink code maybe :(?
                calculator.secondNum = 0;
            } else {
                calculator.firstNum = calculator.firstNum.toString().slice(0,
                    calculator.firstNum.length - 1);
            }
        } else {
            calculator.secondNum = calculator.secondNum.toString().slice(0,
                calculator.secondNum.length - 1);
        }
    }
    calcScreen.textContent = calcScreen.textContent.slice(0, -1);

}

// For dot (.) and Ans
function misc() {
    if (calculator.textContent == ".") {
        if (!calculator.operator) {
            if (!calculator.firstNum.toString().includes(".")) {
                calculator.firstNum += calculator.textContent;
                calcScreen.textContent += calculator.textContent;
            }
        } else {
            if (!calculator.secondNum.toString().includes(".")) {
                calculator.secondNum += calculator.textContent;
                calcScreen.textContent += calculator.textContent;
            }
        }
    } else {
        /*
        if (!calculator.operator) {
        calculator.firstNum -= 2 * calculator.firstNum;
        calcScreen.textContent = calculator.firstNum;
        } */
        if (typeof (calculator.ans) != "undefined") {
            // same reasoning as with number()
            const output = document.querySelector(".output p");
            output.textContent = "";
            if (calcScreen.textContent == "") {
                calculator.firstNum = 0;
            }
            calcScreen.textContent += calculator.ans;
            if (!calculator.operator) {
                calculator.firstNum += calculator.ans;
            } else {
                calculator.secondNum += calculator.ans;
            }
        }
    }
}

function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return Math.round((+a * +b) * 10e10) / 10e10;
}

function divide(a, b) {
    return Math.round((+a / +b) * 10e10) / 10e10;
}

function operate(a, b, operator) {
    const output = document.querySelector(".output p");
    let answer;
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

    return answer; // calculating with non-rounded numbers only and
    // outputting it rounded
}
