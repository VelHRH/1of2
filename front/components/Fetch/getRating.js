export const getRating = async (category, theme) => {
  const res = await fetch(
   `${process.env.API_HOST}/categories/${category}/${theme}/rating`
  );
  return res.json();
 };