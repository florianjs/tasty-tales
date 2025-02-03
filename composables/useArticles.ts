export async function fetchArticles() {
  const { data } = await useAsyncData('articles', () =>
    queryCollection('articles').all()
  );
  return data.value;
}

export async function fetchArticleBySlug(slug: string) {
  const { data } = await useAsyncData(`article-${slug}`, () =>
    queryCollection('articles').where('slug', '=', slug).first()
  );
  return data.value;
}

export async function fetchLatestPosts() {
  const { data } = await useAsyncData('latest-posts', () =>
    queryCollection('articles')
      .where('published', '=', true)
      .order('date', 'DESC')
      .limit(3)
      .all()
  );
  return data.value;
}
