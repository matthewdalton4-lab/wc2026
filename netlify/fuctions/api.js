const API_BASE = "https://v3.football.api-sports.io";
const WC2026_LEAGUE_ID = 1;
const WC2026_SEASON = 2026;

exports.handler = async (event) => {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key not configured" }),
    };
  }

  const path = event.path
    .replace(/^\/?api\//, "")
    .replace(/^\/?\.netlify\/functions\/api\/?/, "");

  const params = new URLSearchParams(event.queryStringParameters || {});
  if (!params.has("league")) params.set("league", WC2026_LEAGUE_ID);
  if (!params.has("season")) params.set("season", WC2026_SEASON);

  const url = `${API_BASE}/${path}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-apisports-key": apiKey
