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
                    document.getElementById('description').textContent = 'Description: ' + imageData.description;
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
                    div.innerHTML = `
                        <img src="${image.thumbnail}" alt="${image.name}" class="gallery-thumbnail">
                        <h2>${image.name}</h2>
                        <p>Model: ${image.model}</p>
                        <p>Date Created: ${image.dateCreated}</p>
                        <p>${image.description}</p>
                    `;
                    galleryContainer.appendChild(div);
                });
            })
            .catch(error => console.error('Error:', error));
    }
    

    // Check for the gallery container and load gallery if it exists
    if (document.getElementById('gallery-container')) {
        generateGallery();
    }

    // Check for an image ID and load individual image data if it exists
    const imageId = document.body.getAttribute('data-image-id');
    if (imageId) {
        loadImageData(imageId);
    }
});

