
  window.addEventListener("scroll", function() {
    const octSection = document.getElementById('oct-section');
    const novSection = document.getElementById('nov-section');
    const decSection = document.getElementById('dec-section');
    const monthHeader = document.getElementById('month-header');

    const octTop = octSection.getBoundingClientRect();
    const novTop = novSection.getBoundingClientRect();
    const decTop = decSection.getBoundingClientRect();
    if (novTop.top <= 20 && decTop.top>20) {
      monthHeader.innerText = 'Nov';
    } else if(octTop.top<=20 && novTop.top>20) {
      monthHeader.innerText = 'Oct';
    } else if(novTop.top<=20){
      monthHeader.innerText = 'Dec';
    }
  });

  document.getElementsByClassName("header").addEventListener("click", function() {
    const calendar = document.querySelector(".month-calendar");
    calendar.classList.toggle("hidden");
});