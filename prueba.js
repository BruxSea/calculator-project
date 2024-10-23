let firstNumber = null;
let operator = null;

const buttons = document.querySelectorAll('.buttons button');
const display = document.querySelector('.display');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Si se hace clic en un número
        if (!isNaN(value)) {
            display.value += value;
        }
        // Si se hace clic en el "="
        else if (value === "=") {
            const secondNumber = parseFloat(display.value);

            if (firstNumber !== null && operator !== null && !isNaN(secondNumber)) {
                let result = null;

                // Switch para evaluar el operador
                switch (operator) {
                    case "+":
                        result = firstNumber + secondNumber;
                        break;
                    case "-":
                        result = firstNumber - secondNumber;
                        break;
                    case "*":
                        result = firstNumber * secondNumber;
                        break;
                    case "/":
                        result = secondNumber !== 0 ? firstNumber / secondNumber : "Error";
                        break;
                    default:
                        result = "Error";
                        break;
                }

                display.value = result;
                firstNumber = null;
                operator = null;
            }
        }
        // Si se hace clic en un operador (+, -, *, /)
        else {
            if (firstNumber === null) {
                firstNumber = parseFloat(display.value);
                operator = value;
                display.value += ` ${operator} `;
            }
        }
    });
});
