declare var chrome: any;

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {});
