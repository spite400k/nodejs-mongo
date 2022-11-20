// https://www.sejuku.net/blog/79059
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mongo:0GAflVeh1pnBp2sg@cluster0.otoll0l.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const collection = client.db("mydata").collection("cat_breeds");
  console.log(collection)

  // collection.insertOne({
  //   name: '太郎'
  // });

  // // collection.find().toArray(function(error, documents) {

  // //   console.log(documents);

  // // });
  // client.close();
  createListing({
    name: '太郎'
  });

  async function createListing(client, newListing) {
    const result = await client.db("mydata").collection("test").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
  }
});

