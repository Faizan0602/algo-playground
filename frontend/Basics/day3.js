console.log("day3.js loaded");  // this line is used just for debugging 
let SPEED = 1500; // milliseconds



let arr = [2,4,7,1];
// get container from html 
let container = document.getElementById("array-container");

// function to show array on screen 
function renderArray(){
    container.innerHTML = "";
    arr.forEach(value=>{
        let box = document.createElement("div");
        box.className ="box";
        box.textContent = value;
        container.appendChild(box);

    });

}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

    async function startSort() {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {

      // ALWAYS get fresh boxes
      let boxes = document.getElementsByClassName("box");

      let box1 = boxes[j];
      let box2 = boxes[j + 1];

      // highlight comparison
      box1.classList.add("compare");
      box2.classList.add("compare");

      await delay(SPEED);

      if (arr[j] > arr[j + 1]) {
        // swap in array
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        // update UI
        box1.textContent = arr[j];
        box2.textContent = arr[j + 1];

        box1.classList.add("swap");
        box2.classList.add("swap");

        await delay(SPEED);
      }

      // remove styles
      box1.classList.remove("compare", "swap");
      box2.classList.remove("compare", "swap");
    }
  }
}

renderArray();