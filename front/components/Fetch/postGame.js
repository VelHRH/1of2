export const postGame = async (category, theme, user, clickedMode) => {
  const res = await fetch(
   `${process.env.API_HOST}/categories/${category}/${theme}/results`,
   {
    method: "POST",
    headers: {
     "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
     clickedMode,
     user,
    }),
   }
  );
  return res.json();
 };