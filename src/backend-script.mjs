import fs from "node:fs";
import { loadImage, registerFont } from "canvas";
import { drawCard } from "./draw-card.mjs";
import { CARD_WIDTH, CARD_HEIGHT } from "./constants.mjs";

// warn: in sync process
registerFont("static/fonts/FredokaOne-Regular.ttf", {
  family: "Fredoka One",
});

async function loadResources() {
  const fox = await loadImage("static/images/renard.jpeg");
  return {
    fox,
  };
}

loadResources().then(async (resources) => {
  const stage = drawCard(
    {
      titleText: "Renard Roux",
      binomialText: "Vulpes Vulpes",
      descriptionText: `Le renard roux est un animal considéré comme rusé, et souvent représenté ainsi dans les contes`,
      fromImage: resources.fox,
    },
    {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
    }
  );

  const canvas = await stage.toCanvas({ pixelRatio: 3 });
  exportCanvas(canvas, {
    path: "./exports/generated-card.png",
    mimeType: "image/png",
  });
});

async function exportCanvas(canvas, { path, mimeType }) {
  const buffer = canvas.toBuffer(mimeType);
  fs.writeFile(path, buffer, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("image generated !");
    }
  });
}
