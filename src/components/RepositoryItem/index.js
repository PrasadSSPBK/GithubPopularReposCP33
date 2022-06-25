import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props
  const {avatarUrl, name, issuesCount, forksCount, starsCount} = repoItem
  return (
    <li className="listItemContainer">
      <img src={avatarUrl} alt={name} className="listItemImg" />
      <h1 className="listItemPara">{name}</h1>
      <div className="listItemCountContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="countImg"
        />
        <p className="countPara">{starsCount}</p>
      </div>
      <div className="listItemCountContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="countImg"
        />
        <p className="countPara">{forksCount}</p>
      </div>
      <div className="listItemCountContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt=" open issues"
          className="countImg"
        />
        <p className="countPara">{issuesCount}</p>
      </div>
    </li>
  )
}
export default RepositoryItem
