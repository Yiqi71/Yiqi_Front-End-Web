let wheres = ["on the subway", "in MoMA","in a church","at home","in a car","in the classroom","on the beach","in the hospital","next to your lover","in a public restroom","on a roller coaster","in the park","on the subway"];
let whens = ["On Omelet Day","On wedding day","When 21 years old","When winning a 500 million-dollar lottery","When 101 years old","When eating mac and cheese","During a coffee chat","When your newly bought phone is stolen","When getting a new job offer","When 3 years old","On retirement day","Before submitting your senior final project","On your 20th birthday","On the next morning after you got drunk"];
let hows = ["overeating","being crushed by a falling suicide person","electrocution from your portable refrigerator","hanging yourself","suffocation","poison","car accident","wild animal attact","sudden death because of staying up too late","being burnt","being stabbed by your neighbor","some cruel methods(indescribable)","being freezed"];

let whereTexts = document.getElementById("whereInput");
let whenTexts = document.getElementById("whenInput");
let howTexts = document.getElementById("howInput");

let whereCount = document.getElementById("whereCountdown");
let whenCount = document.getElementById("whenCountdown");
let howCount = document.getElementById("howCountdown");

function randomTexts(str, input){
    let n = Math.floor(Math.random()*str.length);
    input.textContent = str[n];
}

whereButton.onclick = function(){
    randomTexts(wheres, whereTexts);
    whereTexts.textContent += `.`;
    lockButton(whereButton, whereCount);
}

whenButton.onclick = function(){
    randomTexts(whens, whenTexts);
    whenTexts.textContent += `, `;
    lockButton(whenButton,whenCount);
}

howButton.onclick = function(){
    randomTexts(hows, howTexts);
    howTexts.textContent = `you died from `+ howTexts.textContent + `, `
    lockButton(howButton, howCount);
}


function lockButton(button, countdownDisplay) {
    let timeLeft = 10;
    button.disabled = true;
    countdownDisplay.textContent = `Please wait ${timeLeft} seconds...`;
    
    let countdownInterval = setInterval(()=>{
        timeLeft -= 1;
        countdownDisplay.textContent = `Please wait ${timeLeft} seconds...`;
        if(timeLeft<=0){
            clearInterval(countdownInterval);
            button.disabled = false;
            countdownDisplay.innerHTML = `<br>`;
        }
    },1000)
}

let likesSection = document.getElementById("likes");
let likeButton = document.getElementById("like");

likeButton.onclick = function(){
    giveLike();
}
function giveLike(){
    likesSection.innerHTML += `<p>${whenTexts.textContent}${howTexts.textContent}${whereTexts.textContent}</p>`
}

