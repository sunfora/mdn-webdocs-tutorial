const LOCAL_STORAGE_KEY = 'NY-API-KEY';

const background = document.createElement("div");
const box        = document.createElement("div");
const message    = document.createElement("p");
const input      = document.createElement("input"); 

message.textContent = "Insert api key here, then press Enter";

background.appendChild(box);
box.appendChild(message);
box.appendChild(input);

background.style.width      = '100vw';
background.style.position   = 'absolute';
background.style.top        = '0';
background.style.left       = '0';
background.style.height     = '100vh';
background.style.background = 'rgba(0, 0, 0, 0.5)';

box.style.marginInline = 'auto';
box.style.background   = 'white';
box.style.width        = '200px';
box.style.padding      = '100px';
box.style.borderRadius = '10px';
box.style.position     = 'relative';
box.style.top          = 'calc(50vh - 150px)';

background.addEventListener('keydown', (e) => {
  console.log(e);
  if (e.key === 'Enter') {
    const key = input.value;
    localStorage.setItem(LOCAL_STORAGE_KEY, key);
    background.remove();

    const apiKeyEvent = new CustomEvent('apiKey', { detail: { key: key} });
    document.dispatchEvent(apiKeyEvent);
  }
});

document.addEventListener('DOMContentLoaded',  () => {
  const key = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (key === null) {
    document.body.appendChild(background);
  } else {
    const apiKeyEvent = new CustomEvent('apiKey', { detail: { key: key} });
    document.dispatchEvent(apiKeyEvent);
  }
});
