let boyname = random(boyNames);
let girlname = random(girlNames);

let waterstat;
let sunstat;
let sunface;
let sunflower;
let stems;

let maxStats = {
    sunmeter: 100,
    waterlevel: 100,

    height: 250,
    affection: 100,
    happiness: 400,
};

let NOUNS = {
    HE: {"normal": "he", "capnormal": "He", "nominative": "him", "capnominative": "Him"},
    SHE: {"normal": "she", "capnormal": "She", "nominative": "her", "capnominative": "Her"},
    IT: {"normal": "it", "capnormal": "It", "nominative": "its", "capnominative": "Its"}
};

let stats = {
    name: "Flower",
    noun: NOUNS.IT,
    specialface: undefined
};


for(let x in maxStats) {
    stats[x] = maxStats[x]/2;
}

stats.height = 50;

function setBlush() {
    if(!jamversion && random(0,20) === 0) {
        stats.specialface = "aghegao";
    } else {
        stats.specialface = "blush";
    }
}

let sun = true;

function update() {

    if(overlayPresent) {
        setTimeout(update, 3000);
        return;
    }

    stats.waterlevel--;

    if (sun) {
        stats.sunmeter++;
        stats.happiness++;
    } else {
        stats.sunmeter--;
        stats.happiness--;
    }

    if (stats.waterlevel > maxStats.waterlevel*0.8 || stats.waterlevel < maxStats.waterlevel*0.2) {
        stats.happiness--;
    } else {
        stats.happiness++;
    }

    if (stats.sunmeter > maxStats.sunmeter*0.8 || stats.sunmeter < maxStats.sunmeter*0.2) {
        stats.happiness--;
    }

    if (stats.waterlevel > maxStats.waterlevel*0.4 && stats.waterlevel < maxStats.waterlevel*0.6 && stats.happiness > maxStats.happiness*0.5 && stats.sunmeter > maxStats.sunmeter*0.4 && stats.sunmeter < maxStats.sunmeter*0.6) {
        stats.height++;
    } else if (stats.waterlevel < maxStats.waterlevel*0.1 || stats.waterlevel > maxStats.waterlevel*0.9) {
        stats.height--;
    }

    if (stats.happiness > maxStats.happiness-20) {
        stats.affection++;
    }

    if (stats.affection >= maxStats.affection) {
        queueLove();
    }

    bounds("happiness", 0 , 400);
    if(stats.happiness === 0) {
        stats.affection -= 10;
    }
    bounds("affection", 0, maxStats.affection);
    bounds("waterlevel", 0, maxStats.waterlevel);
    bounds("sunmeter", 0, maxStats.sunmeter);
    if(stats.sunmeter === maxStats.sunmeter || stats.sunmeter === 0) {
        onDeadBySun();
    }
    if(stats.height < 20) {
        stats.height = 20;
        onDeadByHeight();
    }
    if(stats.height >= maxStats.height) {
        stats.height = maxStats.height;
        onGrewLarge();
    }

    updateLevel();
    setTimeout(update, 3000);
}

let lastface = "";
function updateLevel() {
    sunstat.style.setProperty("--var-stat", 100*stats.sunmeter/maxStats.sunmeter);
    waterstat.style.setProperty("--var-stat", 100*stats.waterlevel/maxStats.waterlevel);
    if(lastface === "ahegao" && stats.specialface !== "ahegao") {
        sunface.classList.remove("ahegao");
    }
    if(stats.specialface) {
        switch(stats.specialface) {
            case "ahegao":
                if(lastface !== "ahegao") {
                    setFace("ahegao");
                    sunface.classList.add("ahegao");
                }
                break;
            case "blush":
                setFace("blush");
        }
    } else {
        if(stats.happiness < maxStats.happiness*0.2) {
            setFace("cry");
        } else if(stats.affection < maxStats.affection*0.3) {
            setFace("angry")
        } else if(stats.happiness > maxStats.happiness*0.8) {
            setFace("happy");
        } else if(stats.happiness >= maxStats.happiness*0.5) {
            setFace("smile");
        } else {
            setFace("frown")
        }
    }
    updateHeight();
}

let laststemcount = 0;

function updateHeight() {
    let stemcount = Math.ceil(stats.height/32.0);
    let offset = 32 - (stats.height-1)%32;
    document.body.style.setProperty("--var-offset", offset);
    if(laststemcount > stemcount) {
        for(let i = stemcount; i < laststemcount; i++) {
            removeStem();
        }
    } else if(stemcount > laststemcount) {
        for(let i = laststemcount; i < stemcount; i++) {
            addStem(i);
        }

    }
    laststemcount = stemcount;
    sunflower.style.setProperty("--var-index", stemcount);
}

function removeStem() {
    stems.removeChild(stems.lastChild);
}

function addStem(idx) {
    let stem = document.createElement("div");
    stem.className = "stem img";
    stem.style.setProperty("--var-index", idx);
    stems.appendChild(stem);
}

function setFace(name) {
    if(lastface === name) {
        return;
    }
    sunface.style.backgroundImage = `url('./assets/faces/${name}.png')`
}

/**
 *
 * @param name {string}
 * @param [min = 0] {number}
 * @param [max = 100] {number}
 */
function bounds(name, min, max) {
    if(min === undefined) {
        min = 0;
    }
    if(max === undefined) {
        max = 100;
    }
    if(stats[name] > max) {
        stats[name] = max;
    } else if(stats[name] < min) {
        stats[name] = min;
    }
}

