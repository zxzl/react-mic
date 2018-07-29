"use strict";

exports.__esModule = true;
var audioCtx = new (window.AudioContext || window.webkitAudioContext)({
  sampleRate: 48000
});
audioCtx.sampleRate = 48000;
var analyser = audioCtx.createAnalyser();

var AudioContext = {
  getAudioContext: function getAudioContext() {
    return audioCtx;
  },
  getAnalyser: function getAnalyser() {
    return analyser;
  },
  decodeAudioData: function decodeAudioData() {
    audioCtx.decodeAudioData(audioData).then(function (decodedData) {
      // use the decoded data here
    });
  }
};

exports.default = AudioContext;
module.exports = exports["default"];