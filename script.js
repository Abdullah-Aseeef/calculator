const MAX_NUM_ON_DISPLAY=10;

let add = (num1,num2)=>num1+num2;
let sub = (num1,num2)=>num1-num2;
let mul = (num1,num2)=>num1*num2;
let div = (num1,num2)=>num1/num2;
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
    button.onclick = (event)=>displayNumbers(id,id=='AC',buttonObject.operations.includes(id));
    return button;

}
let firstNumber,operator,secondNumber;
let opMapping = {
    "+" : "add",
    "-" : "sub",
    "/" : "div",
    "*" : "mul",
}
function displayNumbers(number=-1,clear=false,operation=false){
    let display = document.querySelector("#display");
    if(clear){
        display.textContent = "";
    }
    else if(operation){
        performOperation(number,display);
    }
    else{
        
        if(display.textContent.length<= MAX_NUM_ON_DISPLAY)
            display.textContent += number;
    }
}//display should be max 11
function performOperation(number,display){

    if(number!='='){
        firstNumber = display.textContent;
        display.textContent = "";
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