const buttons = document.querySelectorAll('.buttons button');
const display = document.querySelector('.display');

// Variables to store numbers and operators with the value null so that they are empty at the beginnig
let firstNumber = null;
let operator = null;

// Functions for operators
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
        return "You can't divide by zero";
    }
    return a / b;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        //si se hace clic en un numero, muestra el numero en el display
        if (!isNaN(value)) {
            display.value += value;
        }

        //si se hace clic en el =
        else if (value === "="){
            const secondNumber = parseFloat(display.value.split(operator)[1]); //convierte lo que este en la pantalla en numero decimal y tomamos el segundo numero
            let result;

            //si se hace clic en un operador
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
                        result = "Error";
                        break;
                }

                //muestra el valor en display
                display.value = result;
                // dejar en null la variable de operator y firstNumber para poder vlver a comenzar
                firstNumber = null;
                operator = null;
            } //HASTA AHORA EL CODIGO SE ENFOCA EN : MANEJAR LOS NUMEROS Y LA OPERACION CUANDO SE HACE CLIC EN EL =
            else if (firstNumber === null) {
                firstNumber = parseFloat(display.value);
                operator = value;
                display.value += ` ${operator} `;
            }
        } )
})

//resetear la calculadora
const cleanButtons = document.querySelectorAll('.clean');

cleanButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        //si el boton es C:
        if (value === 'C') {
            display.value = display.value.slice(0, -1);
        }

        //si el boton es AC:
        else if (value === 'AC') {
            display.value = ''; //limpia todo el display
            firstNumber = null; //reinicio el primer numero
            operator = null; //reinicio operator
            secondNumber = null; //reinicio el segundo numero
        }
    });
});