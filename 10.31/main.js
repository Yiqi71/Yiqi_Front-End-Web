let suits = ["♠", "♥", "♣", "♦"];

let chars = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

let cards = [];

let colorMap = {
    "♠": "black", 
    "♥": "red", 
    "♣": "green", 
    "♦": "orange",
}

let card = {
    suit: "♠",
    char: "A",
    color: "black",
}

for (let char of chars) {
    for (let suit of suits) {
        let card = {
            suit: suit,
            char: char,
            color: colorMap[suit],
        }
        cards.push(card);
    }
}

let cardDivs = [];

cards.forEach((card) => {
    let elt = document.createElement("div");
    elt.innerHTML = card.char + card.suit;
    elt.classList.add("card");
    elt.style.color = card.color;
    elt.onclick = function(){
        elt.classList.toggle("flipped");
    }
    mainDeck.append(elt);
    cardDivs.push(elt);
})

flipButton.onclick = function(){
    for(let cardDiv of cardDivs ){
        cardDiv.classList.toggle("flipped");
    }
}

showButton.onclick = function(){
    for(let cardDiv of cardDivs ){
        cardDiv.classList.remove("flipped");
    }
}

hideButton.onclick = function(){
    for(let cardDiv of cardDivs ){
        cardDiv.classList.add("flipped");
    }
}

shuffleButton.onclick = function(){
    cardDivs.sort((cardDiv) =>{
        return Math.random()>0.5?-1:1;
    })
    for(let cardDiv of cardDivs){
        mainDeck.append(cardDiv);
    }
}
