document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '0';
    let operator = null;
    let previousInput = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.id;
            if (button.classList.contains('number')) {
                handleNumber(value);
            } else if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (value === 'clear') {
                handleClear();
            } else if (value === 'delete') {
                handleDelete();
            } else if (value === 'equals') {
                handleEquals();
            } else if (value === 'dot') {
                handleDot();
            }
            updateDisplay();
        });
    });

    function handleNumber(num) {
        if (currentInput === '0' || operator !== null) {
            currentInput = num;
            operator = null;
        } else {
            currentInput += num;
        }
    }

    function handleOperator(op) {
        if (previousInput === null) {
            previousInput = currentInput;
        } else if (operator) {
            previousInput = calculate(previousInput, currentInput, operator);
        }
        operator = op;
        currentInput = '0';
    }

    function handleClear() {
        currentInput = '0';
        previousInput = null;
        operator = null;
    }

    function handleDelete() {
        currentInput = currentInput.slice(0, -1) || '0';
    }

    function handleEquals() {
        if (previousInput !== null && operator !== null) {
            currentInput = calculate(previousInput, currentInput, operator);
            previousInput = null;
            operator = null;
        }
    }

    function handleDot() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        if (operator === '+') return (a + b).toString();
        if (operator === '-') return (a - b).toString();
        if (operator === '*') return (a * b).toString();
        if (operator === '/') return (a / b).toString();
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }
});
