export const changeFav = async (category, theme) => {
  await fetch(
   `${process.env.API_HOST}/categories/${category}/${theme}/favourite`,
   {
    method: "POST",
    headers: {
     "Content-Type": "application/json;charset=utf-8",
     Authorization: `${window.localStorage.getItem("token")}`,
    },
   }
  );
 };