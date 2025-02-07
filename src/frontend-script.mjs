import { CARD_HEIGHT, CARD_WIDTH } from "./constants.mjs";
import { drawCard } from "./draw-card.mjs";

loadResources().then((resources) => {
  drawCard(
    {
      titleText: "Renard Roux",
      binomialText: "Vulpes Vulpes",
      descriptionText: `Le renard roux est un animal considéré comme rusé, et souvent représenté ainsi dans les contes`,
      fromImage: resources.fox,
    },
    {
      container: "container",
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
    }
  );
});

async function loadResources() {
  const fox = await loadImage("images/renard.jpeg");
  return {
    fox,
  };
}

function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener("load", () => {
      resolve(img);
    });
    img.src = url;
  });
}
