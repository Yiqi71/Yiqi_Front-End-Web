// import google font
function loadGoogleFont() {
  //   <link rel="preconnect" href="https://fonts.googleapis.com">
  // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  // <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"></link>
  // Create the first <link> for preconnecting to Google Fonts
  const preconnectLink1 = document.createElement('link');
  preconnectLink1.rel = 'preconnect';
  preconnectLink1.href = 'https://fonts.googleapis.com';
  document.head.appendChild(preconnectLink1);

  // Create the second <link> for preconnecting to Google Fonts static resources
  const preconnectLink2 = document.createElement('link');
  preconnectLink2.rel = 'preconnect';
  preconnectLink2.href = 'https://fonts.gstatic.com';
  preconnectLink2.crossOrigin = 'anonymous'; // Add crossorigin attribute
  document.head.appendChild(preconnectLink2);

  // Create the third <link> for loading the Google Font
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=VT323&display=swap';
  document.head.appendChild(fontLink);
}

loadGoogleFont();

function updateVisitCount() {
  console.log("updating");
  const currentUrl = window.location.href;

  // 向 background.js 请求访问次数
  chrome.runtime.sendMessage({
    action: 'getVisitCount',
    url: currentUrl
  }, function (response) {
    const visitCount = response.visitCount;

    // 如果访问次数元素不存在，创建它
    let visitCountElement = document.getElementById('visitCount');
    if (!visitCountElement) {
      visitCountElement = document.createElement('div');
      visitCountElement.id = 'visitCount';
      visitCountElement.style.position = 'fixed';
      visitCountElement.style.top = '50%';
      visitCountElement.style.left = '50%';
      visitCountElement.style.transform = 'translate(-50%, -50%)';
      visitCountElement.style.backgroundColor = 'black';
      visitCountElement.style.color = '#ED635D';
      visitCountElement.style.padding = '5px';
      visitCountElement.style.fontSize = '14pt';
      visitCountElement.style.fontFamily = "'VT323', monospace";
      visitCountElement.style.zIndex = '9999'; // 确保显示在页面顶部
      document.body.appendChild(visitCountElement);
    }
    visitCountElement.innerText = `Visited ${visitCount} times`;


    // Show the block
    visitCountElement.style.display = 'block';
    visitCountElement.style.opacity = '1';

    // Set a timeout to hide it after 3 seconds (3000ms)
    setTimeout(() => {
      visitCountElement.style.opacity = '1';
      visitCountElement.style.transition = 'opacity 1s ease-out'; // Smooth fade-out
      visitCountElement.style.opacity = '0';

      setTimeout(() => {
        visitCountElement.style.display = 'none'; // Completely hide after fade-out
      }, 1000); // Matches the transition duration
    }, 3000); // Initial display time
  });
}

// 初始化时调用一次
updateVisitCount();

class block {
  constructor(x, y) {
    this.height = Math.random() * 10 + 5;
    this.block = document.createElement("div");
    this.block.style.position = "fixed";
    this.block.style.width = `${this.height}px`;
    this.block.style.height = `${this.height}px`;
    this.block.style.backgroundColor = "#ED635D";
    // block.style.borderRadius = "50%"; // 圆角效果
    this.block.style.top = `${y}px`;
    this.block.style.left = `${x}px`;
    this.block.style.zIndex = "99999"; // 确保在最上层
    this.block.style.transition = "all 1s ease-out"; // 动画过渡
  }

}

console.log("Content Script Loaded");
document.addEventListener("click", (event) => {

  // updateVisitCount();

  let squareCounts = Math.round(Math.random() * 5);
  let squares = [];
  for (let i = 0; i < squareCounts; i++) {
    let horizontal = Math.random() * 50 - 10;
    let vertical = Math.random() * 50 - 10;
    squares[i] = new block(event.clientX + horizontal, event.clientY + vertical);
    document.body.appendChild(squares[i].block);
  }
  console.log("clicked");

  // // 设置动画目标位置（右上角）
  for (let square of squares) {
    setTimeout(() => {
      square.block.style.top = "-60px";
      square.block.style.left = `${window.innerWidth - 110}px`; // 减去方块宽度
      square.block.style.opacity = "0"; // 淡出效果
    }, 10);
    // 移除动画方块
    square.block.addEventListener("transitionend", () => {
      square.block.remove();
    });
  }
});

let lastUpdate = 0;

function updateVisitCountThrottled() {
  const now = Date.now();
  if (now - lastUpdate < 500) return; // 500ms 节流时间
  lastUpdate = now;
  updateVisitCount();
}

window.addEventListener('popstate', updateVisitCountThrottled);
window.addEventListener('hashchange', updateVisitCountThrottled);