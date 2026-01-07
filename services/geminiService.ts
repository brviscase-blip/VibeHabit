
import { GoogleGenAI, Type } from "@google/genai";
import { Habit, DailyInsight } from "../types";

/**
 * Generates motivational insights and advice based on current habits using Gemini API.
 * Follows strict Google GenAI SDK guidelines for initialization and content generation.
 */
export const getHabitInsight = async (habits: Habit[]): Promise<DailyInsight> => {
  // Use direct initialization with process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  const modelName = 'gemini-3-flash-preview';
  
  const habitsList = habits.map(h => `${h.name} (${h.category})`).join(', ');
  const prompt = `Com base nestes hábitos: ${habitsList}, forneça uma frase motivacional diária e um conselho curto para hoje. Responda obrigatoriamente em Português do Brasil (PT-BR).`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: { 
              type: Type.STRING,
              description: 'A motivational quote in Portuguese (PT-BR).'
            },
            advice: { 
              type: Type.STRING,
              description: 'A short advice related to the habits in Portuguese (PT-BR).'
            },
          },
          required: ["quote", "advice"]
        }
      }
    });

    // Directly access the .text property (not a method) as per guidelines
    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }
    
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    // Graceful fallback for API errors or missing API key
    return {
      quote: "Acredite que você pode e você já está no meio do caminho.",
      advice: "Consistência é mais importante que intensidade. Apenas continue aparecendo."
    };
  }
};