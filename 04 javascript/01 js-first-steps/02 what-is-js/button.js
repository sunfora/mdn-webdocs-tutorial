function createParagraph() {
  const para = document.createElement("p");
  para.textContent = "You clicked the button!";
  document.querySelector(".results").appendChild(para);
}

const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", createParagraph);
}
