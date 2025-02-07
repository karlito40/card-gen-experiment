import Konva from "konva";

export function drawCard(
  { titleText, binomialText, descriptionText, fromImage },
  context
) {
  const stage = new Konva.Stage({
    width: context.width,
    height: context.height,
    container: context.container,
  });

  const cardLayer = createCardLayer(
    {
      x: 0,
      y: 0,
      fromImage,
    },
    context
  );
  stage.add(cardLayer);

  const titleLayer = createTitleLayer(
    {
      x: 45,
      y: 40,
      text: titleText,
    },
    context
  );
  stage.add(titleLayer);

  const articleLayer = createArticleLayer(
    {
      x: context.width - 30,
      y: context.height - 20,
      labelText: binomialText,
      descriptionText,
      anchor: "bottom right",
    },
    context
  );
  stage.add(articleLayer);

  return stage;
}

function createArticleLayer({ x, y, descriptionText, labelText }, context) {
  const layer = new Konva.Layer({
    x,
    y,
  });

  const konvaText = new Konva.Text({
    text: descriptionText,
    fontFamily: "Fredoka One",
    fill: "black",
    fontSize: 15,
    lineHeight: 1.3,
    stroke: "white",
    strokeWidth: 3,
    fillAfterStrokeEnabled: true,
    width: 380,
    wrap: "word",
    align: "right",
  });
  layer.add(konvaText);

  // anchor === right
  layer.setAttrs({
    x: x - konvaText.width(),
  });

  const label = createBinomialLabel({
    text: labelText,
  });
  // anchor === right
  label.setAttrs({
    x: konvaText.width() - label.width(),
  });

  layer.add(label);

  konvaText.setAttrs({
    y: label.height() + 10,
  });

  layer.setAttrs({
    y: y - konvaText.height() - label.height(),
  });

  return layer;
}

function createBinomialLabel({ text }, context) {
  const label = new Konva.Label({
    x: 0,
    y: 0,
  });

  label.add(
    new Konva.Tag({
      fill: "rgba(255, 255, 255, 0.6)",
      cornerRadius: 15,
      shadowColor: "black",
      shadowBlur: 4,
      shadowOffsetX: 0,
      shadowOffsetY: 4,
      shadowOpacity: 0.25,
    })
  );

  label.add(
    new Konva.Text({
      text,
      fontFamily: "Fredoka One",
      fill: "black",
      fontSize: 20,
      padding: 10,
    })
  );

  return label;
}

function createTitleLayer({ x, y, text }) {
  const layer = new Konva.Layer({ x, y });

  const title = new Konva.Text({
    x: 0,
    y: 0,
    text,
    fontSize: 30,
    fontFamily: "Fredoka One",
    fill: "#383030",
    stroke: "white",
    strokeWidth: 5,
    fillAfterStrokeEnabled: true,
  });
  layer.add(title);

  return layer;
}

function createCardLayer({ x, y, fromImage }, context) {
  const layer = new Konva.Layer({ x, y });

  const fox = new Konva.Image({
    image: fromImage,
    x: 0,
    y: 0,
    width: context.width,
    height: context.height,
    cornerRadius: 30,
  });

  layer.add(fox);

  const strokeWidth = 18;
  const frame = new Konva.Rect({
    x: strokeWidth / 2,
    y: strokeWidth / 2,
    width: context.width - strokeWidth,
    height: context.height - strokeWidth,
    stroke: "rgba(0, 0, 0, 0.08)",
    strokeWidth,
    cornerRadius: 23,
  });
  layer.add(frame);

  return layer;
}
