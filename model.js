export const getBreed = async (breed) => {
  const URL = `https://dog.ceo/api/breed/${breed}/images/random/12`;
  const response = await fetch(URL, { method: "GET" });
  const data = await response.json();
  const imageList = data.message;
  return imageList;
};
