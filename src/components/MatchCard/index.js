import {Component} from 'react'
import './index.css'

class MatchCard extends Component {
  render() {
    const {matchDetails} = this.props
    const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails

    const statusClassName =
      matchStatus === 'Won' ? 'match-status won-text' : 'match-status lost-text'

    return (
      <li className="match-card-item">
        <img
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
          className="match-team-logo"
        />
        <p className="match-team-name">{competingTeam}</p>
        <p className="match-result">{result}</p>
        <p className={statusClassName}>{matchStatus}</p>
      </li>
    )
  }
}

export default MatchCard
