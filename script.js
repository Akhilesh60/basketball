// Select elements
select = function(e) { return document.querySelector(e) };
selectAll = function(e) { return document.querySelectorAll(e) };

let score = 0;
let trials = 0;

const scoreEl = document.getElementById('score');
const trialsEl = document.getElementById('trials');

// Environment settings
const g = 9.81;

// Initial positions
const xstart = -90;
const ystart = 28;

// Positions for loading
const xinter = 95;
const yinter = -55;

const xloaded = 35;
const yloaded = -125;

// Ball in position
const xIn = 648;
const yIn = -210;

let start = 0;
let temptl;
let temptl2;
let temptl3;
let tempRotateTL;

const loadScale = 1.2;
let ballInterval; // Store the interval for ball movement

// Select elements
const ball = select("#ball");
const tracker = select("#tracker");
const nets = select('#net');
const rim = select('#hoop');
const circle = select('#rim');
const lines = select('#lines');
const trackerIn = select('#in');
const ground = select('#ground1');

const LarmG = select('#LarmG');
const RarmG = select('#RarmG');
const Rarm = select('#Rarm');
const Larm = select('#Larm');
const Lforearm = select('#Lforearm');
const Rforearm = select('#Rforearm');
const chest = select('#chest');
const short = select('#short');
const head = select('#head');
const foot = select('#foot');
const leg = select('#leg');
const legG = select('#legG');
const player = select('#player');
const hair = select('#hair');
const handTracker = select('#handTracker');
const bottomTracker = select('#bottom');
const bottomRightTracker = select('#bottomRight');
const rightTracker = select('#right');

// Set initial transforms
TweenMax.set(nets, { transformOrigin: "100% 0%" });
TweenMax.set(handTracker, { transformOrigin: "50% 50%", opacity: 0 });
TweenMax.set(lines, { transformOrigin: "50% 50%" });
TweenMax.set(trackerIn, { transformOrigin: "100% 0%", opacity: 0 });
TweenMax.set(rim, { transformOrigin: "50% 100%" });
TweenMax.set(circle, { transformOrigin: "100% 50%" });
TweenMax.set([ball, tracker], { transformOrigin: "50% 50%" });
TweenMax.set(ball, { transformOrigin: "50% -120%" });
TweenMax.set(tracker, { transformOrigin: "50% -660%", opacity: 0 });
TweenMax.set(bottomTracker, { transformOrigin: "50% 50%", opacity: 0 });
TweenMax.set(bottomRightTracker, { transformOrigin: "50% 50%", opacity: 0 });
TweenMax.set(rightTracker, { transformOrigin: "50% 50%" });

TweenMax.set(LarmG, { transformOrigin: "50% 5%" });
TweenMax.set(RarmG, { transformOrigin: "50% 5%" });
TweenMax.set(Larm, { transformOrigin: "50% 5%" });
TweenMax.set(Rarm, { transformOrigin: "50% 5%" });
TweenMax.set(Rforearm, { transformOrigin: "60% 12%" });
TweenMax.set(Lforearm, { transformOrigin: "60% 12%" });
TweenMax.set(legG, { transformOrigin: "50% 5%" });
TweenMax.set(short, { transformOrigin: "50% 10%" });
TweenMax.set(leg, { transformOrigin: "50% 95%" });
TweenMax.set(foot, { transformOrigin: "100% 95%" });
TweenMax.set(head, { transformOrigin: "50% 100%" });
TweenMax.set(player, { transformOrigin: "50% 100%" });
TweenMax.set(hair, { transformOrigin: "20% 100%" });

// Add event listeners
document.addEventListener('keydown', processKeyDown);
document.addEventListener('keyup', processKeyUp);
document.addEventListener('touchstart', processTouchStart);
document.addEventListener('touchend', processTouchEnd);

function processKeyDown(e) {
    if (!start) {
        resetBallPosition();
        temptl = createLoadTL();
        temptl.paused(false).play('1.3');
        start = (new Date()).getTime();
    }
}

function processKeyUp(e) {
    if (start) {
        var delta = ((new Date()).getTime() - start) * loadScale;
        start = 0;
        temptl.kill();
        temptl2 = createReleaseTL();
        temptl2.paused(false).play("2");
        tempRotateTL = createrotateTL();
        tempRotateTL.play();
        throwBall(Math.min(delta / 8.5, 100), ball._gsTransform.x, ball._gsTransform.y, Math.min(Math.PI / 2 - .1, delta / 1100 * Math.PI / 2));
        trials++;
        trialsEl.innerHTML = trials;
    }
}

function processTouchStart(e) {
    e.preventDefault(); // Prevent default touch behavior
    if (!start) {
        resetBallPosition();
        temptl = createLoadTL();
        temptl.paused(false).play('1.3');
        start = (new Date()).getTime();
    }
}

function processTouchEnd(e) {
    e.preventDefault(); // Prevent default touch behavior
    if (start) {
        var delta = ((new Date()).getTime() - start) * loadScale;
        start = 0;
        temptl.kill();
        temptl2 = createReleaseTL();
        temptl2.paused(false).play("2");
        tempRotateTL = createrotateTL();
        tempRotateTL.play();
        throwBall(Math.min(delta / 8.5, 100), ball._gsTransform.x, ball._gsTransform.y, Math.min(Math.PI / 2 - .1, delta / 1100 * Math.PI / 2));
        trials++;
        trialsEl.innerHTML = trials;
    }
}

function createrotateTL() {
    rotateTL = new TimelineMax({ paused: true, repeat: -1 });
    rotateTL
        .to(lines, 1, { rotation: "-360deg", ease: Power0.easeNone }, "0");
    return rotateTL;
}

function createInTL() {
    InTL = new TimelineMax({ paused: true });
    InTL
        .add("0")
        .to([ball, tracker, bottomTracker, bottomRightTracker, rightTracker], 0.1, { x: xIn, y: yIn }, "2.8")
        .to(nets, 0.1, { scaleY: 0.8, skewX: "10deg", rotation: "-5deg", ease: Back.easeOut.config(1.7).config(1, 0.3) }, "2.8")
        .to(rim, 0.2, { rotation: "-1deg" }, "2.8")
        .to(circle, 0.1, { rotation: "-5deg" }, "2.8")
        .to(nets, 1, { scaleY: 1, skewX: 0, rotation: 0, ease: Elastic.easeOut.config(1, 0.3) }, "3")
        .to(rim, 1, { rotation: "0deg", ease: Elastic.easeOut.config(1, 0.3) }, "3")
        .to(circle, 1, { rotation: "0deg", ease: Elastic.easeOut.config(1, 0.3) }, "3")
        .to([ball, tracker, bottomTracker, bottomRightTracker, rightTracker], 1.5, { y: ystart, ease: Bounce.easeOut }, "2.9")
        .to([ball, tracker, bottomTracker, bottomRightTracker, rightTracker], 1.5, { x: (xIn - 10), ease: Power0.easeNone }, "2.9")
        .to([ball, tracker, bottomTracker, bottomRightTracker, rightTracker], 3, { x: (xIn - 50), ease: Power2.easeOut }, "3.4")
        .to(lines, 3.1, { rotation: "-410deg", ease: Power2.easeOut }, "3.4");
    return InTL;
}

function createLoadTL() {
    loadTL = new TimelineMax({ paused: true });
    loadTL
        .to(LarmG, 1.2, { rotation: "10deg" }, "1.3")
        .to(Lforearm, 1.2, { rotation: "30deg" }, "1.3")
        .to(RarmG, 1.2, { rotation: "-25deg" }, "1.3")
        .to(Rforearm, 1.2, { rotation: "-40deg" }, "1.3")
        .to(chest, 1.2, { rotation: "0deg" }, "1.3")
        .to(head, 1.2, { rotation: "0deg" }, "1.3")
        .to(short, 1.2, { rotation: "-5deg", y: 10 }, "1.3")
        .to(leg, 1.2, { rotation: "-5deg", y: 10 }, "1.3")
        .to(foot, 1.2, { rotation: "0deg" }, "1.3")
        .to(player, 1.2, { rotation: "-10deg" }, "1.3")
        .to(hair, 1.2, { skewX: "-10deg" }, "1.3")
        .to([ball, tracker, bottomTracker, bottomRightTracker, rightTracker], 1.3, { y: yloaded, x: xloaded, onUpdate: ballTracker }, "1.3")
        .timeScale(loadScale);
    return loadTL;
}

function createReleaseTL() {
    releaseTL = new TimelineMax({ paused: true });
    releaseTL
        .to(RarmG, 0.3, { rotation: (RarmG._gsTransform.rotation) + "deg", y: -10, ease: Back.easeOut.config(1) }, "2")
        .to(Rforearm, 0.3, { rotation: (Rforearm._gsTransform.rotation + 55) + "deg", ease: Back.easeOut.config(1) }, "2")
        .to(LarmG, 0.3, { rotation: (LarmG._gsTransform.rotation - 40) + "deg", y: -10, ease: Back.easeOut.config(1) }, "2")
        .to(Lforearm, 0.3, { rotation: "-5deg", ease: Back.easeOut.config(1) }, "2")
        .to(player, 0.3, { rotation: "1deg", ease: Back.easeOut.config(1) }, "2")
        .to(short, 0.2, { rotation: "0deg", y: -10 }, "2")
        .to(leg, 0.2, { rotation: "0deg", y: -10 }, "2")
        .to(hair, 0.2, { skewX: "4deg" }, "2")
        .to(head, 0.2, { rotation: "-10deg" }, "2")
        .to(foot, 0.2, { rotation: "20deg" }, "2")
        .to([chest, head], 0.2, { y: -10 }, "2")
        .to(head, 3, { rotation: "0deg", ease: Elastic.easeOut.config(0.5, 0.3) }, "2.2")
        .to(hair, 2, { skewX: "0deg", ease: Elastic.easeOut.config(1, 0.3) }, "2.2")
        .to(RarmG, 2.7, { rotation: "0", y: 0, ease: Elastic.easeOut.config(0.4, 0.3) }, "2.3")
        .to(Rforearm, 0.7, { rotation: "0deg" }, "2.3")
        .to(player, 0.7, { rotation: "0deg" }, "2.3")
        .to(LarmG, 2.7, { rotation: "0deg", y: 0, ease: Elastic.easeOut.config(0.4, 0.3) }, "2.3")
        .to(Lforearm, 0.7, { rotation: "0deg" }, "2.3")
        .to(short, 0.7, { rotation: "0deg", y: 0 }, "2.2")
        .to(leg, 0.7, { rotation: "0deg", y: 0 }, "2.2")
        .to(foot, 0.7, { rotation: "0deg" }, "2.2")
        .to([chest, head], 0.7, { y: 0 }, "2.2")
        .timeScale(1.2);
    return releaseTL;
}

function throwBall(vinit, xinit, yinit, alpha) {
    var V0 = { x: Math.cos(alpha) * vinit, y: Math.sin(alpha) * vinit };
    var t = 0;
    var endTime = getEndTime(V0, yinit - ystart);

    // Clear any previous interval
    if (ballInterval) {
        clearInterval(ballInterval);
    }

    ballInterval = setInterval(function () {
        t += 0.055;
        moveBall(x(t, V0, xinit), y(t, V0, yinit));
        if (checkRim()) {
            clearInterval(ballInterval);
            temptl3 = createInTL();
            temptl3.play(2.8);
            tempRotateTL.kill();
        }
        else if (t > endTime) {
            tempRotateTL.kill();
            clearInterval(ballInterval);
        }
    }, 2.1)
}

function moveBall(x, y) {
    TweenMax.to([ball], 0.025, { x: x, y: y, z: 0, ease: Power0.easeNone, onUpdate: ballTracker });
}

function x(t, Vinit, xinit) {
    return Vinit.x * t + xinit;
}

function y(t, Vinit, yinit) {
    return g / 2 * Math.pow(t, 2) - Vinit.y * t + yinit;
}

function checkRim() {
    if (Draggable.hitTest("#tracker", "#in")) {
        score++;
        scoreEl.innerHTML = score;
        return true;
    }
}

function getEndTime(Vinit, yinit) {
    var det = Math.pow(Vinit.y, 2) - 4 * g / 2 * yinit;
    var sol = (-Vinit.y - Math.sqrt(det)) / (-g);
    return sol;
}

function ballTracker() {
    TweenMax.set([tracker, bottomTracker, bottomRightTracker, rightTracker], { x: ball._gsTransform.x, y: ball._gsTransform.y, rotation: ball._gsTransform.rotation });
}

function resetBallPosition() {
    TweenMax.set([ball, tracker, bottomTracker, bottomRightTracker, rightTracker], { x: 0, y: 0 });
    TweenMax.set(lines, { rotation: 0 });
    TweenMax.killAll();
}
