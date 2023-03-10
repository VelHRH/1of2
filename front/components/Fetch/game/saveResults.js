export const saveResults = async (category, theme, session, user) => {
  const res = await fetch(
   `${process.env.API_HOST}/categories/${category}/${theme}/${session}/updateResult`,
   {
    method: "PUT",
    headers: {
     "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
     user,
    }),
   }
  );
  return res.json();
 };