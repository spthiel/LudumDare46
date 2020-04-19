function onGrewLarge() {
    showExitOverlay(true, "large")
}

function onLove() {
    showExitOverlay(true, "love")
}

function onLoveDeny() {
    showExitOverlay(false, "nolove")
}

function onDeadBySun() {
    showExitOverlay(false, stats.sunmeter > maxStats.sunmeter/2 ? "oversun" : "undersun");
}

function onDeadByHeight() {
    showExitOverlay(false, "small");
}
