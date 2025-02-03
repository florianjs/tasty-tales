export const useRecipes = () => {
  const fetchFeaturedRecipes = async () => {
    // Fetch recipes from the content directory
    const recipes = await queryCollection('recipes').all();

    // Filter and return only featured recipes
    return recipes.filter((recipe) => recipe.featured === true);
  };

  const fetchRecipes = async () => {
    const { data } = await useAsyncData('recipes', async () => {
      const recipes = await queryCollection('recipes').all();
      // Ensure featured is always a boolean
      return recipes.map(recipe => ({
        ...recipe,
        featured: recipe.featured ?? false // Set default to false if undefined
      }));
    });
    return data.value;
  };

  return {
    fetchRecipes,
    fetchFeaturedRecipes,
  };
};
