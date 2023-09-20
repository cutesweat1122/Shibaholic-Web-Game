/*
    must initCurPlayer & initPlayerList when loading a new HTML
*/

class Player {
    constructor(name, level1Score = undefined, level2Score = undefined, level3Score = undefined) {
        this.name = name;
        this.level1Score = level1Score;
        this.level2Score = level2Score;
        this.level3Score = level3Score;
        this.shibaLove = 0;
    }

    getInfo() {
        return `Name: ${this.name}\nLevel 1 Score: ${this.level1Score}\nLevel 2 Score: ${this.level2Score}\nLevel 3 Score: ${this.level3Score}`;
    }
}

class CurPlayer {
    static player = undefined;

    static initCurPlayer() {
        const curPlayer = localStorage.getItem("curPlayer");
        if (curPlayer != null) {
            let curPlayerInfo = JSON.parse(curPlayer);
            this.player = curPlayerInfo;
        }
        else {
            this.player = new Player(undefined);
        }
    }

    static storeCurPlayer(curPlayer) {
        // to static variable
        this.player = curPlayer;

        // to local storage
        const curPlayerInfo = JSON.stringify(curPlayer);
        localStorage.setItem("curPlayer", curPlayerInfo);
    }

    static updatePlayerInfo(name, level1Score, level2Score, level3Score, shibaLove) {
        // to static variable
        if (name !== null) {
            this.player.name = name;
        }
        if (level1Score !== null) {
            this.player.level1Score = level1Score;
        }
        if (level2Score !== null) {
            this.player.level2Score = level2Score;
        }
        if (level3Score !== null) {
            this.player.level3Score = level3Score;
        }
        if (shibaLove !== null) {
            this.player.shibaLove = shibaLove;
        }

        // to local storage
        const curPlayerInfo = JSON.stringify(this.player);
        localStorage.setItem("curPlayer", curPlayerInfo);
    }
}

class PlayerList {
    static list = undefined; // key: player's name value: Player object

    static initPlayerList() {
        const playerList = localStorage.getItem("playerList");
        if (playerList != null) {
            let playerListInfo = JSON.parse(playerList);
            this.list = playerListInfo;
        }
        else {
            this.list = {};
        }
    }

    static addToPlayerList(player) {
        if (!(player.name in this.list)) {
            // update the local variable
            this.list[player.name] = player;

            // update to the local storage
            const playerListInfo = JSON.stringify(this.list);
            localStorage.setItem("playerList", playerListInfo);
        }
    }

    static updatePlayerInfo(player) {
        if (player.name in this.list) {
            // update the local variable
            this.list[player.name] = player;

            // update to the local storage
            const playerListInfo = JSON.stringify(this.list);
            localStorage.setItem("playerList", playerListInfo);
        }
    }
}

class TopPlayerList {
    static list = undefined;

    constructor() {
        /*
        no record for that level -> returns bestPlayer = null
        no record for shibaLover -> returns bestShibaLover = null
        */
        let level1Info = this.getLevelInfo(1); // [bestPlayer, bestScore, totalScore]
        let level2Info = this.getLevelInfo(2);
        let level3Info = this.getLevelInfo(3);
        let shibaLoverInfo = this.getShibaLover(); // [bestShibaLover, bestShibaLove]

        this.level1Info = level1Info;
        this.level2Info = level2Info;
        this.level3Info = level3Info;
        this.shibaLoverInfo = shibaLoverInfo;
    }

    static initTopPlayerList() {
        const list = localStorage.getItem("topPlayerList");
        if (list != null) {
            let listInfo = JSON.parse(list);
            this.list = listInfo;
        }
        else {
            this.list = new TopPlayerList();
        }
    }

    storeList(list) {
        // to static variable
        this.list = list;

        // to local storage
        const listInfo = JSON.stringify(list);
        localStorage.setItem("topPlayerList", listInfo);
    }

    getLevelInfo(level) {
        /*
        no record for that level
        -> returns bestPlayer === null
        */
        /*
        no players -> ?
        no players for that level -> ?
        */
        let levelInfo = [];
        let bestPlayer = null;
        let bestScore = null;
        let totalScore = undefined;
        let playerList = PlayerList.list;

        // edge case: no players
        if (Object.keys(playerList).length == 0) {
            return [null, null, null];
        }

        // get total score
        if (level == 1) {
            totalScore = GameSetting.level1Setting["targetNum"];
        }
        else if (level == 2) {
            totalScore = GameSetting.level2Setting["targetNum"];
        }
        else if (level == 3) {
            totalScore = GameSetting.level3Setting["targetNum"];
        }

        // get the best player and the best score
        for (let playername in playerList) {
            let player = playerList[playername];
            let playerName = player.name;
            let playerScore = undefined;
            if (level == 1) {
                playerScore = player.level1Score;
            }
            else if (level == 2) {
                playerScore = player.level2Score;
            }
            else if (level == 3) {
                playerScore = player.level3Score;
            }

            if (playerScore !== undefined) {
                if (bestScore === null || playerScore > bestScore) {
                    bestPlayer = playerName;
                    bestScore = playerScore;
                }
            }
        }
        return [bestPlayer, bestScore, totalScore];
    }

    getShibaLover() {
        /*
        no record -> returns bestShibaLover as null
        */
        let bestShibaLover = null;
        let bestShibaLove = null;
        let playerList = PlayerList.list;

        // edge case: no players
        if (Object.keys(playerList).length == 0) {
            return [null, null];
        }

        // get shiba's lover
        for (let playerName in playerList) {
            let shibaLove = playerList[playerName].shibaLove;
            if (shibaLove > 0) {
                if (bestShibaLove === null || shibaLove > bestShibaLove) {
                    bestShibaLover = playerName;
                    bestShibaLove = shibaLove;
                }
            }
        }
        return [bestShibaLover, bestShibaLove]
    }
}