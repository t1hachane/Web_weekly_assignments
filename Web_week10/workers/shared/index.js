const imageWorker = new SharedWorker("worker.js");

// Xử lý khi người dùng chọn tệp ảnh
document.getElementById("FileUpload1").onchange = function () {
  const imagePreview = document.querySelector("img.preview");
  const outputCanvas = document.querySelector("canvas.target");

  // Tệp ảnh được chọn
  const selectedFile = this.files[0];

  // Tạo đối tượng FileReader để đọc tệp
  const fileReader = new FileReader();

  // Đọc tệp xong
  fileReader.onload = function () {
    // Hiển thị ảnh gốc
    imagePreview.src = fileReader.result;
    imagePreview.classList.remove("hidden");

    setTimeout(() => {
      // Cập nhật kích thước canvas theo ảnh
      outputCanvas.width = imagePreview.clientWidth;
      outputCanvas.height = imagePreview.clientHeight;
      const context = outputCanvas.getContext("2d");

      // Vẽ ảnh vào canvas
      context.drawImage(imagePreview, 0, 0, outputCanvas.width, outputCanvas.height);

      // Khi worker trả kết quả, xử lý ảnh
      imageWorker.port.onmessage = function (e) {
        const processedPixels = e.data.pixels;
        context.putImageData(
          new ImageData(processedPixels, outputCanvas.width, outputCanvas.height),
          0,
          0
        );
        // Hiển thị canvas với ảnh đã xử lý
        outputCanvas.classList.remove("hidden");
      };

      // Lấy dữ liệu ảnh từ canvas
      const canvasData = context.getImageData(0, 0, outputCanvas.width, outputCanvas.height);

      // Gửi dữ liệu ảnh cho Shared Worker để xử lý
      imageWorker.port.postMessage({
        action: "processImage",
        pixelData: canvasData.data,
        width: outputCanvas.width,
        height: outputCanvas.height,
      });
    }, 100);
  };

  // Bắt đầu đọc tệp
  if (selectedFile) fileReader.readAsDataURL(selectedFile);
};