import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { Toggle } from 'react-toggle-component';
import './index.css';
import reportWebVitals from './reportWebVitals';

// TODO:
// - GET INTO GITHUB!!!
// - Refactor to use the material-ui Switch component instead of Toggle
// - Style into visually distinguishable sections
// - Make it fairly pretty
// - Setup S3 bucket to host
// - Get running on S3
// - Document how to deploy
// - Build a history section


function Score(props) {
  const teamNum = (props.team === "Us") ? 0 : 1;
  
  return (
    <div className="score">
      <Button
        variant="contained" 
        color="primary" 
        className="decrement" 
        onClick={ () => props.onClick(teamNum,-1) }
      >
          -
      </Button>
      
      {props.team}: {props.value}
      
      <Button
        variant="contained" 
        color="primary" 
        className="decrement" 
        onClick={ () => props.onClick(teamNum,1) }
      >
        +
      </Button>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: [0,0],
      startMMP4: false,
      lineComp: [4,3],
    }
  }

  changeStartSeed(value) {
    this.setState({
      startMMP4: value,
    });

    this.updateLineComp(this.state.score,value);
  }

  resetScore() {
    this.setState({
      score: [0,0]
    });

    this.updateLineComp([0,0],this.state.startMMP4);
  }

  updateLineComp(score, startMMP4) {
    const seed = (startMMP4) ? 1 : 3,
      totalScore = score[0] + score[1],
      halfScoreRndDwn = Math.floor( (totalScore + seed) / 2 ),
      extraFMP = halfScoreRndDwn % 2,
      lineComp = this.state.lineComp.slice();

    lineComp[0] = 3 + extraFMP;
    lineComp[1] = 4 - extraFMP;

    if (lineComp[0] + lineComp[1] !== 7 ) {
      console.error("Line comp doesn't add up");
    }

    this.setState({
      lineComp: lineComp,
    });
  }

  updateScore(team,value) {
    const current = this.state.score.slice();

    if (current[team] + value < 0) {
      return;
    }

    current[team] += value;

    this.setState({
      score: current,
    });

    this.updateLineComp(current,this.state.startMMP4);
  }

  render() {
    return (
      <div className="tracker">
        <div className="scores">
          <Score
            team="Us"
            value={this.state.score[0]}
            onClick={ (team,value) => this.updateScore(team,value) }
          />
          <Score
            team="Them"
            value={this.state.score[1]}
            onClick={ (team,value) => this.updateScore(team,value) }
          />
        </div>
        <div className="line-comp">
          <div>FMP: {this.state.lineComp[0]}</div>
          <div>MMP: {this.state.lineComp[1]}</div>
        </div>
        <div className="setup">
          Setup:
          <div className="startSeed">
            <label htmlFor="startSeed">
              4 FMP
              <Toggle
                name="startSeed"
                leftBackgroundColor="purple"
                rightBackgroundColor="teal"
                borderColor="white"
                knobColor="white"
                onToggle={ (e) => this.changeStartSeed(e.target.checked) }
              />
              4 MMP
            </label>
          </div>
          <Button
            name="reset"
            onClick={ () => this.resetScore() }
            variant="contained"
            color="primary"
          >
            Reset
          </Button>
        </div>
        <div className="history">

        </div>
      </div>
    )
  }

}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
