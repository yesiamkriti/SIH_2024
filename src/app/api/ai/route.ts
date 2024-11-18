import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const inference = new HfInference(process.env.NEXT_PUBLIC_HF_API_KEY || "");

export async function POST(req: Request) {
  try {
    const data = await req.json(); // Parse the request body as JSON
    console.log(data);
    
    let output = ''; // Initialize output

    for await (const chunk of inference.chatCompletionStream({
      model: 'google/gemma-2-27b-it',
      messages: [{ role: 'user', content:   data.message }],
      max_tokens: 500,
    })) {
      output += chunk.choices[0]?.delta?.content || ''; // Append chunk content to output
    }

    return NextResponse.json({ output }); // Send the response as JSON

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 }); // Return an error response
  }
}
