import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageTab: languageFiltersData[0].id,
    displayDataList: [],
    apiStatus: apiStatusConstants.intial,
  }

  componentDidMount() {
    this.getData()
  }

  renderFailure = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt=" failure view"
      />
      <h1 className="heading">Something Went Wrong</h1>
    </div>
  )

  getData = async () => {
    const {activeLanguageTab} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageTab}`

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data.popular_repos)
      const updatedData = data.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      // console.log(updatedData)

      this.setState({
        displayDataList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccess = () => {
    const {activeLanguageTab, displayDataList} = this.state
    return (
      <>
        <ul className="ulContainer">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              languageFiltersData={eachLanguage}
              key={eachLanguage.id}
              onClickLanguageButton={this.onClickLanguageButton}
              isActiveTabId={activeLanguageTab === eachLanguage.id}
            />
          ))}
        </ul>
        <ul className="ulContainer1">
          {displayDataList.map(eachRepo => (
            <RepositoryItem repoItem={eachRepo} key={eachRepo.id} />
          ))}
        </ul>
      </>
    )
  }

  onClickLanguageButton = id => {
    this.setState({activeLanguageTab: id}, this.getData)
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    // console.log(isLoading)

    return (
      <div className="mainContainer">
        <h1 className="head">Popular</h1>
        {this.renderRepositories()}
      </div>
    )
  }
}
export default GithubPopularRepos
