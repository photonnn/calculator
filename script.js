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

function addKeyPressEffect(arg0, arg) {
    for (const btn of btns) {
        if (btn.textContent == arg0) {
            btn.classList.toggle(`key${arg}`);
            setTimeout(() => btn.classList.toggle(`key${arg}`), 150);
        }
    }
}


document.addEventListener('keydown', event => {
    event.preventDefault(); // shift + "n" or N does not work, so necessary
    if (!isNaN(event.key)) {
        display(event.key, "number");
        // add effect when you press a button
        for (const btn of btns) {
            if (btn.textContent == event.key) {
                btn.classList.toggle("keynumber");
                setTimeout(() => btn.classList.toggle("keynumber"), 150);
            }
        }
    } else {
        switch (event.key) {
            case "A": // ALL CLEAR
                display("AC", "AC");
                addKeyPressEffect("AC", "delete");
                break;
            case "Backspace":
                display("DEL", "DEL");
                addKeyPressEffect("DEL", "delete");
                break;
            case "N": // ANS
                display("Ans", "misc");
                addKeyPressEffect("Ans", "misc");
                break;
            case "/":
                display("/", "operator");
                addKeyPressEffect("/", "operator");
                break;
            case "*":
                display("*", "operator");
                addKeyPressEffect("*", "operator");
                break;
            case "+":
                display("+", "operator");
                addKeyPressEffect("+", "operator");
                break;
            case "-":
                display("-", "operator");
                addKeyPressEffect("-", "operator");
                break;
            case ".":
                display(".", "misc");
                addKeyPressEffect(".", "misc");
                break;
            case "F5": // preventDefault() is on and I like to F5 :D
                location.reload();
                break;
            case "Enter":
                display("=", "operator");
                addKeyPressEffect("=", "operator");
                break;
            default:
                console.log("Not supported");
        }
    }

});


function display(textContent, firstClass) {
    calculator.textContent = textContent;
    switch (firstClass) {
        case "number":
            evalNumber();
            break;
        case "operator":
            evalOperator();
            break;
        case "misc":
            evalMisc();
            break;
        case "AC":
            evalAC();
            break;
        case "DEL":
            evalDEL();
            break;
    }
    console.table(calculator);
}

function evalNumber() {
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
function evalOperator() {
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
            calcScreen.textContent = ""; // cleared, so screen doesn't stack up
        }
    } else {
        // run IF the last input was NOT an operator
        // calculate using operate() only a single pair of numbers at a time:
        // aka 12 + 7 - 5 * 3 = 42
        if (!isNaN(+calcScreen.textContent.charAt(
            calcScreen.textContent.length - 1))) {
            calculator.firstNum = operate(calculator.firstNum,
                calculator.secondNum, calculator.operator);
            calculator.secondNum = 0;
            calcScreen.textContent = ""; // cleared, so screen doesn't stack up
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
function evalAC() {
    calcScreen.textContent = "";
    delete calculator.operator;
    calculator.firstNum = 0;
    calculator.secondNum = 0;
    const output = document.querySelector(".output p");
    output.textContent = "";
}

// delete only last input
function evalDEL() {
    const toDelete = calcScreen.textContent.charAt(calcScreen.textContent.length - 1);
    if (isNaN(+toDelete) && toDelete != ".") {
        delete calculator.operator;
    } else {
        // strict necessary because when secondNum == 0, will yield true even 
        // if sN is "0."
        if (calculator.secondNum === "0") {
            calculator.firstNum = calculator.firstNum.toString().slice(0,
                calculator.firstNum.length - 1);
        } else {
            calculator.secondNum = calculator.secondNum.toString().slice(0,
                calculator.secondNum.length - 1);
        }
    }
    calcScreen.textContent = calcScreen.textContent.slice(0, -1);

    if (calcScreen.textContent == "") {
        const output = document.querySelector(".output p");
        output.textContent = "";
    }


}

// For dot (.) and Ans
function evalMisc() {
    // DOT
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
        // ANS
        // when used hasn't calculated anything yet
        if (typeof (calculator.ans) != "undefined") {
            const output = document.querySelector(".output p");
            output.textContent = "";
            // same reasoning as with number()
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
    return +a * +b;
}

function divide(a, b) {
    return +a / +b;
}

function operate(a, b, operator) {
    const output = document.querySelector(".output p");
    let answer;
    switch (operator) {
        case "+":
            answer = Math.round(add(a, b) * 10e10) / 10e10
            if (answer > 1000000) {
                output.textContent = answer.toExponential(6);
            } else {
                output.textContent = parseFloat(answer.toFixed(6));
            }
            calculator.ans = output.textContent;
            break;
        case "-":
            answer = Math.round(subtract(a, b) * 10e10) / 10e10
            if (answer > 1000000) {
                output.textContent = answer.toExponential(6);
            } else {
                output.textContent = parseFloat(answer.toFixed(6));
            }
            calculator.ans = output.textContent;
            break;
        case "*":
            answer = Math.round(multiply(a, b) * 10e10) / 10e10;
            if (answer > 1000000) {
                output.textContent = answer.toExponential(6);
            } else {
                output.textContent = parseFloat(answer.toFixed(6));
            }
            calculator.ans = output.textContent;
            break;
        case "/":
            answer = Math.round(divide(a, b) * 10e10) / 10e10;
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
