
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

/**
 * Optimize product description using Gemini Flash for balanced speed/quality.
 */
export const optimizeDescription = async (title: string, currentDescription: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Optimize this e-commerce product description for TikTok Shop users. 
    Product: ${title}
    Current Description: ${currentDescription}
    Goal: High conversion, persuasive hooks, emoji usage, and viral appeal.`,
  });
  return response.text || currentDescription;
};

/**
 * High-speed tactical insights using Gemini Flash Lite for dashboard widgets.
 */
export const getQuickInsights = async (stats: any) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-flash-lite-latest',
    contents: `Based on these e-commerce metrics: ${JSON.stringify(stats)}, give me one high-impact, tactical business insight in 15 words or less.`,
  });
  return response.text || "Systems nominal.";
};

/**
 * Complex e-commerce consultation via Gemini Pro.
 */
export const askNexusPro = async (message: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are the NexusCommerce Strategic Lead. You are an expert in Dropshipping, Print-on-Demand (POD), TikTok Ads, and Supply Chain automation. Help the user scale their business with specific, data-driven advice. Be professional and ambitious.",
    },
  });
  const response = await chat.sendMessage({ message });
  return response.text || "I was unable to process that strategy request.";
};

/**
 * Generate ad copy hooks and primary text using Gemini Flash.
 */
export const generateAdCopy = async (productTitle: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 3 viral TikTok hooks and 2 primary text options for: ${productTitle}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hooks: { type: Type.ARRAY, items: { type: Type.STRING } },
          primaryText: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["hooks", "primaryText"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return { hooks: [], primaryText: [] };
  }
};
