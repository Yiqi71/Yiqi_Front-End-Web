// Query recent history and open the popup page in the same action
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});

chrome.action.onClicked.addListener(() => {
  // Open the popup.html page
  chrome.tabs.create({
    url: chrome.runtime.getURL("popup.html")
  });
});

let urlsList = {};
chrome.history.search({
  text: '',
  startTime: 0,
  maxResults: 0
}, function (data) {
  data.forEach((page) => {
    let url = page.url;
    if (urlsList[url]) {
      urlsList[url] += page.visitCount;
    } else {
      urlsList[url] = page.visitCount;
    }
  });
});

// chrome.storage.local.set({ urlsList: urlsList }, function() {
//   console.log('URLs list saved.');
// });

// query to get current url
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getVisitCount') {
    const currentUrl = request.url;
    let visitCount = urlsList[currentUrl] || 0;
    sendResponse({
      visitCount: visitCount
    });
    // 返回异步响应
    return true; // 表示响应是异步的
  }
});