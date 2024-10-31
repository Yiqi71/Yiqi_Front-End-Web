addButton.onclick = function () {
    addNewPet();
}

function validateInput(input) {
    if (input.value.trim().length === 0) {
        input.classList.add("error");
        return false;
    } else {
        input.classList.remove("error");
        return true;
    }
}

function clearInput(input) {
    input.value = "";
}



function addNewPet() {
    if (!validateInput(nameInput)) {
        return;
    }
    if (!validateInput(ageInput)) {
        return
    }
    if (!validateInput(picInput)) {
        return
    }

    let petSection = document.createElement("section")
 
    petSection.innerHTML += `

        <h2>${nameInput.value}</h2>
        <img src="${picInput.value}" alt = "picture">
        <p>${ageInput.value} years old</p>
         `;
       let removeButton = document.createElement("button");
       removeButton.innerText = "Remove";
       removeButton.onclick = function(){
        petSection.remove();
       }
       petSection.append(removeButton)
       petsGalleryMain.append(petSection);

    clearInput(nameInput);
    clearInput(ageInput);
    clearInput(picInput);

}