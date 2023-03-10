export const getRating = async (category, theme, page) => {
  const res = await fetch(
   `${process.env.API_HOST}/categories/${category}/${theme}/rating`
  );
  const data = await res.json();
  return {
   data: data.slice(8 * page, 8 * (page + 1)),
   nextPage:
    (data.length - (data.length % 8)) / 8 + 1 > page + 1 ? page + 1 : undefined,
  };
 };