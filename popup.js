document.getElementById("toggle").addEventListener("click", (e) => {
    e.target.style.backgroundColor = "green";
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "TOGGLE_HOVER" });
  });
});
