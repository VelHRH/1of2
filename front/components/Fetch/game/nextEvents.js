export const nextEvents = async (category, theme, session, choice) => {
  const res = await fetch(
   `${process.env.API_HOST}/categories/${category}/${theme}/${session}/next`,
   {
    method: "POST",
    headers: {
     "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
     choice,
    }),
   }
  );
  return res.json();
 };