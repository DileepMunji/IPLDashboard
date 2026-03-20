import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const teamBackgroundColors = {
  RCB: 'rcb-bg',
  KKR: 'kkr-bg',
  KXP: 'kxp-bg',
  CSK: 'csk-bg',
  RR: 'rr-bg',
  MI: 'mi-bg',
  SRH: 'srh-bg',
  DC: 'dc-bg',
}

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatchData: {},
    recentMatchesData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamDetails()
  }

  getFormattedLatestMatchData = latestMatchDetails => ({
    umpires: latestMatchDetails.umpires,
    result: latestMatchDetails.result,
    manOfTheMatch: latestMatchDetails.man_of_the_match,
    id: latestMatchDetails.id,
    date: latestMatchDetails.date,
    venue: latestMatchDetails.venue,
    competingTeam: latestMatchDetails.competing_team,
    competingTeamLogo: latestMatchDetails.competing_team_logo,
    firstInnings: latestMatchDetails.first_innings,
    secondInnings: latestMatchDetails.second_innings,
    matchStatus: latestMatchDetails.match_status,
  })

  getFormattedRecentMatches = recentMatches =>
    recentMatches.map(eachMatch => ({
      umpires: eachMatch.umpires,
      result: eachMatch.result,
      manOfTheMatch: eachMatch.man_of_the_match,
      id: eachMatch.id,
      date: eachMatch.date,
      venue: eachMatch.venue,
      competingTeam: eachMatch.competing_team,
      competingTeamLogo: eachMatch.competing_team_logo,
      firstInnings: eachMatch.first_innings,
      secondInnings: eachMatch.second_innings,
      matchStatus: eachMatch.match_status,
    }))

  getTeamDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchData: this.getFormattedLatestMatchData(
        data.latest_match_details,
      ),
      recentMatchesData: this.getFormattedRecentMatches(data.recent_matches),
    }

    this.setState({
      teamBannerUrl: updatedData.teamBannerUrl,
      latestMatchData: updatedData.latestMatchData,
      recentMatchesData: updatedData.recentMatchesData,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderTeamMatches = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const backgroundClassName = teamBackgroundColors[id]

    const {teamBannerUrl, latestMatchData, recentMatchesData} = this.state

    return (
      <div className={`team-matches-container ${backgroundClassName}`}>
        <div className="team-matches-card">
          <img src={teamBannerUrl} alt="team banner" className="team-banner" />

          <p className="latest-heading">Latest Matches</p>
          <LatestMatch latestMatchDetails={latestMatchData} />

          <ul className="recent-matches-list">
            {recentMatchesData.map(eachMatch => (
              <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    if (isLoading) {
      return this.renderLoader()
    }

    return this.renderTeamMatches()
  }
}

export default TeamMatches
