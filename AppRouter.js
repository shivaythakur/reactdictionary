import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import Home from '../screens/Home/Home';
library.add(faIgloo)

class AppRouter extends Component {

  render() {
    return (
      <Router>
        <div className="main-container">
          <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
        </div>
      </Router>
    )
  }
}

export default AppRouter;