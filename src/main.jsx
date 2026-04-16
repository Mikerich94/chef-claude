import { useState, useRef, useEffect } from "react";
import ClaudeRecipe from "./components/ClaudeRecipe";
import IngredientsList from "./components/IngredientsList";
import { getRecipeFromChefClaude } from "./ai";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const recipeRef = useRef(null);

  useEffect(() => {
    if (recipe) {
      recipeRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [recipe]);

  async function getRecipe() {
    setLoading(true);

    const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
    setRecipe(recipeMarkdown);

    setLoading(false);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim();

    if (!newIngredient) {
      setError("Please enter an ingredient.");
      return;
    }

    setError("");

    setIngredients((prev) => [...prev, newIngredient]);
  }

  function removeIngredient(ingredientToRemove) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== ingredientToRemove),
    );
  }

  function clearIngredients() {
    setIngredients([]);
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
      {error && <p className="error">{error}</p>}
      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          removeIngredient={removeIngredient}
          clearIngredients={clearIngredients}
        />
      )}
      {loading && (
        <p className="loading">
          {" "}
          Fetching your recipe <span className="spinner"></span>
        </p>
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}
      <div ref={recipeRef} />
    </main>
  );
}
