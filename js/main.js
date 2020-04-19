let lockEvent = 0;

function onEvent(eventname, lock) {
    if(Date.now() < lockEvent) {
        return;
    }
    lockEvent = Date.now() + lock;
    this[eventname]();
}

function onWateringCan() {
    let can = document.getElementsByClassName('can')[0];
    can.classList.add('start');
    setTimeout(water, 4000*0.2);
    setTimeout(() => {can.classList.remove('start')}, 4000);
}

const waterPerWater = 10;

function water(idx) {
    if(idx === undefined) {
        idx = 0;
    }
    if(idx >= waterPerWater) {
        return;
    }
    stats.waterlevel++;
    if(stats.waterlevel >= 100) {
        stats.waterlevel = 100;
        return;
    }
    updateLevel();
    setTimeout(() => water(idx+1), 4000*(0.7-0.2)/waterPerWater);
}

function onCurtain() {
    sun = !sun;
    document.body.style.background = sun ? "bisque" : "#3e3730";
}
