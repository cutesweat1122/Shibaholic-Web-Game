function initScore() {
    const resultLabel = document.getElementById("result-label");
    const setting = CurGameSetting.setting;
    resultLabel.innerHTML = setting.shibaLove + " / " + setting.targetNum + "&nbsp&nbsp" + "Shiba's 💖";
}

window.onload = function () {
    // init current player
    CurPlayer.initCurPlayer();

    // init player list
    PlayerList.initPlayerList();

    // init cur game setting
    CurGameSetting.initCurGameSetting();

    // init score
    initScore();
}