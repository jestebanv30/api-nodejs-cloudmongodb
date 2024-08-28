// db.js
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://juanes:mongodb@productreceta.fgq8g.mongodb.net/?retryWrites=true&w=majority&appName=productReceta";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
