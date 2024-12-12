// function to organize domainList;
function sortDomainList(domainList) {
  const domainEntries = Object.entries(domainList);
  domainEntries.sort((a, b) => b[1].visitCount - a[1].visitCount);
  const sortedDomainList = Object.fromEntries(domainEntries);

  return sortedDomainList;
}

// domain class
class domainClass {
  constructor(domainName) {
    this.name = domainName;
    this.visitCount = 0;
    this.urlList = [];
    this.visitsPerDay = {};
    this.lastVisit = 0;
  }
  addURL(item) {
    this.urlList.push(item);
    const visitDate = new Date(item.lastVisit).toLocaleDateString();
    if (this.visitsPerDay[visitDate]) {
      this.visitsPerDay[visitDate] += item.visitCount;
    } else {
      this.visitsPerDay[visitDate] = item.visitCount;
    }
  }
  addVisitCount(n) {
    this.visitCount += n;
  }
}

// url class
class urlClass {
  constructor(url) {
    this.name = url;
    this.visitCount = 0;
    this.lastVisit = 0;
    this.title = '';
  }
  addVisitCount(n) {
    this.visitCount += n;
  }
}

// button to transfer pages
const transitButton = document.getElementById('goToIknowUPage');
if (transitButton) {
  transitButton.addEventListener('click', () => {
    window.location.href = './IknowU.html';
  });
} else {
  console.log('Button not found!');
}

// function for completing and sorting daily charts
function sortDailyCharts(startD, endD, uncompleteDateTotals) {
  const completeDates = {};
  let currentDate = new Date(startD);
  while (currentDate <= endD) {
    const formattedDate = currentDate.toLocaleDateString('en-US');
    completeDates[formattedDate] = 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  for (let date in uncompleteDateTotals) {
    if (completeDates[date] !== undefined) {
      completeDates[date] = uncompleteDateTotals[date];
    }
  }
  let completedSortedDates = Object.entries(completeDates).sort((a, b) => {
    const [monthA, dayA, yearA] = b[0].split('/').map(Number);
    const [monthB, dayB, yearB] = a[0].split('/').map(Number);
    if (yearA !== yearB) return yearA - yearB;
    if (monthA !== monthB) return monthA - monthB;
    return dayA - dayB;
  });

  return completedSortedDates;
}

// function for drawing bars
function drawBars(futureDiv, barDiv, completedSortedD, width) {
  let dateArray = [];
  if (barDiv) {
    completedSortedD.forEach(([date, visits]) => {
      dateArray.push(date);
      const countCol = document.createElement("div");
      countCol.classList.add("countCol");
      countCol.style.height = `${visits/4}px`;
      countCol.style.width = `${width/97}px`;
      barDiv.appendChild(countCol);
    })
  }

  //estimate
  let estimateVisits = [];
  for (let i = completedSortedD.length - 1; i >= 0; i--) {
    if (completedSortedD.length - 1 - i < 7) {
      estimateVisits[i] = completedSortedD[i][1];
    } else if (completedSortedD.length - 1 - i < 14) {
      estimateVisits[i] = (completedSortedD[i + 7][1] + completedSortedD[i][1]) / 2;
    } else {
      estimateVisits[i] = (completedSortedD[i + 14][1] + completedSortedD[i + 7][1] + completedSortedD[i][1]) / 3;
    }
  }
  if (futureDiv) {
    for (let i = 0; i < 7; i++) {
      const column = document.createElement("div");
      column.classList.add("estimateCol");
      column.style.height = `${estimateVisits[i]/4}px`;
      column.style.width = `${width/97}px`;
      futureDiv.appendChild(column);
    }
  }
}

// find max and min dates
function findMaxAndMin(minDefiner, array) {
  const maxAndMin = document.createElement("p");
  let max = -Infinity;
  let maxDates = [];
  let min = Infinity;
  let minDates = [];
  for (let eachDay in array) {
    let visit = array[eachDay][1];
    let date = array[eachDay][0];
    if (visit > max) {
      max = visit;
      maxDates = [date];
    } else if (visit === max) {
      maxDates.push(date);
    }
    if (visit < min) {
      min = visit;
      minDates = [date];
    } else if (visit === min) {
      minDates.push(date);
    }
  }
  if (minDefiner == "minYes") {
    maxAndMin.textContent = `* MAX: ${JSON.stringify(maxDates)}-[${max}]  MIN: ${JSON.stringify(minDates)}-[${min}] * `;
  } else {
    maxAndMin.textContent = `* MAX: ${JSON.stringify(maxDates)}-[${max}] * `;
  }

  return maxAndMin;
}




// things to export to other pages;
export let domainWList = [];
export const domainWListReady = new Promise((resolve) => {
  document.addEventListener('DOMContentLoaded', () => {
    // get chrome history;
    chrome.history.search({
      text: '',
      maxResults: 0,
      startTime: 0
    }, (results) => {

      // organize URLs into URLsList;
      const URLsList = {};
      results.forEach((item) => {
        const urlObject = new URL(item.url);
        const domain = urlObject.hostname;
        if (domain != "eeejneakngekffglkhblloolophhdbma" && domain != "127.0.0.1") {
          if (URLsList[item.url]) {
            URLsList[item.url].addVisitCount(item.visitCount);
          } else {
            URLsList[item.url] = new urlClass(item.url);
            URLsList[item.url].lastVisit = new Date(item.lastVisitTime).toLocaleString();
            URLsList[item.url].title = item.title;
            URLsList[item.url].addVisitCount(item.visitCount);
          }
        }
      });
      // sort URLsList in visitCounts order
      let sortedUrlList = sortDomainList(URLsList);
      for (let eachU in sortedUrlList) {
        let url = sortedUrlList[eachU];
        const eachUrl = document.createElement('p');
        eachUrl.innerHTML = `url: ${url.name}; count: ${url.visitCount}`;
        // console.log(`url: ${url.name}; count: ${url.visitCount}`);
      }

      const domainList = {};
      for (let item in sortedUrlList) {
        const urlObject = sortedUrlList[item];
        const domain = new URL(urlObject.name).hostname;
        if (domainList[domain]) {
          domainList[domain].addURL(urlObject);
          domainList[domain].addVisitCount(urlObject.visitCount);
        } else {
          domainList[domain] = new domainClass(domain);
          domainList[domain].lastVisit = new Date(urlObject.lastVisit).toLocaleString();
          domainList[domain].addURL(urlObject);
          domainList[domain].addVisitCount(urlObject.visitCount);
        }
      };
      // sort domainList in visitCounts order
      let sortedDomainList = sortDomainList(domainList);
      console.log(sortedDomainList);


      // // organize URLs into domainList;
      // const domainList = {};
      // results.forEach((item) => {
      //   const urlObject = new URL(item.url);
      //   const domain = urlObject.hostname;
      //   if (domain != "eeejneakngekffglkhblloolophhdbma" && domain != "127.0.0.1") {
      //     if (domainList[domain]) {
      //       domainList[domain].addURL(item);
      //       domainList[domain].addVisitCount(item.visitCount);
      //     } else {
      //       domainList[domain] = new domainClass(domain);
      //       domainList[domain].lastVisit = new Date(item.lastVisitTime).toLocaleString();
      //       domainList[domain].addURL(item);
      //       domainList[domain].addVisitCount(item.visitCount);
      //     }
      //   }
      // });
      // // sort domainList in visitCounts order
      // let sortedDomainList = sortDomainList(domainList);
      // console.log(sortedDomainList);


      // aggregate visit counts by date
      const dailyTotals = {};
      for (let domain in sortedDomainList) {
        const domainInstance = sortedDomainList[domain];
        for (let date in domainInstance.visitsPerDay) {
          if (dailyTotals[date]) {
            dailyTotals[date] += domainInstance.visitsPerDay[date];
          } else {
            dailyTotals[date] = domainInstance.visitsPerDay[date];
          }
        }
      }

      // complete and sort dailyTotals
      const endDate = new Date();
      const startDate = new Date(endDate); // Create a copy of endDate
      startDate.setDate(startDate.getDate() - 89);

      let completeSortedDates = sortDailyCharts(startDate, endDate, dailyTotals);
      console.log(completeSortedDates);

      // first title
      const titleDiv = document.getElementById("firstTitle");
      const maxAndMin = findMaxAndMin("", completeSortedDates)
      titleDiv.appendChild(maxAndMin);

      // // observed daily summary list
      // const dailySummaryList = document.getElementById('daily-summary-list');
      // if (dailySummaryList) {
      //   completeSortedDates.forEach(([date, visits]) => {
      //     const listDate = document.createElement('li');
      //     listDate.textContent = `${date}: ${visits} visits`;
      //     dailySummaryList.appendChild(listDate);
      //     countsArray.push(visits);
      //   });
      // } else {
      //   console.log('daily-summary-list not found!');
      // }

      // daily counts bars
      const dateBar = document.getElementById("dates");
      if (dateBar) {
        dateBar.innerHTML = `<h3>${new Date(endDate).toLocaleDateString('en-US')}</h3><h3>${new Date(startDate).toLocaleDateString('en-US')}</h3>`;
      }
      const estimateColumns = document.getElementById("estimate-date-columns");
      const columnsDiv = document.getElementById("date-columns");
      const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const bodyWidth = window.innerWidth - 5 * fontSize;
      drawBars(estimateColumns, columnsDiv, completeSortedDates, bodyWidth);

      // grid & domain list
      const gridDiv = document.getElementById("grid-container");
      let domainTop12 = [];

      for (let domain in sortedDomainList) {
        // //urls list
        // const urlList = document.getElementById("urls-list");
        // domainInstance.urlList.forEach((urlItem) => {
        //   const urllistDate = document.createElement('li'); // Create an <li> for each URL
        //   urllistDate.textContent = `${urlItem.url} [${urlItem.visitCount}]`; // Display the URL and visit count
        //   urlList.appendChild(urllistDate); // Append the <li> to the <ul>
        // });
        if (domainTop12.length < 12) {
          domainTop12.push(domain);
        }
      }
      domainTop12.forEach((domain) => {
          const domainInstance = sortedDomainList[domain]; // 获取 domainClass 实例
          const eachDomain = document.createElement("div");

          let sortedVisits = sortDailyCharts(startDate, endDate, domainInstance.visitsPerDay);
          const maxAndMin = findMaxAndMin("", sortedVisits);
          console.log(maxAndMin.textContent);
          const title = document.createElement("div");
          title.innerHTML = `<h3>${domain} [${domainInstance.visitCount}]</h3>`;
          title.appendChild(maxAndMin);
          eachDomain.appendChild(title);
          const listDate = document.createElement('details'); // 创建列表项

          const urlListContainer = document.createElement('ul');

          // url list for each domain
          const urlList = document.createElement("details");
          domainInstance.urlList.forEach((urlItem) => {
            const urllistDate = document.createElement('li'); // Create an <li> for each URL
            urllistDate.textContent = `${urlItem.title} [${urlItem.visitCount}]`; // Display the URL and visit count
            urlList.appendChild(urllistDate); // Append the <li> to the <ul>
          });


          // daily visit sublist for domains
          const historyList = document.getElementById('history-list');
          const dailyVisitsContainer = document.createElement('ul');

          let sortedVisitsPerDay = sortDailyCharts(startDate, endDate, domainInstance.visitsPerDay);
          const graph = document.createElement("div");
          const futureBars = document.createElement("div");
          const recordBars = document.createElement("div");
          futureBars.style.display = "flex";
          graph.style.margin = "0.2em 0 0 0";
          recordBars.style.display = "flex";
          graph.style.display = "flex";
          eachDomain.style.display = "flex";
          eachDomain.style.flexDirection = "column";
          eachDomain.style.margin = "0.5em 0";

          graph.appendChild(futureBars);
          graph.appendChild(recordBars);
          eachDomain.appendChild(graph);
          eachDomain.appendChild(urlList);
          // eachDomain.appendChild(listDate);
          eachDomain.style.border = `2px solid #8b2f2a`;
          eachDomain.style.padding = `0.5em`;
          drawBars(futureBars, recordBars, sortedVisitsPerDay, (bodyWidth - 5 * fontSize) / 3);

          for (let date in domainInstance.visitsPerDay) {
            const dailyVisitItem = document.createElement('li');
            dailyVisitItem.textContent = `${date}: ${domainInstance.visitsPerDay[date]} visits`; // Show date and visit count
            dailyVisitsContainer.appendChild(dailyVisitItem);

            listDate.innerHTML = `<summary>Daily Breakdown</summary>`; // 设置显示内容
            listDate.appendChild(urlListContainer);
            listDate.appendChild(dailyVisitsContainer);
          }
          if (gridDiv) {
            gridDiv.appendChild(eachDomain);
          } else {
            console.log("gridDiv not found!");
          }


          for (let domain in sortedDomainList) {
            let domainItem = sortedDomainList[domain];
            domainWList.push([domainItem.name, domainItem.visitCount]);
          }

          resolve(domainWList);
        }

      )

    });
  });
});