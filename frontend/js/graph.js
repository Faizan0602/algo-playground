/**
 * Graph visualization with BFS and DFS and step-by-step explanations
 */

const GraphViz = {
  nodes: [
    { id: "A", x: 120, y: 60 },
    { id: "B", x: 280, y: 60 },
    { id: "C", x: 440, y: 60 },
    { id: "D", x: 120, y: 160 },
    { id: "E", x: 280, y: 160 },
    { id: "F", x: 440, y: 160 },
    { id: "G", x: 280, y: 260 },
  ],
  edges: [
    ["A", "B"], ["A", "D"],
    ["B", "C"], ["B", "E"],
    ["C", "F"],
    ["D", "E"],
    ["E", "F"], ["E", "G"],
    ["F", "G"],
  ],
  adjacency: null,

  buildAdjacency() {
    GraphViz.adjacency = {};
    GraphViz.nodes.forEach((n) => (GraphViz.adjacency[n.id] = []));
    GraphViz.edges.forEach(([a, b]) => {
      GraphViz.adjacency[a].push(b);
      GraphViz.adjacency[b].push(a);
    });
  },

  init(containerId) {
    GraphViz.buildAdjacency();
    GraphViz.render(containerId);
    Viz.setExplanation("A <b>graph</b>: nodes (vertices) and edges. <b>BFS</b> (Breadth-First Search) visits level by level using a queue. <b>DFS</b> (Depth-First Search) goes as deep as possible using a stack (or recursion). Both visit each node once.");
  },

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "graph-svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 560 320");
    GraphViz.edges.forEach(([a, b]) => {
      const nA = GraphViz.nodes.find((n) => n.id === a);
      const nB = GraphViz.nodes.find((n) => n.id === b);
      if (!nA || !nB) return;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", nA.x);
      line.setAttribute("y1", nA.y);
      line.setAttribute("x2", nB.x);
      line.setAttribute("y2", nB.y);
      line.setAttribute("stroke", "var(--border)");
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);
    });
    container.appendChild(svg);
    GraphViz.nodes.forEach((n) => {
      const el = document.createElement("div");
      el.className = "graph-node";
      el.textContent = n.id;
      el.style.left = n.x - 20 + "px";
      el.style.top = n.y - 20 + "px";
      el.dataset.id = n.id;
      container.appendChild(el);
    });
  },

  clearHighlights(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll(".graph-node").forEach((el) => {
      el.classList.remove("highlight", "visited");
    });
  },

  async bfs(containerId, start = "A") {
    GraphViz.clearHighlights(containerId);
    if (!GraphViz.adjacency) GraphViz.buildAdjacency();
    await Viz.setExplanationAsync(`<b>BFS</b> from <b>${start}</b>: use a queue. Enqueue the start; then while the queue is not empty, dequeue a node, visit it, and enqueue all unvisited neighbors. This visits nodes in <b>level order</b> (closest first).`);
    await Viz.delay(Viz.getSpeed());
    const queue = [start];
    const visited = new Set([start]);
    let step = 0;
    while (queue.length) {
      const id = queue.shift();
      step++;
      const el = document.querySelector(`.graph-node[data-id="${id}"]`);
      if (el) el.classList.add("visited");
      const neighbors = (GraphViz.adjacency[id] || []).filter((n) => !visited.has(n));
      await Viz.setExplanationAsync(`Step ${step}: Dequeue <b>${id}</b> and visit it. Unvisited neighbors: ${neighbors.length ? neighbors.join(", ") : "none"}. ${neighbors.length ? "We add them to the queue to be processed later." : ""}`);
      Viz.setStatus(`BFS visiting ${id}`);
      await Viz.delay(Viz.getSpeed());
      for (const neighbor of GraphViz.adjacency[id] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          const nel = document.querySelector(`.graph-node[data-id="${neighbor}"]`);
          if (nel) nel.classList.add("highlight");
        }
      }
      if (el) el.classList.remove("highlight");
    }
    await Viz.setExplanationAsync(`BFS complete. We visited nodes in order of distance from ${start}. All reachable nodes from ${start} have been visited.`);
    Viz.setStatus("BFS complete.");
  },

  async dfs(containerId, start = "A") {
    GraphViz.clearHighlights(containerId);
    if (!GraphViz.adjacency) GraphViz.buildAdjacency();
    await Viz.setExplanationAsync(`<b>DFS</b> from <b>${start}</b>: go deep first. Visit the node, then recursively (or with a stack) visit an unvisited neighbor. When there are no unvisited neighbors, backtrack. Order depends on the graph structure.`);
    await Viz.delay(Viz.getSpeed());
    const visited = new Set();
    const order = [];

    async function dfsVisit(id) {
      visited.add(id);
      order.push(id);
      const el = document.querySelector(`.graph-node[data-id="${id}"]`);
      if (el) el.classList.add("highlight");
      const unvisited = (GraphViz.adjacency[id] || []).filter((n) => !visited.has(n));
      await Viz.setExplanationAsync(`Visit <b>${id}</b>. Unvisited neighbors: ${unvisited.length ? unvisited.join(", ") : "none"}. ${unvisited.length ? "We'll go to one of them next (depth first)." : "Backtrack."}`);
      Viz.setStatus(`DFS visiting ${id}`);
      await Viz.delay(Viz.getSpeed());
      if (el) el.classList.remove("highlight"), el.classList.add("visited");
      for (const neighbor of GraphViz.adjacency[id] || []) {
        if (!visited.has(neighbor)) await dfsVisit(neighbor);
      }
    }
    await dfsVisit(start);
    await Viz.setExplanationAsync(`DFS complete. Visit order from ${start}: <b>${order.join(" → ")}</b>. DFS explores one branch fully before backtracking.`);
    Viz.setStatus("DFS complete.");
  },
};
