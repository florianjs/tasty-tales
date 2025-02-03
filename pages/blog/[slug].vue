<template>
  <div v-if="post" class="container mx-auto px-4 py-8">
    <article class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <h1
          class="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4"
        >
          {{ post.title }}
        </h1>
        <div
          class="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6"
        >
          <span>{{ formatDate(post.date) }}</span>
          <span>•</span>
          <span>By {{ post.author }}</span>
          <span>•</span>
          <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
            {{ post.category }}
          </span>
        </div>
      </header>

      <!-- Featured Image -->
      <div class="aspect-w-16 aspect-h-9 mb-8 rounded-lg overflow-hidden">
        <img
          :src="post.image"
          :alt="post.title"
          class="object-cover w-full h-full"
        />
      </div>

      <!-- Content -->
      <div
        class="prose prose-lg dark:prose-invert max-w-none dark:text-gray-200"
      >
        <p v-for="(paragraph, index) in paragraphs" :key="index" class="mb-6">
          {{ paragraph }}
        </p>
      </div>

      <!-- Tags -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
    </article>
  </div>
  <div v-else class="container mx-auto px-4 py-8 text-center">
    <p class="text-xl text-gray-600 dark:text-gray-400">Blog post not found</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () =>
  queryCollection('articles').where('slug', '=', route.params.slug).first()
);

const paragraphs = computed(() => {
  if (!post.value) return [];
  return post.value.content.split('\n\n');
});

function formatDate(date: string | Date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>
