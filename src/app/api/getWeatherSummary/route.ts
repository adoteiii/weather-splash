import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
});

export async function POST(request: Request) {
  try {
    console.log("Received POST request");
    const body = await request.json();
    console.log("Request body:", body);

    if (!body.weatherData) {
      throw new Error("weatherData is missing from the request body");
    }

    const { city, temperature, condition, rainChance, timezone, timeutc } =
      body.weatherData;

    const prompt = `
            You are to give a short maximum two sentence weather summary for a weather website top banner.
            Be energetic and full of charisma.  
            State the city you are providing a summary for. Then give a summary of today's weather only. 
            Make it easy for the viewer to understand and know what to do to prepare for those weather conditions, 
            Provide advice for rain.
            Assume the data came from official sources and not the user.
            Use the current time too to make it more natural but do not state the time.
            Try to make your response predictive and not just a statement of the current weather and makw it useful for the user.
        `;

    const userMessage = `
            Hi, can you provide a weather summary for me? Use this data to generate the summary.        
            City: ${city}, Temperature: ${temperature}°C, Condition: ${condition}, Chance of Rain: ${rainChance}%, current time: ${new Date(
      timeutc
    ).toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    })}
        `;

    console.log("Sending request to Gemini API");
    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: prompt + "\n\n" + userMessage }] },
      ],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
        topP: 0.9,
        candidateCount: 1,
      },
    });

    console.log("Received response from Gemini API");
    const response = result.response;
    console.log("Full API response:", response);

    if (!response || !response.text) {
      throw new Error("Unexpected response format from Gemini API");
    }

    const responseText = response.text();
    console.log("Generated weather report:", responseText);

    return NextResponse.json({ result: responseText });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "Error generating weather report:",
        error.message,
        error.stack
      );
      return NextResponse.json(
        { error: "Failed to generate weather report", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error generating weather report:", error);
      return NextResponse.json(
        { error: "An unknown error occurred", details: String(error) },
        { status: 500 }
      );
    }
  }
}
