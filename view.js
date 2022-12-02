const _createElement = (tag) => document.createElement(tag);
const APP_TITLE = "DOG GALLERY";
const app = document.getElementById("app");

const component = {
  header: _createElement("div"),
  title: _createElement("h1"),
  paw_img: _createElement("img"),
  breed_options: _createElement("div"),
  grid_container: _createElement("div"),
  footer: _createElement("div"),
};

const breedList = [
  "pug",
  "husky",
  "labrador",
  "chow",
  "chihuahua",
  "dalmatian",
  "pitbull",
  "retriever",
  "shihtzu",
  "shiba",
];

const { header, title, paw_img, breed_options, grid_container, footer } =
  component;

const _setAppAttributes = () => {
  header.id = "header";
  paw_img.id = "paw-style";
  breed_options.id = "breed-options";
  grid_container.id = "grid-container";
  footer.id = "footer";
};

const _setAppContent = () => {
  title.textContent = APP_TITLE;
  paw_img.src = "./public/paw-print-icon.svg";
};

const _renderAllBreedOptions = () => {
  breedList.forEach((breed) => {
    const dogBreed = document.createElement("div");
    dogBreed.textContent = breed;
    dogBreed.className = "breed-option";
    breed_options.append(dogBreed);
  });
};

const _renderAppContent = () => {
  _renderAllBreedOptions();
  header.append(title);
  header.append(paw_img);
  app.append(header);
  app.append(breed_options);
  app.append(grid_container);
  app.append(footer);
};

export const RenderInitialView = () => {
  _setAppAttributes();
  _setAppContent();
  _renderAppContent();
};

export { component };
