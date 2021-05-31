import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { Line } from 'components/line'
import { highlightLine, selectLine } from 'reducers/sport'
import { NameContainer } from 'components/nameContainer'

import css from './driver.scss'

class Driver extends React.Component {
  render() {
    const {
      constructorId,
      driverData,
      driverEdges,
      driverId,
      forename,
      highlightLine,
      isHighlighted,
      isSelected,
      rendered,
      selectLine,
      surname,
      year,
    } = this.props

    const { points, position } = driverData

    const driverEdge = driverEdges[driverId]
    const driverRef = driverEdge[year][constructorId]

    const yearKeys = Object.keys(driverEdge)
    const yearIndex = _.indexOf(yearKeys, year)

    const previousYear = driverEdge[yearKeys[yearIndex - 1]]

    const driverClasses = classNames({
      [css.driver_highlighted]: isHighlighted || isSelected,
    })

    return (
      <div key={driverId} className={css.driverContainer}>
        <NameContainer
          className={driverClasses}
          onClick={selectLine}
          onMouseOut={highlightLine}
          onMouseOver={highlightLine}
          innerRef={driverRef}
          position={position}
          points={points}
        >
          {forename} {surname}
        </NameContainer>
        {rendered &&
          previousYear &&
          _.map(previousYear, (nextRef, nextConstructorId) => (
            <Line
              to={nextRef}
              key={nextConstructorId}
              from={driverRef}
              isHighlighted={isHighlighted || isSelected}
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
  const { forename, surname, isHighlighted, isSelected } = driver

  return {
    forename,
    surname,
    isHighlighted,
    isSelected,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { sportName, driverId } = ownProps

  return {
    highlightLine: () =>
      dispatch(highlightLine(sportName, 'drivers', driverId)),
    selectLine: () => dispatch(selectLine(sportName, 'drivers', driverId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Driver)
