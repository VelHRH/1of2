export const uploadImg = async (formData) => {
  await fetch(`${process.env.API_HOST}/upload`, {
   method: "POST",
   headers: {
    Authorization: `${window.localStorage.getItem("token")}`,
   },
   body: formData,
  });
 };