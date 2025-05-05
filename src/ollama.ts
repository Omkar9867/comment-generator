import { Ollama } from "ollama";
import fetch from "cross-fetch";

const ollama = new Ollama({
  fetch: fetch, // The cross-fetch will help us with the timeout issue when model is idle.
});

export async function generateComment(prompt: string) {
  try {
    const t0 = performance.now();
    const result = await ollama.generate({
      model: "phi3.5",
      prompt: prompt,
    });
    const t1 = performance.now();
    console.log("Response time: ", t1 - t0, "milliseconds");
    return result.response;
  } catch (error) {
    console.error("Error generating comment: ", error);
  }
}
