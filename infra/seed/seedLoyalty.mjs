import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
const ddb = new DynamoDBClient({});
const table = process.env.LOYALTY_TABLE || 'echo_loyalty';

const rows = [
  { customer_id:"cust_sarah", name:"Sarah", points_balance:127, free_drinks_available:1, birthday:"1995-03-22", last_visit:"2025-10-20", usual_drink:"Iced Golden Eagle" },
  { customer_id:"cust_new", name:"Alex", points_balance:10, free_drinks_available:0, birthday:"1999-11-02", last_visit:"2025-10-15", usual_drink:null }
];

for (const r of rows){
  await ddb.send(new PutItemCommand({
    TableName: table,
    Item: {
      customer_id: { S: r.customer_id },
      name: { S: r.name },
      points_balance: { N: String(r.points_balance) },
      free_drinks_available: { N: String(r.free_drinks_available) },
      birthday: { S: r.birthday },
      last_visit: { S: r.last_visit },
      usual_drink: { S: r.usual_drink || "" }
    }
  }));
  console.log("Seeded loyalty:", r.customer_id);
}
