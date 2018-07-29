'use strict';

exports.__esModule = true;
exports.MicrophoneRecorder = undefined;

var _AudioContext = require('./AudioContext');

var _AudioContext2 = _interopRequireDefault(_AudioContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var analyser = void 0;
var audioCtx = void 0;
var mediaRecorder = void 0;
var chunks = [];
var startTime = void 0;
var stream = void 0;
var mediaOptions = void 0;
var blobObject = void 0;
var onSaveCallback = void 0;
var onStartCallback = void 0;

var constraints = { audio: true, video: false }; // constraints - only audio needed

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var MicrophoneRecorder = exports.MicrophoneRecorder = function () {
  function MicrophoneRecorder(onSave, onStart, onStop, options) {
    var _this = this;

    _classCallCheck(this, MicrophoneRecorder);

    this.startRecording = function () {

      startTime = Date.now();

      if (mediaRecorder) {

        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        if (mediaRecorder && mediaRecorder.state === 'paused') {
          mediaRecorder.resume();
          return;
        }

        if (audioCtx && mediaRecorder && mediaRecorder.state === 'inactive') {
          mediaRecorder.start(10);
          var source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);
          if (onStartCallback) {
            onStartCallback();
          };
        }
      } else {
        if (navigator.mediaDevices) {
          console.log('getUserMedia supported.');

          navigator.mediaDevices.getUserMedia(constraints).then(function (str) {
            stream = str;

            if (MediaRecorder.isTypeSupported(mediaOptions.mimeType)) {
              mediaRecorder = new MediaRecorder(str, mediaOptions);
            } else {
              mediaRecorder = new MediaRecorder(str);
            }

            if (onStartCallback) {
              onStartCallback();
            };

            mediaRecorder.onstop = _this.onStop;
            mediaRecorder.ondataavailable = function (event) {
              chunks.push(event.data);
            };

            audioCtx = _AudioContext2.default.getAudioContext();
            analyser = _AudioContext2.default.getAnalyser();

            audioCtx.resume();
            mediaRecorder.start(10);

            var source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);
          });
        } else {
          alert('Your browser does not support audio recording');
        }
      }
    };

    onStartCallback = onStart;
    onSaveCallback = onSave;
    mediaOptions = options;
  }

  MicrophoneRecorder.prototype.stopRecording = function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      audioCtx.suspend();
    }
  };

  MicrophoneRecorder.prototype.saveRecording = function saveRecording(evt) {
    var blob = new Blob(chunks, { 'type': mediaOptions.mimeType });
    chunks = [];

    var blobObject = {
      blob: blob,
      startTime: startTime,
      stopTime: Date.now(),
      options: mediaOptions,
      blobURL: window.URL.createObjectURL(blob)
    };

    if (onSaveCallback) {
      onSaveCallback(blobObject);
    };
  };

  return MicrophoneRecorder;
}();