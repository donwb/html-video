var _mediaStream = null;
var _lastURL = '';

$(document).ready(function() {

  if (navigator.getUserMedia) {
    // Request the camera.
    navigator.getUserMedia(
      // Constraints
      {
        audio: false,
        video: true
      },

      // Success Callback
      function(localMediaStream) {
        console.log(localMediaStream);
        _mediaStream = localMediaStream;

        var vid = $('#camera-stream')[0];
        var url = window.URL.createObjectURL(localMediaStream);
        console.log(vid);
        vid.src = url;
        vid.play();

        

      },

      // Error Callback`
      function(err) {
        // Log the error to the console.
        console.log('The following error occurred when trying to use getUserMedia: ' + err);
      }
    );

  } else {
    alert('Sorry, your browser does not support getUserMedia');
  }

  $('#record').click(function() {
    var opts = {
          type: "video",
          video: {
            width: 300,
            height: 200
          },
          canvas: {
            width: 300,
            height: 200
          }
        };
    window.recordRTC = RecordRTC(_mediaStream, opts);
    recordRTC.startRecording();

  });

  $('#stop').click(function() {
    recordRTC.stopRecording(function(videoURL){
      console.log(videoURL);
      _lastURL = videoURL;
    });
  });

  $('#replay').click(function() {
    console.log('Last URL: ' + _lastURL);

    var vid = $('#camera-stream')[0];
    vid.src = _lastURL;
    window.open(_lastURL);
  });


});











