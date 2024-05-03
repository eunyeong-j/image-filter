document.getElementById('imageInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const img = new Image();
    img.src = e.target.result;
    
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const blurAmount =  parseInt(document.getElementById('blurSizeInput').value);
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = `blur(${blurAmount}px)`;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      console.log('ddd')

      const blurImage = new Image();
      blurImage.src = canvas.toDataURL();
      blurImage.id = 'blurImage';
      
      const output = document.getElementById('output');
      output.innerHTML = '';
      output.appendChild(blurImage);
    };
  };

  reader.readAsDataURL(file);
});
