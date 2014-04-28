$(document).ready(function() {
    
    var options = {
        "video": true,
        "audio": false,
        height: 300,
        width: 500,
        el: "webcam"
    }

    getUserMedia(
        options, 
        function(stream) {
            console.log('success');

            var video = $('#webcam > video');
            console.log(video);
            var vendorURL = window.URL || window.webkitURL;
            video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;

            video.onerror = function () {
                stream.stop();
                streamError();
            };
        },
        function() {
            console.log('failed');
        });

});