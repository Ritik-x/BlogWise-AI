import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) throw new Error("Missing GEMINI_API_KEY");

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function generateText(prompt) {
  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return res.text; // .text accessor returns generated string
  } catch (e) {
    console.error("🔥 Gemini error:", e);
    throw new Error("Failed to generate content");
  }
}

export default generateText;
