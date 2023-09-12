import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class PasswordManager extends Component {
  state = {
    isTrue: false,
    passwordItemsList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const firstLetter = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newPassword = {
      id: v4(),
      initialValue: firstLetter,
      website,
      username,
      password,
      classAdd: classValue,
    }

    this.setState(prevState => ({
      passwordItemsList: [...prevState.passwordItemsList, newPassword],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = e => {
    this.setState({searchInput: e.target.value})
  }

  deleteItem = id => {
    const {passwordItemsList} = this.state
    const newList = passwordItemsList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({passwordItemsList: newList, isTrue: caseOf})
  }

  render() {
    const {
      username,
      website,
      password,
      passwordItemsList,
      isShow,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const newList = passwordItemsList.filter(eachValue =>
      eachValue.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="top-section-container">
          <form className="form-container" onSubmit={this.onAddPassword}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-container">
              <div className="image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website"
                />
              </div>
              <input
                type="text"
                className="input"
                onChange={this.onChangeWebsite}
                value={website}
                placeholder="Enter Website"
              />
            </div>
            <div className="input-container">
              <div className="image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website"
                />
              </div>
              <input
                type="text"
                className="input"
                onChange={this.onChangeUsername}
                value={username}
                placeholder="Enter Username"
              />
            </div>
            <div className="input-container">
              <div className="image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website"
                />
              </div>
              <input
                type="password"
                className="input"
                onChange={this.onChangePassword}
                value={password}
                placeholder="Enter Password"
              />
            </div>
            <div className="btn-container">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </div>
        <div className="bottom-section-container">
          <div className="nav-item-container">
            <div className="passwords-count-container">
              <h1 className="your-password">Your Passwords</h1>
              <div className="count-con">
                <p className="passwords-count">{newList.length}</p>
              </div>
            </div>
            <div className="input-container">
              <div className="image-container1">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="website"
                />
              </div>
              <input
                type="search"
                className="input-search"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-password-con">
            <div className="input-show-con">
              <input
                type="checkbox"
                className="input-style"
                id="showPassword"
                onChange={this.showPassword}
              />
              <label className="show-password-text" htmlFor="showPassword">
                Show passwords
              </label>
            </div>
          </div>
          {!isTrue && (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="password-manager-img"
              />
              <p className="your-password">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="list-items-container">
              {newList.map(eachPassword => (
                <li
                  className="password-list-card"
                  id={eachPassword.id}
                  key={eachPassword.id}
                >
                  <div className={`letter-container ${eachPassword.classAdd}`}>
                    <p className="letter">{eachPassword.initialValue}</p>
                  </div>
                  <div className="content-container">
                    <p className="content-des">{eachPassword.website}</p>
                    <p className="content-des">{eachPassword.username}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars"
                      />
                    )}
                    {isShow && (
                      <p className="content-des">{eachPassword.password}</p>
                    )}
                  </div>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => this.deleteItem(eachPassword.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
