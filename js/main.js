"use strict";

function initTable() {
    let inputTable = document.getElementById("input_table");
    let pageTitle = document.getElementById("gameName");
    let inputRow = document.getElementById("inputRow");
    let btnRow = document.getElementById("btnRow");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;


    // set input table's size
    let computedStyle = window.getComputedStyle(inputTable);
    let baseFontSize = computedStyle.fontSize;
    inputTable.style.width = (windowWidth - 16) + "px"; // margin: 1em = 16px
    inputTable.style.height = (windowHeight - 16) + "px";

    // set the row size
    let tableHeight = Number(inputTable.style.height.slice(0, inputTable.style.width.length - 2));
    pageTitle.style.height = (tableHeight / 5) + "px";
    inputRow.style.height = (tableHeight / 5) * 3 + "px";
    btnRow.style.height = (tableHeight / 5) + "px";
}

function jumpToMenuPage() {
    let nameInputElement = document.getElementById("nameInput");
    let inputName = nameInputElement.value;

    if (inputName !== "" && inputName.length > 10) {
        nameInputElement.placeholder = "Please enter at most 10 letters.";
    }
    // nonempty input name
    else if (inputName !== "") {
        // save cur player, update cur player, upate cur list
        /*
        1. brand new player -> create a player, update the cur player, update the cur list
        2. last player -> do nothing
        3. other old player on the player list -> load the player,  update the cur player
        */
        // check if player is in the player list
        let isInPlayerList = false;
        for (let key in PlayerList.list) {
            if (inputName === key) {
                isInPlayerList = true;
                break;
            }
        }

        if (inputName !== CurPlayer.player.name) {
            let player = undefined;
            // old player but not the last player
            if (isInPlayerList) {
                // load player
                player = PlayerList.list[inputName];
            }
            // brand new player
            else {
                // create a new player
                player = new Player(inputName, undefined, undefined, undefined);

                // update player list
                PlayerList.addToPlayerList(player);
            }

            // update cur player
            CurPlayer.storeCurPlayer(player);
        }

        // jump to menu page
        window.location.href = "pages/menu.html";
    }
    else {
        nameInputElement.placeholder = "Please tell me your name :)"
    }
}

window.onload = function () {
    // localStorage.clear()

    // init table
    initTable()

    // init current player
    CurPlayer.initCurPlayer();

    // init player list
    PlayerList.initPlayerList();
}