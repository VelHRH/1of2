export const getUser = async (id) => {
  const res = await fetch(`${process.env.API_HOST}/me`, {
   method: "GET",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: id,
   },
  });
  return res.json();
 };

 export const getUserById = async (id) => {
  const res = await fetch(`${process.env.API_HOST}/me`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({_id: id.toString()}),
   });
   return res.json();
 };