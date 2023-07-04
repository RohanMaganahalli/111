
/**
 * @param {string} s
 * @return {boolean}
 */
var reverseString = function(str) {
    //  Given a  string str
    //  Reverse the string 
    //  and return the reversed string
    // Write the code here
        return str.split('').reverse().join('')

 
};

//Dont change anything below. If changed click on reset.
async function readInput() {
        let inputString = '';
        var output=[];
        process.stdin.on('data', inputStdin => {
            inputString += inputStdin;
            const inputArr = inputString.split(/(?:\r\n|\r|\n)/g)
            output = reverseString(inputArr[0]);
            console.log(output.trim());
            process.exit();
            
        })
        

}
readInput();