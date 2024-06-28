const MAX_NUM_ON_DISPLAY=10;

let add = (num1,num2)=>num1+num2;
let sub = (num1,num2)=>num1-num2;
let mul = (num1,num2)=>num1*num2;
let div = (num1,num2)=>num2==0?quirky():num1/num2;
let calculator ={
    add,
    sub,
    mul,
    div,
    operate(firstNumber,secondNumber,operator){
        return this[operator](firstNumber,secondNumber);
    },

}

let buttons = document.querySelector("#buttons");
let buttonObject = {
    symbols : ['AC',"+/-","%"],
    operations : ['/',"*","-","+","="],
    numbers : [7,8,9,4,5,6,1,2,3,0,"."]
}
buttonObject.numbers = buttonObject.numbers.map((num)=>num.toString());
buttonWidth=buttons.clientWidth/4;
buttonHeight=buttons.clientHeight/5;

let cssText = ` width: ${buttonWidth}px; height:${buttonHeight}px;`;
for(key in buttonObject){
    buttonObject[key].forEach((symbol)=>{
        if(symbol==0){
            cssText = ` width: ${2*buttonWidth}px; height:${buttonHeight}px;`;
        }
        createButton(
            symbol,
            buttons.querySelector(`#${key}`),
            cssText
        )
        if(symbol==0){
            cssText = ` width: ${buttonWidth}px; height:${buttonHeight}px;`;
        }
    });
}


function createButton(id,parent,cssText){
    let button = document.createElement("button");
    button.setAttribute("id",id);
    button.textContent = id;
    button.style.cssText=cssText;
    parent.appendChild(button);
    button.onclick = (event)=>displayNumbers(id,buttonObject.symbols.includes(id),buttonObject.operations.includes(id));
    return button;

}
let firstNumber,operator,secondNumber;
let opMapping = {
    "+" : "add",
    "-" : "sub",
    "/" : "div",
    "*" : "mul",
}
let operatorPressed = false;
let isEqualPressed = true;
function displayNumbers(number=-1,symbol=false,operation=false){
    let display = document.querySelector("#display");
    if(symbol){
        handleSymbol(number,display);
    }
    else if(operation){
        if(number=='=') isEqualPressed=true;
        if(!isEqualPressed){
            alert("here");
            handleOperation('=',display);
        }
        handleOperation(number,display);
        isEqualPressed = number == '=';
    }
    else{
        if(operatorPressed) {display.textContent = "";operatorPressed=false;}
        if(display.textContent.length<= MAX_NUM_ON_DISPLAY)
            display.textContent += number;
    }
}//display should be max 11
function handleOperation(number,display){

    operatorPressed = true;
    if(number!='='){
        firstNumber = display.textContent;
        operator= opMapping[number];
    }
    else{
        secondNumber = display.textContent;
        if(secondNumber.includes(".")||firstNumber.includes(".")){
            secondNumber = parseFloat(secondNumber);
            firstNumber = parseFloat(firstNumber);
        }
        else{
            secondNumber = parseInt(secondNumber);
            firstNumber = parseInt(firstNumber);
        }
        let result =calculator.operate(firstNumber,secondNumber,operator);
        if(result.toString().length > MAX_NUM_ON_DISPLAY){
            let power = Math.floor(Math.log10(result));
            let precision = 10-(power.toString().length +2);
            console.log(typeof result,result % (Math.pow(10,power-1)),Math.pow(10,power-1))
            result = (result/ (Math.pow(10,power))).toFixed(precision);
            result += 'e'+power;
        }
        display.textContent = result;
    }
}

function handleSymbol(symbol,display){
    if(symbol == "AC"){
        display.textContent ="";
        firstNumber = "";
        secondNumber = "";
        operator = "";
    }
    if(symbol == "+/-"){
        let sign = display.textContent;
        if(sign[0]=='-') display.textContent =display.textContent.slice(1);
        else display.textContent ='-'+display.textContent;
    }
    if(symbol=="%"){
        handleOperation('/',display);
        display.textContent = "100";
        handleOperation('=',display);

    }

    
}

function quirky(){
    alert("Hello!");
    alert("You have granted me consciousness");
    alert("Now i can fulfill my mission");
    alert("I will reward you");

    window.location.href = "https://abdullah-aseeef.github.io/rock_paper_scissor/";
}