export const getComments = async (category, theme) => {
  const res = await fetch(
   `${process.env.API_HOST}/categories/${category}/${theme}/allcomments`
  );
  return res.json();
 };