export const getTheme = async (category, theme) => {
  const res = await fetch(
   `${process.env.API_HOST}/categories/${category}/${theme}`
  );
  return res.json();
 };