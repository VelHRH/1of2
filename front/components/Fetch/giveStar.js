export const giveStar = async (category, theme, r) => {
  await fetch(`${process.env.API_HOST}/categories/${category}/${theme}`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `${window.localStorage.getItem("token")}`,
   },
   body: JSON.stringify({
    stars: r,
   }),
  });
 };