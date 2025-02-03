<!-- pages/index.vue -->
<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative bg-orange-50 dark:bg-orange-900 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 mb-12"
    >
      <div class="max-w-4xl mx-auto text-center">
        <h1
          class="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 dark:text-white"
        >
          Discover & Share<br />Delicious Recipes
        </h1>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Join our community of food lovers and explore amazing recipes from
          around the world
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/recipes"
            class="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Browse Recipes
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Read Blog
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Recipes -->
    <section class="mb-16">
      <div class="flex justify-between items-center mb-8">
        <h2
          class="font-heading text-2xl md:text-3xl text-gray-900 dark:text-white"
        >
          Featured Recipes
        </h2>
        <NuxtLink
          to="/recipes"
          class="text-orange-600 hover:text-orange-700 font-medium"
        >
          View All →
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <RecipeCard
          v-for="recipe in featuredRecipes"
          :key="recipe.id"
          v-bind="recipe"
          :to="recipe.path"
        />
      </div>
    </section>

    <!-- Latest Blog Posts -->
    <section>
      <div class="flex justify-between items-center mb-8">
        <h2
          class="font-heading text-2xl md:text-3xl text-gray-900 dark:text-white"
        >
          Latest from the Blog
        </h2>
        <NuxtLink
          to="/blog"
          class="text-orange-500 hover:text-orange-600 font-medium"
        >
          View All →
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="post in latestPosts"
          :key="post.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-200"
        >
          <NuxtLink :to="'/blog/' + post.slug">
            <img
              :src="post.image"
              :alt="post.title"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <div
                class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2"
              >
                <span>{{ formatDate(post.date) }}</span>
                <span
                  class="bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-100 px-2 py-1 rounded-full text-xs"
                >
                  {{ post.category }}
                </span>
              </div>
              <h3
                class="font-heading text-xl mb-2 text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors"
              >
                {{ post.title }}
              </h3>
              <p
                class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2"
              >
                {{ post.excerpt }}
              </p>
              <div
                class="flex items-center text-sm text-gray-500 dark:text-gray-400"
              >
                <span>By {{ post.author }}</span>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { fetchFeaturedRecipes } = useRecipes();
const { data: featuredRecipes, error } = await useAsyncData(
  'featured-recipes',
  async () => {
    const recipes = await fetchFeaturedRecipes();
    console.log('Fetched recipes:', recipes);
    return recipes;
  }
);

if (error.value) {
  console.error('Error fetching featured recipes:', error.value);
}

// Log the featuredRecipes after the async operation
console.log('Featured recipes:', featuredRecipes.value);

const latestPosts = ref(await fetchLatestPosts());

function formatDate(date: string | Date) {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>
