import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
const ddb = new DynamoDBClient({});
const table = process.env.CUSTOMERS_TABLE || 'echo_customers';

const rows = [
  {
    customer_id: "cust_sarah",
    name: "Sarah Martinez",
    visit_count: 12,
    last_visit: "2025-10-20",
    usual_order: JSON.stringify({ drink:"Golden Eagle", size:"Medium", temp:"Iced", modifiers:["Oat Milk"] }),
    last_note: "Training for Phoenix Marathon"
  }
];

for (const r of rows){
  await ddb.send(new PutItemCommand({
    TableName: table,
    Item: {
      customer_id: { S: r.customer_id },
      name: { S: r.name },
      visit_count: { N: String(r.visit_count) },
      last_visit: { S: r.last_visit },
      usual_order: { S: r.usual_order },
      last_note: { S: r.last_note }
    }
  }));
  console.log("Seeded customer:", r.customer_id);
}
