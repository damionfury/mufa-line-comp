import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';

import Score from './components/Score';
import LineComp from './components/LineComp';
import Setup from './components/Setup';
import './index.css';

// TODO:
// - Style into visually distinguishable sections
// - Make it fairly pretty
// - Setup S3 bucket to host
// - Get running on S3
// - Document how to deploy
// - Build a history section
// - Build a way to save & load games. Consider base64 encode of data and bit.ly for a shortcode link.



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
      <Grid 
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="tracker"
        spacing={3}
        >
          <Grid container item xs={12} sm={6} spacing={2} className="comp_score"
            direction="row" justifyContent="center" alignItems="center" flexWrap="wrap">
            <Grid item className="header">Line Composition</Grid>
            <LineComp fmp={this.state.lineComp[0]} mmp={this.state.lineComp[1]}></LineComp>
            <Grid container item xs={12} spacing={2} className="scores" direction="column" alignItems="center">
              <Grid item className="header">Score</Grid>
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
              </Grid>
          </Grid>
          {/* <Grid container item xs={12} sm={6} spacing={1} className="history">
            History here
          </Grid> */}
          <Setup startMMP4={this.state.startMMP4} onChange={(e) => this.changeStartSeed(e.target.checked)} resetScore={ () => this.resetScore() }></Setup>
          
      </Grid>
    )
  }

}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
