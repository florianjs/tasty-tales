<!-- components/RecipeCard.vue -->
<template>
  <article
    class="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
  >
    <div class="relative pb-[60%] overflow-hidden">
      <img
        :src="image"
        :alt="title"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div class="absolute top-4 right-4 z-10">
        <div
          class="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-full px-3 py-1.5 text-sm flex items-center gap-1.5 shadow-lg"
        >
          <Icon name="ph:clock-bold" class="w-4 h-4 text-orange-500" />
          <span class="font-medium text-gray-800 dark:text-white">{{ cookingTime }} min</span>
        </div>
      </div>
      <div v-if="featured" class="absolute top-4 left-4 z-10">
        <div
          class="bg-orange-500/90 backdrop-blur-sm text-white rounded-full px-3 py-1.5 text-sm flex items-center gap-1.5 shadow-lg"
        >
          <Icon name="ph:star-bold" class="w-4 h-4" />
          <span class="font-medium">Featured</span>
        </div>
      </div>
    </div>
    <div class="p-5">
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <span
          v-for="tag in tags"
          :key="tag"
          class="text-xs px-2.5 py-1 bg-orange-50 dark:bg-orange-900/50 text-orange-600 dark:text-orange-200 rounded-full border border-orange-100 dark:border-orange-800"
        >
          {{ tag }}
        </span>
      </div>
      <h3 class="font-heading text-xl font-semibold mb-2 text-gray-900 dark:text-white line-clamp-1">
        {{ title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {{ description }}
      </p>
      <div class="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
        <div class="flex items-center gap-1">
          <Icon
            v-for="i in 5"
            :key="i"
            :name="i <= rating ? 'ph:star-fill' : 'ph:star'"
            :class="[
              'w-5 h-5',
              i <= rating ? 'text-orange-400' : 'text-gray-300 dark:text-gray-600'
            ]"
          />
          <span class="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1.5"
            >({{ reviews }})</span
          >
        </div>
        <NuxtLink
          :to="to"
          class="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 font-medium text-sm group-hover:gap-2 transition-all"
        >
          View Recipe
          <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  cookingTime: number
  difficulty: 'easy' | 'medium' | 'hard'
  image: string
  to: string
  tags?: string[]
  rating?: number
  reviews?: number
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tags: () => [],
  rating: 0,
  reviews: 0,
  featured: false
})
</script>
