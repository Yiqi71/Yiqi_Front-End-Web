
// Function to count paragraph tags
function countParagraphs() {
    const paragraphs = document.getElementsByTagName('p');
    document.getElementById('output1').innerText = `There are ${paragraphs.length} sentences on this page.`;
}

// Function to count elements inside the first ID container (container1)
function countInContainer1() {
    const container1 = document.getElementById('container1');
    const elementsInContainer1 = container1.getElementsByTagName('*').length;
    document.getElementById('output2').innerText = `There are ${elementsInContainer1} sentences inside container1.`;
}

// Function to count elements inside the second ID container (container2)
function countInContainer2() {
    const container2 = document.getElementById('container2');
    const elementsInContainer2 = container2.getElementsByTagName('*').length;
    document.getElementById('output3').innerText = `There are ${elementsInContainer2} sentences inside container2.`;
}

totalButton.onclick = function(){
    countParagraphs();
}

container1Button.onclick = function(){
    countInContainer1();
}

container2Button.onclick = function(){
    countInContainer2();
}