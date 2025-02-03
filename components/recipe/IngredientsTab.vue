<template>
  <div class="space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div class="flex items-center gap-3">
        <Icon name="ph:cooking-pot-fill" class="text-3xl text-orange-500" />
        <h2 class="text-2xl font-heading font-semibold text-gray-900 dark:text-white">
          Ingredients
        </h2>
      </div>

      <div class="relative group">
        <div class="absolute -inset-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
        <div class="relative flex items-center justify-center gap-3 bg-white dark:bg-gray-800 rounded-xl px-5 py-2.5 shadow-sm ring-1 ring-gray-200/50 dark:ring-gray-700">
          <button
            @click="servingSize = Math.max(1, servingSize - 1)"
            class="group/btn relative flex items-center justify-center w-8 h-8 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
            :disabled="servingSize <= 1"
          >
            <Icon
              name="ph:minus-bold"
              class="text-lg text-gray-500 dark:text-gray-400 transition-all group-hover/btn:text-orange-500 dark:group-hover/btn:text-orange-400"
              :class="{ 'opacity-40': servingSize <= 1 }"
            />
            <span class="sr-only">Decrease servings</span>
            <div class="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Decrease servings
            </div>
          </button>

          <div class="flex flex-col items-center min-w-[4rem] px-2">
            <p class="text-xl font-semibold tabular-nums text-gray-900 dark:text-white">
              {{ servingSize }}
            </p>
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400">servings</span>
          </div>

          <button
            @click="servingSize = Math.min(99, servingSize + 1)"
            class="group/btn relative flex items-center justify-center w-8 h-8 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
            :disabled="servingSize >= 99"
          >
            <Icon
              name="ph:plus-bold"
              class="text-lg text-gray-500 dark:text-gray-400 transition-all group-hover/btn:text-orange-500 dark:group-hover/btn:text-orange-400"
              :class="{ 'opacity-40': servingSize >= 99 }"
            />
            <span class="sr-only">Increase servings</span>
            <div class="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Increase servings
            </div>
          </button>
        </div>
      </div>
    </div>
    <ul class="grid gap-4 sm:grid-cols-2">
      <li
        v-for="(ingredient, index) in scaledIngredients"
        :key="index"
        class="flex items-center gap-3 p-4 rounded-lg bg-orange-50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-100"
      >
        <div class="h-2 w-2 rounded-full bg-orange-400 dark:bg-orange-300" />
        <span> {{ ingredient }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  ingredients: string[];
  defaultServings: number;
}>();

const servingSize = ref(props.defaultServings);

const scaledIngredients = computed(() => {
  return props.ingredients.map((ingredient) => {
    // Try to find a number at the start of the ingredient
    const match = ingredient.match(/^([\d.\/]+)\s*(.+)/);
    if (match) {
      const amount = match[1];
      const rest = match[2];

      // Convert fractions to decimals if present
      const numericAmount = amount.includes('/')
        ? eval(amount)
        : parseFloat(amount);

      // Calculate the scaled amount
      const scaledAmount =
        (numericAmount * servingSize.value) / props.defaultServings;

      // Format the scaled amount (round to 2 decimal places)
      const formattedAmount = Math.round(scaledAmount * 100) / 100;

      return `${formattedAmount} ${rest}`;
    }
    return ingredient; // Return unchanged if no number found
  });
});
</script>
