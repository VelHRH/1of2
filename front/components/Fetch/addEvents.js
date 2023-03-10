export const addEvents = async (names, theme, pictures) => {
  await fetch(`${process.env.API_HOST}/events/add`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `${window.localStorage.getItem("token")}`,
   },
   body: JSON.stringify({
    names,
    theme,
    pictures,
   }),
  });
 };