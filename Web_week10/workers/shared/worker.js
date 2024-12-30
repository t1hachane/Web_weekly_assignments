// Lưu trữ dữ liệu ảnh đã xử lý và kích thước
let transformedImageData = null;
let imgWidth = 0;
let imgHeight = 0;

// Hàm xử lý hiệu ứng Sepia
function applySepiaFilter(pixelData) {
  for (let i = 0; i < pixelData.length; i += 4) {
    let red = pixelData[i];
    let green = pixelData[i + 1];
    let blue = pixelData[i + 2];

    pixelData[i] = Math.min(255, red * 0.393 + green * 0.769 + blue * 0.189);
    pixelData[i + 1] = Math.min(255, red * 0.349 + green * 0.686 + blue * 0.168);
    pixelData[i + 2] = Math.min(255, red * 0.272 + green * 0.534 + blue * 0.131);
  }
  return pixelData;
}

// Xử lý các kết nối từ các trang
self.onconnect = function (event) {
  const connectionPort = event.ports[0];

  connectionPort.onmessage = function (messageEvent) {
    console.log("Received message in worker"); // Kiểm tra có nhận message không
    if (messageEvent.data.action === "processImage") {
      // Xử lý ảnh mới
      const modifiedPixels = applySepiaFilter(messageEvent.data.pixelData);
      transformedImageData = modifiedPixels;
      imgWidth = messageEvent.data.width;
      imgHeight = messageEvent.data.height;

      // Gửi kết quả về cho trang upload
      connectionPort.postMessage({
        action: "imageProcessed",
        pixelData: modifiedPixels,
        width: imgWidth,
        height: imgHeight,
      });
    } else if (messageEvent.data.action === "fetchProcessedImage" && transformedImageData) {
      // Gửi dữ liệu ảnh đã xử lý cho trang viewer
      connectionPort.postMessage({
        action: "imageProcessed",
        pixelData: transformedImageData,
        width: imgWidth,
        height: imgHeight,
      });
    }
  };
};