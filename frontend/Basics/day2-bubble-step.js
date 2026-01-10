// Day 2: Step-by-step Bubble Sort with delay

// 1. Delay function (makes the code wait)
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 2. Bubble sort that runs slowly
async function bubbleSortStep(arr) {
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    console.log("Pass", i + 1);

    for (let j = 0; j < n - i - 1; j++) {
      console.log("Comparing", arr[j], "and", arr[j + 1]);

      // wait before decision
      await delay(2000);

      if (arr[j] > arr[j + 1]) {
        // swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        console.log("Swapped:", arr);
      } else {
        console.log("No swap:", arr);
      }

      // wait after action
      await delay(2000);
    }
  }

  console.log("Final Sorted Array:", arr);
}

// 3. Test array
let array = [2, 4, 7, 1];

// 4. Run bubble sort
bubbleSortStep(array);
