function initTimeLabel() {
    const timeElement = document.getElementById("time");
    const timeLimit = CurGameSetting.setting.time;

    // init time label
    timeElement.innerHTML = timeLimit + " sec left !!";
}

function initScoreLabel() {
    const scoreElement = document.getElementById("score");
    scoreElement.innerHTML = "'s 💖 :" + "&nbsp &nbsp" + CurGameSetting.setting.shibaLove + " / " + CurGameSetting.setting.targetNum;
}

function initPlayground() {
    function createImg(imgName, imgNum, imgType) {
        function moveImage(imgElement) {
            // get the current position of the image
            var currentLeft = parseFloat(imgElement.style.left);
            var currentTop = parseFloat(imgElement.style.top);

            // calculate a small random offset for the next position
            var offsetX = (Math.random() - 0.5) * 1; // Adjust the value as needed
            var offsetY = (Math.random() - 0.5) * 1; // Adjust the value as needed

            // calculate the new position
            var newLeft = currentLeft + offsetX;
            var newTop = currentTop + offsetY;

            // ensure the new position stays within the playground boundaries
            var maxWidth = playgroundDiv.clientWidth - imgElement.width;
            var maxHeight = playgroundDiv.clientHeight - imgElement.height;
            newLeft = Math.min(maxWidth, Math.max(0, newLeft));
            newTop = Math.min(maxHeight, Math.max(0, newTop));

            // set the new position as inline styles
            imgElement.style.left = newLeft + "px";
            imgElement.style.top = newTop + "px";

            // use requestAnimationFrame to keep moving the image
            requestAnimationFrame(function () {
                moveImage(imgElement);
            });
        }

        for (let i = 0; i < imgNum; i++) {
            // create a new img element
            var imgElement = document.createElement("img");

            // set the src, alt text, width, and height attributes for the image
            imgElement.src = "/images/" + imgName;
            imgElement.alt = "img";
            imgElement.width = 80;
            imgElement.height = 80;

            // calculate random positions within the "playground" div's dimensions
            var maxWidth = playgroundDiv.clientWidth - imgElement.width;
            var maxHeight = playgroundDiv.clientHeight - imgElement.height;
            var randomLeft = playgroundDiv.style.left + Math.floor(Math.random() * maxWidth);
            var randomTop = playgroundDiv.style.top + Math.floor(Math.random() * maxHeight);

            // set the randomized position as inline styles
            imgElement.style.position = "absolute";
            imgElement.style.left = randomLeft + "px";
            imgElement.style.top = randomTop + "px";

            // set the onclick event
            if (imgType == SHIBA) {
                imgElement.addEventListener("click", function (event) {
                    const imgElement = event.target;
                    // add the score
                    CurGameSetting.setting.shibaLove += 1

                    // update the score label
                    initScoreLabel()

                    // remove the img
                    imgElement.remove()
                })
            }
            else if (imgType == ENEMY) {
                imgElement.addEventListener("click", function (event) {
                    const imgElement = event.target;
                    // minus the score
                    CurGameSetting.setting.shibaLove = ((CurGameSetting.setting.shibaLove - 1) >= 0) ? CurGameSetting.setting.shibaLove - 1 : 0;

                    // update the score label
                    initScoreLabel()

                    // remove the img
                    imgElement.remove()
                })
            }

            // set initial position
            setInterval(moveImage, 1, imgElement);
            // moveImage(imgElement);

            // append the image to the "playground" div
            playgroundDiv.appendChild(imgElement);
        }
    }

    const playgroundDiv = document.getElementById("playground");
    const SHIBA = "shiba";
    const ENEMY = "enemy";

    createImg("shiba.png", CurGameSetting.setting.targetNum, SHIBA);
    createImg("shiba_enemy_1.png", CurGameSetting.setting.enemyNum, ENEMY);
}

function startGame() {
    function storeRecord() {
        const level = CurGameSetting.setting.level;
        const shibaLove = CurGameSetting.setting.shibaLove;
        const oldShibaLove = CurPlayer.player.shibaLove;

        // update cur player's score
        if (level == 1) {
            let oldLevelScore = CurPlayer.player.level1Score;
            // update if no previous score or higher score
            if (oldLevelScore === undefined || shibaLove > oldLevelScore) {
                CurPlayer.updatePlayerInfo(null, shibaLove, null, null, null);
            }
        }
        else if (level == 2) {
            let oldLevelScore = CurPlayer.player.level2Score;
            // update if no previous score or higher score
            if (oldLevelScore === undefined || shibaLove > oldLevelScore) {
                CurPlayer.updatePlayerInfo(null, null, shibaLove, null, null);
            }
        }
        else if (level == 3) {
            let oldLevelScore = CurPlayer.player.level3Score;
            // update if no previous score or higher score
            if (oldLevelScore === undefined || shibaLove > oldLevelScore) {
                CurPlayer.updatePlayerInfo(null, null, null, shibaLove, null);
            }
        }
        // update cur player's total shibal love
        CurPlayer.updatePlayerInfo(null, null, null, null, oldShibaLove + shibaLove);

        // update player list
        PlayerList.updatePlayerInfo(CurPlayer.player);

        // update the cur game setting
        const setting = CurGameSetting.setting;
        CurGameSetting.updateCurGameSettingInfo(setting.level, setting.time, setting.targetNum, setting.enemyNum, setting.maxItem, setting.shibaLove);
    }

    // start the timer
    const intervalId = setInterval(() => {
        // update the time label
        const timeElement = document.getElementById("time");
        let time = Number(timeElement.innerHTML.split(" ")[0]);
        time -= 1;
        if (time !== -1) {
            timeElement.innerHTML = time + " sec left !!";
        }
        /*
            if the time ends, then
            stop the interval,
            store the record,
            update top player list,
            go to result page
        */
        else {
            // store the record
            storeRecord()

            // stop the interval
            clearInterval(intervalId);

            // go to result page
            window.location.href = "/pages/result.html";
        }
    }, 1000);
}

window.onload = function () {
    // init current player
    CurPlayer.initCurPlayer();

    // init player list
    PlayerList.initPlayerList();

    // init current game setting
    CurGameSetting.initCurGameSetting();

    // init time label
    initTimeLabel()

    // init score label
    initScoreLabel()

    // init playground
    initPlayground()

    // start game
    startGame()
}