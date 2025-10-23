import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({});
const MEMORY_TABLE = process.env.MEMORY_TABLE;

export const handler = async (event) => {
  try {
    const { customer_id, broista_id, note_text, tags = [], priority = "normal" } = JSON.parse(event.body || "{}");
    if (!customer_id || !note_text) return { statusCode: 400, body: JSON.stringify({ error: "customer_id and note_text required" }) };

    const note_id = 'note_' + Math.random().toString(36).slice(2);
    const timestamp = new Date().toISOString();

    await ddb.send(new PutItemCommand({
      TableName: MEMORY_TABLE,
      Item: {
        note_id: { S: note_id },
        customer_id: { S: String(customer_id) },
        timestamp: { S: timestamp },
        broista_id: { S: String(broista_id || 'unknown') },
        note_text: { S: note_text },
        tags: { S: JSON.stringify(tags) },
        priority: { S: priority }
      }
    }));

    return { statusCode: 200, body: JSON.stringify({ ok: true, note_id, timestamp }) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: JSON.stringify({ error: "internal" }) };
  }
};
