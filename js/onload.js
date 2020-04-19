dialog = document.getElementById("dialog");
question = document.getElementById("question");
answerField = document.getElementById("answers");
waterstat = document.getElementById("water");
sunstat = document.getElementById("sun");
sunface = document.getElementsByClassName("face")[0];
sunflower = document.getElementsByClassName("sun")[0];
stems = document.getElementById("stems");
entryOverlay = document.getElementById("entryScreen");
exitOverlay = document.getElementById("exitScreen");

updateLevel();
next();
setTimeout(update, 6000);
addOverlayEventListener();

let audioLoaded = false;

document.addEventListener('click',event => {
    if(!audioLoaded) {
        let audio = document.createElement("audio");
        audio.innerHTML = `<source src="assets/MainTheme.wav" type="audio/wav">`;
        audio.setAttribute("autoplay","");
        audio.setAttribute("loop","");
        audio.setAttribute("controls","");
        document.body.appendChild(audio);
        audioLoaded = true;
    }
});
