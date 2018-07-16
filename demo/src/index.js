import React, {Component}          from 'react';
import { render }                  from 'react-dom';
import { FloatingActionButton,
        MuiThemeProvider }         from 'material-ui';
import MicrophoneOn                from 'material-ui/svg-icons/av/mic';
import MicrophoneOff               from 'material-ui/svg-icons/av/stop';

import { ReactMic, saveRecording } from '../../src';
import sampleAudio                 from './sample_audio.webm';
import ReactGA                     from 'react-ga';

require ('./styles.scss');

ReactGA.initialize('UA-98862819-1');

export default class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      record: false,
      blobObject: null,
      isRecording: false,
      save: false
    }
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  startRecording= () => {
    this.setState({
      record: true,
      isRecording: true
    });
  }

  stopRecording= () => {
    this.setState({
      record: false,
      isRecording: false,
      save: true
    });
  }

  onStart=() => {
    console.log('You can tap into the onStart callback');
  }

  onSave= (blobObject) => {
    this.setState({
      blobURL : blobObject.blobURL,
      save: false
    });
  }

  render() {
    const { isRecording, record, save } = this.state;

    return(
      <MuiThemeProvider>
        <div>
          <h1>React-Mic</h1>
          <p><a href="https://github.com/hackingbeauty/react-mic">Documentation</a></p>
          <ReactMic
            className="oscilloscope"
            record={record}
            save={save}
            backgroundColor="#FF4081"
            visualSetting="sinewave"
            audioBitsPerSecond= {128000}
            onSave={this.onSave}
            onStart={this.onStart}
            strokeColor="#000000" />
          <div>
            <audio ref="audioSource" controls="controls" src={this.state.blobURL}></audio>
          </div>
          <br />
          <br />
          <FloatingActionButton
            className="btn"
            secondary={true}
            disabled={isRecording}
            onClick={this.startRecording}>
            <MicrophoneOn />
          </FloatingActionButton>
          <FloatingActionButton
            className="btn"
            secondary={true}
            disabled={!isRecording}
            onClick={this.stopRecording}>
            <MicrophoneOff />
          </FloatingActionButton>
          <br />
          <br />
          <br />
          <p>As featured in the course <br /><a href="http://singlepageapplication.com">How to Write a Single Page Application</a></p>
          <br />
          <br />
          <p>Check out how I use it in my app
          <br />
            <a href="http://voicerecordpro.com" target="_blank">Voice Record Pro</a> (record your voice and publish it)</p>
        </div>
    </MuiThemeProvider>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
