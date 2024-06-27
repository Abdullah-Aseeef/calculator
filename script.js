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
 let buttonObject = {symbols : ['AC',"+/-","%"],
 operations : ['/',"*","-","+","="],
 numbers : [7,8,9,4,5,6,1,2,3,0,"."]}
buttonObject.numbers = buttonObject.numbers.map((num)=>num.toString());
buttonWidth=buttons.clientWidth/4;
buttonHeight=buttons.clientHeight/5;
let cssText = `background-color: inherit(); width: ${buttonWidth}px; height:${buttonHeight}px; font-size:larger; font-weight:100;`;
for(key in buttonObject){
    let oldCssText =cssText;
    buttonObject[key].forEach((symbol)=>{
        if( symbol == "0"){
            cssText += `width:${2*buttonWidth}px`
        }
        createButton(
            symbol,
            buttons.querySelector(`#${key}`),
            cssText
        )
        if( symbol == "0"){
            cssText = oldCssText;
        }
    });
}


function createButton(id,parent,cssText){
    let button = document.createElement("button");
    button.setAttribute("id",id);
    button.textContent = id;
    button.style.cssText=cssText;
    parent.appendChild(button);
    return button;
}
// for(let i =0; i < 20;i++){
//     let button = document.createElement("button");
//     button.style.cssText = "height: 10vh; width:25% ;background-color: red";
//     buttons.appendChild(button);
// }