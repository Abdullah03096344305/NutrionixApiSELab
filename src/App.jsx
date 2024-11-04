import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const NutritionixAPIComponent = () => {
  const [query, setQuery] = useState(""); // For search input
  const [foodItems, setFoodItems] = useState([]); // To store the fetched data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling

  // Nutritionix API credentials
  const appId = "8ccc7024"; 
  const appKey = "9a37c7aede709c7dd4071aa341f1f7b0"; 

  // Function to search for food items using Nutritionix API
  const searchFoodItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://trackapi.nutritionix.com/v2/search/instant",
        {
          params: {
            query: query,
          },
          headers: {
            "x-app-id": appId,
            "x-app-key": appKey,
          },
        }
      );

      console.log("API Response:", response.data); // Log the response for debugging
      setFoodItems(response.data.common); // Display common foods
    } catch (err) {
      console.error("Error fetching food items:", err); // Log detailed error
      setError("Failed to fetch food items.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Food Search (Nutritionix API)</h1>
      <input
        type="text"
        placeholder="Enter food name (e.g., apple)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchFoodItems}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display the results */}
      {foodItems.length > 0 && (
        <ul>
          {foodItems.map((item, index) => (
            <li key={index}>
              <p>
                <strong>Name:</strong> {item.food_name}
              </p>
              <p>
                <strong>Serving Size:</strong> {item.serving_qty}{" "}
                {item.serving_unit}
              </p>
              <p>
                <strong>Calories:</strong> {item.nf_calories}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <NutritionixAPIComponent />
    </div>
  );
}

export default App;
