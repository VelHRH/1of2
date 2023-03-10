export const getCategory = async (name) => {
  const res = await fetch(`${process.env.API_HOST}/categories/${name}`);
  return res.json();
}