let arr = [2,4,7,1];
// get container from html 
let conatiner = document.getElementById("array-container");

// function to show array on screen 
function renderArray(){
    conatiner.innerHTML = "";
    arr.forEach(value=>{
        let box = document.createElement("div");
        box.className ="box";
        box.textContent = value;
        conatiner.appendChild(box);

    });

}
renderArray();s