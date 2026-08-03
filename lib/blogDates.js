export function getPostModifiedDate(post) {
  return post.updated || post.date;
}

export function hasPostUpdate(post) {
  return Boolean(post.updated && post.updated !== post.date);
}

export function formatBlogDate(date, options = {}) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...options,
  });
}
