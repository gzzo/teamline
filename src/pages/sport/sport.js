import React from 'react'
import { connect } from 'react-redux'

import { fetchPairing } from 'reducers/sport'
import { Page } from 'components/page'
import { Pairing } from 'components/pairing'
import { Loader } from 'components/loader'

class SportPage extends React.Component {
  componentDidMount() {
    this.props.fetchPairing()
  }

  render() {
    const { sportIsLoaded, sportName } = this.props

    if (!sportIsLoaded) {
      return <Loader />
    }

    return (
      <Page>
        <Pairing sportName={sportName} />
      </Page>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { sportName } = ownProps.match.params
  const sport = state.sport.sports[sportName] || {}

  return {
    sportIsLoaded: sport.isLoaded === true,
    sportName,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { sportName } = ownProps.match.params

  return {
    fetchPairing: () => dispatch(fetchPairing(sportName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SportPage)
