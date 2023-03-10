export const postComment = async (category, theme, text) => {
  const res = await fetch(
   `${process.env.API_HOST}/categories/${category}/${theme}/comment`,
   {
    method: "POST",
    headers: {
     "Content-Type": "application/json;charset=utf-8",
     Authorization: `${window.localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
     text,
    }),
   }
  );
  return res.json();
 };