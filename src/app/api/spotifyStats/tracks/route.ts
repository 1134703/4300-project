import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "No access token found" },
      { status: 401 }
    );
  }
console.log(accessToken);
  const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=25", {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Failed to fetch tracks" }, { status: response.status });
  }

  const data = await response.json();
  const tracks = data.items
  return NextResponse.json(tracks);
  
}
