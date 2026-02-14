/**
 * Data structure visualizations with all operations and step-by-step explanations
 */

const DS = {
  linkedList: [],
  stack: [],
  queue: [],
  bstRoot: null,

  // ---------- Linked List ----------
  initLinkedList(containerId) {
    DS.linkedList = [5, 12, 7, 3, 9];
    DS.renderLinkedList(containerId);
    Viz.setExplanation("A <b>singly linked list</b>: each node has a value and a pointer to the next. The last node points to NULL. Operations: Insert (head/tail/at index), Delete (at index), Search, Traverse.");
  },

  renderLinkedList(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "ll-container";
    DS.linkedList.forEach((val, i) => {
      const node = document.createElement("div");
      node.className = "ll-node";
      node.dataset.index = i;
      node.innerHTML = `<span class="cell value">${val}</span><span class="cell next">→</span>`;
      wrap.appendChild(node);
      if (i < DS.linkedList.length - 1) {
        const arrow = document.createElement("span");
        arrow.className = "ll-arrow";
        arrow.textContent = "→";
        wrap.appendChild(arrow);
      }
    });
    const nullNode = document.createElement("div");
    nullNode.className = "ll-node";
    nullNode.innerHTML = '<span class="cell value">NULL</span>';
    nullNode.style.opacity = "0.6";
    wrap.appendChild(nullNode);
    container.appendChild(wrap);
  },

  async traverseLinkedList(containerId) {
    await Viz.setExplanationAsync("Traverse: start at the head and follow the <b>next</b> pointer until we reach NULL. We visit each node exactly once. Time: O(n).");
    await Viz.delay(Viz.getSpeed());
    for (let i = 0; i < DS.linkedList.length; i++) {
      const node = document.querySelector(`.ll-node[data-index="${i}"]`);
      if (node) node.classList.add("highlight");
      await Viz.setExplanationAsync(`Visiting node at index <b>${i}</b>: value = <b>${DS.linkedList[i]}</b>. Then we follow the next pointer to the next node.`);
      Viz.setStatus(`Visiting node at index ${i}: value = ${DS.linkedList[i]}`);
      await Viz.delay(Viz.getSpeed());
      if (node) node.classList.remove("highlight");
    }
    await Viz.setExplanationAsync("Reached NULL. Traversal complete. We visited " + DS.linkedList.length + " nodes.");
    Viz.setStatus("Traversal complete.");
  },

  async insertHead(containerId, val) {
    await Viz.setExplanationAsync(`Insert at head: create a new node with value <b>${val}</b> and set its next to the current head. Then update head to this new node. Time: O(1).`);
    await Viz.delay(Viz.getSpeed());
    DS.linkedList.unshift(val);
    DS.renderLinkedList(containerId);
    const node = document.querySelector(".ll-node[data-index='0']");
    if (node) node.classList.add("highlight");
    await Viz.setExplanationAsync(`New node <b>${val}</b> is now the head (index 0). The previous head is now the second node.`);
    Viz.setStatus(`Inserted ${val} at head.`);
    await Viz.delay(Viz.getSpeed());
  },

  async insertTail(containerId, val) {
    await Viz.setExplanationAsync(`Insert at tail: create a new node with value <b>${val}</b>. Traverse to the last node and set its next to this new node; the new node's next is NULL. Time: O(n) for singly linked list (unless we keep a tail pointer).`);
    await Viz.delay(Viz.getSpeed());
    DS.linkedList.push(val);
    DS.renderLinkedList(containerId);
    const node = document.querySelector(`.ll-node[data-index="${DS.linkedList.length - 1}"]`);
    if (node) node.classList.add("highlight");
    await Viz.setExplanationAsync(`New node <b>${val}</b> is now the last node (index ${DS.linkedList.length - 1}). It points to NULL.`);
    Viz.setStatus(`Inserted ${val} at tail.`);
    await Viz.delay(Viz.getSpeed());
  },

  async insertAt(containerId, index, val) {
    if (index < 0 || index > DS.linkedList.length) {
      await Viz.setExplanationAsync("Invalid index. Use 0 to length (inclusive) for insert.");
      return;
    }
    if (index === 0) return DS.insertHead(containerId, val);
    if (index === DS.linkedList.length) return DS.insertTail(containerId, val);
    await Viz.setExplanationAsync(`Insert at index <b>${index}</b>: we need to find the node at position ${index - 1}, create a new node with value <b>${val}</b>, set new node's next to the current node at ${index}, and set (${index - 1})'s next to the new node. Time: O(n) to reach the position.`);
    await Viz.delay(Viz.getSpeed());
    DS.linkedList.splice(index, 0, val);
    DS.renderLinkedList(containerId);
    const node = document.querySelector(`.ll-node[data-index="${index}"]`);
    if (node) node.classList.add("highlight");
    await Viz.setExplanationAsync(`Inserted <b>${val}</b> at index ${index}. All elements from index ${index} onward shifted right.`);
    Viz.setStatus(`Inserted ${val} at index ${index}.`);
    await Viz.delay(Viz.getSpeed());
  },

  async deleteAt(containerId, index) {
    if (index < 0 || index >= DS.linkedList.length) {
      await Viz.setExplanationAsync("Invalid index. Use 0 to length-1 for delete.");
      return;
    }
    const val = DS.linkedList[index];
    await Viz.setExplanationAsync(`Delete at index <b>${index}</b> (value ${val}): we must find the node at ${index - 1} and set its next to the node after ${index} (or NULL if deleting the last). Time: O(n) to reach the predecessor.`);
    await Viz.delay(Viz.getSpeed());
    const node = document.querySelector(`.ll-node[data-index="${index}"]`);
    if (node) node.classList.add("highlight");
    await Viz.setExplanationAsync(`Removing node with value <b>${val}</b>. The list will skip this node.`);
    await Viz.delay(Viz.getSpeed());
    DS.linkedList.splice(index, 1);
    DS.renderLinkedList(containerId);
    await Viz.setExplanationAsync(`Deleted value ${val} from index ${index}. List length is now ${DS.linkedList.length}.`);
    Viz.setStatus(`Deleted at index ${index}.`);
  },

  async searchLinkedList(containerId, target) {
    await Viz.setExplanationAsync(`Search for <b>${target}</b>: traverse from the head and compare each node's value. Return the index if found, else -1. Time: O(n).`);
    await Viz.delay(Viz.getSpeed());
    for (let i = 0; i < DS.linkedList.length; i++) {
      const node = document.querySelector(`.ll-node[data-index="${i}"]`);
      if (node) node.classList.add("highlight");
      await Viz.setExplanationAsync(`Checking index ${i}: value = <b>${DS.linkedList[i]}</b>. ${DS.linkedList[i] === target ? "Match! Target found at index " + i + "." : "Not a match. Continue."}`);
      await Viz.delay(Viz.getSpeed());
      if (DS.linkedList[i] === target) {
        await Viz.setExplanationAsync(`Found <b>${target}</b> at index <b>${i}</b>.`);
        Viz.setStatus(`Found at index ${i}`);
        return i;
      }
      if (node) node.classList.remove("highlight");
    }
    await Viz.setExplanationAsync(`Reached end of list. <b>${target}</b> not found. Return -1.`);
    Viz.setStatus("Not found.");
    return -1;
  },

  // ---------- Stack ----------
  initStack(containerId) {
    DS.stack = [30, 20, 10];
    DS.renderStack(containerId);
    Viz.setExplanation("A <b>stack</b> is LIFO (Last In, First Out). Operations: <b>Push</b> (add on top), <b>Pop</b> (remove from top), <b>Peek</b> (view top without removing), <b>IsEmpty</b>. Top is drawn at the top of the visual.");
  },

  renderStack(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '<div class="stack-queue-container" id="stack-viz"></div>';
    const wrap = document.getElementById("stack-viz");
    [...DS.stack].reverse().forEach((val) => {
      const cell = document.createElement("div");
      cell.className = "stack-cell";
      cell.textContent = val;
      wrap.appendChild(cell);
    });
  },

  async stackPush(containerId, val) {
    await Viz.setExplanationAsync(`<b>Push(${val})</b>: add the element on top of the stack. The new element becomes the new top. Time: O(1).`);
    await Viz.delay(Viz.getSpeed());
    DS.stack.push(val);
    DS.renderStack(containerId);
    const cells = document.querySelectorAll("#stack-viz .stack-cell");
    if (cells.length) cells[cells.length - 1].classList.add("highlight");
    await Viz.setExplanationAsync(`<b>${val}</b> is now on top of the stack. Pop will remove this element first (LIFO).`);
    Viz.setStatus(`Pushed ${val}.`);
    await Viz.delay(Viz.getSpeed());
    DS.renderStack(containerId);
  },

  async stackPop(containerId) {
    if (DS.stack.length === 0) {
      await Viz.setExplanationAsync("Stack is <b>empty</b>. Pop is undefined — we cannot remove an element. Many implementations throw an error or return a sentinel.");
      Viz.setStatus("Stack empty.");
      return;
    }
    const val = DS.stack[DS.stack.length - 1];
    await Viz.setExplanationAsync(`<b>Pop()</b>: remove and return the top element. The element below becomes the new top. Time: O(1).`);
    await Viz.delay(Viz.getSpeed());
    const cells = document.querySelectorAll("#stack-viz .stack-cell");
    if (cells.length) cells[0].classList.add("highlight");
    await Viz.setExplanationAsync(`Removing the top element: <b>${val}</b>.`);
    await Viz.delay(Viz.getSpeed());
    DS.stack.pop();
    DS.renderStack(containerId);
    await Viz.setExplanationAsync(`Popped <b>${val}</b>. Stack size is now ${DS.stack.length}.`);
    Viz.setStatus(`Popped ${val}.`);
  },

  stackPeek(containerId) {
    if (DS.stack.length === 0) {
      await Viz.setExplanationAsync("Stack is empty. There is no top element to peek.");
      Viz.setStatus("Stack empty.");
      return;
    }
    const val = DS.stack[DS.stack.length - 1];
    await Viz.setExplanationAsync(`<b>Peek()</b>: return the top element <b>without removing</b> it. Top value = <b>${val}</b>. The stack is unchanged. Time: O(1).`);
    Viz.setStatus(`Peek: ${val}`);
    const cells = document.querySelectorAll("#stack-viz .stack-cell");
    if (cells.length) cells[0].classList.add("highlight");
    setTimeout(() => cells.forEach((c) => c.classList.remove("highlight")), Viz.getSpeed());
  },

  stackIsEmpty(containerId) {
    const empty = DS.stack.length === 0;
    await Viz.setExplanationAsync(`<b>IsEmpty()</b>: returns true if the stack has no elements. Current size = ${DS.stack.length}, so IsEmpty = <b>${empty}</b>.`);
    Viz.setStatus(empty ? "Stack is empty." : "Stack is not empty.");
  },

  // ---------- Queue ----------
  initQueue(containerId) {
    DS.queue = [10, 20, 30];
    DS.renderQueue(containerId);
    await Viz.setExplanationAsync("A <b>queue</b> is FIFO (First In, First Out). Operations: <b>Enqueue</b> (add at rear), <b>Dequeue</b> (remove from front), <b>Peek</b> (front element), <b>IsEmpty</b>. Front is left, rear is right.");
  },

  renderQueue(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '<div class="stack-queue-container queue-viz" id="queue-viz"></div>';
    const wrap = document.getElementById("queue-viz");
    DS.queue.forEach((val) => {
      const cell = document.createElement("div");
      cell.className = "queue-cell";
      cell.textContent = val;
      wrap.appendChild(cell);
    });
  },

  async queueEnqueue(containerId, val) {
    await Viz.setExplanationAsync(`<b>Enqueue(${val})</b>: add the element at the <b>rear</b> of the queue. New elements wait behind the others. Time: O(1) with a rear pointer.`);
    await Viz.delay(Viz.getSpeed());
    DS.queue.push(val);
    DS.renderQueue(containerId);
    const cells = document.querySelectorAll("#queue-viz .queue-cell");
    if (cells.length) cells[cells.length - 1].classList.add("highlight");
    await Viz.setExplanationAsync(`<b>${val}</b> is now at the rear. It will be served after all elements in front of it (FIFO).`);
    Viz.setStatus(`Enqueued ${val}.`);
    await Viz.delay(Viz.getSpeed());
    DS.renderQueue(containerId);
  },

  async queueDequeue(containerId) {
    if (DS.queue.length === 0) {
      await Viz.setExplanationAsync("Queue is <b>empty</b>. Dequeue is undefined. Cannot remove from an empty queue.");
      Viz.setStatus("Queue empty.");
      return;
    }
    const val = DS.queue[0];
    await Viz.setExplanationAsync(`<b>Dequeue()</b>: remove and return the element at the <b>front</b>. The next element becomes the new front. Time: O(1) with a linked list; O(n) with array shift.`);
    await Viz.delay(Viz.getSpeed());
    const cells = document.querySelectorAll("#queue-viz .queue-cell");
    if (cells.length) cells[0].classList.add("highlight");
    await Viz.setExplanationAsync(`Removing the front element: <b>${val}</b>.`);
    await Viz.delay(Viz.getSpeed());
    DS.queue.shift();
    DS.renderQueue(containerId);
    await Viz.setExplanationAsync(`Dequeued <b>${val}</b>. New front is ${DS.queue[0] !== undefined ? DS.queue[0] : "none (queue empty)"}.`);
    Viz.setStatus(`Dequeued ${val}.`);
  },

  queuePeek(containerId) {
    if (DS.queue.length === 0) {
      await Viz.setExplanationAsync("Queue is empty. There is no front element.");
      Viz.setStatus("Queue empty.");
      return;
    }
    const val = DS.queue[0];
    await Viz.setExplanationAsync(`<b>Peek()</b>: return the front element <b>without removing</b> it. Front = <b>${val}</b>. Time: O(1).`);
    Viz.setStatus(`Peek (front): ${val}`);
    const cells = document.querySelectorAll("#queue-viz .queue-cell");
    if (cells.length) cells[0].classList.add("highlight");
    setTimeout(() => cells.forEach((c) => c.classList.remove("highlight")), Viz.getSpeed());
  },

  queueIsEmpty(containerId) {
    const empty = DS.queue.length === 0;
    await Viz.setExplanationAsync(`<b>IsEmpty()</b>: true if the queue has no elements. Size = ${DS.queue.length}, so IsEmpty = <b>${empty}</b>.`);
    Viz.setStatus(empty ? "Queue is empty." : "Queue is not empty.");
  },

  // ---------- BST ----------
  initBST(containerId) {
    DS.bstRoot = { value: 50, left: null, right: null };
    [30, 70, 20, 40, 60, 80, 10, 25, 35, 45].forEach((v) => DS.bstInsert(DS.bstRoot, v));
    DS.renderBST(containerId);
    Viz.setExplanation("A <b>Binary Search Tree (BST)</b>: for every node, left subtree has smaller keys, right subtree has larger. Operations: Insert, Delete, Search, Inorder / Preorder / Postorder traversals.");
  },

  bstInsert(root, val) {
    if (!root) return { value: val, left: null, right: null };
    if (val < root.value) root.left = DS.bstInsert(root.left, val);
    else if (val > root.value) root.right = DS.bstInsert(root.right, val);
    return root;
  },

  bstLayout(node, x, y, w) {
    if (!node) return [];
    const items = [{ node, x, y }];
    const half = w / 2;
    if (node.left) items.push(...DS.bstLayout(node.left, x - half, y + 70, half));
    if (node.right) items.push(...DS.bstLayout(node.right, x + half, y + 70, half));
    return items;
  },

  renderBST(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !DS.bstRoot) return;
    container.innerHTML = "";
    const width = container.offsetWidth > 0 ? container.offsetWidth : 500;
    const items = DS.bstLayout(DS.bstRoot, width / 2, 30, width / 2.2);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "graph-svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    container.appendChild(svg);
    items.forEach(({ node, x, y }) => {
      if (node.left) {
        const l = items.find((i) => i.node === node.left);
        if (l) {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", x);
          line.setAttribute("y1", y + 22);
          line.setAttribute("x2", l.x);
          line.setAttribute("y2", l.y - 22);
          line.setAttribute("stroke", "var(--border)");
          line.setAttribute("stroke-width", "2");
          svg.appendChild(line);
        }
      }
      if (node.right) {
        const r = items.find((i) => i.node === node.right);
        if (r) {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", x);
          line.setAttribute("y1", y + 22);
          line.setAttribute("x2", r.x);
          line.setAttribute("y2", r.y - 22);
          line.setAttribute("stroke", "var(--border)");
          line.setAttribute("stroke-width", "2");
          svg.appendChild(line);
        }
      }
    });
    items.forEach(({ node, x, y }) => {
      const el = document.createElement("div");
      el.className = "bst-node";
      el.textContent = node.value;
      el.style.left = x - 22 + "px";
      el.style.top = y + "px";
      el.dataset.value = node.value;
      container.appendChild(el);
    });
  },

  async bstInsertValue(containerId, val) {
    const root = DS.bstRoot;
    await Viz.setExplanationAsync(`<b>Insert(${val})</b>: start at the root. If ${val} < current node, go left; if ${val} > current, go right; if we reach an empty spot, create a new node there. Time: O(h) where h is height.`);
    await Viz.delay(Viz.getSpeed());
    DS.bstInsert(root, val);
    DS.renderBST(containerId);
    const el = document.querySelector(`.bst-node[data-value="${val}"]`);
    if (el) el.classList.add("highlight");
    await Viz.setExplanationAsync(`Inserted <b>${val}</b> in the correct position so the BST property is preserved: left < node < right.`);
    Viz.setStatus(`Inserted ${val}.`);
    await Viz.delay(Viz.getSpeed());
  },

  bstFindMin(node) {
    return node ? (node.left ? DS.bstFindMin(node.left) : node) : null;
  },

  bstDeleteNode(root, val) {
    if (!root) return null;
    if (val < root.value) root.left = DS.bstDeleteNode(root.left, val);
    else if (val > root.value) root.right = DS.bstDeleteNode(root.right, val);
    else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      const min = DS.bstFindMin(root.right);
      root.value = min.value;
      root.right = DS.bstDeleteNode(root.right, min.value);
    }
    return root;
  },

  bstContains(root, val) {
    if (!root) return false;
    if (root.value === val) return true;
    return val < root.value ? DS.bstContains(root.left, val) : DS.bstContains(root.right, val);
  },

  async bstDeleteValue(containerId, val) {
    if (!DS.bstRoot) {
      await Viz.setExplanationAsync("Tree is empty. Nothing to delete.");
      return;
    }
    if (!DS.bstContains(DS.bstRoot, val)) {
      await Viz.setExplanationAsync(`<b>${val}</b> is not in the tree. Nothing to delete.`);
      Viz.setStatus("Not found.");
      return;
    }
    await Viz.setExplanationAsync(`<b>Delete(${val})</b>: find the node. If it has 0 or 1 child, replace it with that child. If it has 2 children, replace its value with the minimum in the right subtree, then delete that minimum node.`);
    await Viz.delay(Viz.getSpeed());
    DS.bstRoot = DS.bstDeleteNode(DS.bstRoot, val);
    DS.renderBST(containerId);
    await Viz.setExplanationAsync(`Deleted <b>${val}</b>. BST property is preserved.`);
    Viz.setStatus(`Deleted ${val}.`);
  },

  async bstSearch(containerId, val) {
    DS.clearBSTHighlights();
    await Viz.setExplanationAsync(`<b>Search(${val})</b>: start at root. If current value equals ${val}, found. If ${val} < current, go left; else go right. If we reach null, not found. Time: O(h).`);
    await Viz.delay(Viz.getSpeed());
    let node = DS.bstRoot;
    const path = [];
    while (node) {
      path.push(node.value);
      const el = document.querySelector(`.bst-node[data-value="${node.value}"]`);
      if (el) el.classList.add("highlight");
      await Viz.setExplanationAsync(`At node <b>${node.value}</b>. Compare with ${val}: ${node.value === val ? "Match! Found." : val < node.value ? "Target is smaller → go left." : "Target is larger → go right."}`);
      await Viz.delay(Viz.getSpeed());
      if (node.value === val) {
        await Viz.setExplanationAsync(`Found <b>${val}</b>. Path from root: ${path.join(" → ")}.`);
        Viz.setStatus(`Found ${val}.`);
        return;
      }
      if (el) el.classList.remove("highlight");
      node = val < node.value ? node.left : node.right;
    }
    await Viz.setExplanationAsync(`Reached a null pointer. <b>${val}</b> is not in the BST.`);
    Viz.setStatus("Not found.");
  },

  clearBSTHighlights() {
    document.querySelectorAll(".bst-node").forEach((el) => el.classList.remove("highlight", "visited"));
  },

  async bstInorder(containerId) {
    DS.clearBSTHighlights();
    await Viz.setExplanationAsync("<b>Inorder</b>: left → root → right. For a BST this visits nodes in <b>ascending order</b>. Useful for sorted output.");
    await Viz.delay(Viz.getSpeed());
    const order = [];
    function inorder(n) {
      if (!n) return;
      inorder(n.left);
      order.push(n);
      inorder(n.right);
    }
    inorder(DS.bstRoot);
    for (const node of order) {
      const el = document.querySelector(`.bst-node[data-value="${node.value}"]`);
      if (el) el.classList.add("highlight");
      await Viz.setExplanationAsync(`Inorder visit: <b>${node.value}</b>. (Process left subtree first, then root, then right.)`);
      Viz.setStatus(`Inorder: ${node.value}`);
      await Viz.delay(Viz.getSpeed());
      if (el) el.classList.remove("highlight"), el.classList.add("visited");
    }
    await Viz.setExplanationAsync(`Inorder complete. Sequence: ${order.map((n) => n.value).join(", ")} — sorted order.`);
    Viz.setStatus("Inorder complete.");
  },

  async bstPreorder(containerId) {
    DS.clearBSTHighlights();
    await Viz.setExplanationAsync("<b>Preorder</b>: root → left → right. Useful for copying the tree or prefix expressions.");
    await Viz.delay(Viz.getSpeed());
    const order = [];
    function preorder(n) {
      if (!n) return;
      order.push(n);
      preorder(n.left);
      preorder(n.right);
    }
    preorder(DS.bstRoot);
    for (const node of order) {
      const el = document.querySelector(`.bst-node[data-value="${node.value}"]`);
      if (el) el.classList.add("highlight");
      await Viz.setExplanationAsync(`Preorder visit: <b>${node.value}</b>. (Process root first, then left subtree, then right.)`);
      Viz.setStatus(`Preorder: ${node.value}`);
      await Viz.delay(Viz.getSpeed());
      if (el) el.classList.remove("highlight"), el.classList.add("visited");
    }
    await Viz.setExplanationAsync(`Preorder complete. Sequence: ${order.map((n) => n.value).join(", ")}.`);
    Viz.setStatus("Preorder complete.");
  },

  async bstPostorder(containerId) {
    DS.clearBSTHighlights();
    await Viz.setExplanationAsync("<b>Postorder</b>: left → right → root. Useful for deleting the tree or postfix expressions.");
    await Viz.delay(Viz.getSpeed());
    const order = [];
    function postorder(n) {
      if (!n) return;
      postorder(n.left);
      postorder(n.right);
      order.push(n);
    }
    postorder(DS.bstRoot);
    for (const node of order) {
      const el = document.querySelector(`.bst-node[data-value="${node.value}"]`);
      if (el) el.classList.add("highlight");
      await Viz.setExplanationAsync(`Postorder visit: <b>${node.value}</b>. (Process left subtree, then right, then root.)`);
      Viz.setStatus(`Postorder: ${node.value}`);
      await Viz.delay(Viz.getSpeed());
      if (el) el.classList.remove("highlight"), el.classList.add("visited");
    }
    await Viz.setExplanationAsync(`Postorder complete. Sequence: ${order.map((n) => n.value).join(", ")}.`);
    Viz.setStatus("Postorder complete.");
  },
};
