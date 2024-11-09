let avatars = ["https://img.freepik.com/premium-vector/cartoon-avatar-2d-vector-design_911078-2173.jpg", "https://img.freepik.com/premium-vector/cartoon-avatar-2d-vector-design_911078-2165.jpg","https://img.freepik.com/premium-vector/cartoon-avatar-2d-vector-design_911078-2169.jpg"];
displayAvatarDiv.innerHTML = `<img src = "${avatars[0]}" alt = "avatar img" width="300" height = "400">`;
let nowAvatarN = 0;

let changeButton = document.getElementById("changeAvatar");
changeButton.onclick = function () {
    changeAvatar();
}

document.getElementById("confirmAvatar").onclick = function(){
    toMainPage();
}
function changeAvatar(){
    let n = Math.floor(Math.random() * avatars.length);
    while (n == nowAvatarN) {
        n = Math.floor(Math.random() * avatars.length);
    }
    displayAvatarDiv.innerHTML = `<img src = "${avatars[n]}" alt = "avatar img" width="300" height = "400">`;
    nowAvatarN = n;
    console.log("change",nowAvatarN)
}

function toMainPage(){
    chrome.storage.sync.set({ selectedAvatar: avatars[nowAvatarN] }, function () {
        console.log("Avatar saved:", avatars[nowAvatarN]);
        window.location.href = "mainPage.html";  // Redirect to main page
    });
}