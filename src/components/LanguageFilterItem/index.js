import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, onClickLanguageButton, isActiveTabId} = props
  const {language, id} = languageFiltersData
  const activeClassName = isActiveTabId ? 'active' : null

  const onClickButton = () => {
    onClickLanguageButton(id)
  }

  return (
    <li className="listLanguageContainer">
      <button
        type="button"
        className={`languagePara ${activeClassName}`}
        onClick={onClickButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
