function initWelcomeText() {
    const welcomeText = document.getElementById("welcomeText");
    welcomeText.innerHTML = "Hi, " + CurPlayer.player.name;
}

function initBtns() {
    const btn1 = document.getElementById("level-1-Btn");
    const btn2 = document.getElementById("level-2-Btn");
    const btn3 = document.getElementById("level-3-Btn");
    btn1.addEventListener("click", function (event) {
        jumpToGamePage(event.target);
    })
    btn2.addEventListener("click", function (event) {
        jumpToGamePage(event.target);
    })
    btn3.addEventListener("click", function (event) {
        jumpToGamePage(event.target);
    })
}

function initTopPlayerListInfo() {
    function initLevelLabel(level) {
        let levelInfo = undefined;
        let topLevelPlayerElement = undefined;
        switch (level) {
            case 1:
                levelInfo = level1Info;
                topLevelPlayerElement = topLevel1PlayerElement;
                break;
            case 2:
                levelInfo = level2Info;
                topLevelPlayerElement = topLevel2PlayerElement;
                break;
            default:
                levelInfo = level3Info;
                topLevelPlayerElement = topLevel3PlayerElement;
                break;
        }
        if (levelInfo[0] === null) {
            topLevelPlayerElement.innerHTML = "?";
        }
        else {
            let bestPlayer = levelInfo[0];
            let bestScore = levelInfo[1];
            let totalScore = levelInfo[2];
            topLevelPlayerElement.innerHTML = bestPlayer + "&nbsp" + "|" + "&nbsp" + bestScore + "/" + totalScore;
        }
    }

    function initShibaLoverLabel() {
        let bestShibaLover = shibaLoverInfo[0];
        let bestShibaLove = shibaLoverInfo[1];
        if (bestShibaLover === null) {
            bestShibaLoverElement.innerHTML = "?";
        }
        else {
            bestShibaLoverElement.innerHTML = bestShibaLover + "&nbsp" + "|" + "&nbsp" + bestShibaLove;
        }
    }

    const topLevel1PlayerElement = document.getElementById("top-level-1-player");
    const topLevel2PlayerElement = document.getElementById("top-level-2-player");
    const topLevel3PlayerElement = document.getElementById("top-level-3-player");
    const bestShibaLoverElement = document.getElementById("best-shiba-lover");
    const list = TopPlayerList.list;
    const level1Info = list.level1Info;
    const level2Info = list.level2Info;
    const level3Info = list.level3Info;
    const shibaLoverInfo = list.shibaLoverInfo;

    // init level label
    initLevelLabel(1);
    initLevelLabel(2);
    initLevelLabel(3);

    // init shiba's lover
    initShibaLoverLabel();
}

function jumpToGamePage(buttonElement) {
    // save level info
    saveLevelInfo(buttonElement);
    // jump to game page
    window.location.href = "/pages/game.html";
}

function saveLevelInfo(buttonElement) {
    // get level info
    buttonId = buttonElement.id;
    level = Number(buttonId.split("-")[1]);

    // save level info
    CurGameSetting.createCurGameSetting(level);
}

window.onload = function () {
    // init current player
    CurPlayer.initCurPlayer();

    // init player list
    PlayerList.initPlayerList();

    // init top player list
    TopPlayerList.initTopPlayerList();
    initTopPlayerListInfo();

    // init title
    initWelcomeText();

    // init btns
    initBtns();
}