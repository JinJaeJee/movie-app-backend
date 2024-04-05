import { MongoClient } from "mongodb";

const url = process.env.DB_CONNECTION;
const dbName = "movieDB";

const movies = [
  {
    title: "The Shawshank Redemption",
    genre: ["Drama"],
    releaseYear: 1994,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    thumbnailUrl: "https://example.com/thumbnail1.jpg",
  },
  {
    title: "The Godfather",
    genre: ["Crime", "Drama"],
    releaseYear: 1972,
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    thumbnailUrl: "https://example.com/thumbnail2.jpg",
  },
];

async function seedData() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("movies");

    const insertResult = await collection.insertMany(movies);
    console.log("Inserted documents =>", insertResult);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seedData().catch(console.error);
