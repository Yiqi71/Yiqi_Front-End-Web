

// async function loadAPI(){
//     let response = await fetch("");
//     let json = await response.json();
// }


// main.js

document.addEventListener("DOMContentLoaded", function () {
    const avatarIconDiv = document.getElementById("avatarIcon");
    
    // 从 localStorage 获取已确认的 avatar URL
    const avatarUrl = localStorage.getItem("confirmedAvatar");

    if (avatarUrl) {
        // 如果有 avatar URL，创建并显示在页面右下角
        avatarIconDiv.innerHTML = `<img src="${avatarUrl}" alt="Avatar Icon" style="width:50px; height:50px; border-radius:50%; position:fixed; bottom:10px; right:10px;">`;
    }
});
