<!-- error.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="font-heading text-6xl text-gray-900 dark:text-white mb-4">{{ error.statusCode }}</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">{{ error.message }}</p>
      <button
        @click="handleError"
        class="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>
