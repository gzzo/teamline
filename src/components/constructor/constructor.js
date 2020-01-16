import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { Line } from 'components/line'
import { Driver } from 'components/driver'

import css from './constructor.scss'


class Constructor extends React.Component {
  render() {
    const {
      constructors,
      constructorData,
      constructorEdges,
      constructorId,
      driverEdges,
      rendered,
      sportName,
      year,
    } = this.props

    const { drivers, points, position } = constructorData

    const constructor = constructors[constructorId]
    const { name } = constructor

    const constructorEdge = constructorEdges[constructorId]
    const constructorRef = constructorEdge[year]

    const yearKeys = Object.keys(constructorEdge)
    const yearIndex = _.indexOf(yearKeys, year)

    return (
      <div className={css.constructorContainer}>
        <div ref={constructorRef} className={css.constructor}>
          {name} #{position} - {points}
        </div>
        <div>
          {_.map(drivers, (driverData, driverId) => (
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
        {false && rendered && yearIndex > 0 && (
          <Line
            to={constructorRef}
            from={constructorEdge[yearKeys[yearIndex - 1]]}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { sportName } = ownProps
  const sport = state.sport.sports[sportName]

  return {
    constructors: sport.constructors,
  }
}

export default connect(mapStateToProps)(Constructor)
