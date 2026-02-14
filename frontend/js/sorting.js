/**
 * Sorting algorithms with visualization and step-by-step explanations
 */

const Sorting = {
  defaultArray: [],

  init(containerId) {
    Sorting.defaultArray = Viz.randomArray(10, 50);
    Viz.renderArray(Sorting.defaultArray, containerId);
    Viz.setExplanation("Array ready. Click <b>Run</b> to start. Each step will show what the algorithm is doing and why.");
  },

  async bubbleSort(arr, containerId) {
    const len = arr.length;
    await Viz.setExplanationAsync("Bubble Sort: we'll repeatedly pass through the array. In each pass, we compare <b>adjacent pairs</b> and swap if the left is greater than the right, so the largest unsorted value \"bubbles\" to the end.");
    await Viz.delay(Viz.getSpeed());
    let boxes = Viz.getBoxes(containerId);
    for (let i = 0; i < len - 1; i++) {
      await Viz.setExplanationAsync(`Pass ${i + 1}: We only need to check indices 0 to ${len - i - 2} because the last ${i} positions are already sorted.`);
      await Viz.delay(Viz.getSpeed());
      for (let j = 0; j < len - i - 1; j++) {
        boxes = Viz.getBoxes(containerId);
        const b1 = boxes[j], b2 = boxes[j + 1];
        b1.classList.add("compare");
        b2.classList.add("compare");
        await Viz.setExplanationAsync(`Comparing <b>${arr[j]}</b> and <b>${arr[j + 1]}</b> (positions ${j} and ${j + 1}). If the left is greater, we swap so the larger value moves right.`);
        Viz.setStatus(`Comparing ${arr[j]} and ${arr[j + 1]}`);
        await Viz.delay(Viz.getSpeed());
        if (arr[j] > arr[j + 1]) {
          await Viz.setExplanationAsync(`<b>${arr[j]} > ${arr[j + 1]}</b> — wrong order! Swapping them so the larger value moves toward the end.`);
          await Viz.animateSwap(b1, b2, arr, j, j + 1);
          Viz.renderArray(arr, containerId);
          boxes = Viz.getBoxes(containerId);
        } else {
          await Viz.setExplanationAsync(`<b>${arr[j]} ≤ ${arr[j + 1]}</b> — correct order. No swap needed. Moving to the next pair.`);
          await Viz.delay(Viz.getSpeed() / 2);
        }
        b1.classList.remove("compare");
        b2.classList.remove("compare");
      }
      boxes = Viz.getBoxes(containerId);
      boxes[len - 1 - i].classList.add("sorted");
      await Viz.setExplanationAsync(`End of pass ${i + 1}: The largest value in the unsorted region is now in place at index ${len - 1 - i}. It's marked <span style="color:var(--green)">sorted</span>.`);
      await Viz.delay(Viz.getSpeed());
    }
    Viz.getBoxes(containerId).forEach((b) => b.classList.add("sorted"));
    await Viz.setExplanationAsync("Done! Every element is in sorted order. Bubble Sort always does O(n²) comparisons, so it's simple but slow for large arrays.");
    Viz.setStatus("Sorted!");
  },

  async selectionSort(arr, containerId) {
    const n = arr.length;
    await Viz.setExplanationAsync("Selection Sort: In each round we find the <b>minimum</b> in the unsorted region and swap it with the first unsorted position. The sorted region grows from the left.");
    await Viz.delay(Viz.getSpeed());
    let boxes = Viz.getBoxes(containerId);
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      boxes[i].classList.add("current");
      await Viz.setExplanationAsync(`Round ${i + 1}: We assume the minimum is at index <b>${i}</b> (value ${arr[i]}). We'll scan the rest to find any smaller value.`);
      await Viz.delay(Viz.getSpeed());
      for (let j = i + 1; j < n; j++) {
        boxes[j].classList.add("compare");
        if (boxes[minIdx]) boxes[minIdx].classList.add("min");
        await Viz.setExplanationAsync(`Checking index ${j} (value <b>${arr[j]}</b>). Current minimum is ${arr[minIdx]} at index ${minIdx}. If this is smaller, we update the minimum.`);
        Viz.setStatus(`Finding min from index ${i}`);
        await Viz.delay(Viz.getSpeed());
        if (arr[j] < arr[minIdx]) {
          if (boxes[minIdx]) boxes[minIdx].classList.remove("min");
          minIdx = j;
          await Viz.setExplanationAsync(`<b>${arr[j]}</b> is smaller than ${arr[minIdx] === arr[j] ? "the previous min" : arr[minIdx]}. New minimum index = ${minIdx}.`);
        }
        boxes[j].classList.remove("compare");
      }
      boxes = Viz.getBoxes(containerId);
      if (minIdx !== i) {
        const bI = boxes[i], bMin = boxes[minIdx];
        bI.classList.add("swap");
        bMin.classList.add("swap");
        await Viz.setExplanationAsync(`Minimum in unsorted region is <b>${arr[minIdx]}</b> at index ${minIdx}. Swapping it with position ${i} so the sorted region gets the next smallest value.`);
        await Viz.delay(Viz.getSpeed());
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        Viz.renderArray(arr, containerId);
      } else {
        await Viz.setExplanationAsync(`The element at position ${i} is already the minimum in the unsorted region. No swap needed.`);
        await Viz.delay(Viz.getSpeed());
      }
      boxes = Viz.getBoxes(containerId);
      boxes[i].classList.remove("current");
      boxes[i].classList.add("sorted");
      await Viz.setExplanationAsync(`Position ${i} is now sorted. We'll repeat for the remaining unsorted indices.`);
      await Viz.delay(Viz.getSpeed());
    }
    Viz.getBoxes(containerId).forEach((b) => b.classList.add("sorted"));
    await Viz.setExplanationAsync("Done! Selection Sort always does O(n²) comparisons. Unlike Bubble Sort, it does at most n−1 swaps.");
    Viz.setStatus("Sorted!");
  },

  async insertionSort(arr, containerId) {
    const n = arr.length;
    let boxes = Viz.getBoxes(containerId);
    boxes[0].classList.add("sorted");
    await Viz.setExplanationAsync("Insertion Sort: We maintain a <b>sorted region</b> on the left. In each step we take the next element and <b>insert</b> it into the correct position in the sorted region (by shifting larger elements right).");
    await Viz.delay(Viz.getSpeed());
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      boxes = Viz.getBoxes(containerId);
      boxes[i].classList.add("current");
      await Viz.setExplanationAsync(`Inserting <b>${key}</b> (index ${i}) into the sorted region. We'll compare it with elements from right to left and shift larger ones right until we find the correct spot.`);
      Viz.setStatus(`Inserting ${key} into sorted region`);
      await Viz.delay(Viz.getSpeed());
      while (j >= 0 && arr[j] > key) {
        boxes = Viz.getBoxes(containerId);
        boxes[j].classList.add("compare");
        await Viz.setExplanationAsync(`<b>${arr[j]} > ${key}</b>, so ${arr[j]} must move right to make room. We copy it to position ${j + 1} and continue checking left.`);
        await Viz.delay(Viz.getSpeed());
        arr[j + 1] = arr[j];
        j--;
        Viz.renderArray(arr, containerId);
      }
      arr[j + 1] = key;
      Viz.renderArray(arr, containerId);
      await Viz.setExplanationAsync(`Placed <b>${key}</b> at position ${j + 1}. The sorted region now has ${i + 1} elements.`);
      await Viz.delay(Viz.getSpeed());
      Viz.getBoxes(containerId).forEach((b) => {
        b.classList.remove("compare", "current");
        if (arr.indexOf(parseInt(b.textContent, 10)) <= i) b.classList.add("sorted");
      });
    }
    Viz.getBoxes(containerId).forEach((b) => b.classList.add("sorted"));
    await Viz.setExplanationAsync("Done! Insertion Sort is O(n²) but efficient for small or nearly sorted data. It's stable and in-place.");
    Viz.setStatus("Sorted!");
  },

  async mergeSort(arr, containerId) {
    await Viz.setExplanationAsync("Merge Sort: A <b>divide-and-conquer</b> algorithm. We split the array in half until we have single elements (already sorted), then <b>merge</b> two sorted halves by repeatedly taking the smaller front element.");
    await Viz.delay(Viz.getSpeed());

    async function merge(l, m, r) {
      const left = arr.slice(l, m + 1), right = arr.slice(m + 1, r + 1);
      await Viz.setExplanationAsync(`Merging two sorted halves: [${left.join(", ")}] and [${right.join(", ")}]. We'll build the result by always taking the smaller of the two front elements.`);
      await Viz.delay(Viz.getSpeed());
      let i = 0, j = 0, k = l;
      while (i < left.length && j < right.length) {
        const boxes = Viz.getBoxes(containerId);
        if (boxes[k]) boxes[k].classList.add("compare");
        if (boxes[m + 1 + j]) boxes[m + 1 + j].classList.add("compare");
        await Viz.setExplanationAsync(`Compare left front (<b>${left[i]}</b>) with right front (<b>${right[j]}</b>). The smaller one goes to position ${k}.`);
        Viz.setStatus(`Merging: comparing ${left[i]} and ${right[j]}`);
        await Viz.delay(Viz.getSpeed());
        if (left[i] <= right[j]) {
          arr[k++] = left[i++];
          await Viz.setExplanationAsync(`<b>${left[i - 1]}</b> is smaller or equal. We place it at position ${k - 1} and advance the left half.`);
        } else {
          arr[k++] = right[j++];
          await Viz.setExplanationAsync(`<b>${right[j - 1]}</b> is smaller. We place it at position ${k - 1} and advance the right half.`);
        }
        Viz.renderArray(arr, containerId);
      }
      while (i < left.length) arr[k++] = left[i++];
      while (j < right.length) arr[k++] = right[j++];
      Viz.renderArray(arr, containerId);
      await Viz.setExplanationAsync(`Merge complete for this segment. Remaining elements (if any) were copied in order.`);
      await Viz.delay(Viz.getSpeed());
    }

    async function ms(l, r) {
      if (l >= r) return;
      const m = Math.floor((l + r) / 2);
      await ms(l, m);
      await ms(m + 1, r);
      await merge(l, m, r);
    }
    await ms(0, arr.length - 1);
    Viz.getBoxes(containerId).forEach((b) => b.classList.add("sorted"));
    await Viz.setExplanationAsync("Done! Merge Sort is O(n log n) and stable. It uses extra space for the temporary halves during merge.");
    Viz.setStatus("Sorted!");
  },

  async quickSort(arr, containerId) {
    await Viz.setExplanationAsync("Quick Sort: We pick a <b>pivot</b> (here, the last element). We <b>partition</b>: move every element ≤ pivot to the left, > pivot to the right. Then we recursively sort the left and right parts.");
    await Viz.delay(Viz.getSpeed());

    async function partition(lo, hi) {
      const pivot = arr[hi];
      let boxes = Viz.getBoxes(containerId);
      if (boxes[hi]) boxes[hi].classList.add("pivot");
      await Viz.setExplanationAsync(`Pivot = <b>${pivot}</b> (last element). We'll scan from the start and keep a boundary: everything left of it is ≤ pivot. Elements ≤ pivot get swapped to the left of the boundary.`);
      Viz.setStatus(`Pivot = ${pivot}`);
      await Viz.delay(Viz.getSpeed());
      let i = lo - 1;
      for (let j = lo; j < hi; j++) {
        boxes = Viz.getBoxes(containerId);
        if (boxes[j]) boxes[j].classList.add("compare");
        await Viz.setExplanationAsync(`Checking <b>${arr[j]}</b> at index ${j}. If it's ≤ ${pivot}, we swap it to the left region (position ${i + 1}) and move the boundary.`);
        await Viz.delay(Viz.getSpeed());
        if (arr[j] <= pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          Viz.renderArray(arr, containerId);
        }
        Viz.getBoxes(containerId).forEach((b) => b.classList.remove("compare"));
      }
      [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
      Viz.renderArray(arr, containerId);
      Viz.getBoxes(containerId).forEach((b) => b.classList.remove("pivot"));
      await Viz.setExplanationAsync(`Partition done. Pivot ${pivot} is now at index ${i + 1}. Left part [${lo}..${i}] ≤ pivot, right part [${i + 2}..${hi}] > pivot. We'll sort each part recursively.`);
      await Viz.delay(Viz.getSpeed());
      return i + 1;
    }

    async function qs(lo, hi) {
      if (lo >= hi) return;
      const p = await partition(lo, hi);
      await qs(lo, p - 1);
      await qs(p + 1, hi);
    }
    await qs(0, arr.length - 1);
    Viz.getBoxes(containerId).forEach((b) => b.classList.add("sorted"));
    await Viz.setExplanationAsync("Done! Quick Sort is O(n log n) on average and in-place. Worst case is O(n²) if the pivot is always the smallest or largest.");
    Viz.setStatus("Sorted!");
  },

  async heapSort(arr, containerId) {
    const n = arr.length;
    await Viz.setExplanationAsync("Heap Sort: First we build a <b>max-heap</b> (parent ≥ children). Then we repeatedly take the max (at the root), swap it to the end, and restore the heap for the remaining elements.");
    await Viz.delay(Viz.getSpeed());

    function heapify(n, i) {
      let largest = i, left = 2 * i + 1, right = 2 * i + 2;
      if (left < n && arr[left] > arr[largest]) largest = left;
      if (right < n && arr[right] > arr[largest]) largest = right;
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(n, largest);
      }
    }

    await Viz.setExplanationAsync("Building the max-heap (no animation): we call heapify from the last non-leaf up to the root so each subtree satisfies the heap property.");
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
    Viz.renderArray(arr, containerId);
    await Viz.delay(Viz.getSpeed());

    for (let end = n - 1; end > 0; end--) {
      let boxes = Viz.getBoxes(containerId);
      boxes[0].classList.add("swap");
      boxes[end].classList.add("swap");
      await Viz.setExplanationAsync(`The root holds the maximum. We swap it with the last unsorted position (index ${end}) so the max is now in its final place. Then we'll restore the heap for indices 0..${end - 1}.`);
      Viz.setStatus(`Moving max to position ${end}`);
      await Viz.delay(Viz.getSpeed());
      [arr[0], arr[end]] = [arr[end], arr[0]];
      Viz.renderArray(arr, containerId);
      boxes = Viz.getBoxes(containerId);
      boxes[end].classList.add("sorted");
      await Viz.delay(Viz.getSpeed());
      heapify(end, 0);
      Viz.renderArray(arr, containerId);
      await Viz.setExplanationAsync(`Heap restored. We'll repeat: swap root to end, then heapify, until the whole array is sorted.`);
      await Viz.delay(Viz.getSpeed());
    }
    Viz.getBoxes(containerId).forEach((b) => b.classList.add("sorted"));
    await Viz.setExplanationAsync("Done! Heap Sort is O(n log n) and in-place. It's not stable.");
    Viz.setStatus("Sorted!");
  },
};
