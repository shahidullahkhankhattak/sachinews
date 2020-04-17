export function getWithSlug(item) {
  const slug = item.name.replace(/ /g, '-').toLowerCase();
  return {
    ...item,
    slug,
  };
}
