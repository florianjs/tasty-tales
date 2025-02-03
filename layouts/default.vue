<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm dark:bg-gray-800 sticky top-0 z-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <span class="font-heading text-lg xs:text-xl sm:text-2xl text-gray-900 dark:text-white">TastyTales</span>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
            <NuxtLink
              to="/recipes"
              class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Recipes
            </NuxtLink>
            <NuxtLink
              to="/blog"
              class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Blog
            </NuxtLink>
            <button
              @click="() => toggleDarkMode()"
              class="p-2 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon
                :name="isDark ? 'ph:sun-bold' : 'ph:moon-bold'"
                class="w-5 h-5 dark:text-gray-300"
              />
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="flex items-center space-x-2 md:hidden">
            <button
              @click="() => toggleDarkMode()"
              class="p-2 mr-2 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon
                :name="isDark ? 'ph:sun-bold' : 'ph:moon-bold'"
                class="w-5 h-5 dark:text-gray-300"
              />
            </button>
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Icon
                :name="mobileMenuOpen ? 'ph:x-bold' : 'ph:list-bold'"
                class="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-show="mobileMenuOpen"
        class="md:hidden bg-white dark:bg-gray-800 shadow-lg"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            to="/recipes"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="mobileMenuOpen = false"
          >
            Recipes
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="mobileMenuOpen = false"
          >
            Blog
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        <div class="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
          <slot />
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <!-- Newsletter -->
          <div class="lg:col-span-2">
            <h3
              class="font-heading text-lg font-medium text-gray-900 dark:text-white mb-4"
            >
              Subscribe to our newsletter
            </h3>
            <form
              @submit.prevent="subscribeNewsletter"
              class="flex flex-col sm:flex-row gap-2"
            >
              <input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
                required
              />
              <button
                type="submit"
                class="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

          <!-- Quick Links -->
          <div>
            <h3
              class="font-heading text-lg font-medium text-gray-900 dark:text-white mb-4"
            >
              Quick Links
            </h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  to="/recipes"
                  class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  All Recipes
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/blog"
                  class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Blog Posts
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Social Links -->
          <div>
            <h3
              class="font-heading text-lg font-medium text-gray-900 dark:text-white mb-4"
            >
              Follow Us
            </h3>
            <div class="flex space-x-4">
              <a
                href="#"
                class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Icon name="ph:instagram-logo-bold" class="w-6 h-6" />
              </a>
              <a
                href="#"
                class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Icon name="ph:facebook-logo-bold" class="w-6 h-6" />
              </a>
              <a
                href="#"
                class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Icon name="ph:twitter-logo-bold" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDarkMode = useToggle(isDark);
const mobileMenuOpen = ref(false);
const email = ref('');

const subscribeNewsletter = () => {
  // TODO: Implement newsletter subscription
  console.log('Subscribe:', email.value);
  email.value = '';
};
</script>
