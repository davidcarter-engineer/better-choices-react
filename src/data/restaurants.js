/*
  --- DATA FILE ---
  In React, we store data separately from our components.
  This keeps things organized and makes data easy to reuse.
  We export the array so any component can import it.

  Each restaurant now includes:
    - healthierOption: a lower-calorie alternative from the same restaurant
    - healthierTip: advice on how to make the recommended meal even healthier
*/

const restaurants = [
  {
    name: "McDonald's",
    healthyScore: 5,
    recommendedMeal: "Grilled Chicken Sandwich",
    calories: 380,
    healthierOption: {
      meal: "Artisan Grilled Chicken Sandwich (no mayo)",
      calories: 300,
    },
    healthierTip: "Skip the mayo and swap fries for a side salad to save over 200 calories.",
  },
  {
    name: "Subway",
    healthyScore: 8,
    recommendedMeal: "Veggie Delight Sub",
    calories: 230,
    healthierOption: {
      meal: "Veggie Delight Salad",
      calories: 60,
    },
    healthierTip: "Choose a salad bowl instead of bread, and use vinegar instead of creamy dressings.",
  },
  {
    name: "Chipotle",
    healthyScore: 7,
    recommendedMeal: "Chicken Burrito Bowl",
    calories: 510,
    healthierOption: {
      meal: "Chicken Salad Bowl (no sour cream, no cheese)",
      calories: 360,
    },
    healthierTip: "Skip the sour cream and cheese, choose fajita veggies as a topping, and go easy on rice.",
  },
  {
    name: "Chick-fil-A",
    healthyScore: 6,
    recommendedMeal: "Grilled Nuggets",
    calories: 140,
    healthierOption: {
      meal: "Grilled Nuggets with Superfood Side",
      calories: 220,
    },
    healthierTip: "Pair with the Kale Crunch Side instead of fries, and use the lighter honey mustard sauce.",
  },
  {
    name: "Wendy's",
    healthyScore: 5,
    recommendedMeal: "Apple Pecan Salad",
    calories: 340,
    healthierOption: {
      meal: "Apple Pecan Salad (half dressing)",
      calories: 250,
    },
    healthierTip: "Use only half the dressing packet — the full serving adds almost 100 extra calories.",
  },
  {
    name: "Taco Bell",
    healthyScore: 4,
    recommendedMeal: "Black Bean Crunchwrap",
    calories: 450,
    healthierOption: {
      meal: "Black Bean Soft Taco (Fresco Style)",
      calories: 160,
    },
    healthierTip: "Order 'Fresco Style' to replace cheese and sauces with fresh pico de gallo.",
  },
];

export default restaurants;
