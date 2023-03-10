export const getCategories = async () => {
  const res = await fetch(`${process.env.API_HOST}/categories`);
  return res.json();
 };