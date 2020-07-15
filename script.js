
// calculator operations function
const operate = function (operation, num1, num2) {
    switch (operation) {
        case "add":
            return num1 + num2;
        case "subtract":
            return num1 - num2;
        case "multiply":
            return num1 * num2;
        case "devide":
            return num1 / num2;
        default:
            return undefined;
    }
}

// define variables
let displayNums = [0];
let fxnSel = undefined;
let lastButton = undefined;
let opNums = [NaN, NaN];

// update calculator display
const updateDisp = function (num) {
    if (isNaN(lastButton) || displayNums[0] === 0) {
        displayNums = [num];
    } else {
        displayNums.push(num);
    }
    divDisplay.innerText = displayNums.join('');
}

// clear display
const divDisplay = document.getElementById("display");
const clearDisp = function() {
    displayNums = [0];
    divDisplay.innerText = displayNums.join("");
}

// clear button functionality
const delButton = document.getElementById("btnDel");
delButton.addEventListener("click", function() {
    clearDisp(); 
    opNums = [NaN, NaN]; 
    lastButton = "del";
    fxnSel = undefined;
});

// number keys functionality
const numClickArray = document.querySelectorAll(".numButtons");
numClickArray.forEach(btn => {
    btn.addEventListener('click', function() {
        if (fxnSel === "equals") {
            opNums = [NaN, NaN];
        }
        updateDisp(parseInt(btn.innerText));
        lastButton = parseInt(btn.innerText);
    });
});

// operator button click functionality
const opButton = document.querySelectorAll(".opButton");
opButton.forEach(btn => {
    btn.addEventListener('click', function() {
        if (!isNaN(lastButton) && fxnSel !== "equals") {
            opSelect(btn.id);           
        } else if (fxnSel === "equals") {
            opNums[0] = parseInt(displayNums.join(""));
        }
        lastButton = btn.id;
        fxnSel = btn.id;
    });
});

// equals button functionality
const eqButton = document.getElementById("btn=");
eqButton.addEventListener("click", function() {
    if (!isNaN(lastButton) && fxnSel !== "equals") {
        opSelect(fxnSel);
    }
    lastButton = eqButton.id;
    fxnSel = "equals";
});

// run operate function depending on if equals or function button has previously been clicked
const opSelect = function(operator) {
    if (isNaN(opNums[0])) {
        opNums[0] = parseInt(displayNums.join(""));
        displayNums = [0];
    } else {
        opNums[1] = parseInt(displayNums.join(""));
        clearDisp();
        updateDisp(operate(fxnSel, opNums[0], opNums[1]));
        opNums[0] = operate(fxnSel, opNums[0], opNums[1]);
    }

    fxnSel = operator;
}
