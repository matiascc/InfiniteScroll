const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const amountOfImages = 5;
const apiKey = '3pg2HE0xtzrBekSXm22GRVoAgQn4Qg2vJCwnzE70SxE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${amountOfImages}`;

let photosArray = [];
let ready = false;
let numImagesLoaded = 0;

function imageLoaded() {
    numImagesLoaded++;
    if (numImagesLoaded === amountOfImages) {
        ready = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    numImagesLoaded = 0;
    loader.hidden = true;

    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_desription,
            title: photo.alt_desription
        });

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error)
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();