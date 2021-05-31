import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { Constructor } from 'components/constructor'

import css from './pairing.scss'

class Pairing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rendered: false,
    }

    this.updatePairings = this.updatePairings.bind(this)
    this.updatePairings()
  }

  componentDidMount() {
    this.setState({
      rendered: true,
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sport !== this.props.sport) {
      this.updatePairings()
    }
  }

  updatePairings() {
    this.constructorEdges = {}
    this.driverEdges = {}

    const { constructorEdges, driverEdges, props } = this
    const { pairings } = props

    _.each(pairings, (constructorIds, year) => {
      _.each(constructorIds, (constructorData, constructorId) => {
        if (!constructorEdges[constructorId]) {
          constructorEdges[constructorId] = {}
        }

        constructorEdges[constructorId][year] = React.createRef()

        _.each(constructorData.drivers, (driverData, driverId) => {
          if (!driverEdges[driverId]) {
            driverEdges[driverId] = {}
          }

          if (!driverEdges[driverId][year]) {
            driverEdges[driverId][year] = {}
          }

          driverEdges[driverId][year][constructorId] = React.createRef()
        })
      })
    })
  }

  render() {
    const { props, state, constructorEdges, driverEdges } = this
    const { sportName, pairings } = props
    const { rendered } = state

    const sortedPairings = _.orderBy(
      _.map(pairings, (constructorIds, year) => ({ constructorIds, year })),
      'year',
      'desc'
    )

    return (
      <div className={css.container}>
        {_.map(sortedPairings, ({ constructorIds, year }) => {
          const sortedConstructors = _.sortBy(
            _.toPairs(constructorIds),
            ([_constructorId, constructorData]) =>
              constructorData.position || 100
          )

          return (
            <div className={css.yearContainer} key={year}>
              <div className={css.year}>{year}</div>
              {_.map(sortedConstructors, ([constructorId, constructorData]) => (
                <Constructor
                  {...this.props}
                  constructorId={constructorId}
                  constructorData={constructorData}
                  constructorEdges={constructorEdges}
                  rendered={rendered}
                  key={constructorId}
                  sportName={sportName}
                  driverEdges={driverEdges}
                  year={year}
                />
              ))}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { sportName } = ownProps
  const sport = state.sport.sports[sportName]

  return {
    pairings: sport.pairings,
  }
}

export default connect(mapStateToProps)(Pairing)
