// //VARIABLES (let, const)

// const size = 10; // array size (fixed)
// let numbers = [];  // array can change

// //DATA TYPES (Minimal)

// let count = 5 ;// number
// let isSorted = false ; // boolean
// let arr = [1,2,3,4]; // array

// //ARRAYS (CORE)- Create a random array

// function generaterandomArray(size){
//     let arr =[];
//     for(let i = 0; i<size;i++){
//         let randomNumber = Math.floor(Math.random()*100);
//         arr.push(randomNumber)
//     }
//     return arr;
// }

// let size =5;
// let numbers = generaterandomArray(size);
// console.log("original array :" ,numbers);



// for(let i =0; i<numbers.length;i++){
//     console.log(numbers[i]);
// }
// if(numbers[0]>numbers[1]){
//     console.log("swap needed")

// }
// else{
//     console.log("swap not needed")
// }


// function swap(arr, i, j) {
//     let temp = arr[i];
//     arr[i] = arr[j];
//     arr[j] = temp;
// }

function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        console.log(`\nPass ${i + 1}`);

        for (let j = 0; j < arr.length - i - 1; j++) {
            console.log("Comparing", arr[j], "and", arr[j + 1]);

            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                console.log("Swapped:", arr);
            } else {
                console.log("No swap:", arr);
            }
        }
    }
    return arr;   
}

let numbers = [5, 3, 8, 4];
let result = bubbleSort(numbers);

console.log("\nFinal Sorted Array:", result);






