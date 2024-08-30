// create needed constants
/** @type {HTMLDivElement} */
const rememberDiv = document.querySelector(".remember");
/** @type {HTMLDivElement} */
const forgetDiv = document.querySelector(".forget");
/** @type {HTMLFormElement} */
const form = document.querySelector("form");
/** @type {HTMLInputElement} */
const nameInput = document.querySelector("#entername");
/** @type {HTMLButtonElement} */
const submitBtn = document.querySelector("#submitname");
/** @type {HTMLButtonElement} */
const forgetBtn = document.querySelector("#forgetname");

/** @type {HTMLElement} */
const h1 = document.querySelector("h1");
/** @type {HTMLParagraphElement} */
const personalGreeting = document.querySelector(".personal-greeting");

// Stop the form from submitting when a button is pressed
form.addEventListener("submit", (e) => e.preventDefault());
// run function when the 'Say hello' button is clicked
submitBtn.addEventListener("click", () => {
  // store the entered name in web storage
  localStorage.setItem("name", nameInput.value);
  // run nameDisplayCheck() to sort out displaying the personalized greetings and updating the form display
  nameDisplayCheck();
});

// run function when the 'Forget' button is clicked
forgetBtn.addEventListener("click", () => {
  // Remove the stored name from web storage
  localStorage.removeItem("name");
  // run nameDisplayCheck() to sort out displaying the generic greeting again and updating the form display
  nameDisplayCheck();
});


/**
 * Toggle between forget/remember and load the name.
 */
function nameDisplayCheck() {
  // check whether the 'name' data item is stored in web Storage
  localStorage.key
  if (localStorage.getItem("name")) {
    // If it is, display personalized greeting
    const name = localStorage.getItem("name");
    h1.textContent = `Welcome, ${name}`;
    personalGreeting.textContent = `Welcome to our website, ${name}! We hope you have fun while you are here.`;
    // hide the 'remember' part of the form and show the 'forget' part
    forgetDiv.style.display = "block";
    rememberDiv.style.display = "none";
  } else {
    // if not, display generic greeting
    h1.textContent = "Welcome to our website ";
    personalGreeting.textContent =
      "Welcome to our website. We hope you have fun while you are here.";
    // hide the 'forget' part of the form and show the 'remember' part
    forgetDiv.style.display = "none";
    rememberDiv.style.display = "block";
  }
}

nameDisplayCheck();
