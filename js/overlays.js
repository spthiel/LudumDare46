let overlayPresent = true;
let entryOverlay;
let exitOverlay;
let jamversion = true;

function showEntryOverLay() {
    overlayPresent = true;
    entryOverlay.removeAttribute("hidden");
    exitOverlay.setAttribute("hidden", "");
}

/**
 *
 * @param won {boolean}
 * @param type {"undersun" | "oversun" | "nolove" | "love" | "large" | "small"}
 */
function showExitOverlay(won, type) {
    overlayPresent = true;
    exitOverlay.removeAttribute("hidden");
    entryOverlay.setAttribute("hidden","");

    let title = document.getElementById("title");
    let story = document.getElementById("story");
    let continueButton = document.getElementById("continue");

    continueButton.innerText = won ? "Play again" : "Retry";
    title.innerText = won ? "Congratulations" : "Game over";
    story.innerText = endings[type].replace(/\$name/g, stats.name === "Flower" ? "the plant" : stats.name)
        .replace(/\$noun/g, stats.noun.normal)
        .replace(/\$cnoun/g, stats.noun.capnormal)
        .replace(/\$nomi/g, stats.noun.nominative)
        .replace(/\$cnomi/g, stats.noun.capnominative);

}

let endings = {
    "undersun": "You kept $name out of the sun for too long and $noun died because of that.",
    "oversun": "You kept $name in the sun for too long and $noun dried up.",
    "nolove": "$name confessed $nomi love to you but you rejected $nomi. After that $noun went to plenty of bars and got wasted until $noun had no money anymore. Then $noun got depressed and jumped off a cliff.",
    "love": "After you accepted the date, both of you had a happy relationship. After a few years you got married and had many flower-human babies and had a happy family life until you both peacefully died of old age.",
    "large": "After you kept $name very healthy for a long time, $noun grew very tall and eventually didn't stopped growing again. $cnoun first grew taller than the house you lived in, but soon matched the eiffel tower and soon after the empire state building. Eventually $name made it to space and never stopped growing. Maybe $noun is still growing today, far outside the universe we know.",
    "small": "After you kept $name badly watered $noun eventually died from it."
};

function addOverlayEventListener() {
    entryOverlay.addEventListener('click',onEntryOverlayClick);
    exitOverlay.addEventListener('click',onExitOverlayClick);
}

function hideOverlay() {
    overlayPresent = false;
    entryOverlay.setAttribute("hidden", "");
    exitOverlay.setAttribute("hidden", "");
}

function onEntryOverlayClick(event) {
    switch (event.target.getAttribute("id")) {
        case "jamversion":
            jamversion = true;
            hideOverlay();
            break;
        case "nonjam":
            jamversion = false;
            hideOverlay();
    }
}

function onExitOverlayClick(event) {
    if(event.target.getAttribute("id") === "continue") {
        location.reload();
    }
}
