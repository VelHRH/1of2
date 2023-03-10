export const likeCommentReq = async (category, theme, id) => {
  await fetch(
   `${process.env.API_HOST}/categories/${category}/${theme}/likecomment`,
   {
    method: "POST",
    headers: {
     "Content-Type": "application/json;charset=utf-8",
     Authorization: `${window.localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
     id,
    }),
   }
  );
 };