import { component, RenderInitialView } from "./view.js";
import { getBreed } from "./model.js";

let activeBreed = "";

export default class Presenter {
  constructor() {
    RenderInitialView();
  }

  UpdateUI() {
    this.#updateGridContainer();
    this.#lazyLoadImages();
  }

  #resizeImage(width, height) {
    const newHeight = 30;
    const newWidth = (width / height) * newHeight;
    return [newWidth, newHeight];
  }

  #updateGridContainer() {
    const { breed_options } = component;
    breed_options.addEventListener("click", (event) => {
      console.log(event);
      if (event.target.id === "breed-options") return;

      const dogBreed = event.target.textContent;
      console.log(dogBreed);

      if (dogBreed === activeBreed) return;
      this.#removePreviousActiveBreed();
      this.#appendNewActiveBreed(dogBreed);
      activeBreed = dogBreed;
    });
  }

  #removePreviousActiveBreed() {
    const { grid_container } = component;
    if (grid_container.childElementCount !== 0) {
      const dogList = [...grid_container.children];
      dogList.forEach((dog) => dog.remove());
    }
  }

  #appendNewActiveBreed = async (dogBreed) => {
    const { grid_container } = component;
    const Dogs = await getBreed(dogBreed);
    Dogs.forEach((imgURL) => {
      const dogImage = document.createElement("img");
      const { style } = dogImage;
      dogImage.visibility = "hidden";
      dogImage.src = imgURL;
      dogImage.onload = () => {
        const [newWidth, newHeight] = this.#resizeImage(
          dogImage.width,
          dogImage.height
        );
        style.width = `${newWidth}vh`;
        style.height = `${newHeight}vh`;
        style.visibility = "visible";
        style.animation = "blurry-effect 1s";
      };
      grid_container.append(dogImage);
    });
  };

  #lazyLoadImages() {
    const { footer } = component;
    const options = {
      root: null,
      rootMargins: "0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      if (entries[0].isIntersecting) this.#appendNewActiveBreed(activeBreed);
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(footer);
  }
}
