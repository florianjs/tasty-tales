<template>
  <div class="container mx-auto px-4 py-8">
    <h1
      class="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-8"
    >
      Blog
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <NuxtLink
        v-for="post in posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="group"
      >
        <article
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div class="aspect-w-16 aspect-h-9">
            <img
              :src="post.image"
              :alt="post.title"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="p-6">
            <div
              class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3"
            >
              <span>{{ formatDate(post.date) }}</span>
              <span
                class="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 px-3 py-1 rounded-full"
              >
                {{ post.category }}
              </span>
            </div>
            <h2
              class="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400"
            >
              {{ post.title }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              {{ post.excerpt }}
            </p>
            <div
              class="flex items-center text-sm text-gray-600 dark:text-gray-400"
            >
              <span>By {{ post.author }}</span>
            </div>
          </div>
        </article>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ArticlesCollectionItem {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  image: string;
}

const posts = fetchArticles();

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>
