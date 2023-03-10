export const getSortedCategories = async () => {
  const res = await fetch(`${process.env.API_HOST}/sortedcategories`);
  return res.json();
 };