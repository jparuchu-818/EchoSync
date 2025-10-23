import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({});
const LOYALTY_TABLE = process.env.LOYALTY_TABLE;

export const handler = async (event) => {
  try {
    const { customer_id, signals } = JSON.parse(event.body || "{}");
    if (!customer_id) return { statusCode: 400, body: JSON.stringify({ error: "customer_id required" }) };

    const r = await ddb.send(new GetItemCommand({
      TableName: LOYALTY_TABLE,
      Key: { customer_id: { S: String(customer_id) } }
    }));

    const row = r.Item ? {
      points: Number(r.Item.points_balance?.N || "0"),
      free_drinks_available: Number(r.Item.free_drinks_available?.N || "0"),
      birthday: r.Item.birthday?.S || null,
      last_visit: r.Item.last_visit?.S || null,
      name: r.Item.name?.S || "Guest",
      usual_drink: r.Item.usual_drink?.S || null
    } : { points:0, free_drinks_available:0, birthday:null, last_visit:null, name:"Guest", usual_drink:null };

    // Priority logic
    if (row.free_drinks_available > 0) {
      return ok(`🎉 Free drink available!`, { type: "reward" });
    }
    if (isBirthdaySoon(row.birthday)) {
      return ok(`🎂 Birthday this week!`, { type: "birthday" });
    }
    if (signals?.hesitation && row.usual_drink) {
      return ok(`💭 Their usual: ${row.usual_drink}`, { type: "usual" });
    }
    if (signals?.days_since_last && signals.days_since_last > 14) {
      return ok(`✨ Haven't seen them in ${signals.days_since_last} days!`, { type: "welcome_back" });
    }
    return ok(`👤 Loyalty Member: ${row.name}`, { type: "name" });
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: JSON.stringify({ error: "internal" }) };
  }
};

function ok(msg, meta){ return { statusCode: 200, body: JSON.stringify({ whisper: msg, meta }) }; }

function isBirthdaySoon(bday){
  if (!bday) return false;
  try {
    const now = new Date();
    const [y,m,d] = [now.getFullYear(), ...bday.split("-").slice(1).map(Number)];
    const next = new Date(y, m-1, d);
    const diff = (next - now) / (1000*60*60*24);
    return diff >= 0 && diff <= 7;
  } catch { return false; }
}
