<template>
  <div class="space-y-6">
    <h2
      class="text-2xl font-heading font-semibold text-gray-900 dark:text-white"
    >
      Notes
    </h2>
    <div class="prose prose-orange dark:prose-invert max-w-none">
      <p v-if="notes" class="text-gray-700 dark:text-gray-300">
        {{ notes }}
      </p>
      <p v-else class="text-gray-500 dark:text-gray-400 italic">
        No notes available for this recipe.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  notes?: string;
}>();
</script>
