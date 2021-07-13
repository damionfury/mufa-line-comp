import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Score from './components/Score';
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
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        className="tracker"
        spacing={1}
        >
          <Grid container item xs={12} sm={6} spacing={1} className="line-comp"
            direction="row" justifyContent="center" alignItems="center">
              <Grid container item xs={6} sm={3} spacing={0} className="fmp" direction="column">
                <Grid item className="fmp-title">FMP</Grid>
                <Grid item className="fmp-comp">{this.state.lineComp[0]}</Grid>
              </Grid>
              <Grid container item xs={6} sm={3} spacing={0} className="mmp" direction="column">
                <Grid item className="mmp-title">MMP</Grid>
                <Grid item className="mmp-comp">{this.state.lineComp[1]}</Grid>
              </Grid>
          </Grid>
          <Grid container item xs={12} spacing={1} className="scores" direction="column">
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
          <Grid container item xs={6} spacing={1} className="setup" >
            Setup:
            <div className="startSeed">
              <label htmlFor="startSeed">
                4 FMP
                <Switch
                  name="startSeed"
                  color="primary"
                  checked={this.state.startMMP4}
                  onChange={ (e) => this.changeStartSeed(e.target.checked) }
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
          </Grid>
          <Grid container item xs={6} spacing={1} className="history">
          </Grid>
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
