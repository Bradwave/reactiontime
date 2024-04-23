const pageContainer = document.getElementById("page-container");
const reactionTimeText = document.getElementById("reaction-time-text");
const resultBackground = document.getElementById("result-background");
const runningTestText = document.getElementById("running-test-text");
const startTestText = document.getElementById("start-test-text");

let randomWaitTimeout;
const baseWaitTime = 1500;

let startTime = null;
let reactionTime;

let testRunning = false;

document.onclick = () => {
    toggleReactionTest();
}

document.onkeydown = (e) => {
    switch (e.code) {
        case "Space":
            toggleReactionTest();
            break;
    }
}

document.ontouchend = () => {
    toggleReactionTest();
}

function toggleReactionTest() {
    if (testRunning) {
        if (startTime != null) {
            reactionTime = Date.now() - startTime;

            pageContainer.style.transition = "all .05s";
            pageContainer.style.backgroundColor = "#ffffff";

            reactionTimeText.innerHTML = "reaction time: " + reactionTime / 1000 + " s";
            testRunning = false;
        } else {
            clearTimeout(randomWaitTimeout);

            reactionTimeText.innerHTML = "too early";
            testRunning = false;
        }

        resultBackground.style.opacity = 1;
        runningTestText.style.display = "none";
        startTestText.style.display = "inline";
    } else {
        clearTimeout(randomWaitTimeout);
        randomWaitTimeout = setTimeout(() => {
            startTime = Date.now();

            pageContainer.style.transition = "all 0s";
            pageContainer.style.backgroundColor = "#d82000";
        }, baseWaitTime + Math.random() * baseWaitTime);

        resultBackground.style.opacity = 0;
        reactionTimeText.innerHTML = "...";

        runningTestText.style.display = "inline";
        startTestText.style.display = "none";

        startTime = null;
        testRunning = true;
    }
}