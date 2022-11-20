const { MongoClient } = require('mongodb');

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/drivers/node/ for more details
   */
  const uri = "mongodb+srv://mongo:0GAflVeh1pnBp2sg@cluster0.5s5jgoz.mongodb.net/?retryWrites=true&w=majority";

  /**
   * The Mongo Client you will use to interact with your database
   * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
   * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
   * pass option { useUnifiedTopology: true } to the MongoClient constructor.
   * const client =  new MongoClient(uri, {useUnifiedTopology: true})
   */
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await createListing(client,
      {
        name: "Lovely Loft",
        summary: "A charming loft in Paris",
        bedrooms: 1,
        bathrooms: 1
      }
    );

  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

main().catch(console.error);

// Add functions that make DB calls here
async function createListing(client, newListing) {
  const result = await client.db("mydata").collection("test").insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}