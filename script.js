(function () {
  const imageWall = document.getElementById("imageWall");
  const fullscreen = document.getElementById("fullscreen");
  console.log(
    "All assets are personal projects and not affiliated with or endorsed by any company."
  );

  function createElement(asset) {
    const fileExtension = asset.split(".").pop().toLowerCase();
    const isYouTubeUrl =
      asset.includes("youtube.com") || asset.includes("youtu.be");

    const container = document.createElement("div");
    container.className = "image-container";

    if (isYouTubeUrl) {
      // Convert short YouTube URL to embed URL
      let embedUrl = asset;
      if (embedUrl.includes("youtu.be")) {
        const videoId = embedUrl.split("/").pop();
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }

      // Create an iframe for YouTube videos
      const iframe = document.createElement("iframe");
      iframe.src = embedUrl;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.frameBorder = 0;
      iframe.allowFullscreen = true;
      container.appendChild(iframe);
    } else {
      // Handle other asset types
      container.style.backgroundImage = `url(${asset})`;

      if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
        // Create an image element for image files
        const img = document.createElement("img");
        img.src = asset;
        img.alt = asset;
        container.appendChild(img);
      } else if (["mp4", "webm", "ogg"].includes(fileExtension)) {
        // Create a video element for video files
        const video = document.createElement("video");
        video.src = asset;
        video.controls = true;
        container.appendChild(video);
      }
    }

    container.addEventListener("click", () => {
      fullscreen.innerHTML = container.innerHTML;
      fullscreen.classList.add("active");
    });

    return container;
  }

  // Populate the image wall
  if (window.assetList) {
    window.assetList.forEach((asset) => {
      imageWall.appendChild(createElement(asset));
    });
  }

  // Click event to exit full screen mode
  fullscreen.addEventListener("click", () => {
    fullscreen.classList.remove("active");
  });
})();
