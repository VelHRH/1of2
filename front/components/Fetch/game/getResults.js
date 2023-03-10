export const getResults = async (category, theme, session) => {
  const res = await fetch(
   `${process.env.API_HOST}/categories/${category}/${theme}/${session}/oneresult`
  );
  return res.json();
 };