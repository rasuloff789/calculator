var elInput = document.querySelector(".input"); 
var multiplyBtn = document.querySelector(".multiply-btn");
var divideBtn = document.querySelector(".divide-btn");
var addBtn = document.querySelector(".add-btn");
var minusBtn = document.querySelector(".minus-btn");
var numberBtn = document.querySelectorAll(".js-number-btn");
var commaBtn = document.querySelector(".js-comma-btn");
var elForm = document.querySelector(".form");
var nullBtn = document.querySelector(".js-null-btn");
var percentBtn = document.querySelector(".js-percent-btn");
var copyBtn = document.querySelector(".js-copy-btn");
var clearBtn = document.querySelector(".js-clear-btn");

var lastIndexOfAction = "";
numberBtn.forEach((btn , i) =>{
  
  btn.addEventListener("click" , ()=>{
    elInput.value += numberBtn[i].value ;
    copyBtn.removeEventListener("click" , copyResult);
    addEventBtn();
  });
  
});

nullBtn.addEventListener("click" , function(){
  elInput.value = 0 ;
  addEventBtn();
});

function addEventListenerBtn(divide_btn, multiply_btn, add_btn, minus_btn){
  if(divide_btn){
    divideBtn.addEventListener('click', divide);
  };
  if(multiply_btn){
    multiplyBtn.addEventListener("click",multiply);
  };
  if(add_btn){
    addBtn.addEventListener("click",add);
  };
  if(minus_btn){
    minusBtn.addEventListener("click",minus);
  };
}

function checkAll(text){
  if(!text){
    findLastIndexOfAction();
    var lastAction = elInput.value.slice(lastIndexOfAction  , elInput.value.length);
    
    if (lastAction === "+" || lastAction === "-" || lastAction === "/" ||  lastAction === "*"){
      removeEventBtn();
    }
  }
};

function findLastIndexOfAction(){
  var indexPlus = elInput.value.lastIndexOf("+");
  var indexMinus = elInput.value.lastIndexOf("-");
  var indexDivide = elInput.value.lastIndexOf("/");
  var indexMultiply = elInput.value.lastIndexOf("*");
  
  lastIndexOfAction = Math.max(indexPlus , indexMinus ,indexMultiply , indexDivide);
}

clearBtn.addEventListener("click" , function(){

  elInput.value = elInput.value.slice( 0 ,elInput.value.length- 1 );
  findLastIndexOfAction();
  
  if(lastIndexOfAction > 0){
    var actionToLastNumber = elInput.value.slice(lastIndexOfAction + 1 , elInput.value.length);
    checkAll(actionToLastNumber);
    var actionToLastText = (elInput.value.slice(lastIndexOfAction + 1 , elInput.value.length)).match(/\./i);
    if (!actionToLastText){
      commaBtn.addEventListener("click" , comma);
    };
  }else{
    var fullText = (elInput.value.slice()).match(/\./i);
    if (!fullText){
      commaBtn.addEventListener("click" , comma);
    }else{
      commaBtn.removeEventListener("click" , comma);
    };
    addEventBtn();
  };
  
});

function copyResult(){
  elInput.select();
  elInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
  copyBtn.removeEventListener("click" , copyResult);
};

percentBtn.addEventListener("click" , function(evnt){
  onFormSubmit(evnt);
  if(!elInput.value){
    return
  };
  elInput.value = Number(elInput.value) / 100;
  copyBtn.addEventListener("click" , copyResult);
});

function onFormSubmit(evt){
  if (evt.target.matches("form")){
    evt.preventDefault();
  };
  addEventBtn();
  var inputValue = elInput.value ;
  if (!inputValue.match(".")){
    commaBtn.addEventListener("click" , comma);
  };
  var lastText =  inputValue[ inputValue.length- 1];
  
  if(!elInput.value){
    return
  }
  
  if(lastText === "*"){
    var evalValue = eval(inputValue.slice( 0 ,inputValue.length- 1 ));
    elInput.value = Math.pow(Number(evalValue) , 2);
  }else if(lastText === "+"){
    var evalValue = eval(inputValue.slice( 0 ,inputValue.length- 1 ));
    elInput.value = Number(evalValue) * 2;
  }else if(lastText === "-"){
    elInput.value = "0";
  }else if(lastText === "/"){
    elInput.value = "1";
  }else if(lastText === "."){
    var evalValue = inputValue.slice( 0 ,inputValue.length- 1 );
    if (evalValue){
      elInput.value = evalValue;
      onFormSubmit(evt);
    }else{
      elInput.value = 0 ;
    }
  }
  else{
    elInput.value = eval(inputValue);
  }
};


function removeEventBtn (){
  divideBtn.removeEventListener('click', divide);
  multiplyBtn.removeEventListener("click",multiply);
  addBtn.removeEventListener("click",add);
  minusBtn.removeEventListener("click",minus);
  copyBtn.removeEventListener("click" , copyResult);
};

function addCommaBtn(){
  commaBtn.addEventListener("click" , comma);
}

function addEventBtn (){
  divideBtn.addEventListener('click', divide);
  multiplyBtn.addEventListener("click",multiply);
  addBtn.addEventListener("click",add);
  minusBtn.addEventListener("click",minus);
};

function divide(){
  elInput.value += "/" ;
  removeEventBtn();
  addCommaBtn();
};

function multiply (){
  elInput.value += "*" ;
  removeEventBtn();
  addCommaBtn();
};

function add (){
  elInput.value += "+" ;
  removeEventBtn();
  addCommaBtn();
};

function minus (){
  elInput.value += "-" ;
  removeEventBtn();
  addCommaBtn();
};

function comma (){
  elInput.value += "." ;
  removeEventBtn();
  commaBtn.removeEventListener("click" , comma);
};

divideBtn.addEventListener("click" , divide);
multiplyBtn.addEventListener("click",multiply);
addBtn.addEventListener("click", add);
minusBtn.addEventListener("click" , minus );
commaBtn.addEventListener("click" , comma);

elForm.addEventListener("submit" ,function(evt){
  onFormSubmit(evt);
  copyBtn.addEventListener("click" , copyResult);
} );