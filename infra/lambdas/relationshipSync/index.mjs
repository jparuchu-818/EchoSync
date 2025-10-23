import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({});
const CUSTOMER_TABLE = process.env.CUSTOMER_TABLE;
const MEMORY_TABLE = process.env.MEMORY_TABLE;

export const handler = async (event) => {
  try {
    const { customer_id } = JSON.parse(event.body || "{}");
    if (!customer_id) return { statusCode: 400, body: JSON.stringify({ error: "customer_id required" }) };

    const profile = await ddb.send(new GetItemCommand({
      TableName: CUSTOMER_TABLE,
      Key: { customer_id: { S: String(customer_id) } }
    }));

    const base = profile.Item ? {
      customer_id: profile.Item.customer_id.S,
      name: profile.Item.name?.S || "Guest",
      visit_count: Number(profile.Item.visit_count?.N || "0"),
      last_visit: profile.Item.last_visit?.S || null,
      usual_order: profile.Item.usual_order?.S ? JSON.parse(profile.Item.usual_order.S) : null
    } : {
      customer_id,
      name: "Guest",
      visit_count: 0,
      last_visit: null,
      usual_order: null
    };

    // Pull last note (if any)
    let last_note = null;
    // For hackathon simplicity we store one latest note on profile too
    if (profile.Item?.last_note?.S) {
      last_note = profile.Item.last_note.S;
    }

    const card = {
      header: `${base.name}`,
      stats: `Visits: ${base.visit_count}${base.last_visit ? ` • Last: ${base.last_visit}` : ""}`,
      usual: base.usual_order,
      last_note
    };

    return { statusCode: 200, body: JSON.stringify({ card }) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: JSON.stringify({ error: "internal" }) };
  }
};
