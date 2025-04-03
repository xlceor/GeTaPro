import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json(); // Recibir historial de mensajes

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No hay mensajes" }, { status: 400 });
    }

    const api_key = process.env.OPENAI_API_KEY;
    if (!api_key) throw new Error("API Key de OpenAI no configurada");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages, // Ahora se envía todo el historial
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Error en OpenAI");

    return NextResponse.json({ reply: data.choices?.[0]?.message?.content});
  } catch (error) {
    console.error("Error en API:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}