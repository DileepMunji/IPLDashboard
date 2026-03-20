import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class TeamCard extends Component {
  render() {
    const {teamDetails} = this.props
    const {id, name, teamImageUrl} = teamDetails

    return (
      <li className="team-card-item">
        <Link to={`/team-matches/${id}`} className="team-link">
          <div className="team-card">
            <img src={teamImageUrl} alt={name} className="team-logo" />
            <p className="team-name">{name}</p>
          </div>
        </Link>
      </li>
    )
  }
}

export default TeamCard
