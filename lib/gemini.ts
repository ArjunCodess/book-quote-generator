const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';

export async function generateQuote(prompt?: string): Promise<string[]> {
  try {
    const defaultPrompt = `Generate a short, inspiring book quote, all in lowercase, that is 2-3 lines long. 
      The quote should be profound and thought-provoking, similar to quotes found in classic literature.
      Format it as a JSON array of strings, with each line as a separate element.
      Example format: ["first line here", "second line here", "optional third line"]
      Do not include any other text in your response, just the JSON array.`;

    const customPrompt = prompt ? 
      `Generate a short, inspiring book quote based on the following context: "${prompt}"
      The quote should be 2-3 lines long, all in lowercase.
      Format it as a JSON array of strings, with each line as a separate element.
      Example format: ["first line here", "second line here", "optional third line"]
      Do not include any other text in your response, just the JSON array.` 
      : defaultPrompt;

    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: customPrompt
          }]
        }]
      })
    });

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON array from the response
    try {
      const lines = JSON.parse(text.trim());
      if (Array.isArray(lines)) {
        return lines;
      }
    } catch {
      // If parsing fails, try to split by newlines as fallback
      return text.split('\n').map((line: string) => line.trim()).filter(Boolean);
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error generating quote:', error);
    throw error;
  }
}