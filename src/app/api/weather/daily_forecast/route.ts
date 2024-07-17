export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const appid = searchParams.get("appid") 

  const NUMBER_OF_DAYS = 10

  if (!appid) {
    return Response.json(
      { message: "WeatherAPI key not found in environment variables" },
      { status: 401 }
    )
  }

  if (!lat || !lon) {
    return Response.json({ message: "Missing lat or lon param" }, { status: 400 })
  }

  const res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${appid}&q=${lat},${lon}&days=${NUMBER_OF_DAYS}`,
    {
      next: { revalidate: 900 },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await res.json()

  return Response.json(data)
}
