function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    console.log("After swap:", arr);
}

function bubbleSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        console.log(`\nPass ${i + 1}`);

        for (let j = 0; j < n - i - 1; j++) {
            console.log("Comparing", arr[j], "and", arr[j + 1]);

            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            } else {
                console.log("No swap needed:", arr);
            }
        }
    }

    console.log("\nSorted Array:", arr);
}


let arr = [5, 3, 2, 4, 1];
bubbleSort(arr);
