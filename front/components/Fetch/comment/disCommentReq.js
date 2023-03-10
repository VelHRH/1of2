export const disCommentReq = async (category, theme, id) => {
  await fetch(
   `${process.env.API_HOST}/categories/${category}/${theme}/dislikecomment`,
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