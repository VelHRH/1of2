export const editComment = async (category, theme, id, text) => {
  await fetch(`${process.env.API_HOST}/categories/${category}/${theme}/edit`, {
   method: "PUT",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `${window.localStorage.getItem("token")}`,
   },
   body: JSON.stringify({
    id,
    text,
   }),
  });
 };