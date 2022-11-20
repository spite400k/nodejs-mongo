const { MongoClient } = require('mongodb');
const fs = require('fs');

// cat_factsのデータをmongodbに格納する
// cat_factsのテキストデータを取得し、JSONデータに変換する
let cat_facts = JSON.parse(fs.readFileSync("json/cat_facts.json", 'utf-8'));
// cat_factsのJSONデータの中から、data項目のみ取得する
const cat_facts_data = cat_facts["data"];
// data項目の要素をmongodbに格納する
for (const key in cat_facts_data) {
  console.log(cat_facts_data[key]);
  main(cat_facts_data[key]).catch(console.error);
}



async function main(data) {
  /**
   * Connection URI */
  const uri = "mongodb+srv://mongo:0GAflVeh1pnBp2sg@cluster0.5s5jgoz.mongodb.net/?retryWrites=true&w=majority";


  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await createListing(client, data
      // {
      //   // _id: 1,
      //   name: "Lovely Loft",
      //   summary: "A charming loft in Paris",
      //   bedrooms: 1,
      //   bathrooms: 1
      // }
    );

  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}


// Add functions that make DB calls here
async function createListing(client, newListing) {
  const result = await client.db("catsdb").collection("facts").insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}