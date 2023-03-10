export const getCurr = async (category, theme, session) => {
  const res = await fetch(
   `${process.env.API_HOST}/categories/${category}/${theme}/${session}/currentGame`
  );
  return res.json();
 };