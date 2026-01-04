// //VARIABLES (let, const)

// const size = 10; // array size (fixed)
// let numbers = [];  // array can change

// //DATA TYPES (Minimal)

// let count = 5 ;// number
// let isSorted = false ; // boolean
// let arr = [1,2,3,4]; // array

// //ARRAYS (CORE)- Create a random array

function generaterandomArray(size){
    let arr =[];
    for(let i = 0; i<size;i++){
        let randomNumber = Math.floor(Math.random()*100);
        arr.push(randomNumber)
    }
    return arr;
}

let size =5;
let numbers = generaterandomArray(size);
console.log("original array :" ,numbers);



for(let i =0; i<numbers.length;i++){
    console.log(numbers[i]);
}
if(numbers[0]>numbers[1]){
    console.log("swap needed")

}
else{
    console.log("swap not needed")
}


function swap(arr,i,j){
    let temp = arr[i];
    arr[i]=arr[j];
    arr[j]= temp;
    console.log(arr);
}

function bubbleSort(arr){
    let n = arr.length;
    for(let i =0;i<n-1;i++) {
        console.log('\npass ${i+1}');
    }
    for(let j =0;j<n-i-1;j++){
        console.log("comparing " ,arr[j], "and" ,arr[j+1]);

    }
    if(arr[j]>arr[j+1]){
        swap(arr,j,j+1);
        console.log("swapped :" , arr);

    }
    else{
        console.log("no swap needed :" , arr)
    }
}





