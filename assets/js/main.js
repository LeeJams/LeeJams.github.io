(() => {
  // Theme switch
  const body = document.body;
  const lamp = document.getElementById("mode");

  const toggleTheme = (state) => {
    if (state === "dark") {
      localStorage.setItem("theme", "light");
      body.removeAttribute("data-theme");
    } else if (state === "light") {
      localStorage.setItem("theme", "dark");
      body.setAttribute("data-theme", "dark");
    } else {
      initTheme(state);
    }
  };

  lamp.addEventListener("click", () =>
    toggleTheme(localStorage.getItem("theme"))
  );

  // Blur the content when the menu is open
  const cbox = document.getElementById("menu-trigger");

  cbox.addEventListener("change", function () {
    const area = document.querySelector(".wrapper");
    this.checked
      ? area.classList.add("blurry")
      : area.classList.remove("blurry");
  });

  // Enlarge post images in an accessible lightbox.
  const postImages = document.querySelectorAll(
    '.wrapper.post [itemprop="articleBody"] img'
  );

  if (postImages.length) {
    let lightbox;
    let previouslyFocused;

    const closeLightbox = () => {
      if (!lightbox) return;

      const closingLightbox = lightbox;
      lightbox = null;
      closingLightbox.classList.remove("is-open");
      body.classList.remove("lightbox-open");
      window.setTimeout(() => closingLightbox.remove(), 180);
      previouslyFocused?.focus();
    };

    const openLightbox = (sourceImage) => {
      previouslyFocused = sourceImage;

      lightbox = document.createElement("div");
      lightbox.className = "image-lightbox";
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-modal", "true");
      lightbox.setAttribute(
        "aria-label",
        sourceImage.alt ? `${sourceImage.alt} 이미지 확대` : "이미지 확대"
      );

      const enlargedImage = document.createElement("img");
      enlargedImage.className = "image-lightbox__image";
      enlargedImage.src = sourceImage.currentSrc || sourceImage.src;
      enlargedImage.alt = sourceImage.alt;

      const closeButton = document.createElement("button");
      closeButton.className = "image-lightbox__close";
      closeButton.type = "button";
      closeButton.setAttribute("aria-label", "확대 이미지 닫기");
      closeButton.textContent = "\u00d7";
      closeButton.addEventListener("click", closeLightbox);

      lightbox.append(enlargedImage, closeButton);
      lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
      });

      body.appendChild(lightbox);
      body.classList.add("lightbox-open");
      window.requestAnimationFrame(() => lightbox?.classList.add("is-open"));
      closeButton.focus();
    };

    postImages.forEach((image) => {
      image.classList.add("zoomable-image");
      image.setAttribute("tabindex", "0");
      image.setAttribute("role", "button");
      image.setAttribute(
        "aria-label",
        image.alt ? `${image.alt} 이미지 확대` : "이미지 확대"
      );

      image.addEventListener("click", (event) => {
        event.preventDefault();
        openLightbox(image);
      });
      image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(image);
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLightbox();
    });
  }
})();
