import { GoogleGenAI } from "@google/genai";
import { Patient } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCognitiveReport = async (patient: Patient): Promise<string> => {
  try {
    // We summarize the data to send to Gemini to avoid token bloat if history is huge,
    // though for 30 days raw JSON is fine.
    const recentHistory = patient.history.slice(-14); // Last 2 weeks
    
    const prompt = `
      You are an expert geriatric cognitive health analyst. 
      Analyze the following cognitive performance data for a patient named ${patient.name} (Age: ${patient.age}, Condition: ${patient.condition}).
      
      Data (Last 14 days):
      ${JSON.stringify(recentHistory)}
      
      Metrics Explained:
      - Reaction Time (ms): Lower is better. Sudden spikes indicate fatigue or confusion.
      - Error Count: Lower is better. High errors indicate lack of focus.
      - Memory Score (0-100): Higher is better.
      
      Please provide a concise, compassionate, and professional summary for the caretaker.
      Structure your response in HTML format (without the <html> or <body> tags, just the content) with the following sections using Tailwind CSS classes for styling:
      
      1. <h3 class="font-bold text-lg text-slate-800 mb-2">Executive Summary</h3>: A 2-sentence overview of their current state.
      2. <h3 class="font-bold text-lg text-slate-800 mt-4 mb-2">Key Trends</h3>: Bullet points identifying any improving or declining trends in the specific metrics.
      3. <h3 class="font-bold text-lg text-slate-800 mt-4 mb-2">Recommendation</h3>: A simple suggestion for the caretaker (e.g., "Encourage more hydration," "Celebrate the memory improvement," "Monitor sleep closely").

      Keep the tone supportive but objective.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate insight at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate report.");
  }
};
