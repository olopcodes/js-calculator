class Calculator {
    constructor(inputField, numberBtnsArray, operationBtnsArray, shownArray = [], isCalculated){
        this.inputField = inputField;
        this.numberBtnsArray = numberBtnsArray;
        this.operationBtnsArray = operationBtnsArray;
        // the main array that will be added to the input
        this.shownArray = shownArray;
        this.isCalculated = false;
        // event listners use for of for arrays
        for(let btn of numberBtnsArray){
            btn.addEventListener('click', this.showNumber)
        }

        for(let btn of operationBtnsArray){
            btn.addEventListener('click', this.showOperation)
        }
        
    }
   
    clear = (e) => {
        this.inputField.value = '';
        this.hiddenArray = [];
        this.shownArray = [];
    }

    showNumber = (e) => {    
        const num = e.target.textContent;
        if(num === 'C'){
            this.clear();
        } else if(this.isCalculated) {
            this.clear();
            this.showValue(num);
            this.isCalculated = false;
        } else{
            this.showValue(num);
        }
    }

    showOperation = (e) => {
        this.isCalculated = false;
        const ops = e.target.textContent;
        const hasNeg = this.shownArray[0] === '-';
        // prevent user from entering ops first
        if (this.shownArray.length == 0){
            alert('Please click a number first');
        } else if (hasNeg && this.shownArray.length == 1){
            alert('Please click a number first');
        } else {
            this.printOperation(ops)
        }
        
        
    }

    showValue = (value) =>{
        // adding value to the array
        this.shownArray.push(value);
        // converting the number entered to string
        let joined = this.shownArray.join('');
        this.inputField.value = joined;
        console.log('showArray', this.shownArray)
        
    }

    printOperation = (ops) => {
        // find a way to work with negative numbers
        const hasAdd = this.inputField.value.includes('+');
        const hasMult = this.inputField.value.includes('x');
        const hasDiv = this.inputField.value.includes('/');

        if(
            ops != '=' &&
            !hasAdd &&
            !hasMult &&
            !hasDiv
            ){
            this.showValue(` ${ops} `);
        } else if (this.shownArray[0] === '-'){
            // perform the calculation with a negative number
            this.calculateWithNeg();
        } else {
            this.calculate();
        }
    }
    
    validateOps= (op, num1, num2) => {
        let total;
        console.log('from validate', op)
        if(op == '+'){
            total = num1 + num2;
        } else if(op == '-'){
            total = num1 - num2;
        } else if (op == 'x'){
            total = num1 * num2;
        } else {
            total = num1 / num2;
        }
        this.formatTotal(total);
    }

    calculate = (numbersToCalc) => {
        const ops = ['+', '-', 'x', '/'];
        let opsIndex;
        let op;
        let num1;
        let num2;
        
        if(numbersToCalc) {
            numbersToCalc = numbersToCalc;
        } else if (this.inputField.value.slice(0,1) === '-'){
            numbersToCalc = this.inputField.value.slice(1);
        } else {
            numbersToCalc = this.inputField.value;
        }

        for(let op of ops){
            if(numbersToCalc.indexOf(op) > -1) {
                opsIndex = numbersToCalc.indexOf(op);
                console.log('ops index', opsIndex);   
            }
        }

        op = numbersToCalc.slice(opsIndex, opsIndex+1);
        const numString = numbersToCalc.slice(0, opsIndex);
        console.log('num 1 sliced', numString);
        console.log('from input', this.inputField.value);
        if(this.inputField.value.slice(0,1) === '-'){
            num1 = parseFloat(numString) * -1;
            console.log('if num1', num1,'to calc', numbersToCalc);
            
        } else {
            num1 = parseFloat(numbersToCalc.slice(0, opsIndex));
            console.log('else num1', num1, 'to calc', numbersToCalc, 'shown arr', this.shownArray)
        }

        // if(isNaN(NaN)){
           
        // }

        num2 = parseFloat(numbersToCalc.slice(opsIndex+1));
        console.log('num2', num2 ) 
        this.validateOps(op, num1, num2);
        this.isCalculated = true;
    }
    
    calculateWithNeg = () =>{
        // a string
        const negStringNum = this.inputField.value;
        // this will be passed in
        const slicedOutNegative = negStringNum.slice(1);
    
        this.calculate(slicedOutNegative)
    }

    formatTotal = (total)=>{
        this.clear();
        if(total.toString().includes('.')){
            this.showValue(total.toFixed(3));
        } else {
            this.showValue(total);
        }
    }

    

}


// APPLICATION NEEDS

// THIS APP IS COMPLETE ALL IT NEEDS IS TO BE REFACTORED
// ISSUE OCCURS WHEN USER ADDS A NEGATIVE NUMBER 
// FROM THE INPUT FIELD ONCE CALCULATED



// 1. clear function ***DONE**
//   -clears everything for user and inside
// 2. Print Number
//   - shows number clicked to the user ***DONE***
//   - stores number in an array    ***DONE***
// 3. Print Ops
//   - show ops to user ***DONE***
//   - store this in an array ***DONE***
//   - do not let user enter ops back to back   ***DONE***
//   - do not let user enter some ops first
//   - perform calculation after another ops is pressed ***DONE***
// 4. Calculate ***DONE***
//   - identify the ops and perform ***DONE***
//   - slice the first number from the string, turn to number
//   - slice the last number of the string, turn to number
//   - return final to user
// 5. integrate negative numbers later ***DONE***
//      - if statement allowing '-' ***DONE***
//      - slice out '-' in the string
//      - find index of the operation
//      - slice numbers and operation
//      - times first num by -1
//      - perform operation and return to the user
// 6. have a bug when numbers a calculated ***DONE***
//   - build an if that checks isCalculated is true or false
//   - take an action on either one
