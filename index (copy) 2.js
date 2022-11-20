const { MongoClient } = require('mongodb');
const fs = require('fs');

main().catch(console.error);

async function main() {
  /**
   * Connection URI */
  const uri = "mongodb+srv://mongo:0GAflVeh1pnBp2sg@cluster0.5s5jgoz.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);


  // cat_factsのデータをmongodbに格納する
  // cat_factsのテキストデータを取得し、JSONデータに変換する
  let cat_facts = JSON.parse(fs.readFileSync("json/cat_facts.json", 'utf-8'));
  // cat_factsのJSONデータの中から、data項目のみ取得する
  const cat_facts_data = cat_facts["data"];

  // cat_breedsのデータをmongodbに格納する
  // cat_breedsのテキストデータを取得し、JSONデータに変換する
  let cat_breeds = JSON.parse(fs.readFileSync("json/cat_facts.json", 'utf-8'));
  // cat_factsのJSONデータの中から、data項目のみ取得する
  const cat_breeds_data = cat_breeds["data"];

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    // cat_facts_dataをmongodbに格納する
    await createListingFacts(client, cat_facts_data);
    // cat_breeds_dataをmongodbに格納する
    await createListingBreeds(client, cat_breeds_data);

  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}


// Add functions that make DB calls here
async function createListingFacts(client, newListing) {
  const result = await client.db("catsdb").collection("facts").insertOne(newListing);
  console.log(`New facts created with the following id: ${result.insertedId}`);
}
async function createListingBreeds(client, newListing) {
  const result = await client.db("catsdb").collection("breeds").insertOne(newListing);
  console.log(`New breeds created with the following id: ${result.insertedId}`);
}