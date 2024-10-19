let myName = "Yiqi"
inputNum.value = 1;
pageHeading.innerHTML = "Hello, " + myName + ".";

function squares(val) {
    val = Number(val);
    displayText.innerHTML = "";
    for (let i = 1; i < val+1; i++) {
        displayText.innerHTML += '<p>The sqaure of ' + i + ' is: ' + (i * i) + '</p>';
    }
}
inputNum.onchange = function(){
    squares(inputNum.value);
}
clearButton.onclick = function(){
    displayText.innerHTML = "";
    inputNum.value = 1;
}
bgColorInput.oninput = function(){
    document.body.style.backgroundColor = bgColorInput.value;
}