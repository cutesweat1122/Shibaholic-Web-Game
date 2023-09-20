class GameSetting {
    static level1Setting = {
        "level": 1,
        "time": 10,
        "targetNum": 15,
        "enemyNum": 5
    };

    static level2Setting = {
        "level": 2,
        "time": 10,
        "targetNum": 15,
        "enemyNum": 15,
    };

    static level3Setting = {
        "level": 3,
        "time": 10,
        "targetNum": 15,
        "enemyNum": 35,
    };

    constructor(level) {
        let levelSetting = undefined;
        switch (level) {
            case 1:
                levelSetting = GameSetting.level1Setting;
                break;
            case 2:
                levelSetting = GameSetting.level2Setting;
                break;
            default:
                levelSetting = GameSetting.level3Setting;
                break;
        }
        this.level = levelSetting["level"];
        this.time = levelSetting["time"];
        this.targetNum = levelSetting["targetNum"];
        this.enemyNum = levelSetting["enemyNum"];
        this.maxItem = levelSetting["targetNum"] + ["enemyNum"];
        this.shibaLove = 0;
    }
}

class CurGameSetting {
    static setting = undefined;

    static initCurGameSetting() {
        const settingInfo = JSON.parse(localStorage.getItem("gameSetting"));
        this.setting = settingInfo;
    }

    static createCurGameSetting(level) {
        // to static variable
        this.setting = new GameSetting(level);

        // to local storage
        const settingInfo = JSON.stringify(this.setting);
        localStorage.setItem("gameSetting", settingInfo);
    }

    static updateCurGameSettingInfo(level = undefined, time = undefined, targetNum = undefined, enemyNum = undefined, maxItem = undefined, shibaLove = undefined) {
        // to static variable
        if (level !== undefined) {
            this.setting.level = level;
        }
        if (time !== undefined) {
            this.setting.time = time;
        }
        if (targetNum !== undefined) {
            this.setting.targetNum = targetNum;
        }
        if (enemyNum !== undefined) {
            this.setting.enemyNum = enemyNum;
        }
        if (maxItem !== undefined) {
            this.setting.maxItem = maxItem;
        }
        if (shibaLove !== undefined) {
            this.setting.shibaLove = shibaLove;
        }

        // to local storage
        const settingInfo = JSON.stringify(this.setting);
        localStorage.setItem("gameSetting", settingInfo);
    }
}

