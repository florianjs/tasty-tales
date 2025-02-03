<template>
  <div class="space-y-6">
    <h2
      class="text-2xl font-heading font-semibold mb-6 text-gray-900 dark:text-white"
    >
      Step by Step Instructions
    </h2>
    <div class="">
      <div
        v-for="(instruction, index) in instructions"
        :key="index"
        class="flex gap-6"
      >
        <div class="relative">
          <div
            class="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 font-heading text-xl font-bold"
          >
            <p>{{ index + 1 }}</p>
          </div>
          <div
            v-if="index !== instructions.length - 1"
            class="absolute top-12 bottom-0 left-1/2 w-0.5 bg-orange-100 dark:bg-orange-900"
          />
        </div>
        <div class="flex-1 pb-8">
          <div
            class="bg-orange-50 dark:bg-gray-700/50 rounded-xl p-6 transition-all duration-300"
            :class="{
              'ring-2 ring-orange-500 shadow-lg':
                timerStore.activeTimers[index],
              'opacity-50': timerStore.completedSteps[index],
            }"
          >
            <div class="flex items-start gap-4">
              <input
                type="checkbox"
                :checked="timerStore.completedSteps[index]"
                @change="toggleStep(index)"
                class="mt-1.5 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
              />
              <div class="flex-1">
                <p
                  class="text-lg text-gray-800 dark:text-gray-100 mb-3"
                  :class="{ 'line-through': timerStore.completedSteps[index] }"
                >
                  {{
                    typeof instruction === 'string'
                      ? instruction
                      : instruction.instruction
                  }}
                </p>

                <!-- Timer Button -->
                <button
                  v-if="
                    !timerStore.completedSteps[index] &&
                    typeof instruction === 'object' &&
                    instruction.timer &&
                    !timerStore.activeTimers[index]
                  "
                  @click="startStepTimer(index, instruction.timer)"
                  class="group relative inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900 transition-all duration-300"
                >
                  <Icon
                    name="ph:timer"
                    class="transition-transform group-hover:rotate-12"
                  />
                  <span>Start {{ instruction.timer }}min Timer</span>
                  <span
                    class="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-400/0 via-orange-400/10 to-orange-400/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"
                  ></span>
                </button>

                <!-- Active Timer Display -->
                <div
                  v-if="timerStore.activeTimers[index]"
                  class="mt-3 relative overflow-hidden bg-gradient-to-br from-orange-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 shadow-lg transition-all duration-300"
                  :class="{
                    'animate-pulse-subtle':
                      timerStore.activeTimers[index] &&
                      timerStore.activeTimers[index].remainingTime !==
                        undefined &&
                      timerStore.activeTimers[index].remainingTime <= 30,
                  }"
                >
                  <!-- Timer Header -->
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                      <Icon name="ph:timer" class="text-xl text-orange-500" />
                      <span
                        class="font-medium text-gray-700 dark:text-gray-300"
                      >
                        Timer for Step {{ index + 1 }}
                      </span>
                    </div>
                    <span
                      class="text-2xl font-bold tabular-nums font-mono"
                      :class="
                        timerStore.activeTimers[index] &&
                        timerStore.activeTimers[index].remainingTime !==
                          undefined &&
                        timerStore.activeTimers[index].remainingTime <= 30
                          ? 'text-orange-500'
                          : 'text-gray-900 dark:text-white'
                      "
                    >
                      {{
                        formatTime(
                          timerStore.activeTimers[index]?.remainingTime || 0
                        )
                      }}
                    </span>
                  </div>

                  <!-- Progress Ring -->
                  <div class="relative flex items-center justify-center mb-4">
                    <svg class="transform -rotate-90 w-24 h-24">
                      <circle
                        cx="48"
                        cy="48"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="6"
                        class="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="6"
                        :stroke-dasharray="2 * Math.PI * 45"
                        :stroke-dashoffset="
                          2 *
                          Math.PI *
                          45 *
                          (1 -
                            (timerStore.activeTimers[index]?.remainingTime ||
                              0) /
                              (timerStore.activeTimers[index]?.duration || 1) /
                              60)
                        "
                        class="text-orange-500 transition-all duration-1000"
                      />
                    </svg>
                  </div>

                  <!-- Timer Controls -->
                  <div class="flex justify-center gap-3">
                    <button
                      @click="toggleTimer(index)"
                      class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      :class="
                        timerStore.activeTimers[index]?.isRunning
                          ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:hover:bg-orange-900'
                          : 'bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700'
                      "
                    >
                      <Icon
                        :name="
                          timerStore.activeTimers[index]?.isRunning
                            ? 'ph:pause-fill'
                            : 'ph:play-fill'
                        "
                      />
                      <span>{{
                        timerStore.activeTimers[index]?.isRunning
                          ? 'Pause'
                          : 'Resume'
                      }}</span>
                    </button>
                    <button
                      @click="resetTimer(index)"
                      class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <Icon name="ph:arrow-counter-clockwise" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Keyboard Shortcuts -->
    <div
      class="fixed bottom-4 left-4 text-sm"
      @mouseenter="showShortcuts = true"
      @mouseleave="showShortcuts = false"
    >
      <button
        class="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
      >
        <Icon name="ph:keyboard" />
        <span>Shortcuts</span>
      </button>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-2 opacity-0"
      >
        <div
          v-show="showShortcuts"
          class="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-64"
        >
          <h3 class="font-medium text-gray-900 dark:text-white mb-2">
            Keyboard Shortcuts
          </h3>
          <ul class="space-y-2">
            <li
              class="flex items-center justify-between text-gray-600 dark:text-gray-300"
            >
              <span>Toggle Timer</span>
              <kbd
                class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                >Space</kbd
              >
            </li>
            <li
              class="flex items-center justify-between text-gray-600 dark:text-gray-300"
            >
              <span>Reset Timer</span>
              <kbd
                class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                >R</kbd
              >
            </li>
            <li
              class="flex items-center justify-between text-gray-600 dark:text-gray-300"
            >
              <span>Minimize/Maximize</span>
              <kbd
                class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                >M</kbd
              >
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useTimerStore } from '~/stores/timer';

const props = defineProps<{
  instructions: (string | { instruction: string; timer?: number })[];
}>();

const timerStore = useTimerStore();

// Initialize timers only once when component is first created
onMounted(() => {
  // Initialize timers with the current instruction count
  timerStore.initializeTimers(props.instructions.length);

  // Add keyboard event listener
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

const showShortcuts = ref(false);

// Format time in MM:SS
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Start a timer for a specific step
const startStepTimer = (index: number, minutes: number) => {
  timerStore.startStepTimer(index, minutes);
};

// Toggle timer state
const toggleTimer = (index: number) => {
  timerStore.toggleTimer(index);
};

// Reset the timer
const resetTimer = (index: number) => {
  timerStore.resetTimer(index);
};

// Toggle step completion
const toggleStep = (index: number) => {
  timerStore.toggleStep(index);
};

// Minimize/maximize timer
const minimizeTimer = (index: number) => {
  timerStore.toggleMinimized(index);
};

// Handle keyboard shortcuts
const handleKeydown = (event: KeyboardEvent) => {
  if (event.target instanceof HTMLInputElement) return;

  const activeTimerIndex = timerStore.activeTimers.findIndex(
    (timer) => timer !== null
  );
  if (activeTimerIndex === -1) return;

  switch (event.key.toLowerCase()) {
    case ' ':
      event.preventDefault();
      toggleTimer(activeTimerIndex);
      break;
    case 'r':
      resetTimer(activeTimerIndex);
      break;
    case 'm':
      minimizeTimer(activeTimerIndex);
      break;
  }
};
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s ease-in-out infinite;
}

.scale-102 {
  --tw-scale-x: 1.02;
  --tw-scale-y: 1.02;
}
</style>
