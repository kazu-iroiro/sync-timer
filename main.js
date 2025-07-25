(window.onload = function () {
    setInterval(() => {
        var nowTime = new Date();
        setTime(nowTimeDisp, "Now", nowTime);

        if (!startTimeFlag)
            startTime = nowTime;
        setTime(startTimeDisp, "Start", startTime);

        var diffMilliSec = (nowTime) - startTime;

        var minus = "+";
        if (diffMilliSec < 0)
            minus = "-"

        // 秒数の計算
        var tmpSec = Math.abs((diffMilliSec - diffMilliSec % 1000) / 1000);
        // 秒として残る部分
        var Sec = Math.floor(tmpSec % 60);
        // 分として分けられる部分
        var tmpMin = tmpSec / 60;
        // 実際に分の部分
        var Min = Math.floor(tmpMin % 60);
        // 時間として残る部分
        var Hour = Math.floor(tmpMin / 60);

        targetTime.innerText = "Diff: " + minus + getdoubleDigestNumer(Hour) + ":" + getdoubleDigestNumer(Min) + ":" + getdoubleDigestNumer(Sec);

    }, 1000)
})();


var startTime;
var startTimeFlag = false;

const searchParams = new URLSearchParams(window.location.search)
if(searchParams.has('unixStartTime')) {
    console.log(searchParams.get('unixStartTime'));
    startTime = new Date(searchParams.get('unixStartTime')*1000);
    startTimeFlag = true;
}
else
    startTime = new Date();
function getdoubleDigestNumer(number) {
    return ("0" + number).slice(-2)
}

let qr = new QRious({
    element: document.getElementById('qr'),
    value: 'https://synctimer.iroirolink.com/index.html?unixStartTime='
});

function makeQR() {
    var unixStartTime = Math.round(startTime.getTime() / 1000);
    qr.value = 'https://synctimer.iroirolink.com/index.html?unixStartTime=' + unixStartTime;
}

let nowTimeDisp = document.getElementById("nowTime");
let startTimeDisp = document.getElementById("startTime");
let targetTimeDisp = document.getElementById("targetTime");

function setTime(object, str, datetime) {
    object.innerText = str + ": " + String(getdoubleDigestNumer(datetime.getHours())) + ":" + String(getdoubleDigestNumer(datetime.getMinutes()) + ":" + String(getdoubleDigestNumer(datetime.getSeconds())));
    if (str == "Start" && startTimeFlag)
        makeQR();
}

document.getElementById("plusTenHours").addEventListener('click', function () {
    startTimeFlag = true; startTime.setHours(startTime.getHours() + 10); setTime(startTimeDisp, "Start", startTime);
}, false);
document.getElementById("plusTenMins").addEventListener('click', function () {
    startTimeFlag = true; startTime.setMinutes(startTime.getMinutes() + 10); setTime(startTimeDisp, "Start", startTime);
}, false);
document.getElementById("plusTenSecs").addEventListener('click', function () {
    startTimeFlag = true; startTime.setSeconds(startTime.getSeconds() + 10); setTime(startTimeDisp, "Start", startTime);
}, false);

document.getElementById("plusFiveHours").addEventListener('click', function () {
    startTimeFlag = true; startTime.setHours(startTime.getHours() + 5); setTime(startTimeDisp, "Start", startTime);
}, false);
document.getElementById("plusFiveMins").addEventListener('click', function () {
    startTimeFlag = true; startTime.setMinutes(startTime.getMinutes() + 5); setTime(startTimeDisp, "Start", startTime);
}, false);
document.getElementById("plusFiveSecs").addEventListener('click', function () {
    startTimeFlag = true; startTime.setSeconds(startTime.getSeconds() + 5); setTime(startTimeDisp, "Start", startTime);
}, false);

document.getElementById("plusOneHour").addEventListener('click', function () {
    startTimeFlag = true; startTime.setHours(startTime.getHours() + 1); setTime(startTimeDisp, "Start", startTime);
}, false);
document.getElementById("plusOneMin").addEventListener('click', function () {
    startTimeFlag = true; startTime.setMinutes(startTime.getMinutes() + 1); setTime(startTimeDisp, "Start", startTime);
}, false);
document.getElementById("plusOneSec").addEventListener('click', function () {
    startTimeFlag = true; startTime.setSeconds(startTime.getSeconds() + 1); setTime(startTimeDisp, "Start", startTime);
}, false);

document.getElementById("startStopWatch").addEventListener('click', function () {
    startTimeFlag = true; setTime(startTimeDisp, "Start", startTime);
}, false);

document.getElementById("shareButton").addEventListener('click', async function () {
    if (!startTimeFlag)
        alert("時刻を固定してから利用可能です")
    else
        var link = 'https://synctimer.iroirolink.com/index.html?unixStartTime=' + Math.round(startTime.getTime() / 1000);
    try {
        await navigator.share(link);
    } catch (err) {
        console.log(err);
        try {
            await navigator.clipboard.writeText(link);
        } catch (err) {
            console.log(err);
        }
    }
}, false);