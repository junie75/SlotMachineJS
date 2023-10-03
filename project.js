// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin slot machine
// 5. Check if the user won
// 6. Give the user their winnings/ take loss
// 7. play again

//imports package prompt-sync
const prompt = require("prompt-sync")(); //prompt is used to prompt user to input a value, like a scanner or cin

/*******GLOBAL VARIABLES********/
const ROWS = 3; //the number of symbols in each reel ex: AAA or BBBA

                                    //      ABD
const COLS = 3; //the number of reels ex:   ABD
                                    //      ACD

const SYMBOLS_COUNT = { //object to represent each symbol and the numbers of each symbol (per reel)
    "A": 2,  //key "A" mapped with the value 2 --------->  if referenced SYMBOLS_COUNT["A"],  would return value 2
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = { //object to represent the value of each symbol
    "A": 5,  // ie: if line of "A"'s is received, bet will be multiplied by 5
    "B": 4,
    "C": 3,
    "D": 2
}



/******function to recieve deposit from user*****/
const deposit = () => { //deposit equals valid returned numberDepositAmount

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

/*******function to determine number of lines to bet on*******/
const getNumberOfLines = () => { //getNumberOfLines equals valid returned numberOfLines
    /****infinite loop to continue to prompt user until valid number of lines is entered****/
    while(true){ 
        const lines = prompt("Enter number of lines to bet on (1-3): "); 
        const numberOfLines = parseFloat(lines); 

        /***Validates input ***/
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){ //if the value inputted is not a number or negative or greater than 3
            console.log("Invalid number of lines, try again.")
        } 
        else{ //breaks while loop
            return numberOfLines;
        } 
    }
};

/*******function to collect a bet amount per line********/
const getBet = (balance, lines) => { //bet is based on current balance user has; must pass in balance as a parameter
    while(true){ 
        const bet = prompt("Enter bet per line: "); 
        const numberBet = parseFloat(bet); 

        /***Validates input ***/
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines){ //if the value inputted is not a number or negative or greater than user's available balance
            console.log("Invalid bet, try again.")
        } 
        else{ //breaks while loop
            return numberBet;
        } 
    }
};

/*******function to spin the machine********/
const spin = () => {

    /*adding all available symbols to an array*/
    const symbols = []; //array that contains all the possible symbols; declared const bc we can still reference, manipulate, & pull from array w/o actually changing it
    for( const [symbol, count] of Object.entries(SYMBOLS_COUNT)) { //loops through all of the ENTRIES in our OBJECT, gives us symbol first, then the count
        for(let i = 0; i < count; i++){
            /*for each symbol in our object (A*2, B*4,...), adds it to the array symbols*/
            symbols.push(symbol); //push appends new elements to end of array; 
        } 
    }

    //                                                                                                         A B C                                                                                         
    const reels = []; // will be triple nested array, each nested array represents a column of 3 rows     ex: A B C
    //                                                                                                         A B C
    
    /*filling up each reel*/
    for(let i = 0; i < COLS; i++){ //for each column (nested array)
     reels.push([]); //adds a nested array for each column
     const reelSymbols = [...symbols]; //declares an array equal to symbols; represents available symbols PER REEL; once symbol used it is removed
       for (let j = 0; j < ROWS; j++){ //for each row in that column
        /*randomly selecting symbol from 0 to (reelSymbols.length-1)*/
        const randomIndex = Math.floor(Math.random() * reelSymbols.length);   //MATH.random generates float from 0-1, so MATH.floor is used to round it down
        const selectedSymbol = reelSymbols[randomIndex]; //selects symbol from available symbols
        reels[i].push(selectedSymbol);  //appends selected symbol into the official reel at the index of the column being filled
        reelSymbols.splice(randomIndex, 1); //removes ONE element from reelSymbols array at the position of the randomIndex that was chosen
       } 
    }

    return reels;
};


/***function to transpose reels into actual slot rows****/
const transpose = (reels) => {

// Transposing a matrix/2D array
// [[A B C], [D D D], [A A A]] --> 
// column-focused to row-focused
/*     [A B C]      [A D A]
       [D D D] ---> [B D A]
       [A A A]      [C D A]
*/

    const rows = [];
    for( let i = 0; i < ROWS; i++){
        rows.push([]); ///for each row, push an array to represent the column
        for(let j = 0; j < COLS; j++){ //now loop through every column in that row
            rows[i].push(reels[j][i]); //adds symbol to rows in correct order
        }
    }

    return rows;
};


/****function to print the rows*****/
const printRows = (rows) => {
    for (const row of rows) { //looping through every nested array(column) inside of rows
        let rowString = "";
        for(const [i, symbol] of row.entries()) {
            rowString += symbol; //concatenates symbol into array
        }
    }
}

/*******IMPLEMENTATION********/
let balance = deposit(); //let declares variable but allows to adjust value of variable later --- balance is total amt user has available to play with
console.log(balance); //prints the balance 
const numberOfLines = getNumberOfLines(); //receives lines from user
console.log(numberOfLines); //prints lines
const bet = getBet(balance, numberOfLines);
console.log(bet);
const reels = spin(); //creates reels from returned value of spin function
const rows = transpose(reels);
console.log(reels); //prints reels
console.log(rows);














/*NOTES
*const & let declares a variable


/******TWO WAYS TO CREATE A FUNCTION*****

Way1:
function deposit() {
    return 1
}

Way2:
const deposit1 = () => {

}
*/