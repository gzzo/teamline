import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { Line } from 'components/line'
import { Driver } from 'components/driver'
import { highlightLine, selectLine } from 'reducers/sport'
import { NameContainer } from 'components/nameContainer'

import css from './constructor.scss'

class Constructor extends React.Component {
  render() {
    const {
      constructorData,
      constructorEdges,
      constructorId,
      driverEdges,
      highlightLine,
      isHighlighted,
      isSelected,
      name,
      rendered,
      selectLine,
      sportName,
      year,
    } = this.props

    const { drivers, points, position } = constructorData

    const constructorEdge = constructorEdges[constructorId]
    const constructorRef = constructorEdge[year]

    const yearKeys = Object.keys(constructorEdge)
    const yearIndex = _.indexOf(yearKeys, year)

    const previousYear = constructorEdge[yearKeys[yearIndex - 1]]

    const sortedDrivers = _.sortBy(
      _.toPairs(drivers),
      ([_driverId, driverData]) => driverData.position || 100
    )

    return (
      <div className={css.container}>
        <div className={css.constructorContainer}>
          <NameContainer
            innerRef={constructorRef}
            className={css.constructor}
            onClick={selectLine}
            onMouseOut={highlightLine}
            onMouseOver={highlightLine}
            position={position}
            points={points}
          >
            {name}
          </NameContainer>
          {rendered && previousYear && (
            <Line
              to={constructorRef}
              from={previousYear}
              isHighlighted={isSelected || isHighlighted}
            />
          )}
        </div>
        <div className={css.driversContainer}>
          {_.map(sortedDrivers, ([driverId, driverData]) => (
            <Driver
              constructorId={constructorId}
              driverData={driverData}
              driverEdges={driverEdges}
              driverId={driverId}
              key={driverId}
              rendered={rendered}
              sportName={sportName}
              year={year}
            />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { sportName, constructorId } = ownProps
  const sport = state.sport.sports[sportName]

  const constructor = sport.constructors[constructorId]
  const { name, isHighlighted, isSelected } = constructor

  return {
    name,
    isHighlighted,
    isSelected,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { sportName, constructorId } = ownProps

  return {
    highlightLine: () =>
      dispatch(highlightLine(sportName, 'constructors', constructorId)),
    selectLine: () =>
      dispatch(selectLine(sportName, 'constructors', constructorId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Constructor)
