
import { GoogleGenAI, Type } from "@google/genai";
import { Habit, DailyInsight } from "../types";

const API_KEY = process.env.API_KEY || '';

export const getHabitInsight = async (habits: Habit[]): Promise<DailyInsight> => {
  if (!API_KEY) {
    return {
      quote: "Success is the sum of small efforts, repeated day in and day out.",
      advice: "Try to complete your most challenging habit first thing in the morning!"
    };
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const modelName = 'gemini-3-flash-preview';
  
  const habitsList = habits.map(h => `${h.name} (${h.category})`).join(', ');
  const prompt = `Based on these habits: ${habitsList}, provide a daily motivational quote and a short piece of advice for today.`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: { type: Type.STRING },
            advice: { type: Type.STRING },
          },
          required: ["quote", "advice"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      quote: "Believe you can and you're halfway there.",
      advice: "Consistency is more important than intensity. Just keep showing up."
    };
  }
};
