// Core App imports
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// Material UI imports
import Grid from '@material-ui/core/Grid';

// Project component imports
import Score from './components/Score';
import LineComp from './components/LineComp';
import Setup from './components/Setup';
import './index.css';

// Confetti and configure it
import Confetti from 'react-dom-confetti';

const configetti = {
  angle: 90,
  spread: "25",
  startVelocity: 40,
  elementCount: 70,
  dragFriction: "0.15",
  duration: "2000",
  stagger: 3,
  width: "8px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};
// Done with confetti

// API Base
const APIBASE = 'https://7hjztxhavj.execute-api.us-west-2.amazonaws.com/prod/';


// TODO:
// - Build a history section
// - Build out-of-sync detection for when local state is behind and someone tries to make changes. Goes in setRemoteState



class App extends React.Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
      score: [0,0],
      startMMP4: false,
      lineComp: [4,3],
      weWin: false,
      gameId: '',
      lastChange: Math.floor(Date.now() / 1000)
    }
  }

  async componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search),
      gameId = queryParams.get('gameId');

    if (gameId === null) {
      queryParams.set('gameId', Date.now().toString(16));
      document.location.search = queryParams;
    }

    this.setState({
      gameId: queryParams.get('gameId'),
    });
    
    await this.getRemoteState(gameId);

    this.interval = setInterval( async (gameId) => await this.getRemoteState(gameId), 2000 );
  }

  async getRemoteState( gameId = this.state.gameId ) {
    axios.get(APIBASE + gameId)
      .then( (res) => {
        this.setState({
          score: [ parseInt(res.data.score[0]), parseInt(res.data.score[1]) ],
          lineComp: [ parseInt(res.data.lineComp[0]), parseInt(res.data.lineComp[1]) ],
          startMMP4: res.data.startMMP4,
          lastChange: parseInt(res.data.lastChange)
        });
      })
      .catch ( (error) => {
        // TODO: If it's a 404 then we should immediately save the current state.
        if (error.response.status === 404) {
          this.setRemoteState(this.state);
        }
      });
  }

  async setRemoteState(state = this.state) {
    // TODO: Pull remote game state first and compare to lastChange. Prompt if there's a conflict.
    axios.put(APIBASE + state.gameId, state)
    .catch ( (error) => {
      console.error(error);
    });
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
      lineComp = this.state.lineComp.slice(),
      changeTime = Date.now();

    lineComp[0] = 3 + extraFMP;
    lineComp[1] = 4 - extraFMP;

    if (lineComp[0] + lineComp[1] !== 7 ) {
      console.error("Line comp doesn't add up");
    }

    this.setState({
      lineComp: lineComp,
    });

    // This is ugly but I don't really have time to build a custom async state update function.
    this.setRemoteState({
      gameId: this.state.gameId,
      score: score,
      lineComp: lineComp,
      startMMP4: startMMP4,
      lastChange: changeTime,
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
      weWin: (current[0] === 13 ? true : false),
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
          <Grid container item xs={12} spacing={1} className="confetti" 
            direction="row" justifyContent="center" alignItems="center">
            <Confetti active={this.state.weWin} config={ configetti }/>
          </Grid>
      </Grid>
    )
  }

}

export function onRenderBody( { setPostBodyComponents } ) {
  setPostBodyComponents([
      <script 
      defer 
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon='{"token": "YOUR__TOKEN__HERE"}'></script>,
  ]);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
