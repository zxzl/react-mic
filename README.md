# react-mic

Record a user's voice and display as an osscilation.

Featured in the course ["How to Write a Single Page Application"](http://www.singlepageapplication.com).

Works via the HTML5 MediaRecorder API ([currently only available in Chrome & Firefox](https://caniuse.com/#search=MediaRecorder)).

## Demo

Check out the [demo](https://hackingbeauty.github.io/react-mic/).

You can also see this component in action at [voicerecordpro.com](https://www.voicerecordpro.com).

## Installation

`npm install --save react-mic`

## Features

- Record audio from microphone
- Display sound wave as voice is being recorded
- Save audio as BLOB

## Usage

```js

<ReactMic
  record={boolean}         // defaults -> false.  Set to true to begin recording
  save={boolean}           // set to true if you want to save
  className={string}       // provide css class name
  onSave={function}        // callback to save your recording
  onStop={function}        // callback to execute when audio stops recording
  strokeColor={string}     // sound wave color
  backgroundColor={string} // background color
/>

```

## Example

```js
import { ReactMic } from 'react-mic';

export class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      save: false
    }

  }

  startRecording = () => {
    this.setState({
      record: true
    });
  }

  stopRecording = () => {
    this.setState({
      record: false,
      save: false
    });
  }

  onSave(recordedBlob) {
    this.setState({
      save: false
    })
  }

  onStop() {
    console.log('recordedBlob is: ', recordedBlob);
  }

  render() {
    const { record, save } = this.state
    return (
      <div>
        <ReactMic
          record={record}
          save={save}
          className="sound-wave"
          onSave={this.onSave}
          onStop={this.onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <button onTouchTap={this.startRecording} type="button">Start</button>
        <button onTouchTap={this.stopRecording} type="button">Stop</button>
      </div>
    );
  }
}
```
# Having issues with the lambda function?
Try installing babel-preset-stage-1

Include stage-1 in your webpack.config under presets.

e.g.

```js
module.exports = {
    entry: "./scripts/Main.js",
    output: {
        path: __dirname,
        filename: "./static/script.js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.js$/,
            // exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-1']
            }
        }]

    }
};
```

## License

MIT
