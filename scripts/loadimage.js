document.addEventListener('DOMContentLoaded', function() {
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

    // Read the image ID from the data-image-id attribute in the HTML document
    const imageId = document.body.getAttribute('data-image-id');
    if (imageId) {
        loadImageData(imageId);
    } else {
        console.error('Image ID not specified in the HTML document.');
    }
});
