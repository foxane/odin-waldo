export default function verifyCoordinate(clickX, clickY, image, coordinates) {
  const { naturalWidth, naturalHeight, width, height } = image;

  // Calculate scaling factors
  const scaleX = width / naturalWidth;
  const scaleY = height / naturalHeight;

  // Check each object in coordinates
  for (const { name, x, y, w, h } of coordinates) {
    console.log(x, clickX);
    const scaledX = x * scaleX;
    const scaledY = y * scaleY;
    const scaledW = w * scaleX;
    const scaledH = h * scaleY;

    // Check if click inside rect
    if (
      clickX >= scaledX &&
      clickX <= scaledX + scaledW &&
      clickY >= scaledY &&
      clickY <= scaledY + scaledH
    ) {
      return name;
    }
  }

  return null;
}
