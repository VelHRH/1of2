export const addTheme = async (name, imgUrl, description) => {
  const res = await fetch(`${process.env.API_HOST}/theme/add`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `${window.localStorage.getItem("token")}`,
   },
   body: JSON.stringify({
    name,
    imgUrl,
    description,
   }),
  });
 
  return res.json();
 };