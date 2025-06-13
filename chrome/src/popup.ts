document.getElementById("btn-action")?.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id!, { action: "DO_SOMETHING" });
  });
});
