const operations = () => {
    const operationsBtns = document.querySelectorAll('.operation_btn');

    operationsBtns.forEach((elem) => {
      elem.addEventListener('click', handleOperationClick);
    })
}

const handleOperationClick = (event) => {
    const value = event.target.value;
    let calc_number_input = document.getElementById('calc_number_input');
    let currentValue = calc_number_input.value;

    const availableNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const symbols = ['%', '+', '-', '*', '÷']

    // handle clear (c)
    if(value === 'C') {
        clearAll();
        return;
    }

    if(value === 'm') {
        return;
    }

    // handle equation (=)
    if(value === '=') {
        handleEquation(currentValue);
        return;
    }

    // handle dots (.)
    if (value === '.' && currentValue.includes('.')) {
        return;
    }

    if(symbols.includes(currentValue.slice(-1)) && !availableNums.includes(value)) {
        currentValue = currentValue.slice(0, -1) + value;
    } else {
        if(!availableNums.includes(value)) {
            currentValue += ' ' + value;
        } else {
            if(!availableNums.includes(currentValue.slice(-1)) && currentValue !== '') {
                currentValue += ' ' + value;
            } else {
                currentValue += value;
            }
        }
    }

    calc_number_input.value = currentValue;
}

const clearAll = () => {
    let calc_number_input = document.getElementById('calc_number_input');
    calc_number_input.value = '';
}


const handleEquation = (value) => {
    // Split the value into an array of tokens
    const tokens = value.trim().split(/\s+/);

    // Initialize the result
    let result = 0;
    let currentOperator = '+';

    // Iterate over the tokens to perform the calculation
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        // Check if the token is a number
        if (!isNaN(token)) {
            const number = parseFloat(token);
            // Perform the operation based on the current operator
            switch (currentOperator) {
                case '+':
                    result += number;
                    break;
                case '-':
                    result -= number;
                    break;
                case '*':
                    result *= number;
                    break;
                case '÷':
                    if (number !== 0) {
                        result /= number;
                    } else {
                        // Handle division by zero error
                        result = 'Error';
                        return;
                    }
                    break;
                case '%':
                    result %= number;
                    break;
            }
        } else {
            // If the token is an operator, update the current operator
            currentOperator = token;
        }
    }

    // Update the display with the result
    const calc_number_input = document.getElementById('calc_number_input');

    if(isNaN(result)) {
        calc_number_input.value = 0;
        return;
    }

    calc_number_input.value = result;
}

operations();