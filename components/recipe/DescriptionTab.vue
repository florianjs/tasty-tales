<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-2xl font-heading font-semibold mb-6 text-gray-900 dark:text-white">
        About this Recipe
      </h2>
      <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        {{ description }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-orange-50 dark:bg-gray-700/50 rounded-xl p-6">
        <div class="flex items-center gap-3 mb-2">
          <Icon name="ph:clock" class="text-2xl text-orange-500" />
          <h3 class="font-medium text-gray-900 dark:text-white">Cooking Time</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-300">{{ cookingTime }} minutes</p>
      </div>

      <div class="bg-orange-50 dark:bg-gray-700/50 rounded-xl p-6">
        <div class="flex items-center gap-3 mb-2">
          <Icon name="ph:users" class="text-2xl text-orange-500" />
          <h3 class="font-medium text-gray-900 dark:text-white">Servings</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-300">{{ servings }} people</p>
      </div>

      <div class="bg-orange-50 dark:bg-gray-700/50 rounded-xl p-6">
        <div class="flex items-center gap-3 mb-2">
          <Icon name="ph:chart-bar" class="text-2xl text-orange-500" />
          <h3 class="font-medium text-gray-900 dark:text-white">Difficulty</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-300 capitalize">{{ difficulty }}</p>
      </div>
    </div>

    <div>
      <h3 class="text-lg font-medium mb-4 text-gray-900 dark:text-white">Tags</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-sm"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  description: string
  cookingTime: number
  servings: number
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
}>()
</script>
