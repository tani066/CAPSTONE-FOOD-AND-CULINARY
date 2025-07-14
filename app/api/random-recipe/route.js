import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`);
    const data = await res.json();
    const recipe = data.recipes?.[0];

    if (!recipe) {
      return NextResponse.json({ recipe: null }, { status: 404 });
    }

    return NextResponse.json({ recipe });
  } catch (err) {
    console.error('Spoonacular API Error:', err);
    return NextResponse.json({ error: 'Failed to fetch random recipe' }, { status: 500 });
  }
}
