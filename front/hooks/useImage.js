const useImage = (image_url) => {
  var img = new Image();
  img.src = image_url;
  if (img.onload) return image_url; 
  return `${process.env.API_HOST}/uploads/${image_url}`
}

export {useImage}