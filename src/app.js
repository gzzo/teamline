import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Helmet } from 'react-helmet'
import { ConnectedRouter } from 'connected-react-router'

import { SportPage } from 'pages/sport'

import 'sanitize.css'

class App extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          <Helmet>
            <title>Teamline</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Helmet>
          <Switch>
            <Route path="/sport/:sportName" component={SportPage} />
          </Switch>
        </div>
      </ConnectedRouter>
    )
  }
}

export default hot(module)(App)
