(window.onload = function () {
    setInterval(() => {
        setTime(nowTimeDisp, "Now", new Date());
    }, 1000)

    setInterval(() => {
        setTime(startTimeDisp, "Start", new Date());
    }, 1000)
})();

function getdoubleDigestNumer(number) {
  return ("0" + number).slice(-2)
}

var unixtime = Math.round((new Date()).getTime() / 1000);
let qr = new QRious({
    element: document.getElementById('qr'),
    value: 'https://synctimer.iroirolink.com/index.html?' + unixtime
});

function makeQR() {
    console.log("aaa");
    unixtime = Math.round((new Date()).getTime() / 1000);
    qr.value = 'https://synctimer.iroirolink.com/index.html?' + unixtime;
}


let nowTimeDisp = document.getElementById("nowTime");
let startTimeDisp = document.getElementById("startTime");

function setTime(object, str, datetime) {
    object.innerText= str + ": " + String(getdoubleDigestNumer(datetime.getHours())) + ":" + String(getdoubleDigestNumer(datetime.getMinutes()) + ":" + String(getdoubleDigestNumer(datetime.getSeconds())));
}


let makeQrButton = document.getElementById("makeQR");
makeQrButton.addEventListener('click',
    function () {
        makeQR()
    }, false);
