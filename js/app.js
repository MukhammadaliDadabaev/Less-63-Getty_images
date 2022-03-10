"use strict";
// Api and Selectors
const auth = "563492ad6f91700001000001f59334815e214ab2ad65a4882cbb68c5";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");

// Add value Parameter
let fetchLink;
let searchValue;
let page = 1;
let currentSearch;

// Event Listeners and Arrow function
searchInput.addEventListener("input", updateInput);
more.addEventListener("click", loadMore);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

// Update Input function
function updateInput(e) {
  searchValue = e.target.value;
}

// Fetch API date
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

// Generate photos Function
function generatePictures(data) {
  data.photos.forEach((photo) => {
    console.log(photo);
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href="${photo.src.large}" target="_blank">Download</a>
        </div>
        <img src="${photo.src.large}"/>`;
    gallery.appendChild(galleryImg);
  });
}

// Curated Photos
async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
curatedPhotos();

// Clear Function
function clear() {
  gallery.innerHTML = "";
  searchInput.innerHTML = "";
}

// Search Photos Function
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

// Load More Function
async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
