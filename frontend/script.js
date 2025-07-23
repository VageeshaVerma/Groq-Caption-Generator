document.addEventListener("DOMContentLoaded", () => {
  // 🌙 Dark mode toggle
  const themeButton = document.getElementById("theme-toggle");
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      themeButton.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
  }

  // 📸 Image preview
  const imageInput = document.getElementById("image-input");
  const imagePreview = document.getElementById("image-preview");

  if (imageInput && imagePreview) {
    imageInput.addEventListener("change", () => {
      const file = imageInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
      } else {
        imagePreview.src = "";
        imagePreview.style.display = "none";
      }
    });
  }
});

// 🧠 Caption Generator Function
async function generateCaption() {
  const prompt = document.getElementById("prompt").value.trim();
  const outputBox = document.getElementById("output");

  if (!prompt) {
    outputBox.textContent = "⚠️ Please describe the image.";
    return;
  }

  outputBox.textContent = "⏳ Generating caption...";

  try {
    const response = await fetch("http://127.0.0.1:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    outputBox.textContent = data.caption || "❌ No caption returned.";
  } catch (error) {
    console.error("❌ Error fetching caption:", error);
    outputBox.textContent = "❌ Failed to fetch caption. Is the backend running?";
  }
}
