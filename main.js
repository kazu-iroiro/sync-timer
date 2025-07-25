(window.onload = function () {
    setInterval(() => {
        var nowTime = new Date();
        setTime(nowTimeDisp, "Now", nowTime);

        if (!startTimeFlag)
            startTime = nowTime;
            setTime(startTimeDisp, "Start", startTime);

        var diffMilliSec = (nowTime) - startTime;

        var minus="+";
        if (diffMilliSec < 0)
            minus = "-"

        // 秒数の計算
        var tmpSec = Math.abs(diffMilliSec / 1000);
        // 秒として残る部分
        var Sec = Math.floor(tmpSec % 60);
        // 分として分けられる部分
        var tmpMin = Math.floor(tmpSec / 60);
        // 実際に分の部分
        var Min = Math.floor(tmpMin % 60);
        // 時間として残る部分
        var Hour = Math.floor(tmpMin / 60);

        targetTime.innerText = "Diff: " + minus + getdoubleDigestNumer(Hour) + ":" + getdoubleDigestNumer(Min) + ":" + getdoubleDigestNumer(Sec);

    }, 1000)
})();

function getdoubleDigestNumer(number) {
    return ("0" + number).slice(-2)
}

var startTime = new Date();

let qr = new QRious({
    element: document.getElementById('qr'),
    value: 'https://synctimer.iroirolink.com/index.html?'
});

function makeQR() {
    var unixStartTime = Math.round(startTime.getTime() / 1000);
    unixtime = Math.round((new Date()).getTime() / 1000);
    qr.value = 'https://synctimer.iroirolink.com/index.html?unixStartTime=' + unixStartTime;
}

var startTimeFlag = false;
let nowTimeDisp = document.getElementById("nowTime");
let startTimeDisp = document.getElementById("startTime");
let targetTimeDisp = document.getElementById("targetTime");

function setTime(object, str, datetime) {
    object.innerText = str + ": " + String(getdoubleDigestNumer(datetime.getHours())) + ":" + String(getdoubleDigestNumer(datetime.getMinutes()) + ":" + String(getdoubleDigestNumer(datetime.getSeconds())));
}


let makeQrButton = document.getElementById("makeQR");
makeQrButton.addEventListener('click',
    function () {
        makeQR()
    }, false);

document.getElementById("plusTenHours").addEventListener('click', function () {
    startTimeFlag = true; startTime.setHours(startTime.getHours() + 10); setTime(startTimeDisp, "Start", startTime);
}, false)
document.getElementById("plusTenMins").addEventListener('click', function () {
    startTimeFlag = true; startTime.setMinutes(startTime.getMinutes() + 10); setTime(startTimeDisp, "Start", startTime);
}, false)
document.getElementById("plusTenSecs").addEventListener('click', function () {
    startTimeFlag = true; startTime.setSeconds(startTime.getSeconds() + 10); setTime(startTimeDisp, "Start", startTime);
}, false)

