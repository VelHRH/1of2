export const getAllThemes = async () => {
  const res = await fetch(`${process.env.API_HOST}/getAllThemes`);
  return res.json();
 };