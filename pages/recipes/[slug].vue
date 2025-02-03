<template>
  <div v-if="recipe" class="min-h-screen bg-orange-50/30 dark:bg-gray-900">
    <!-- Hero Section -->
    <div class="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] overflow-hidden">
      <img
        :src="recipe.image"
        :alt="recipe.title"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
      />
      <div
        class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white"
      >
        <div class="container mx-auto max-w-4xl">
          <div class="flex items-center gap-2 mb-4">
            <NuxtLink
              to="/recipes"
              class="flex items-center gap-1 text-orange-300 hover:text-orange-200 transition-colors"
            >
              <Icon name="ph:arrow-left" />
              <span>Back to Recipes</span>
            </NuxtLink>
          </div>
          <h1
            class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 text-white"
          >
            {{ recipe.title }}
          </h1>
          <p
            class="text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl mb-6"
          >
            {{ recipe.description }}
          </p>
          <div class="flex flex-wrap gap-3 sm:gap-6 text-sm">
            <div
              class="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2"
            >
              <Icon name="ph:clock" class="text-orange-300" />
              <span>{{ recipe.cookingTime }} minutes</span>
            </div>
            <div
              class="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2"
            >
              <Icon name="ph:users" class="text-orange-300" />
              <span>{{ recipe.servings }} servings</span>
            </div>
            <div
              class="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2"
            >
              <Icon name="ph:chart-bar" class="text-orange-300" />
              <span class="capitalize">{{ recipe.difficulty }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recipe Content -->
    <div class="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <RecipeTabs :value="recipe" />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <Icon name="ph:cooking-pot" class="text-6xl text-orange-500 mb-4" />
      <p class="text-xl">Recipe not found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: recipeData } = await useAsyncData(`recipe-${route.params.slug}`, () =>
  queryCollection('recipes')
    .where('path', '=', `/recipes/${route.params.slug}`)
    .first()
);

// Transform the data to ensure featured is always a boolean
const recipe = computed(() => 
  recipeData.value 
    ? {
        ...recipeData.value,
        featured: recipeData.value.featured ?? false
      }
    : null
);
</script>
