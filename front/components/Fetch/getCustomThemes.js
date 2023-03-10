export const getThemes = async () => {
  const res = await fetch(`${process.env.API_HOST}/categories/creations`);
  return res.json();
 };