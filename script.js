//UI

const body = document.querySelector('body')

const main = document.createElement('div')
main.classList.add('main')

const container = document.createElement('div')
container.classList.add('container')

const calculator = document.createElement('div')
calculator.classList.add('calculator')

const screen = document.createElement('div')
screen.classList.add('screen')

const curScreen = document.createElement('div')
curScreen.classList.add('screen-current')

const lastScreen = document.createElement('div')
lastScreen.classList.add('screen-last')

const buttonsGrid = document.createElement('div')
buttonsGrid.classList.add('buttons-grid')





let count = 9
for(i = 0; i < 20; i++){
    let name;
    let text;
    if(i == 0){
        name = 'AC'
        text = 'AC'
    } else if(i == 1){
        name = 'negative'
        text = '+/-'
    } else if(i == 2){
        name = 'factorial'
        text = '!'
    } else if(i == 3){
        name = 'division'
        text = '÷'
    } else if(i == 7){
        name = 'multiplication'
        text = 'X'
    } else if(i == 11){
        name = 'substraction'
        text = '-'
    } else if(i == 15){
        name = 'addition'
        text = '+'
    } else if(i == 19){
        name = 'result'
        text = '='
    } else{
        if(count == -1){
            name = 'number-btn'
            text = '.'
            count--
        } else if(count == -2){
            name = 'number-btn'
            text = 'del'
        } else{
            name = 'number-btn'
            text = count
            count--
        }
        

    }

    const btn = document.createElement('button')
    btn.classList.add('btn-input')
    btn.classList.add(name)
    btn.textContent = text
    buttonsGrid.appendChild(btn)
}



screen.appendChild(lastScreen)
screen.appendChild(curScreen)


calculator.appendChild(screen)
calculator.appendChild(buttonsGrid)
const helpSection = document.createElement('div')
helpSection.classList.add('helpSection')

container.appendChild(helpSection)
container.appendChild(calculator)

curScreen.textContent = '0'

lastScreen.textContent = '0'

main.appendChild(container)
body.appendChild(main)

let haveOperationsBefore = false
let firstNum;
let secondNum;
let theOp;
let shouldResetScreen = false;

const inputBtns = document.querySelectorAll('.btn-input')

inputBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        let pressed = e.target.textContent
        const operations = '+-X!÷'


        if(operations.includes(pressed)){
            doOperation(pressed)
            return
        }


        

        if(e.target.textContent == 'AC'){
            clear()
            return
        } else if(e.target.textContent == '+/-'){
            setNegative()
            return
        } else if(pressed == 'del'){
            deleteLastNum()
            return
        } else if(pressed == '='){
            appendResult()
            return
        }

        if(shouldResetScreen){
            resetScreen()
        }

        if(curScreen.textContent == '0'){
            curScreen.textContent = e.target.textContent
        } else{
            curScreen.textContent += e.target.textContent
        }
    })
})


function doOperation(op){
    
    if(lastScreen.textContent == '0'){
        firstNum = curScreen.textContent
        theOp = op
        lastScreen.textContent = curScreen.textContent + ' ' + op
        haveOperationsBefore = true
        shouldResetScreen = true
    
    } else if(haveOperationsBefore){
        
        
        secondNum = curScreen.textContent

        
        let result;
        
        result = evaluate()
        
        if (!result) {
            lastScreen.textContent = firstNum + ' ' + op
            theOp = op
            return
        }
        

        lastScreen.textContent = result + ' ' + op
        theOp = op
        curScreen.textContent = result
        firstNum = result
        secondNum = null
        shouldResetScreen = true 
    }
    
    else if(lastScreen.textContent.includes('=')){
        firstNum = curScreen.textContent
        curScreen.textContent = firstNum
        lastScreen.textContent = firstNum + ' ' + op
        shouldResetScreen = true
        theOp = op

    } else{
        theOp = op
        haveOperationsBefore = true
    }
}   

function deleteLastNum(){
    newText = curScreen.textContent.slice(0, curScreen.textContent.length - 1)
    if(newText == ''){
        newText = '0'
    }
    curScreen.textContent = newText
}

function factorial(n) {
    if (n < 0) {
        return undefined; // Factorial is not defined for negative numbers
    }
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

function resetScreen(){
    curScreen.textContent = ''
    shouldResetScreen = false
}

function clear(){
    firstNum = null
    secondNum = null
    curScreen.textContent = '0'
    lastScreen.textContent = '0'
    shouldResetScreen = false
}

function evaluate(){
    if(shouldResetScreen ||theOp == null){
        return
    }

    if(curScreen.textContent == '0' && theOp == null){
        alert("You can't divide by 0!")
        return
    }

    secondNum = curScreen.textContent

    return operate(theOp, firstNum, secondNum)
}

function appendResult(){
    if(shouldResetScreen) return

    result = evaluate()

    lastScreen.textContent = `${firstNum} ${theOp} ${secondNum} = ${result}`
    curScreen.textContent = result
    firstNum = result
    secondNum = null
    shouldResetScreen = true
    haveOperationsBefore = false
}

function setNegative(){
    if(shouldResetScreen) resetScreen()
    if(curScreen.textContent == '0' || curScreen.textContent == ''){
        curScreen.textContent = '-'
    } else if(curScreen.textContent == '-'){
        curScreen.textContent = '0'
    }
    
    else if(curScreen.textContent.includes('-')){
        firstNum = curScreen.textContent
        curScreen.textContent = Number(firstNum) * -1
        firstNum = curScreen.textContent
    }
        
    else{
        firstNum = curScreen.textContent
        curScreen.textContent = `-${+firstNum}`
        firstNum = '-' + firstNum
    }
}

function add(a, b){
    return a + b
}

function substract(a, b){
    return a - b
}

function multiply(a, b){
    return a * b
}

function divide(a, b){
    return a / b    
}

function operate(operator, a, b){
    a = Number(a)
    b = Number(b)

    switch (operator) {
        case '+':
          return add(a, b)
        case '-':
          return substract(a, b)
        case 'X':
          return multiply(a, b)
        case '÷':
          if (b === 0) return null
          else return divide(a, b)
        default:
          return null
      }
}