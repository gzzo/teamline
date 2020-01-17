import React from 'react'

import css from './header.scss'

class Header extends React.Component {
  render() {
    return (
      <div className={css.header}>
        <a href="https://github.com/gzzo/teamline">
          <img src="/images/github.png" className={css.github} />
        </a>
        <h2>Teamline</h2>
      </div>
    )
  }
}

export default Header
