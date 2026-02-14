/**
 * Core utilities for the Algorithm Visualizer
 */

const Viz = {
  _paused: false,
  _resumeResolve: null,

  /** Step delay in ms. Slider left = slower (3000ms), right = faster (400ms). Value inverted from slider. */
  getSpeed() {
    const slider = document.getElementById("speed-slider");
    if (!slider) return 1200;
    const v = parseInt(slider.value, 10);
    if (!Number.isFinite(v) || v < 400 || v > 3000) return 1200;
    return 3400 - v;
  },

  /** Delay that respects Pause: waits until either time elapsed (when not paused) or user clicks Play. */
  delay(ms) {
    return new Promise((resolve) => {
      if (Viz._paused) {
        Viz._resumeResolve = resolve;
        return;
      }
      const timer = setTimeout(() => {
        if (Viz._paused) {
          Viz._resumeResolve = resolve;
        } else {
          resolve();
        }
      }, ms);
    });
  },

  pause() {
    Viz._paused = true;
  },

  play() {
    Viz._paused = false;
    if (Viz._resumeResolve) {
      Viz._resumeResolve();
      Viz._resumeResolve = null;
    }
  },

  isPaused() {
    return Viz._paused;
  },

  setStatus(msg) {
    const el = document.getElementById("status");
    if (el) el.textContent = msg;
  },

  clearStatus() {
    Viz.setStatus("");
  },

  /** Set the step-by-step learning explanation (HTML or plain text). */
  setExplanation(htmlOrText) {
    const el = document.getElementById("step-explanation");
    if (!el) return;
    const str = typeof htmlOrText === "string" ? htmlOrText : "";
    el.innerHTML = str.replace(/\n/g, "<br>");
    el.classList.toggle("empty", !str.trim());
  },

  /**
   * Set explanation, optionally using LLM when "Use AI" is on and API key is set.
   * Falls back to the given text on error or when AI is disabled.
   */
  async setExplanationAsync(htmlOrText) {
    const fallback = typeof htmlOrText === "string" ? htmlOrText : "";
    if (typeof LLM === "undefined" || !LLM.isUseAI() || !LLM.getApiKey()) {
      Viz.setExplanation(fallback);
      return;
    }
    Viz.setExplanation("Thinking…");
    try {
      const ai = await LLM.explainStep(fallback);
      Viz.setExplanation(ai || fallback);
    } catch (err) {
      Viz.setExplanation(fallback + (err.message ? ' <span class="llm-err">(AI: ' + err.message + ")</span>" : ""));
    }
  },

  clearExplanation() {
    Viz.setExplanation("");
  },

  /** Create array of random integers for sorting */
  randomArray(len = 8, max = 40) {
    return Array.from({ length: len }, () => Math.floor(Math.random() * max) + 5);
  },

  /** Render array as boxes in container; returns array of box elements */
  renderArray(arr, containerId = "viz-area", options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return [];
    container.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "array-container";
    const boxes = [];
    arr.forEach((value) => {
      const box = document.createElement("div");
      box.className = "viz-box";
      box.textContent = value;
      if (options.barStyle) {
        box.style.height = `${Math.max(24, value * 4)}px`;
        box.style.width = "40px";
      }
      wrap.appendChild(box);
      boxes.push(box);
    });
    container.appendChild(wrap);
    return boxes;
  },

  /** Get current boxes (after render) */
  getBoxes(containerId = "viz-area") {
    const container = document.getElementById(containerId);
    if (!container) return [];
    const wrap = container.querySelector(".array-container");
    return wrap ? [...wrap.querySelectorAll(".viz-box")] : [];
  },

  /** Animate swap of two adjacent (or any) boxes */
  async animateSwap(box1, box2, arr, i, j) {
    box1.classList.add("swap");
    box2.classList.add("swap");
    const dx = 62;
    box1.style.transform = "translateX(" + dx + "px)";
    box2.style.transform = "translateX(-" + dx + "px)";
    await Viz.delay(Viz.getSpeed());
    [arr[i], arr[j]] = [arr[j], arr[i]];
    box1.style.transform = "";
    box2.style.transform = "";
    box1.classList.remove("swap");
    box2.classList.remove("swap");
  },

  /** Remove all state classes from boxes */
  clearBoxClasses(containerId = "viz-area") {
    Viz.getBoxes(containerId).forEach((b) => {
      b.classList.remove("compare", "swap", "sorted", "pivot", "current", "min", "found", "lift");
    });
  },
};
