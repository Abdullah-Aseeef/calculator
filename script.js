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

