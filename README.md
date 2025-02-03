# 🍽️ TastyTales

<div align="center">

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82?style=for-the-badge&logo=nuxt.js)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

A modern, feature-rich recipe platform built with Nuxt 3, Vue 3, and TailwindCSS. Perfect for culinary enthusiasts, food bloggers, and recipe creators.

[Demo](https://demo-link) · [Report Bug](https://github.com/yourusername/tastytales/issues) · [Request Feature](https://github.com/yourusername/tastytales/issues)

</div>

## 💝 Support My Work

<div align="center">
  <a href="https://patreon.com/0xExile">
    <img src="https://img.shields.io/badge/Sponsor_on-Patreon-FF424D?style=for-the-badge&logo=patreon&logoColor=white" alt="Sponsor on Patreon" />
  </a>
</div>

<p align="center">
  <strong>🌟 Get Exclusive Access to Premium Content! 🌟</strong><br>
  Sponsor me on Patreon and get exclusive access to full Nuxt Apps with stunning designs,<br>components, and exclusive content!
</p>

## ✨ Features

### Core Features

- 📝 **Rich Recipe Management**
  - Step-by-step instructions
  - Interactive timers with notifications
  - Dynamic serving size calculator
  - Ingredient management
- 🎨 **Modern UI/UX**
  - Clean, minimalist design
  - Smooth animations and transitions
  - Responsive layout for all devices
  - Dark mode support
- 🔍 **Search & Discovery**
  - Full-text search
  - Category and tag filtering
  - Recipe recommendations

## 🧩 Modules

TastyTales uses several Nuxt modules to enhance functionality:

- [@nuxt/content v3](https://content.nuxtjs.org) - File-based CMS
- [@pinia/nuxt](https://pinia.vuejs.org/ssr/nuxt.html) - State Management
- [@nuxtjs/tailwindcss](https://tailwindcss.nuxtjs.org) - CSS Framework
- [@nuxtjs/google-fonts](https://google-fonts.nuxtjs.org) - Web Fonts
- [nuxt-icon](https://github.com/nuxt-modules/icon) - Icon System

## 📝 Creating Content

### Adding a New Recipe

1. Create a new JSON file in `content/recipes/` with the following structure:

```json
{
  "title": "Classic Margherita Pizza",
  "description": "Traditional Neapolitan pizza with fresh ingredients",
  "image": "/images/recipes/margherita-pizza.jpg",
  "prepTime": "15 minutes",
  "cookTime": "12 minutes",
  "servings": 4,
  "difficulty": "medium",
  "tags": ["italian", "pizza", "vegetarian"],
  "ingredients": [
    "Pizza dough",
    "San Marzano tomatoes",
    "Fresh mozzarella",
    "Fresh basil",
    "Olive oil",
    "Salt"
  ],
  "instructions": [
    { "instruction": "Preheat oven to 500°F (260°C)", "timer": 1 },
    { "instruction": "Roll out the pizza dough", "timer": 5 },
    "Spread tomato sauce",
    "Add fresh mozzarella",
    "Bake for 12-15 minutes",
    "Garnish with fresh basil"
  ]
}
```

### Adding a Blog Post

1. Create a new Markdown file in `content/blog/` with the following frontmatter:

```md
---
title: 'The Art of Pizza Making'
description: 'Learn the secrets of making authentic Neapolitan pizza at home'
date: '2025-02-03'
image: '/images/blog/pizza-making.jpg'
author:
  name: 'John Doe'
  avatar: '/images/authors/john.jpg'
tags: ['tips', 'techniques', 'italian']
---

# The Art of Pizza Making

Your blog content goes here in Markdown format...

## Tips for Perfect Pizza

1. Use high-quality ingredients
2. Let the dough rest properly
3. Preheat your oven thoroughly

## Common Mistakes to Avoid

- Don't overload toppings
- Avoid using cold ingredients
- Don't skip the resting time
```

### Working with Nuxt Content

Query your content in components/pages:

```vue
<script setup>
// Fetch all recipes
const { data: recipes } = await useAsyncData('recipes', () =>
  queryCollection('recipes').all()
);

// Fetch a single recipe
const { data: recipe } = await useAsyncData('pizza', () =>
  queryCollection('recipes')
    .where('title', '=', 'Classic Margherita Pizza')
    .first()
);

// Search recipes by tag
const { data: italianRecipes } = await useAsyncData('italian', () =>
  queryContent('recipes').where('tags', 'LIKE', 'italian').all()
);
</script>
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16.x or later
- pnpm 7.x or later

### Installation

1. Clone the repository

```bash
git clone https://github.com/florianjs/tasty-tales.git
cd tastytales
```

2. Install dependencies

```bash
pnpm install
```

3. Start development server

```bash
pnpm dev
```

4. Build for production

```bash
pnpm build
```

## 📁 Project Structure

```
tastytales/
├── components/           # Reusable Vue components
│   ├── recipe/          # Recipe-specific components
│   └── ui/              # UI components
├── composables/         # Composable functions
├── content/            # Recipe content (JSON/Markdown)
├── layouts/            # Page layouts
├── pages/              # Application routes
├── public/             # Static assets
├── stores/             # Pinia stores
├── types/              # TypeScript types
├── app.vue             # Application entry
├── nuxt.config.ts      # Nuxt configuration
└── tailwind.config.ts  # TailwindCSS configuration
```

## 🎨 Customization

### Theme

The default theme uses a warm, inviting color scheme:

```typescript
colors: {
  primary: colors.orange,
  accent: colors.amber,
  // Customize in tailwind.config.ts
}
```

### Typography

- **Headings**: Playfair Display (elegant serif)
- **Body**: Inter (modern sans-serif)

Customize fonts in `nuxt.config.ts`:

```typescript
googleFonts: {
  families: {
    'Playfair+Display': [500, 600, 700],
    'Inter': [400, 500, 600]
  }
}
```

## ☁️ Deployment

### Recommended: Cloudflare Pages

This project is optimized for deployment on Cloudflare Pages, which provides:

- Global CDN distribution
- Automatic HTTPS
- Zero cold starts
- Easy deployment process

### Deployment Steps

Basic deployment steps:

1. Connect your repository to Cloudflare Pages
2. Set build command: `pnpm run build`
3. Set build output directory: `.output/public`
4. Add a D1 SQL Database from Cloudflare
5. Bind your database to your Cloudflare Page

For detailed deployment instructions, follow the [Nuxt Content deployment guide for Cloudflare](https://content.nuxt.com/docs/deploy/serverless).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Nuxt.js](https://nuxt.com) - The Intuitive Vue Framework
- [TailwindCSS](https://tailwindcss.com) - A utility-first CSS framework
- [Pinia](https://pinia.vuejs.org) - The Vue Store that you will enjoy using

---

<div align="center">

Made with ❤️ by [0xExile](https://github.com/florianjs)

</div>
