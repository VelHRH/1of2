export const getUsers = async () => {
  const res = await fetch(`${process.env.API_HOST}/users/all`);
  return res.json();
 };
 