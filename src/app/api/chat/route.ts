import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  rainChance: number;
  windSpeed: number;
}

interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  rainChance: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  forecast: ForecastDay[];
}

interface RequestBody {
  message: string;
  weatherData: WeatherData;
}

export async function POST(request: Request) {
    try {
      console.log("Received POST request");
      const { message, weatherData }: RequestBody = await request.json();
      console.log("Request body:", { message, weatherData });
  
      if (!message || !weatherData) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
      }
  
      const { city, temperature, feelsLike, condition, rainChance, humidity, windSpeed, uvIndex, forecast } = weatherData;
  
      const currentWeather = `${city}: ${temperature}°C (feels ${feelsLike}°C), ${condition}, Rain: ${rainChance}%, Humidity: ${humidity}%, Wind: ${windSpeed}km/h, UV: ${uvIndex}`;
  
      const forecastSummary = forecast.map(day => 
        `${day.date}: ${day.condition}, ${day.minTemp}-${day.maxTemp}°C, Rain: ${day.rainChance}%, Wind: ${day.windSpeed}km/h`
      ).join('; ');
  
      const contextPrompt = `
  WeatherSplash: Focus on weather. Use data provided. Redirect non-weather topics politely.
  Current: ${currentWeather}
  Forecast: ${forecastSummary}
  User: ${message}
  Response:`;
  
      console.log("Sending request to Gemini API");
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: contextPrompt }] }],
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.7,
          topP: 0.9,
          candidateCount: 1,
        },
      });
      console.log("Received response from Gemini API");
  
      if (!result.response.text) {
        throw new Error("Unexpected response format from Gemini API");
      }
  
      const responseText = result.response.text();
      console.log("Generated chat response:", responseText);
  
      return NextResponse.json({ result: responseText });
    } catch (error) {
      console.error("Error generating chat response:", error);
      return NextResponse.json(
        { error: "Failed to generate chat response", details: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  }