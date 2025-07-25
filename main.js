(window.onload = function () {
    function makeQR() {
        var unixtime = Math.round((new Date()).getTime() / 1000);

        var qr = new QRious({
            element: document.getElementById('qr'),
            value: 'https://synctimer.iroirolink.com/index.html?'+ unixtime
        });
    }


    let makeQrButton = document.getElementById("makeQrButton");

    makeQrButton.addEventListener(
        'click', makeQR()
    );
})();