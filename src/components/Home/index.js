import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teamsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const updatedData = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))

    this.setState({
      teamsData: updatedData,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderTeamsList = () => {
    const {teamsData} = this.state

    return (
      <div className="home-container">
        <div className="home-card">
          <div className="ipl-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-heading">IPL Dashboard</h1>
          </div>

          <ul className="teams-list">
            {teamsData.map(eachTeam => (
              <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
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

    return this.renderTeamsList()
  }
}

export default Home
