import React from 'react'
import classNames from 'classnames'

import css from './line.scss'

class Line extends React.PureComponent {
  constructor(props) {
    super(props)

    this.updateRects = this.updateRects.bind(this)
    this.updateRects()
  }

  updateRects() {
    const { from, to } = this.props

    this.fromRect = from.current.getBoundingClientRect()
    this.toRect = to.current.getBoundingClientRect()
  }

  render() {
    const { props, fromRect, toRect } = this
    const { isHighlighted } = props

    if (!isHighlighted) {
      return null
    }

    const startX = fromRect.width
    const startY = fromRect.height / 2

    const endX = fromRect.width + toRect.left - fromRect.right
    const endY = toRect.y - fromRect.y + fromRect.height / 2

    const startControlX = endX
    const startControlY = startY

    const endControlX = startX
    const endControlY = endY

    const lineClasses = classNames(css.line, {
      [css.line_highlighted]: isHighlighted,
    })

    const pathClasses = classNames(css.svgPath, {
      [css.svgPath_highlighted]: isHighlighted,
    })

    return (
      <div className={lineClasses}>
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
