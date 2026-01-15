console.log("day3.js loaded");

// ================= CONFIG =================
let SPEED = 1500;

// ================= DATA =================
let arr = [2, 4, 7, 1];

// ================= DOM =================
let container = document.getElementById("array-container");

// ================= RENDER =================
function renderArray() {
  container.innerHTML = "";

  arr.forEach(value => {
    let box = document.createElement("div");
    box.className = "box";
    box.textContent = value;
    container.appendChild(box);
  });
}

// ================= DELAY =================
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ================= ARROW =================
function showArrow(targetBox) {
  const arrow = document.getElementById("arrow");
  const rect = targetBox.getBoundingClientRect();

  arrow.style.left = rect.left + rect.width / 2 + "px";
  arrow.style.top = rect.top - 35 + "px";
  arrow.style.display = "block";
}

function hideArrow() {
  document.getElementById("arrow").style.display = "none";
}

// ================= ANIMATIONS =================

// Bubble sort (adjacent swap)
async function animateSwap(box1, box2) {
  box1.classList.add("swap");
  box2.classList.add("swap");

  box1.style.transform = "translateX(70px)";
  box2.style.transform = "translateX(-70px)";

  await delay(SPEED);

  box1.style.transform = "";
  box2.style.transform = "";

  box1.classList.remove("swap");
  box2.classList.remove("swap");
}

// ================= BUBBLE SORT =================
async function startBubbleSort() {

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {

      let boxes = document.getElementsByClassName("box");
      let box1 = boxes[j];
      let box2 = boxes[j + 1];

      box1.classList.add("compare");
      box2.classList.add("compare");

      await delay(SPEED);

      if (arr[j] > arr[j + 1]) {

        await animateSwap(box1, box2);

        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        renderArray();
      }

      box1.classList.remove("compare");
      box2.classList.remove("compare");
    }
  }
}

// ================= SELECTION SORT =================
async function startSelectionSort() {

  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    let boxes = document.getElementsByClassName("box");
    boxes[i].classList.add("selected");

    for (let j = i + 1; j < n; j++) {
      boxes[j].classList.add("compare");
      boxes[minIndex].classList.add("min");

      await delay(SPEED);

      if (arr[j] < arr[minIndex]) {
        boxes[minIndex].classList.remove("min");
        minIndex = j;
      }

      boxes[j].classList.remove("compare");
    }

    if (minIndex !== i) {
      let boxI = boxes[i];
      let boxMin = boxes[minIndex];

      showArrow(boxI);

      boxI.classList.add("selected", "lift");
      boxMin.classList.add("min", "lift");

      await delay(SPEED);

      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      hideArrow();
      renderArray();
    }

    boxes[i].classList.remove("selected");
  }
}

// ================= RESET =================
function resetArray() {
  arr = [2, 4, 7, 1];
  hideArrow();
  renderArray();
}

// ================= INIT =================
renderArray();
