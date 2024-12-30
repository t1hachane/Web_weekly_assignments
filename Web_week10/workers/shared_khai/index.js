// Lưu trữ dữ liệu ảnh đã xử lý và kích thước
let processedImageData = null;
let imageWidth = 0;
let imageHeight = 0;

// Hàm xử lý hiệu ứng Sepia
function effect(pixels) {
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];

    pixels[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
    pixels[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
    pixels[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
  }
  return pixels;
}

// Xử lý các kết nối từ các trang
self.onconnect = function (e) {
  const port = e.ports[0];

  port.onmessage = function (e) {
    console.log("Message received from worker"); // Kiểm tra có nhận message không
    if (e.data.type === "process") {
      // Xử lý ảnh mới
      const processedPixels = effect(e.data.pixels);
      processedImageData = processedPixels;
      imageWidth = e.data.width;
      imageHeight = e.data.height;

      // Gửi kết quả về cho trang upload
      port.postMessage({
        type: "processedImage",
        pixels: processedPixels,
        width: imageWidth,
        height: imageHeight,
      });
    } else if (e.data.type === "getProcessedImage" && processedImageData) {
      // Gửi dữ liệu ảnh đã xử lý cho trang viewer
      port.postMessage({
        type: "processedImage",
        pixels: processedImageData,
        width: imageWidth,
        height: imageHeight,
      });
    }
  };
};
