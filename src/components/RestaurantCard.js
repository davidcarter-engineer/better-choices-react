/*
  --- COMPONENT: RestaurantCard ---

  --- WHAT ARE PROPS? ---
  Props (short for "properties") are how we pass data from a parent component
  to a child component. They work like function arguments.

  When we write: <RestaurantCard name="Subway" calories={230} />
  The RestaurantCard receives an object: { name: "Subway", calories: 230 }

  Props are READ-ONLY — a child component cannot change its own props.
  This keeps data flowing in one direction (parent → child).
*/

function RestaurantCard({ name, healthyScore, recommendedMeal, calories }) {
  return (
    <article className="restaurant-card">
      <h4>{name}</h4>
      {/* Curly braces {} in JSX let us insert JavaScript values */}
      <p className="card-detail">⭐ Healthy Score: {healthyScore}/10</p>
      <p className="card-detail">🥗 Try: {recommendedMeal}</p>
      <p className="card-detail">🔥 {calories} calories</p>
    </article>
  );
}

export default RestaurantCard;
