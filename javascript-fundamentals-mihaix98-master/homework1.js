console.log("########### Exercise 1 ############");
// Ex 1

const drinks = [
    {name: "lemonade",
     price: 50},
    {name: "lime",
     price: 10},
    {name: "orange",
     price: 50}
];
const sortFunction = drinks.sort((a, b) => {
    if(a.price === b.price){
        return 0;
    } else if(a.price > b.price){
        return 1;
    } else {
        return -1;
    }
})
console.log(sortFunction);

console.log("########### Exercise 2 ############");
// Ex 2

detectWord("UcUNFYGaFYFYGtNUH");
function detectWord(strings){
    let characters='';
    let detectedWord = '';
    for(let i=0;i<=strings.length;i++){
        characters = strings.charAt(i); // read every caracter with index
        // verify if characters is lowercase
        if (characters === characters.toLowerCase()) {
        // add to detectedWord a new caracter
            detectedWord += characters;
        }
    }
    console.log(detectedWord);
}

console.log("########### Exercise 3 ############");
// Ex 3


function isTrue(strings){
    return eval(strings.replace('=', '=='));
}
// compare 1
a = isTrue("15<2");
console.log("Compare1: ");
console.log(a);
// compare 2
a = isTrue("15>2");
console.log("Compare2: ");
console.log(a);
//identical semantics
a = isTrue("15=15");
console.log("Identical semantics: ");
console.log(a);
//identical semantics x2
a = isTrue("15=14");
console.log("Identical semantics: ");
console.log(a);
//approximately identical semantics ex "I and i"
a = isTrue("3=15");
console.log("Identical semantics: ");
console.log(a);

console.log("########### Exercise 4 ############");
// Ex 4

const cartbridge = {
    cyan: 23,
    magenta: 12,
    yellow: 10
};
// change to object
const entries = Object.entries(cartbridge);
// sort
const sortingAscendent = entries.sort((a, b) => a[1] - b[1]);
// max pages
const maxPages = sortingAscendent[0];
console.log(maxPages[1]);

console.log("########### Exercise 5 ############");
// Ex 5

const numbers = [1, 3, 3, 5, 5, 5];
// creates a new array of elements that pass the conditional we provide
function removeDuplicates(data){
    return data.filter((value, index) => data.indexOf(value) === index);
}

console.log(removeDuplicates(numbers));