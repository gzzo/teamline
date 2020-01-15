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
    const { sport } = props
    const { pairings } = sport

    this.constructorEdges = {}
    _.each(pairings, (constructorIds, year) => {
      this.constructorEdges[year] = {}

      _.each(constructorIds, (drivers, constructorId) => {
        this.constructorEdges[year][constructorId] = React.createRef()
      })
    })

    this.state = {
      rendered: false,
    }
  }

  componentDidMount() {
    this.setState({
      rendered: true,
    })
  }

  render() {
    const { props, state, constructorEdges } = this
    const { sport } = props
    const { rendered } = state
    const { pairings, constructors, drivers } = sport

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
              {_.map(sortedConstructors, ([constructorId, driverIds]) => {
                const constructor = constructors[constructorId]
                const { name } = constructor
                const constructorRef = constructorEdges[year][constructorId]

                return (
                  <div key={constructorId} className={css.constructorContainer}>
                    <div ref={constructorRef} className={css.constructor}>
                      {name}
                    </div>
                    <div>
                      {driverIds.map(driverId => {
                        const driver = drivers[driverId]
                        const { forename, surname } = driver
                        return (
                          <div key={driverId} className={css.driverContainer}>
                            <div className={css.driver}>{forename} {surname}</div>
                          </div>
                        )
                      })}
                    </div>
                    {rendered && (
                      <Line
                        to={constructorRef}
                        from={_.get(constructorEdges[year - 1], constructorId)}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
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
