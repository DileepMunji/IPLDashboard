import {Component} from 'react'
import './index.css'

class LatestMatch extends Component {
  render() {
    const {latestMatchDetails} = this.props
    const {
      competingTeam,
      competingTeamLogo,
      date,
      venue,
      result,
      firstInnings,
      secondInnings,
      manOfTheMatch,
      umpires,
    } = latestMatchDetails

    return (
      <div className="latest-match-card">
        <div className="latest-match-top-section">
          <div className="latest-match-left">
            <p className="latest-team-name">{competingTeam}</p>
            <p className="latest-date">{date}</p>
            <p className="latest-para">{venue}</p>
            <p className="latest-para">{result}</p>
          </div>

          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="latest-team-logo"
          />
        </div>

        <hr className="separator" />

        <div className="latest-match-right">
          <p className="label">First Innings</p>
          <p className="value">{firstInnings}</p>

          <p className="label">Second Innings</p>
          <p className="value">{secondInnings}</p>

          <p className="label">Man Of The Match</p>
          <p className="value">{manOfTheMatch}</p>

          <p className="label">Umpires</p>
          <p className="value">{umpires}</p>
        </div>
      </div>
    )
  }
}

export default LatestMatch