export const deleteComment = async (category, theme, id) => {
  await fetch(`${process.env.API_HOST}/categories/${category}/${theme}/delete`, {
   method: "DELETE",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `${window.localStorage.getItem("token")}`,
   },
   body: JSON.stringify({
    id,
   }),
  });
 };