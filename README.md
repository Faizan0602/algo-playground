# Algorithm & Data Structure Visualizer 🧠✨

A **beginner-friendly visualizer** for algorithms and data structures, built with **HTML, CSS, and JavaScript**. See how sorting, searching, and data structures work step by step with animations.

---

## 🚀 Features

- **Modern UI** – Dark theme, clear typography (Outfit + JetBrains Mono), responsive layout
- **Speed control** – Slider to adjust animation speed
- **Sorting** – Six algorithms with color-coded comparisons, swaps, and pivot highlighting
- **Searching** – Linear and Binary search with target input
- **Data structures** – Linked List, Stack, Queue, BST, Graph — with **all standard operations**
- **Step-by-step explanations** – Each action shows a short learning explanation (built-in text, or **optional AI** via OpenAI)
- **Optional LLM explanations** – Turn on “Use AI explanations” and add your **OpenAI API key** in the sidebar; each step is then explained by GPT (e.g. `gpt-4o-mini`). Key is used only in the browser and can be stored in sessionStorage.
- **No build step** – Open `index.html` in a browser and run

---

## 📊 Algorithms & Data Structures

### Sorting
| Algorithm        | Description                          |
|------------------|--------------------------------------|
| **Bubble Sort**  | Adjacent compare & swap. O(n²)      |
| **Selection Sort** | Select min from unsorted. O(n²)   |
| **Insertion Sort** | Build sorted region. O(n²)        |
| **Merge Sort**   | Divide, sort, merge. O(n log n)     |
| **Quick Sort**   | Pivot & partition. O(n log n) avg   |
| **Heap Sort**    | Max-heap, extract max. O(n log n)   |

### Searching
| Algorithm         | Description                    |
|-------------------|--------------------------------|
| **Linear Search** | Scan from start. O(n)         |
| **Binary Search** | Half-interval (sorted). O(log n) |

### Data Structures (all operations for learning)
| Structure   | Operations |
|------------|-------------|
| **Linked List** | Insert at Head, Insert at Tail, Insert at Index, Delete at Index, Search, Traverse |
| **Stack**   | Push, Pop, Peek, Is Empty |
| **Queue**   | Enqueue, Dequeue, Peek, Is Empty |
| **BST**     | Insert, Delete, Search, Inorder, Preorder, Postorder |
| **Graph**   | BFS, DFS from node A |

---

## 🛠️ Tech Stack

- **HTML** – Structure and semantic layout
- **CSS** – Variables, layout, animations, responsive design
- **JavaScript** – Algorithm logic, DOM updates, async animations
- **OpenAI API** (optional) – For AI-generated step explanations; requires your own API key

---

## ▶️ How to Run

1. Clone the repo.
2. Open **`frontend/index.html`** in your browser (or use a local server if you prefer).
3. Use the **sidebar** to pick an algorithm or data structure.
4. Click the **Run** (or action) button to start the visualization.
5. Use **New Array** / **Reset** to try again; use the **Speed** slider to change animation speed.

Legacy single-page version: **`frontend/Basics/day3.html`** (Bubble & Selection sort only).

---

## 📁 Project Structure

```
algo-playground/
├── README.md
├── frontend/
│   ├── index.html          ← Main app (open this)
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   ├── app.js          ← Routing & UI wiring
│   │   ├── core.js         ← Viz helpers, delay, render
│   │   ├── sorting.js       ← All 6 sorting algorithms
│   │   ├── searching.js    ← Linear & binary search
│   │   ├── ds.js           ← Linked list, Stack, Queue, BST
│   │   └── graph.js        ← Graph BFS/DFS
│   └── Basics/             ← Original day3 (Bubble, Selection)
│       ├── day3.html
│       ├── day3.css
│       └── day3.js
```

---

## 👨‍💻 Author

**Faizan Ahmad**  
Beginner-friendly project for learning algorithms and data structures visually.
