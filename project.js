// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin slot machine
// 5. Check if the user won
// 6. Give the user their winnings/ take loss
// 7. play again

//imports package prompt sync
const prompt = require("prompt-sync")(); //prompt is used to prompt user to input a value, like a scanner or cin

const deposit = () => { //function to recieve deposit from user

    /****infinite loop to continue to prompt user until valid deposit amt is entered****/
    while(true){ 
        const depositAmount = prompt("Enter a deposit amount: "); //prompt returns value input as a string into depositAmount
        const numberDepositAmount = parseFloat(depositAmount); //parseFloat takes a string and converts it into a float/decimal value

        /***Validates input ***/
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){ //if the value inputted is not a number (parseFloat will return NaN) or negative
            console.log("Invalid deposit amount, try again.")
        } 
        else{ //breaks while loop
            return numberDepositAmount;
        } 
    }
    
};

const depositAmount = deposit();
console.log(depositAmount)















/*NOTES
*const declares a variable


/******TWO WAYS TO CREATE A FUNCTION*****

Way1:
function deposit() {
    return 1
}

Way2:
const deposit1 = () => {

}
*/