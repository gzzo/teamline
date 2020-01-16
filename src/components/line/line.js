import React from 'react'
import classNames from 'classnames'

import css from './line.scss'

class Line extends React.PureComponent {
  render() {
    const { from, to, isHighlighted } = this.props

    if (!from || !to) {
      return null
    }

    const fromRect = from.current.getBoundingClientRect()
    const toRect = to.current.getBoundingClientRect()

    const startX = fromRect.right - toRect.left
    const startY = fromRect.y - toRect.y + fromRect.height / 3

    const endX = 0
    const endY = toRect.height / 3

    const startControlX = endX
    const startControlY = startY

    const endControlX = startX
    const endControlY = endY

    const pathClasses = classNames(css.svgPath, {
      [css.svgPath_highlighted]: isHighlighted,
    })

    return (
      <div className={css.line}>
        <svg className={css.svg}>
          <path
            d={`M${startX},${startY} C${startControlX},${startControlY} ${endControlX},${endControlY} ${endX},${endY}`}
            className={pathClasses}
          />
        </svg>
      </div>
    )
  }
}

export default Line
