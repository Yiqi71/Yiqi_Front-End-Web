window.addEventListener("scroll", function () {
  const sepSection = document.getElementById('sep-section');
  const octSection = document.getElementById('oct-section');
  const novSection = document.getElementById('nov-section');
  const decSection = document.getElementById('dec-section');
  const monthHeader = document.getElementById('month-header');

  const sepTop = sepSection.getBoundingClientRect();
  const octTop = octSection.getBoundingClientRect();
  const novTop = novSection.getBoundingClientRect();
  const decTop = decSection.getBoundingClientRect();

  const topDis = 4 * parseFloat(getComputedStyle(document.documentElement).fontSize);

  if (octTop.top > topDis) {
    monthHeader.innerText = 'Sep';
  } else if (octTop.top <= topDis && novTop.top > topDis) {
    monthHeader.innerText = 'Oct';
  } else if (novTop.top <= topDis && decTop.top > topDis) {
    monthHeader.innerText = 'Nov';
  } else if (decTop.top <= topDis) {
    monthHeader.innerText = 'Dec';
  }
});


// const header = document.querySelector("header");
// if (header) {
//   console.log("Header found"); // 检查 header 是否成功找到
//   header.addEventListener("click", function () {
//     console.log("Header clicked!"); // 确认点击事件是否触发
//     const calendar = document.querySelector(".month-calendar");
//     if (calendar) {
//       if (calendar.classList.contains('hidden')) {
//         calendar.classList.remove('hidden');
//         console.log("Calendar shown");
//       } else {
//         calendar.classList.add('hidden');
//         console.log("Calendar hidden");
//       }
//     } else {
//       console.log("Cannot find .month-calendar");
//     }
//   });
// } else {
//   console.log("Cannot find .header");
// }

document.addEventListener("DOMContentLoaded", function() {
  const backToTodayButton = document.getElementById("backtotoday");

  if (backToTodayButton) {
      backToTodayButton.addEventListener("click", function() {
          const todaySection = document.getElementById("today");

          if (todaySection) {
              // 计算目标滚动位置，5.5rem 转换为像素
              const offsetTop = 4 * parseFloat(getComputedStyle(document.documentElement).fontSize);
              const targetPosition = todaySection.offsetTop - offsetTop;

              // 平滑滚动到目标位置
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
          } else {
              console.error("Cannot find the section with id 'today'");
          }
      });
  } else {
      console.error("Cannot find the image with id 'backtotoday'");
  }
});

window.onload = function() {
  const todayElement = document.getElementById('today');
  if (todayElement) {
    // 计算 4rem 的偏移量（rem 是相对于根元素的 font-size）
    const offsetTop = 4 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    
    // 计算滚动目标位置
    const targetPosition = todayElement.offsetTop - offsetTop;

    // 平滑滚动到目标位置
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};