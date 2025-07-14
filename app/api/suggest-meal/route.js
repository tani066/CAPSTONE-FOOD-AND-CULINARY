import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const ingredients = body.ingredients?.trim();
    const goal = body.goal?.trim();

    if (!ingredients) {
      return NextResponse.json({ error: 'No ingredients provided.' }, { status: 400 });
    }

    let prompt = `I have these ingredients: ${ingredients}. Suggest a creative, tasty meal I can cook today.`;
    if (goal) {
      prompt += ` Make sure the recipe supports this goal: ${goal}.`;
    }

    prompt += `
Respond with:
- 🥘 Dish Name
- 📖 Short Description
- 🧂 Ingredients
- 🍳 Instructions
- 💪 Approximate protein, carbs, and fats per serving
Use clear formatting.
`;

    // ✅ Use gemini-1.5-pro instead of gemini-pro
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = result.response.text();
    return NextResponse.json({ suggestion: text });
  } catch (err) {
    console.error('Gemini API Error:', err.message || err);
    return NextResponse.json({ error: 'Gemini API failed. Please try again later.' }, { status: 500 });
  }
}
