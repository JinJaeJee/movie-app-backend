const { MongoClient } = require("mongodb");

const url = "mongodb://mongoadmin:secret@localhost:27017";
const dbName = "movieDB";

const movies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    genre: ["Drama"],
    releaseYear: 1994,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    thumbnailUrl: "https://example.com/thumbnail1.jpg",
    rating: 9.3,
  },
  {
    id: 2,
    title: "The Godfather",
    genre: ["Crime", "Drama"],
    releaseYear: 1972,
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    thumbnailUrl: "https://example.com/thumbnail2.jpg",
    rating: 9.2,
  },
  {
    id: 3,
    title: "The Dark Knight",
    genre: ["Action", "Crime", "Drama"],
    releaseYear: 2008,
    description:
      "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    thumbnailUrl: "https://example.com/thumbnail3.jpg",
    rating: 9.0,
  },
  {
    id: 4,
    title: "Pulp Fiction",
    genre: ["Crime", "Drama"],
    releaseYear: 1994,
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    thumbnailUrl: "https://example.com/thumbnail4.jpg",
    rating: 8.9,
  },
  {
    id: 5,
    title: "Schindler's List",
    genre: ["Biography", "Drama", "History"],
    releaseYear: 1993,
    description:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    thumbnailUrl: "https://example.com/thumbnail5.jpg",
    rating: 9.0,
  },
  {
    id: 6,
    title: "Forrest Gump",
    genre: ["Drama", "Romance"],
    releaseYear: 1994,
    description:
      "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    thumbnailUrl: "https://example.com/thumbnail6.jpg",
    rating: 8.8,
  },
  {
    id: 7,
    title: "The Matrix",
    genre: ["Action", "Sci-Fi"],
    releaseYear: 1999,
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    thumbnailUrl: "https://example.com/thumbnail7.jpg",
    rating: 8.7,
  },
  {
    id: 8,
    title: "Inception",
    genre: ["Action", "Adventure", "Sci-Fi"],
    releaseYear: 2010,
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    thumbnailUrl: "https://example.com/thumbnail8.jpg",
    rating: 7.8,
  },
  {
    id: 9,
    title: "The Lord of the Rings: The Return of the King",
    genre: ["Adventure", "Drama", "Fantasy"],
    releaseYear: 2003,
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    thumbnailUrl: "https://example.com/thumbnail9.jpg",
    rating: 7.9,
  },
  {
    id: 10,
    title: "Fight Club",
    genre: ["Drama"],
    releaseYear: 1999,
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    thumbnailUrl: "https://example.com/thumbnail10.jpg",
    rating: 8.3,
  },
  {
    id: 11,
    title: "The Silence of the Lambs",
    genre: ["Crime", "Drama", "Thriller"],
    releaseYear: 1991,
    description:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
    thumbnailUrl: "https://example.com/thumbnail11.jpg",
    rating: 7.3,
  },
  {
    id: 12,
    title: "The Green Mile",
    genre: ["Crime", "Drama", "Fantasy"],
    releaseYear: 1999,
    description:
      "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    thumbnailUrl: "https://example.com/thumbnail12.jpg",
    rating: 7.2,
  },
  {
    id: 13,
    title: "Goodfellas",
    genre: ["Biography", "Crime", "Drama"],
    releaseYear: 1990,
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    thumbnailUrl: "https://example.com/thumbnail13.jpg",
    rating: 6.2,
  },
  {
    id: 14,
    title: "The Godfather: Part II",
    genre: ["Crime", "Drama"],
    releaseYear: 1974,
    description:
      "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
    thumbnailUrl: "https://example.com/thumbnail14.jpg",
    rating: 8.5,
  },
  {
    id: 15,
    title: "The Shawshank Redemption",
    genre: ["Drama"],
    releaseYear: 1994,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    thumbnailUrl: "https://example.com/thumbnail15.jpg",
    rating: 5.2,
  },
  {
    id: 16,
    title: "The Godfather",
    genre: ["Crime", "Drama"],
    releaseYear: 1972,
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    thumbnailUrl: "https://example.com/thumbnail16.jpg",
    rating: 8.2,
  },
  {
    id: 17,
    title: "The Dark Knight",
    genre: ["Action", "Crime", "Drama"],
    releaseYear: 2008,
    description:
      "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    thumbnailUrl: "https://example.com/thumbnail17.jpg",
    rating: 8.3,
  },
  {
    id: 18,
    title: "Pulp Fiction",
    genre: ["Crime", "Drama"],
    releaseYear: 1994,
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    thumbnailUrl: "https://example.com/thumbnail18.jpg",
    rating: 7.1,
  },
  {
    id: 19,
    title: "Inception",
    genre: ["Action", "Adventure", "Sci-Fi"],
    releaseYear: 2010,
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    thumbnailUrl: "https://example.com/thumbnail21.jpg",
    rating: 6.8,
  },
  {
    id: 20,
    title: "The Lord of the Rings: The Return of the King",
    genre: ["Adventure", "Drama", "Fantasy"],
    releaseYear: 2003,
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    thumbnailUrl: "https://example.com/thumbnail22.jpg",
    rating: 7.7,
  },
  {
    id: 21,
    title: "Fight Club",
    genre: ["Drama"],
    releaseYear: 1999,
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    thumbnailUrl: "https://example.com/thumbnail23.jpg",
    rating: 6.6,
  },
  {
    id: 22,
    title: "The Silence of the Lambs",
    genre: ["Crime", "Drama", "Thriller"],
    releaseYear: 1991,
    description:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
    thumbnailUrl: "https://example.com/thumbnail24.jpg",
    rating: 8.3,
  },
  {
    id: 23,
    title: "The Green Mile",
    genre: ["Crime", "Drama", "Fantasy"],
    releaseYear: 1999,
    description:
      "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    thumbnailUrl: "https://example.com/thumbnail25.jpg",
    rating: 8.1,
  },
  {
    id: 24,
    title: "Goodfellas",
    genre: ["Biography", "Crime", "Drama"],
    releaseYear: 1990,
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    thumbnailUrl: "https://example.com/thumbnail26.jpg",
    rating: 7.3,
  },
  {
    id: 25,
    title: "The Godfather: Part II",
    genre: ["Crime", "Drama"],
    releaseYear: 1974,
    description:
      "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
    thumbnailUrl: "https://example.com/thumbnail27.jpg",
    rating: 7.2,
  },
  {
    id: 26,
    title: "The Matrix",
    genre: ["Action", "Sci-Fi"],
    releaseYear: 1999,
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    thumbnailUrl: "https://example.com/thumbnail29.jpg",
    rating: 8.2,
  },
  {
    id: 27,
    title: "Interstellar",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    releaseYear: 2014,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    thumbnailUrl: "https://example.com/thumbnail30.jpg",
    rating: 8.5,
  },
  {
    id: 28,
    title: "The Departed",
    genre: ["Crime", "Drama", "Thriller"],
    releaseYear: 2006,
    description:
      "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    thumbnailUrl: "https://example.com/thumbnail31.jpg",
    rating: 8.6,
  },
  {
    id: 29,
    title: "The Prestige",
    genre: ["Drama", "Mystery", "Sci-Fi"],
    releaseYear: 2006,
    description:
      "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
    thumbnailUrl: "https://example.com/thumbnail32.jpg",
    rating: 7.6,
  },
  {
    id: 30,
    title: "Gladiator",
    genre: ["Action", "Adventure", "Drama"],
    releaseYear: 2000,
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    thumbnailUrl: "https://example.com/thumbnail33.jpg",
    rating: 6.9,
  },
  {
    id: 31,
    title: "The Shining",
    genre: ["Drama", "Horror"],
    releaseYear: 1980,
    description:
      "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
    thumbnailUrl: "https://example.com/thumbnail34.jpg",
    rating: 8.9,
  },
  {
    id: 32,
    title: "Saving Private Ryan",
    genre: ["Drama", "War"],
    releaseYear: 1998,
    description:
      "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    thumbnailUrl: "https://example.com/thumbnail35.jpg",
    rating: 7.7,
  },
  {
    id: 33,
    title: "The Usual Suspects",
    genre: ["Crime", "Mystery", "Thriller"],
    releaseYear: 1995,
    description:
      "A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup.",
    thumbnailUrl: "https://example.com/thumbnail36.jpg",
    rating: 6.9,
  },
  {
    id: 34,
    title: "The Social Network",
    genre: ["Biography", "Drama"],
    releaseYear: 2010,
    description:
      "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was later squeezed out of the business.",
    thumbnailUrl: "https://example.com/thumbnail37.jpg",
    rating: 8.2,
  },
  {
    id: 35,
    title: "The Sixth Sense",
    genre: ["Drama", "Mystery", "Thriller"],
    releaseYear: 1999,
    description:
      "A boy who communicates with spirits seeks the help of a disheartened child psychologist.",
    thumbnailUrl: "https://example.com/thumbnail38.jpg",
  },
  {
    id: 36,
    title: "Se7en",
    genre: ["Crime", "Drama", "Mystery"],
    releaseYear: 1995,
    description:
      "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
    thumbnailUrl: "https://example.com/thumbnail39.jpg",
    rating: 8.6,
  },
  {
    id: 37,
    title: "The Departed",
    genre: ["Crime", "Drama", "Thriller"],
    releaseYear: 2006,
    description:
      "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    thumbnailUrl: "https://example.com/thumbnail40.jpg",
    rating: 8.5,
  },
  {
    id: 38,
    title: "City of God",
    genre: ["Crime", "Drama"],
    releaseYear: 2002,
    description:
      "Two boys growing up in a violent neighborhood of Rio de Janeiro take different paths: one becomes a photographer, the other a drug dealer.",
    thumbnailUrl: "https://example.com/thumbnail41.jpg",
    rating: 8.6,
  },
  {
    id: 39,
    title: "The Lion King",
    genre: ["Animation", "Adventure", "Drama"],
    releaseYear: 1994,
    description:
      "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    thumbnailUrl: "https://example.com/thumbnail42.jpg",
    rating: 8.5,
  },
  {
    id: 40,
    title: "The Avengers",
    genre: ["Action", "Adventure", "Sci-Fi"],
    releaseYear: 2012,
    description:
      "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    thumbnailUrl: "https://example.com/thumbnail43.jpg",
    rating: 8.0,
  },
  {
    id: 41,
    title: "Avatar",
    genre: ["Action", "Adventure", "Fantasy"],
    releaseYear: 2009,
    description:
      "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    thumbnailUrl: "https://example.com/thumbnail44.jpg",
    rating: 7.9,
  },
  {
    id: 42,
    title: "The Pursuit of Happyness",
    genre: ["Biography", "Drama"],
    releaseYear: 2006,
    description:
      "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional endeavor.",
    thumbnailUrl: "https://example.com/thumbnail45.jpg",
    rating: 8.0,
  },
  {
    id: 43,
    title: "Batman Begins",
    genre: ["Action", "Adventure"],
    releaseYear: 2005,
    description:
      "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
    thumbnailUrl: "https://example.com/thumbnail46.jpg",
    rating: 8.2,
  },
  {
    id: 44,
    title: "Harry Potter and the Goblet of Fire",
    genre: ["Adventure", "Family", "Fantasy"],
    releaseYear: 2005,
    description:
      "Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares.",
    thumbnailUrl: "https://example.com/thumbnail47.jpg",
    rating: 7.7,
  },
  {
    id: 45,
    title: "Star Wars: Episode III - Revenge of the Sith",
    genre: ["Action", "Adventure", "Fantasy"],
    releaseYear: 2005,
    description:
      "Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine and is lured into a sinister plan to rule the galaxy.",
    thumbnailUrl: "https://example.com/thumbnail48.jpg",
    rating: 7.6,
  },
  {
    id: 46,
    title: "Charlie and the Chocolate Factory",
    genre: ["Adventure", "Comedy", "Family"],
    releaseYear: 2005,
    description:
      "A young boy wins a tour through the most magnificent chocolate factory in the world, led by the world's most unusual candy maker.",
    thumbnailUrl: "https://example.com/thumbnail49.jpg",
    rating: 6.7,
  },
  {
    id: 47,
    title: "King Kong",
    genre: ["Action", "Adventure", "Drama"],
    releaseYear: 2005,
    description:
      "A film crew goes to a tropical island for an exotic location shoot and discovers a colossal giant gorilla who takes a shine to their female blonde star.",
    thumbnailUrl: "https://example.com/thumbnail50.jpg",
    rating: 7.2,
  },
  {
    id: 48,
    title: "Sin City",
    genre: ["Crime", "Thriller"],
    releaseYear: 2005,
    description:
      "A film that explores the dark and miserable town, Basin City, and tells the story of three different people, all caught up in violent corruption.",
    thumbnailUrl: "https://example.com/thumbnail51.jpg",
    rating: 8.0,
  },
  {
    id: 49,
    title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
    genre: ["Adventure", "Family", "Fantasy"],
    releaseYear: 2005,
    description:
      "Four kids travel through a wardrobe to the land of Narnia and learn of their destiny to free it with the guidance of a mystical lion.",
    thumbnailUrl: "https://example.com/thumbnail52.jpg",
    rating: 6.9,
  },
  {
    id: 50,
    title: "Wedding Crashers",
    genre: ["Comedy", "Romance"],
    releaseYear: 2005,
    description:
      "John Beckwith and Jeremy Grey, a pair of committed womanizers who sneak into weddings to take advantage of the romantic tinge in the air, find themselves at odds with one another when John meets and falls for Claire Cleary.",
    thumbnailUrl: "https://example.com/thumbnail53.jpg",
    rating: 7,
  },
  {
    id: 51,
    title: "Walk the Line",
    genre: ["Biography", "Drama", "Music"],
    releaseYear: 2005,
    description:
      "A chronicle of country music legend Johnny Cash's life, from his early days on an Arkansas cotton farm to his rise to fame with Sun Records in Memphis, where he recorded alongside Elvis Presley, Jerry Lee Lewis, and Carl Perkins.",
    thumbnailUrl: "https://example.com/thumbnail54.jpg",
    rating: 7.8,
  },
  {
    id: 52,
    title: "V for Vendetta",
    genre: ["Action", "Drama", "Thriller"],
    releaseYear: 2005,
    description:
      "In a future British tyranny, a shadowy freedom fighter, known only by the alias of 'V,' plots to overthrow it with the help of a young woman.",
    thumbnailUrl: "https://example.com/thumbnail55.jpg",
    rating: 8.2,
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
