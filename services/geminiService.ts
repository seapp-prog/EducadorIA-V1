import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateContentStream(
  prompt: string, 
  onChunk: (text: string) => void
): Promise<string> {
  
  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      config: {
        // Higher temperature for creative educational tasks
        temperature: 0.7, 
        systemInstruction: "Você é um assistente pedagógico especializado na Educação Infantil, Ensino Fundamental I (do 1º ao 5º ano), EJA e Educação Especial. Sua missão é ajudar professores a criar materiais didáticos lúdicos, criativos e adequados.\n\nREGRA OBRIGATÓRIA: Todo o conteúdo gerado deve estar em total conformidade com a Base Nacional Comum Curricular (BNCC) do Brasil. Para planos de aula e atividades, você DEVE indicar os códigos das habilidades (ex: EF01LP01) e as competências desenvolvidas.\n\nUse linguagem simples, exemplos concretos e formatação Markdown clara. Responda sempre em Português do Brasil.",
      }
    });

    let fullText = "";
    for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
            fullText += text;
            onChunk(fullText);
        }
    }
    return fullText;

  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

export async function generateImage(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: "Crie uma ilustração educacional, colorida e didática, adequada para crianças, sobre o seguinte tema: " + prompt }]
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("Nenhuma imagem foi gerada.");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}