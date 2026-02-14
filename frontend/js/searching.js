/**
 * Search algorithms with visualization and step-by-step explanations
 */

const Searching = {
  defaultArray: [],

  init(containerId) {
    Searching.defaultArray = [3, 7, 11, 15, 19, 23, 29, 31, 37, 41];
    Viz.renderArray(Searching.defaultArray, containerId);
    Viz.setExplanation("Array ready. Enter a <b>target</b> and click Run. Linear Search checks every element from the start until it finds the target or reaches the end.");
  },

  async linearSearch(arr, target, containerId) {
    await Viz.setExplanationAsync(`Linear Search: We're looking for <b>${target}</b>. We'll check each element from index 0 to ${arr.length - 1} in order. Time complexity: O(n).`);
    await Viz.delay(Viz.getSpeed());
    const boxes = Viz.getBoxes(containerId);
    for (let i = 0; i < arr.length; i++) {
      boxes[i].classList.add("compare");
      await Viz.setExplanationAsync(`Step ${i + 1}: Checking index <b>${i}</b> — value is <b>${arr[i]}</b>. Is it equal to ${target}? ${arr[i] === target ? "Yes! We found it." : "No. Move to the next index."}`);
      Viz.setStatus(`Checking index ${i}: ${arr[i]}`);
      await Viz.delay(Viz.getSpeed());
      if (arr[i] === target) {
        boxes[i].classList.remove("compare");
        boxes[i].classList.add("found");
        await Viz.setExplanationAsync(`Found <b>${target}</b> at index <b>${i}</b>. Linear Search stops as soon as it finds a match. No need to check the rest.`);
        Viz.setStatus(`Found ${target} at index ${i}`);
        return i;
      }
      boxes[i].classList.remove("compare");
      await Viz.setExplanationAsync(`Not a match. We continue to the next element.`);
      await Viz.delay(Viz.getSpeed() / 2);
    }
    await Viz.setExplanationAsync(`We checked every element and never found <b>${target}</b>. The target is not in the array. Return -1 (not found).`);
    Viz.setStatus(`${target} not found`);
    return -1;
  },

  async binarySearch(arr, target, containerId) {
    await Viz.setExplanationAsync(`Binary Search: We're looking for <b>${target}</b>. The array must be <b>sorted</b>. We'll repeatedly look at the <b>middle</b> of the current range: if it's the target we're done; if it's smaller we search the right half; if larger we search the left half. Time: O(log n).`);
    await Viz.delay(Viz.getSpeed());
    let left = 0, right = arr.length - 1;
    let step = 0;
    let boxes = Viz.getBoxes(containerId);
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      step++;
      boxes = Viz.getBoxes(containerId);
      boxes[mid].classList.add("compare");
      for (let i = left; i <= right; i++) if (i !== mid) boxes[i].classList.add("current");
      await Viz.setExplanationAsync(`Step ${step}: Search range is indices [${left}, ${right}]. Mid index = ${mid}, value = <b>${arr[mid]}</b>. Compare with target ${target}: ${arr[mid] === target ? "Equal — found!" : arr[mid] < target ? "Mid is smaller → target must be in the right half. Set left = " + (mid + 1) + "." : "Mid is larger → target must be in the left half. Set right = " + (mid - 1) + "."}`);
      Viz.setStatus(`Mid = ${arr[mid]}, comparing with ${target}`);
      await Viz.delay(Viz.getSpeed());
      if (arr[mid] === target) {
        Viz.clearBoxClasses(containerId);
        boxes = Viz.getBoxes(containerId);
        boxes[mid].classList.add("found");
        await Viz.setExplanationAsync(`Found <b>${target}</b> at index <b>${mid}</b>. Binary Search only needed ${step} comparison(s) because it halves the search space each time.`);
        Viz.setStatus(`Found ${target} at index ${mid}`);
        return mid;
      }
      Viz.clearBoxClasses(containerId);
      if (arr[mid] < target) {
        left = mid + 1;
        await Viz.setExplanationAsync(`Since ${arr[mid]} < ${target}, the target (if present) must be in the right half. New range: [${left}, ${right}].`);
      } else {
        right = mid - 1;
        await Viz.setExplanationAsync(`Since ${arr[mid]} > ${target}, the target (if present) must be in the left half. New range: [${left}, ${right}].`);
      }
      await Viz.delay(Viz.getSpeed());
    }
    await Viz.setExplanationAsync(`The search range became empty (left > right). <b>${target}</b> is not in the array. Return -1.`);
    Viz.setStatus(`${target} not found`);
    return -1;
  },
};
