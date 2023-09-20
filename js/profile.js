function initTitle() {
    const title = document.getElementById("profile-page-title");
    const playerName = CurPlayer.player.name;
    title.innerHTML = playerName;
}

function initAchievementList() {
    const level1ScoreLabelElement = document.getElementById("level1-score-label");
    const level2ScoreLabelElement = document.getElementById("level2-score-label");
    const level3ScoreLabelElement = document.getElementById("level3-score-label");
    const shibaloveScoreLabelElement = document.getElementById("shibalove-score-label");
    const player = CurPlayer.player;

    // init score
    const level1Score = (player.level1Score !== undefined) ? player.level1Score : "??";
    const level2Score = (player.level2Score !== undefined) ? player.level2Score : "??";
    const level3Score = (player.level3Score !== undefined) ? player.level3Score : "??";
    const level1TargetNum = GameSetting.level1Setting.targetNum;
    const level2TargetNum = GameSetting.level2Setting.targetNum;
    const level3TargetNum = GameSetting.level3Setting.targetNum;
    level1ScoreLabelElement.innerHTML = level1Score + "&nbsp" + "/" + "&nbsp" + level1TargetNum;
    level2ScoreLabelElement.innerHTML = level2Score + "&nbsp" + "/" + "&nbsp" + level2TargetNum;
    level3ScoreLabelElement.innerHTML = level3Score + "&nbsp" + "/" + "&nbsp" + level3TargetNum;

    // init obtained shiba's love
    shibaloveScoreLabelElement.innerHTML = player.shibaLove;
}

window.onload = function () {
    // init current player
    CurPlayer.initCurPlayer();

    // init title
    initTitle()

    // init achievement list
    initAchievementList()
}