<template>
  <div class="container mx-auto px-4 py-8">
    <h1
      class="text-4xl font-heading font-bold mb-8 text-gray-900 dark:text-white"
    >
      Our Recipes
    </h1>

    <!-- Search and Filter Section -->
    <div class="mb-8 space-y-4">
      <!-- Search Bar -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search recipes..."
          class="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:text-white"
        />
        <Icon
          name="ph:magnifying-glass"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <!-- Categories -->
      <div class="flex flex-wrap gap-2">
        <button
          @click="selectedCategory = ''"
          class="px-4 py-2 rounded-full text-sm"
          :class="
            selectedCategory === ''
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          "
        >
          All
        </button>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          class="px-4 py-2 rounded-full text-sm"
          :class="
            selectedCategory === category
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          "
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Recipe Grid -->
    <div
      v-if="filteredRecipes.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        v-bind="recipe"
        :to="recipe.path"
      />
    </div>

    <!-- No Results Message -->
    <div v-else class="text-center py-12">
      <p class="text-xl text-gray-600 dark:text-gray-400">
        No recipes found matching your search criteria
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: recipes } = await useAsyncData('recipes-page', () =>
  queryCollection('recipes').all()
);

// Search and filter state
const searchQuery = ref('');
const selectedCategory = ref('');

// Get unique categories from recipes
const categories = computed(() => {
  const uniqueCategories = new Set(
    (recipes.value || []).flatMap((recipe) => recipe.tags || [])
  );
  return Array.from(uniqueCategories).sort();
});

// Filter recipes based on search query and selected category
const filteredRecipes = computed(() => {
  if (!recipes.value) return [];

  return recipes.value.filter((recipe) => {
    const matchesSearch =
      searchQuery.value === '' ||
      recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      recipe.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      (recipe.tags || []).some((tag) =>
        tag.toLowerCase().includes(searchQuery.value.toLowerCase())
      );

    const matchesCategory =
      selectedCategory.value === '' ||
      (recipe.tags || []).includes(selectedCategory.value);

    return matchesSearch && matchesCategory;
  });
});
</script>
