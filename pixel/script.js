document.getElementById('uploadInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = function() {
          const pixelSize = parseInt(document.getElementById('pixelSizeInput').value);
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const pixelatedCanvas = document.createElement('canvas');
          const pixelatedCtx = pixelatedCanvas.getContext('2d');
          const pixelWidth = Math.ceil(img.width / pixelSize);
          const pixelHeight = Math.ceil(img.height / pixelSize);
          pixelatedCanvas.width = pixelWidth;
          pixelatedCanvas.height = pixelHeight;
          pixelatedCtx.imageSmoothingEnabled = false;
          pixelatedCtx.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, pixelWidth, pixelHeight);

          const pixelatedImage = new Image();
          pixelatedImage.src = pixelatedCanvas.toDataURL();
          pixelatedImage.id = 'pixelatedImage';

          document.getElementById('imageContainer').innerHTML = '';
          document.getElementById('imageContainer').appendChild(pixelatedImage);
      };
  };

  reader.readAsDataURL(file);
});
