import { useState } from "react";
import ClaudeRecipe from "./components/ClaudeRecipe";
import IngredientsList from "./components/IngredientsList";
import { getRecipeFromChefClaude } from "./ai";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);

  const [recipe, setRecipe] = useState("");

  const [loading, setLoading] = useState(false);

  async function getRecipe() {
    setLoading(true);
    const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
    setRecipe(recipeMarkdown);
    setLoading(false);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  function removeIngredient(ingredientToRemove) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== ingredientToRemove),
    );
  }

  return (
    <main>
      <p className="intro">
        Not sure what to cook? Add at least four ingredients, then submit your
        list to Claude’s API to get a recipe recommendation!
      </p>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          removeIngredient={removeIngredient}
        />
      )}
      {loading && <p>Fetching your recipe... 🍳</p>}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
