// 从 chrome.storage.sync 获取用户选择的图标
chrome.storage.sync.get("selectedAvatar", function (data) {
    if (data.selectedAvatar) {
        // 创建 avatar 图标的元素
        let avatarIcon = document.createElement("img");
        avatarIcon.src = data.selectedAvatar;
        avatarIcon.alt = "User Avatar";
        avatarIcon.style.position = "fixed";
        avatarIcon.style.bottom = "10px";
        avatarIcon.style.right = "10px";
        avatarIcon.style.width = "50px";  // Adjust size as needed
        avatarIcon.style.height = "50px";
        avatarIcon.style.borderRadius = "50%";
        avatarIcon.style.zIndex = "1000"; // Keep it on top

        // 将图标添加到页面中
        document.body.appendChild(avatarIcon);
    }
});
