// Click chọn ảnh và preview ảnh
const uploadArea = document.querySelector("#upload-area");
const fileInput = document.querySelector("#avatar");

uploadArea.addEventListener("click", () => {
  fileInput.click();
});
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader(); // Đọc file trên máy rồi Convert file

  reader.onload = (e) => {
    const img = document.getElementById("preview-img");
    const placeholder = document.getElementById("upload-placeholder");

    img.src = e.target.result;
    img.style.display = "block";
    placeholder.style.display = "none";
  };

  reader.readAsDataURL(file);
});
// End Click chọn ảnh và preview ảnh

// End Click chọn audio và preview audio
const audioUploadArea = document.getElementById("audio-upload-area");
const audioInput = document.getElementById("audio");

const audioPlaceholder = document.getElementById("audio-placeholder");
const audioPreview = document.getElementById("audio-preview");

const audioName = document.getElementById("audio-name");
const audioSize = document.getElementById("audio-size");
const audioPlayer = document.getElementById("audio-player");

// Click để mở file
if (audioUploadArea && audioInput) {
  audioUploadArea.addEventListener("click", () => {
    audioInput.click();
  });
}

// Khi chọn file
audioInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Hiển thị tên file
  audioName.textContent = file.name;

  // Hiển thị dung lượng (MB)
  const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
  audioSize.textContent = sizeMB + " MB";

  // Tạo URL để preview audio
  const audioURL = URL.createObjectURL(file);
  audioPlayer.src = audioURL;

  // Hiển thị preview
  audioPreview.style.display = "block";
  audioPlaceholder.style.display = "none";
});