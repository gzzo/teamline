import React from 'react'
import classNames from 'classnames'

import css from './nameContainer.scss'

class NameContainer extends React.Component {
  render() {
    const {
      className,
      children,
      position,
      points,
      innerRef,
      onMouseOut,
      onMouseOver,
      onClick,
    } = this.props

    const positionClasses = classNames(css.score, {
      [css.score_first]: position === 1,
      [css.score_second]: position === 2,
      [css.score_third]: position === 3,
    })

    return (
      <div
        className={css.container}
        ref={innerRef}
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
        onClick={onClick}
      >
        <div className={className}>{children}</div>
        <div>
          {points !== null && <div className={css.score}>{points}</div>}
          {position !== null && (
            <div className={positionClasses}>#{position}</div>
          )}
        </div>
      </div>
    )
  }
}

export default NameContainer
