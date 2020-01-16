import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { Line } from 'components/line'
import { highlightLine } from 'reducers/sport'

import css from './driver.scss'

class Driver extends React.Component {
  render() {
    const {
      constructorId,
      driverData,
      driverEdges,
      driverId,
      highlightLine,
      rendered,
      year,
      forename,
      surname,
      isHighlighted,
    } = this.props

    const { points, position } = driverData

    const driverEdge = driverEdges[driverId]
    const driverRef = driverEdge[year][constructorId]

    const yearKeys = Object.keys(driverEdge)
    const yearIndex = _.indexOf(yearKeys, year)

    const previousYear = driverEdge[yearKeys[yearIndex - 1]]

    const driverClasses = classNames(css.driver, {
      [css.driver_highlighted]: isHighlighted,
    })

    return (
      <div key={driverId} className={css.driverContainer}>
        <div
          className={driverClasses}
          onMouseOut={highlightLine}
          onMouseOver={highlightLine}
          ref={driverRef}
        >
          {forename} {surname} #{position} - {points}
        </div>
        {rendered &&
          previousYear &&
          _.map(previousYear, (previousRef, previousConstructorId) => (
            <Line
              to={driverRef}
              key={previousConstructorId}
              from={previousRef}
              isHighlighted={isHighlighted}
            />
          ))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { sportName, driverId } = ownProps

  const sport = state.sport.sports[sportName]
  const driver = sport.drivers[driverId]
  const { forename, surname, isHighlighted } = driver

  return {
    forename,
    surname,
    isHighlighted,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { sportName, driverId } = ownProps

  return {
    highlightLine: () =>
      dispatch(highlightLine(sportName, 'drivers', driverId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Driver)
