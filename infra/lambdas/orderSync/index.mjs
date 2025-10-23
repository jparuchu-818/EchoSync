import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({});
const MENU_TABLE = process.env.MENU_TABLE;

// Simple rule-based extractor; swap with Comprehend for production
const sizes = ["small","medium","large"];
const temps = ["hot","iced","blended"];
const knownDrinks = ["golden eagle","caramelizer","annihilator","kicker","911","9-1-1"];
const modifiersList = ["oat milk","almond milk","soy milk","extra shot","light ice","soft top","less sweet","half sweet"];

function titleCase(s){ return s ? s.replace(/\b\w/g, c=>c.toUpperCase()) : s; }

export const handler = async (event) => {
  try {
    const { text } = JSON.parse(event.body || "{}");
    if (!text) return { statusCode: 400, body: JSON.stringify({ error: "text required" }) };

    const lower = text.toLowerCase();
    const size = sizes.find(s => lower.includes(s)) || "medium";
    const temp = temps.find(t => lower.includes(t)) || "iced";
    const drink = knownDrinks.find(d => lower.includes(d)) || "golden eagle";
    const modifiers = modifiersList.filter(m => lower.includes(m));

    const confidence = 0.75 + (modifiers.length ? 0.05 : 0); // quick heuristic

    const order = {
      order_id: cryptoRandomId(),
      items: [{
        name: titleCase(drink === "9-1-1" || drink === "911" ? "9-1-1" : drink),
        size: titleCase(size),
        temp: titleCase(temp),
        modifiers: modifiers.map(titleCase)
      }],
      status: "Awaiting Confirm",
      confidence: Math.min(confidence, 0.98),
      price: 6.50
    };

    return { statusCode: 200, body: JSON.stringify(order) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: JSON.stringify({ error: "internal" }) };
  }
};

function cryptoRandomId(){
  // small uuid-ish without bringing crypto
  return 'oid_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
