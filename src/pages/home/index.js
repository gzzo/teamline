import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import Page from 'components/page'
import { fetchPairing } from 'reducers/sport'

import css from './home.scss'

class Line extends React.Component {
  render() {
    const { from, to } = this.props

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

    return (
      <div className={css.line}>
        <svg className={css.svg}>
          <path
            d={`M${startX},${startY} C${startControlX},${startControlY} ${endControlX},${endControlY} ${endX},${endY}`}
            className={css.svgPath}
          />
        </svg>
      </div>
    )
  }
}

class Pairing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rendered: false,
    }

    this.updatePairings = this.updatePairings.bind(this)
    this.updatePairings()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sport !== this.props.sport) {
      this.updatePairings()
    }
  }

  componentDidMount() {
    this.setState({
      rendered: true,
    })
  }

  updatePairings() {
    this.constructorEdges = {}
    this.driverEdges = {}

    const { constructorEdges, driverEdges, props } = this
    const { sport } = props
    const { pairings } = sport

    _.each(pairings, (constructorIds, year) => {
      _.each(constructorIds, (driverIds, constructorId) => {
        if (!constructorEdges[constructorId]) {
          constructorEdges[constructorId] = {}
        }

        constructorEdges[constructorId][year] = React.createRef()

        _.each(driverIds, driverId => {
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
    const { sport } = props
    const { rendered } = state
    const { pairings, constructors, drivers } = sport

    console.log(driverEdges)

    return (
      <div className={css.container}>
        {_.map(pairings, (constructorIds, year) => {
          const sortedConstructors = _.sortBy(
            _.toPairs(constructorIds),
            ([constructorId]) => constructors[constructorId].name
          )

          return (
            <div className={css.yearContainer} key={year}>
              <div>{year}</div>
              {_.map(sortedConstructors, ([constructorId, driverIds]) => (
                <Constructor
                  {...this.props}
                  constructorId={constructorId}
                  driverIds={driverIds}
                  constructorEdges={constructorEdges}
                  drivers={drivers}
                  rendered={rendered}
                  key={constructorId}
                  constructors={constructors}
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

class Constructor extends React.Component {
  render() {
    const {
      constructors,
      constructorId,
      constructorEdges,
      year,
      driverIds,
      driverEdges,
      rendered,
      drivers,
    } = this.props

    const constructor = constructors[constructorId]
    const { name } = constructor

    const constructorEdge = constructorEdges[constructorId]
    const constructorRef = constructorEdge[year]

    const yearKeys = Object.keys(constructorEdge)
    const yearIndex = _.indexOf(yearKeys, year)

    return (
      <div className={css.constructorContainer}>
        <div ref={constructorRef} className={css.constructor}>
          {name}
        </div>
        <div>
          {driverIds.map(driverId => (
            <Driver
              driverId={driverId}
              key={driverId}
              drivers={drivers}
              driverEdges={driverEdges}
              constructorId={constructorId}
              year={year}
              rendered={rendered}
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

class Driver extends React.Component {
  render() {
    const { drivers, driverId, driverEdges, constructorId, year, rendered } = this.props

    const driver = drivers[driverId]
    const { forename, surname } = driver

    const driverEdge = driverEdges[driverId]
    const driverRef = driverEdge[year][constructorId]

    const yearKeys = Object.keys(driverEdge)
    const yearIndex = _.indexOf(yearKeys, year)

    const previousYear = driverEdge[yearKeys[yearIndex - 1]]

    return (
      <div key={driverId} className={css.driverContainer}>
        <div className={css.driver} ref={driverRef}>
          {forename} {surname}
        </div>
        {rendered && previousYear && _.map(previousYear, (previousRef, previousConstructorId) => (
          <Line
            to={driverRef}
            key={previousConstructorId}
            from={previousRef}
          />
        ))}
      </div>
    )
  }
}

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchPairing()
  }

  render() {
    const { sport } = this.props

    if (!sport) {
      return 'loading'
    }

    return (
      <Page>
        <Pairing sport={sport} />
      </Page>
    )
  }
}

const mapStateToProps = state => {
  return {
    sport: state.sport.sports.formula,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPairing: () => dispatch(fetchPairing('formula')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
