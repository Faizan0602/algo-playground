/**
 * App router and view setup
 */

const views = {
  "bubble-sort": {
    title: "Bubble Sort",
    desc: "Repeatedly compare adjacent elements and swap if wrong order. O(n²).",
    init() {
      Sorting.init("viz-area");
      document.getElementById("controls").innerHTML = `
        <button class="primary" data-action="run-bubble">Run Bubble Sort</button>
        <button data-action="reset-sorting">New Array</button>
      `;
    },
  },
  "selection-sort": {
    title: "Selection Sort",
    desc: "Find minimum from unsorted region and swap with current. O(n²).",
    init() {
      Sorting.init("viz-area");
      document.getElementById("controls").innerHTML = `
        <button class="primary" data-action="run-selection">Run Selection Sort</button>
        <button data-action="reset-sorting">New Array</button>
      `;
    },
  },
  "insertion-sort": {
    title: "Insertion Sort",
    desc: "Build sorted region one element at a time by inserting. O(n²).",
    init() {
      Sorting.init("viz-area");
      document.getElementById("controls").innerHTML = `
        <button class="primary" data-action="run-insertion">Run Insertion Sort</button>
        <button data-action="reset-sorting">New Array</button>
      `;
    },
  },
  "merge-sort": {
    title: "Merge Sort",
    desc: "Divide into halves, sort recursively, then merge. O(n log n).",
    init() {
      Sorting.init("viz-area");
      document.getElementById("controls").innerHTML = `
        <button class="primary" data-action="run-merge">Run Merge Sort</button>
        <button data-action="reset-sorting">New Array</button>
      `;
    },
  },
  "quick-sort": {
    title: "Quick Sort",
    desc: "Pick pivot, partition, then sort left and right. O(n log n) average.",
    init() {
      Sorting.init("viz-area");
      document.getElementById("controls").innerHTML = `
        <button class="primary" data-action="run-quick">Run Quick Sort</button>
        <button data-action="reset-sorting">New Array</button>
      `;
    },
  },
  "heap-sort": {
    title: "Heap Sort",
    desc: "Build max-heap, repeatedly extract max to end. O(n log n).",
    init() {
      Sorting.init("viz-area");
      document.getElementById("controls").innerHTML = `
        <button class="primary" data-action="run-heap">Run Heap Sort</button>
        <button data-action="reset-sorting">New Array</button>
      `;
    },
  },
  "linear-search": {
    title: "Linear Search",
    desc: "Check each element from start to end. O(n).",
    init() {
      Searching.init("viz-area");
      document.getElementById("controls").innerHTML = `
        <div class="input-group">
          <label>Target:</label>
          <input type="number" id="search-target" value="23" min="1" />
        </div>
        <button class="primary" data-action="run-linear">Run Linear Search</button>
        <button data-action="reset-search">Reset</button>
      `;
    },
  },
  "binary-search": {
    title: "Binary Search",
    desc: "Repeatedly compare with middle (array must be sorted). O(log n).",
    init() {
      Searching.init("viz-area");
      document.getElementById("controls").innerHTML = `
        <div class="input-group">
          <label>Target:</label>
          <input type="number" id="search-target" value="23" min="1" />
        </div>
        <button class="primary" data-action="run-binary">Run Binary Search</button>
        <button data-action="reset-search">Reset</button>
      `;
    },
  },
  "linked-list": {
    title: "Linked List",
    desc: "Nodes with value and next pointer. All operations for learning.",
    init() {
      DS.initLinkedList("viz-area");
      document.getElementById("controls").innerHTML = `
        <div class="input-group">
          <label>Value:</label>
          <input type="number" id="ll-value" value="15" />
        </div>
        <div class="input-group">
          <label>Index:</label>
          <input type="number" id="ll-index" value="0" min="0" />
        </div>
        <button class="primary" data-action="ll-insert-head">Insert at Head</button>
        <button data-action="ll-insert-tail">Insert at Tail</button>
        <button data-action="ll-insert-at">Insert at Index</button>
        <button data-action="ll-delete-at">Delete at Index</button>
        <button data-action="ll-search">Search</button>
        <button data-action="ll-traverse">Traverse</button>
        <button data-action="reset-ll">Reset</button>
      `;
    },
  },
  "stack": {
    title: "Stack",
    desc: "LIFO. Push, Pop, Peek, IsEmpty.",
    init() {
      DS.initStack("viz-area");
      document.getElementById("controls").innerHTML = `
        <div class="input-group">
          <label>Value:</label>
          <input type="number" id="stack-value" value="40" />
        </div>
        <button class="primary" data-action="stack-push">Push</button>
        <button data-action="stack-pop">Pop</button>
        <button data-action="stack-peek">Peek</button>
        <button data-action="stack-is-empty">Is Empty</button>
        <button data-action="reset-stack">Reset</button>
      `;
    },
  },
  "queue": {
    title: "Queue",
    desc: "FIFO. Enqueue, Dequeue, Peek, IsEmpty.",
    init() {
      DS.initQueue("viz-area");
      document.getElementById("controls").innerHTML = `
        <div class="input-group">
          <label>Value:</label>
          <input type="number" id="queue-value" value="40" />
        </div>
        <button class="primary" data-action="queue-enqueue">Enqueue</button>
        <button data-action="queue-dequeue">Dequeue</button>
        <button data-action="queue-peek">Peek</button>
        <button data-action="queue-is-empty">Is Empty</button>
        <button data-action="reset-queue">Reset</button>
      `;
    },
  },
  bst: {
    title: "Binary Search Tree",
    desc: "Left < root < right. Insert, Delete, Search, Traversals.",
    init() {
      DS.initBST("viz-area");
      document.getElementById("controls").innerHTML = `
        <div class="input-group">
          <label>Value:</label>
          <input type="number" id="bst-value" value="42" />
        </div>
        <button class="primary" data-action="bst-insert">Insert</button>
        <button data-action="bst-delete">Delete</button>
        <button data-action="bst-search">Search</button>
        <button data-action="bst-inorder">Inorder</button>
        <button data-action="bst-preorder">Preorder</button>
        <button data-action="bst-postorder">Postorder</button>
        <button data-action="reset-bst">Reset</button>
      `;
    },
  },
  graph: {
    title: "Graph (BFS / DFS)",
    desc: "Traverse from node A. BFS level-by-level, DFS depth-first.",
    init() {
      GraphViz.init("viz-area");
      document.getElementById("controls").innerHTML = `
        <button class="primary" data-action="graph-bfs">Run BFS (from A)</button>
        <button data-action="graph-dfs">Run DFS (from A)</button>
        <button data-action="reset-graph">Reset</button>
      `;
    },
  },
};

function setView(viewId) {
  const view = views[viewId];
  if (!view) return;
  document.querySelectorAll(".nav-item").forEach((el) => el.classList.remove("active"));
  const navEl = document.querySelector(`.nav-item[data-view="${viewId}"]`);
  if (navEl) navEl.classList.add("active");
  document.getElementById("view-title").textContent = view.title;
  document.getElementById("view-desc").innerHTML = view.desc;
  Viz.clearStatus();
  Viz.clearExplanation();
  view.init();
  bindControls(viewId);
}

function bindControls(viewId) {
  const container = document.getElementById("controls");
  if (!container) return;
  container.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.onclick = async () => {
      container.querySelectorAll("button").forEach((b) => (b.disabled = true));
      Viz.clearStatus();
      try {
        if (btn.dataset.action === "run-bubble") {
          const arr = [...Sorting.defaultArray];
          await Sorting.bubbleSort(arr, "viz-area");
        } else if (btn.dataset.action === "run-selection") {
          const arr = [...Sorting.defaultArray];
          await Sorting.selectionSort(arr, "viz-area");
        } else if (btn.dataset.action === "run-insertion") {
          const arr = [...Sorting.defaultArray];
          await Sorting.insertionSort(arr, "viz-area");
        } else if (btn.dataset.action === "run-merge") {
          const arr = [...Sorting.defaultArray];
          await Sorting.mergeSort(arr, "viz-area");
        } else if (btn.dataset.action === "run-quick") {
          const arr = [...Sorting.defaultArray];
          await Sorting.quickSort(arr, "viz-area");
        } else if (btn.dataset.action === "run-heap") {
          const arr = [...Sorting.defaultArray];
          await Sorting.heapSort(arr, "viz-area");
        } else if (btn.dataset.action === "reset-sorting") {
          setView(viewId);
        } else if (btn.dataset.action === "run-linear") {
          const target = parseInt(document.getElementById("search-target")?.value, 10) || 23;
          await Searching.linearSearch([...Searching.defaultArray], target, "viz-area");
        } else if (btn.dataset.action === "run-binary") {
          const target = parseInt(document.getElementById("search-target")?.value, 10) || 23;
          const arr = [...Searching.defaultArray];
          await Searching.binarySearch(arr, target, "viz-area");
        } else if (btn.dataset.action === "reset-search") {
          setView(viewId);
        } else if (btn.dataset.action === "ll-insert-head") {
          const val = parseInt(document.getElementById("ll-value")?.value, 10) || 15;
          await DS.insertHead("viz-area", val);
        } else if (btn.dataset.action === "ll-insert-tail") {
          const val = parseInt(document.getElementById("ll-value")?.value, 10) || 15;
          await DS.insertTail("viz-area", val);
        } else if (btn.dataset.action === "ll-insert-at") {
          const val = parseInt(document.getElementById("ll-value")?.value, 10) || 15;
          const index = parseInt(document.getElementById("ll-index")?.value, 10) || 0;
          await DS.insertAt("viz-area", index, val);
        } else if (btn.dataset.action === "ll-delete-at") {
          const index = parseInt(document.getElementById("ll-index")?.value, 10) || 0;
          await DS.deleteAt("viz-area", index);
        } else if (btn.dataset.action === "ll-search") {
          const val = parseInt(document.getElementById("ll-value")?.value, 10) || 15;
          await DS.searchLinkedList("viz-area", val);
        } else if (btn.dataset.action === "ll-traverse") {
          await DS.traverseLinkedList("viz-area");
        } else if (btn.dataset.action === "reset-ll") {
          setView(viewId);
        } else if (btn.dataset.action === "stack-push") {
          const val = parseInt(document.getElementById("stack-value")?.value, 10) || 40;
          await DS.stackPush("viz-area", val);
        } else if (btn.dataset.action === "stack-pop") {
          await DS.stackPop("viz-area");
        } else if (btn.dataset.action === "stack-peek") {
          DS.stackPeek("viz-area");
        } else if (btn.dataset.action === "stack-is-empty") {
          DS.stackIsEmpty("viz-area");
        } else if (btn.dataset.action === "reset-stack") {
          setView(viewId);
        } else if (btn.dataset.action === "queue-enqueue") {
          const val = parseInt(document.getElementById("queue-value")?.value, 10) || 40;
          await DS.queueEnqueue("viz-area", val);
        } else if (btn.dataset.action === "queue-dequeue") {
          await DS.queueDequeue("viz-area");
        } else if (btn.dataset.action === "queue-peek") {
          DS.queuePeek("viz-area");
        } else if (btn.dataset.action === "queue-is-empty") {
          DS.queueIsEmpty("viz-area");
        } else if (btn.dataset.action === "reset-queue") {
          setView(viewId);
        } else if (btn.dataset.action === "bst-insert") {
          const val = parseInt(document.getElementById("bst-value")?.value, 10) || 42;
          await DS.bstInsertValue("viz-area", val);
        } else if (btn.dataset.action === "bst-delete") {
          const val = parseInt(document.getElementById("bst-value")?.value, 10) || 42;
          await DS.bstDeleteValue("viz-area", val);
        } else if (btn.dataset.action === "bst-search") {
          const val = parseInt(document.getElementById("bst-value")?.value, 10) || 42;
          await DS.bstSearch("viz-area", val);
        } else if (btn.dataset.action === "bst-inorder") {
          await DS.bstInorder("viz-area");
        } else if (btn.dataset.action === "bst-preorder") {
          await DS.bstPreorder("viz-area");
        } else if (btn.dataset.action === "bst-postorder") {
          await DS.bstPostorder("viz-area");
        } else if (btn.dataset.action === "reset-bst") {
          setView(viewId);
        } else if (btn.dataset.action === "graph-bfs") {
          await GraphViz.bfs("viz-area", "A");
        } else if (btn.dataset.action === "graph-dfs") {
          await GraphViz.dfs("viz-area", "A");
        } else if (btn.dataset.action === "reset-graph") {
          setView(viewId);
        }
      } finally {
        container.querySelectorAll("button").forEach((b) => (b.disabled = false));
        Viz.play();
        const btnPause = document.getElementById("btn-pause");
        const btnPlay = document.getElementById("btn-play");
        if (btnPause) btnPause.disabled = false;
        if (btnPlay) btnPlay.disabled = true;
      }
    };
  });
}

document.querySelectorAll(".nav-item").forEach((el) => {
  el.addEventListener("click", () => setView(el.dataset.view));
});

// Speed slider: show current step delay (ms) and ensure it actually controls delay
(function initSpeedSlider() {
  const slider = document.getElementById("speed-slider");
  const valueEl = document.getElementById("speed-value");
  if (!slider || !valueEl) return;
  function update() {
    valueEl.textContent = Viz.getSpeed() + " ms";
  }
  slider.addEventListener("input", update);
  slider.addEventListener("change", update);
  update();
})();

// LLM: persist API key and "Use AI" in sessionStorage, restore on load
(function initLLMUI() {
  const keyEl = document.getElementById("llm-api-key");
  const useAiEl = document.getElementById("llm-use-ai");
  if (keyEl) {
    try {
      const saved = sessionStorage.getItem("algo-viz-openai-key");
      if (saved) keyEl.value = saved;
    } catch (_) {}
    keyEl.addEventListener("change", function () {
      try {
        if (this.value.trim()) sessionStorage.setItem("algo-viz-openai-key", this.value.trim());
        else sessionStorage.removeItem("algo-viz-openai-key");
      } catch (_) {}
    });
  }
  if (useAiEl) {
    try {
      useAiEl.checked = sessionStorage.getItem("algo-viz-use-ai") === "true";
    } catch (_) {}
    useAiEl.addEventListener("change", function () {
      try {
        sessionStorage.setItem("algo-viz-use-ai", this.checked ? "true" : "false");
      } catch (_) {}
    });
  }
})();

// Pause / Play: only affect current run; delay() waits until play when paused
(function initPlayback() {
  const btnPause = document.getElementById("btn-pause");
  const btnPlay = document.getElementById("btn-play");
  if (!btnPause || !btnPlay) return;
  btnPause.addEventListener("click", () => {
    Viz.pause();
    btnPause.disabled = true;
    btnPlay.disabled = false;
  });
  btnPlay.addEventListener("click", () => {
    Viz.play();
    btnPlay.disabled = true;
    btnPause.disabled = false;
  });
  // Start with Play disabled (nothing to resume)
  btnPlay.disabled = true;
})();

setView("bubble-sort");
