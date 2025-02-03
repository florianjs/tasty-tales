<template>
  <div class="flex flex-col gap-8">
    <!-- Tab Navigation -->
    <div class="flex gap-4">
      <button
        v-for="(tab, index) in ['ingredients', 'instructions', 'notes']"
        :key="tab"
        @click="switchTo(tab, index)"
        class="px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        :class="
          showTab === tab
            ? 'bg-orange-500 text-white hover:bg-orange-600'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        "
      >
        {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="relative">
      <div class="relative">
        <div
          v-show="showTab === 'ingredients'"
          :class="{ hidden: showTab !== 'ingredients' }"
        >
          <RecipeIngredientsTab
            :default-servings="value.servings"
            :ingredients="value.ingredients"
          />
        </div>
        <div
          v-show="showTab === 'instructions'"
          :class="{ hidden: showTab !== 'instructions' }"
        >
          <RecipeInstructionsTab
            :instructions="value.instructions"
            v-model:activeTimers="timerStore.activeTimers"
            v-model:minimizedTimers="timerStore.minimizedTimers"
            v-model:completedSteps="timerStore.completedSteps"
          />
        </div>
        <div
          v-show="showTab === 'notes'"
          :class="{ hidden: showTab !== 'notes' }"
        >
          <RecipeNotesTab :notes="value.notes" />
        </div>
      </div>
    </div>

    <!-- Floating Timers (Always visible) -->
    <TransitionGroup
      v-if="showTab !== 'instructions'"
      tag="div"
      class="fixed right-4 top-20 space-y-2 z-50"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform translate-x-full opacity-0"
    >
      <div
        v-for="(timer, index) in timerStore.activeTimers"
        :key="'float-' + index"
        v-show="
          timer &&
          timer.remainingTime !== undefined &&
          timerStore.minimizedTimers[index]
        "
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 w-48 transform hover:scale-102 transition-all duration-300 cursor-pointer"
        :class="{
          'ring-2 ring-orange-500':
            timer &&
            timer.remainingTime !== undefined &&
            timer.remainingTime <= 30,
        }"
        @click="
          () => {
            showTab = 'instructions';
            categoryIndex = 1;
            timerStore.minimizedTimers[index] = false;
          }
        "
      >
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400"
            >Step {{ index + 1 }}</span
          >
          <span
            class="text-lg font-bold tabular-nums"
            :class="
              timer &&
              timer.remainingTime !== undefined &&
              timer.remainingTime <= 30
                ? 'text-orange-500'
                : 'text-gray-900 dark:text-white'
            "
          >
            {{ formatTime(timer?.remainingTime || 0) }}
          </span>
        </div>
        <div
          class="mt-2 relative h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        >
          <div
            class="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-1000"
            :class="{
              'animate-pulse':
                timer &&
                timer.remainingTime !== undefined &&
                timer.remainingTime <= 30,
            }"
            :style="{
              width: `${
                ((timer?.remainingTime || 0) / ((timer?.duration || 1) * 60)) *
                100
              }%`,
            }"
          />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useTimerStore } from '~/stores/timer';

const props = defineProps<{
  value: {
    id: string;
    title: string;
    description: string;
    cookingTime: number;
    difficulty: 'easy' | 'medium' | 'hard';
    featured: boolean;
    image: string;
    tags: string[];
    rating?: number | undefined;
    reviews?: number | undefined;
    ingredients: string[];
    instructions: (string | { instruction: string; timer?: number })[];
    notes?: string | undefined;
    servings: number;
  };
}>();

const showTab = ref('ingredients');
const categoryIndex = ref(0);

const timerStore = useTimerStore();

const switchTo = (tab: string, index: number) => {
  showTab.value = tab;
  categoryIndex.value = index;

  // Minimize all active timers when switching tabs
  if (
    tab !== 'instructions' &&
    timerStore.activeTimers.some((timer) => timer !== null)
  ) {
    timerStore.minimizeAllTimers();
  }
};

// Format time in MM:SS (for floating timers)
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Clean up timers only when the entire component is unmounted
onUnmounted(() => {
  timerStore.cleanup();
});
</script>

<style scoped>
.scale-102 {
  --tw-scale-x: 1.02;
  --tw-scale-y: 1.02;
}
</style>
