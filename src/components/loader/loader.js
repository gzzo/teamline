import React from 'react'

import css from './loader.scss'

class Loader extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <div className={css.loader} />
        <div>Loading...</div>
      </div>
    )
  }
}

export default Loader
