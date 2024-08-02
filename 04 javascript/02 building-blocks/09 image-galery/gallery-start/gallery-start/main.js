const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = [
  "pic1.jpg", 
  "pic2.jpg", 
  "pic3.jpg", 
  "pic4.jpg", 
  "pic5.jpg"
];

/* Declaring the alternative text for each image file */
const descr = [
  "blue eye",
  "rock that resembles the wave",
  "flowers",
  "egypt gods",
  "butterfly"
];

/* Looping through images */
for (let i = 0; i < images.length; i++) {
  const path = `images/${images[i]}`;
  const desc = descr[i];
  const newImage = document.createElement('img');
  newImage.setAttribute('src', path);
  newImage.setAttribute('alt', desc);
  thumbBar.appendChild(newImage);
}


function display(image) {
  displayedImage.setAttribute('src', image.getAttribute('src'));
  displayedImage.setAttribute('alt', image.getAttribute('alt'));
}

thumbBar.addEventListener("click", e => display(e.target));

/* Wiring up the Darken/Lighten button */
function toggleDark() {
  if (btn.classList.contains("dark")) {
    btn.classList.remove("dark");
    btn.classList.add("light");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  } else if (btn.classList.contains("light")) {
    btn.classList.remove("light");
    btn.classList.add("dark");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = '#0000';
  } else {
    throw new Error("neither dark nor light found as classes");
  }
}

btn.addEventListener("click", toggleDark);
