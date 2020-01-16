import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Helmet } from 'react-helmet'
import { ConnectedRouter } from 'connected-react-router'

import { SportPage } from 'pages/sport'

import 'sanitize.css'
import './app.scss'

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
            <link
              href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,700&display=swap"
              rel="stylesheet"
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
