/*
  --- DATA FILE ---
  In React, we store data separately from our components.
  This keeps things organized and makes data easy to reuse.
  We export the array so any component can import it.
*/

const restaurants = [
  { name: "McDonald's", healthyScore: 5, recommendedMeal: "Grilled Chicken Sandwich", calories: 380 },
  { name: "Subway", healthyScore: 8, recommendedMeal: "Veggie Delight Sub", calories: 230 },
  { name: "Chipotle", healthyScore: 7, recommendedMeal: "Chicken Burrito Bowl", calories: 510 },
  { name: "Chick-fil-A", healthyScore: 6, recommendedMeal: "Grilled Nuggets", calories: 140 },
  { name: "Wendy's", healthyScore: 5, recommendedMeal: "Apple Pecan Salad", calories: 340 },
  { name: "Taco Bell", healthyScore: 4, recommendedMeal: "Black Bean Crunchwrap", calories: 450 }
];

export default restaurants;
