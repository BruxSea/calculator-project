const buttons = document.querySelectorAll('.buttons button');
const display = document.querySelector('.display');

// Variables to store numbers and operators, initialized to null for empty state at the beginning
let firstNumber = null;
let operator = null;

// Functions for arithmetic operations
function add(a, b){
   return a + b;
};

function subtract(a, b) {
   return a - b;
};

function multiply(a, b) {
   return a * b;
}

function divide(a, b) {
    if (b === 0){
        return "Error: You can't divide by zero"; // Error handling for division by zero
    }
    return a / b;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // If a number is clicked, display it on the screen
        if (!isNaN(value) || value === ".") {
            if (value === "." && display.value.includes(".")){
                return; // Prevent adding multiple decimal points
            }
            display.value += value; // Append the value to the display
        }

        // Check for decimal point input
        else if (value === ".") {
            if (!display.value.includes(".")) {
                display.value += value; // Add the decimal point if not already present
            }
        }

        // If the "=" button is clicked
        else if (value === "="){
            const secondNumber = parseFloat(display.value.split(operator)[1]); // Convert the display value to a decimal number and take the second number
            
            // Check if the second number is a valid number
            if (isNaN(secondNumber)) {
                display.value = "Error: Missing second number"; // Error message
                return; // Exit the function to avoid calculations
            }
            
            let result;

            // Perform the operation based on the selected operator
            switch (operator) {
                case '+':
                    result = add(firstNumber, secondNumber);
                    break;
                case '-':
                    result = subtract(firstNumber, secondNumber);
                    break;
                    case "*":
                        result = multiply(firstNumber, secondNumber);
                        break;
                    case "/":
                        result = divide(firstNumber, secondNumber);
                        break;
                    default:
                        result = "Error"; // Default error case
                        break;
                }

                // Display the result
                display.value = result;
                // Reset the operator and firstNumber to start fresh
                firstNumber = null;
                operator = null;
            } 
            
            //If an operator is clicked
            else if (firstNumber === null) {
                firstNumber = parseFloat(display.value); // Convert display value to a number
                operator = value; // Store the operator
                display.value += ` ${operator} `; // Show the operator in the display
            }
        });
});

// Reset the calculator
const cleanButtons = document.querySelectorAll('.clean');

cleanButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // If the button is "C":
        if (value === 'C') {
            display.value = display.value.slice(0, -1); // Remove the last character from the display
        }

        // If the button is "AC":
        else if (value === 'AC') {
            display.value = ''; // Clear the display
            firstNumber = null; // Reset firstNumber
            operator = null; // Reset operator
            // No need to reset secondNumber since it's not a defined variable
        }
    });
});