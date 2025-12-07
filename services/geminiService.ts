import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ColorMode, ColorCount, PaletteData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    paletteName: {
      type: Type.STRING,
      description: "A creative and catchy name for the color palette in Thai.",
    },
    vibe: {
      type: Type.STRING,
      description: "A short description of the feeling or use case for this palette in Thai.",
    },
    colors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          hex: {
            type: Type.STRING,
            description: "The 6-character hex code (e.g., #FF5733).",
          },
          name: {
            type: Type.STRING,
            description: "A creative name for this specific color in Thai.",
          },
          description: {
            type: Type.STRING,
            description: "A very short explanation of why this color fits the palette (in Thai).",
          },
        },
        required: ["hex", "name", "description"],
      },
    },
  },
  required: ["paletteName", "vibe", "colors"],
};

export const generatePalette = async (
  count: ColorCount,
  mode: ColorMode
): Promise<PaletteData> => {
  const modeDescription =
    mode === ColorMode.CONTRAST
      ? "high contrast, complementary, triadic, or split-complementary colors. The colors should be distinct and vibrant."
      : "monochromatic, analogous, or same tone colors. The colors should be harmonious shades of a single base hue.";

  const prompt = `
    Generate a ${count}-color palette.
    The style must be: ${modeDescription}.
    Ensure the colors are aesthetically pleasing and suitable for modern web or graphic design.
    Return the response in JSON format with Thai names and descriptions.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 1.2, // Slightly higher for creativity
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as PaletteData;
  } catch (error) {
    console.error("Error generating palette:", error);
    throw error;
  }
};