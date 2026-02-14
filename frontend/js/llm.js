/**
 * LLM integration for AI-generated step explanations.
 * Uses OpenAI API (gpt-4o-mini). Key is stored in sessionStorage only; never commit keys to code.
 */

const LLM = {
  STORAGE_KEY: "algo-viz-openai-key",
  STORAGE_USE_AI: "algo-viz-use-ai",

  getApiKey() {
    const el = document.getElementById("llm-api-key");
    if (el && el.value && el.value.trim()) return el.value.trim();
    try {
      return sessionStorage.getItem(LLM.STORAGE_KEY) || "";
    } catch (_) {
      return "";
    }
  },

  setApiKey(key) {
    try {
      if (key && key.trim()) sessionStorage.setItem(LLM.STORAGE_KEY, key.trim());
      else sessionStorage.removeItem(LLM.STORAGE_KEY);
    } catch (_) {}
    const el = document.getElementById("llm-api-key");
    if (el) el.value = key || "";
  },

  isUseAI() {
    const el = document.getElementById("llm-use-ai");
    if (el) return el.checked;
    try {
      return sessionStorage.getItem(LLM.STORAGE_USE_AI) === "true";
    } catch (_) {
      return false;
    }
  },

  setUseAI(on) {
    try {
      sessionStorage.setItem(LLM.STORAGE_USE_AI, on ? "true" : "false");
    } catch (_) {}
    const el = document.getElementById("llm-use-ai");
    if (el) el.checked = !!on;
  },

  /** Strip HTML tags for sending plain text to the API. */
  stripHtml(html) {
    if (typeof html !== "string") return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return (div.textContent || div.innerText || "").trim();
  },

  /**
   * Get an AI explanation for a step. Returns a Promise that resolves to the explanation string.
   * On failure (no key, network error, etc.) rejects so caller can use fallback.
   */
  async explainStep(stepDescription) {
    const apiKey = LLM.getApiKey();
    if (!apiKey) throw new Error("No API key");
    if (!LLM.isUseAI()) throw new Error("Use AI is off");

    const text = LLM.stripHtml(stepDescription);
    if (!text) throw new Error("Empty step");

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a teacher explaining algorithms and data structures to a beginner. Given a step description, reply with a clear, concise explanation in 1-3 sentences. Use simple language. Return only the explanation, no preamble or labels.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        max_tokens: 150,
        temperature: 0.4,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(res.status === 401 ? "Invalid API key" : err || res.statusText);
    }

    const data = await res.json();
    const content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (typeof content !== "string") throw new Error("Invalid response");
    return content.trim();
  },
};
