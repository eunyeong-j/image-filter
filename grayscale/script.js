document.getElementById('uploadInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = function() {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;

          // Apply grayscale filter
          for (let i = 0; i < pixels.length; i += 4) {
              const grayscale = pixels[i] * 0.3 + pixels[i + 1] * 0.59 + pixels[i + 2] * 0.11;
              pixels[i] = pixels[i + 1] = pixels[i + 2] = grayscale;
          }

          ctx.putImageData(imageData, 0, 0);

          const grayscaleImage = new Image();
          grayscaleImage.src = canvas.toDataURL();
          grayscaleImage.id = 'grayscaleImage';

          document.getElementById('imageContainer').innerHTML = '';
          document.getElementById('imageContainer').appendChild(grayscaleImage);
      };
  };

  reader.readAsDataURL(file);
});
