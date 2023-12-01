document.addEventListener('DOMContentLoaded', function() {
    // Function to load individual image data
    function loadImageData(imageId) {
        fetch('../data/imagedata.json')
            .then(response => response.json())
            .then(images => {
                const imageData = images.find(image => image.id === imageId);
                if (imageData) {
                    document.getElementById('name').textContent = 'Name: ' + imageData.name;
                    document.getElementById('model').textContent = 'Model: ' + imageData.model;
                    document.getElementById('dateCreated').textContent = 'Date Created: ' + imageData.dateCreated;
                    document.getElementById('description').textContent = imageData.longDescription;
                } else {
                    console.error('Image data not found for ID:', imageId);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Function to generate gallery grid
    function generateGallery() {
        fetch('../data/imagedata.json')
            .then(response => response.json())
            .then(images => {
                const galleryContainer = document.getElementById('gallery-container');

                images.forEach(image => {
                    const div = document.createElement('div');
                    div.className = 'gallery-item';
                    const anchor = document.createElement('a');
                    anchor.href = `/works/${image.id}.html`;

                    anchor.innerHTML = `
                        <img src="${image.thumbnail}" alt="${image.name}" class="gallery-thumbnail">
                        <h2>${image.name}</h2>
                        <p>${image.shortDescription}</p>
                    `;

                    div.appendChild(anchor);
                    galleryContainer.appendChild(div);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    // Check if the gallery container exists and load the gallery
    if (document.getElementById('gallery-container')) {
        generateGallery();
    }

    // Check if an image ID is specified and load individual image data
    const imageId = document.body.getAttribute('data-image-id');
    if (imageId) {
        loadImageData(imageId);
    }
});
