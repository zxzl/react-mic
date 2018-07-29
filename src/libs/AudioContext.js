const audioCtx = new (window.AudioContext || window.webkitAudioContext)({sampleRate: 48000});
const analyser = audioCtx.createAnalyser();

const AudioContext = {
  getAudioContext() {
    return audioCtx;
  },

  getAnalyser() {
    return analyser;
  },

  decodeAudioData() {
    audioCtx.decodeAudioData(audioData).then(function(decodedData) {
      // use the decoded data here
    });
  }
};

export default AudioContext;
