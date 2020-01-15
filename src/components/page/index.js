import React from 'react'

import css from './index.scss'

class Page extends React.Component {
  render() {
    return <div className={css.page}>{this.props.children}</div>
  }
}

export default Page
