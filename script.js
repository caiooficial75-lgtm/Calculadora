const display = document.getElementById('display');//pegar resultado
const buttons = document.querySelectorAll('.btn');//pega todos os botoes

//criar as variasveis 

let currentNumber = '';  //numero atual
let firstOpe = null; //primeiro numero
let operator = ''; //operador
let restart = false; //reiniciar

//funções: 
function setOperator(newOpe) {//recebe o operador por parametro
    if (currentNumber) { // verifica se tem um numero atual
        calculate();

        firstOpe = parseFloat(currentNumber.replace(',', '.')); //converte o numero atual para float e armazena em firstOpe
        currentNumber = ''; //limpa o numero atual para receber o proximo numero

    }
    operator = newOpe; //atualiza o operador
}

function calculate() { // aqui é onde fazemos o calculo
    if (operator === '' || firstOpe === null) return; //verifica se tem um operador, um numero atual e um primeiro numero
    let secondOpe = parseFloat(currentNumber.replace(',', '.')); //converte o numero atual para float e armazena em secondOpe
    let valorFinal; //variavel para armazenar o resultado do calculo

    //switch para realizar o calculo dependendo do operador
    switch (operator) {
        case '+':
            valorFinal = firstOpe + secondOpe;
            break;
        case '-':
            valorFinal = firstOpe - secondOpe;
            break;
        case '*':
            valorFinal = firstOpe * secondOpe;
            break;
        case '/':
            valorFinal = firstOpe / secondOpe;
            break;
        default:
            return;
    }

    //verificar se o resultado tem mais de cinco casas decimais.

    if (valorFinal.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(valorFinal.toFixed(5)).toString(); //arredonda o resultado para 5 casas decimais e converte para string
    } else { currentNumber = valorFinal.toString(); //se não tem mais de 5 casas decimais, apenas converte para string
    }

    operator = '';
    firstOpe = null;
    restart = true; 
    updateResultado(); 

}

function updateResultado(origin = false) {
    if (origin) {
        display.textContent = '0';
    } else {
        display.textContent = currentNumber || '0';
    }
}

function addDigit(digit) {//função para adicionar digito ao visor
    if (digit === "," && (currentNumber.includes(",") || currentNumber === ''))
        return;

    if (restart) {
        currentNumber = digit;
        restart = false; // vai se tornar true apenas quando eu calcular o resultado
    } else {
        currentNumber += digit; // se não ele segue apenas concatenando os numeros (1, 2, 3...)
    }

    updateResultado();
}

function clearCalculator() {
    currentNumber = '';
    firstOpe = null;
    operator = '';
    updateResultado(true);
}

// para cada botão: 

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const text = button.textContent;
        if (/^[0-9,]+$/.test(text)) {
            addDigit(text);
        } else if (["+", '-', '*', '/'].includes(text)) {
            setOperator(text);
        } else if (text === '='){
            calculate();
        } else if (text === 'C') {
            clearCalculator();
        }
    });
});