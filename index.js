const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const oneRecipe = {
  title: "Asian Glazed Chicken Thighs",
  level: "Amateur Chef",
  ingredients: [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "3 tablespoons minced garlic",
    "salt to taste",
    "8 skinless, boneless chicken thighs",
  ],
  cuisine: "Asian",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 40,
  creator: "Chef LePapu",
};

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  // //Iteration 2 - Create a recipe
  // .then(() => {
  //   Recipe.create(oneRecipe).then(() => {
  //     console.log(`Iteration 2: the title of the recipe is ${oneRecipe.title}`);
  //   });
  // })
  //Iteration 3 - Insert multiple recipes
  .then(() => {
    Recipe.insertMany(data).then(() => {
      console.log(
        `Iteration 3: the title of the recipe index 4 is ${data[4].title}`
      );
    });
  })
  //Iteration 4 - Update recipe
  .then(() => {
    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: 100 };
    Recipe.updateOne(filter, update, { new: true }).then(() => {
      console.log(
        `Iteration 4 the new duration of the recipe ${filter.title} is ${update.duration}`
      );
    });
  })
  //Iteration 5 - Remove a recipe
  .then(() => {
    const delRecipe = { title: "Carrot Cake" };
    Recipe.deleteOne(delRecipe).then(() => {
      console.log(`Iteration 5 I delete the Carrot Cake: ${delRecipe._id}`);
    });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// .finally(() => {
//   return mongoose.disconnect();
// });
