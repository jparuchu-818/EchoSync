import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
const ddb = new DynamoDBClient({});
const table = process.env.MENU_TABLE || 'echo_menu';

const rows = [
  { name:"Golden Eagle", category:"breve", base_price:5.50, available_temps:["hot","iced"], available_sizes:["small","medium","large"], common_modifiers:["oat milk","almond milk","extra shot","light ice","soft top"] },
  { name:"Caramelizer", category:"breve", base_price:5.25, available_temps:["hot","iced"], available_sizes:["small","medium","large"], common_modifiers:["oat milk","almond milk","extra shot","soft top"] }
];

for (const r of rows){
  await ddb.send(new PutItemCommand({
    TableName: table,
    Item: {
      name: { S: r.name },
      category: { S: r.category },
      base_price: { N: String(r.base_price) },
      available_temps: { S: JSON.stringify(r.available_temps) },
      available_sizes: { S: JSON.stringify(r.available_sizes) },
      common_modifiers: { S: JSON.stringify(r.common_modifiers) }
    }
  }));
  console.log("Seeded menu:", r.name);
}
