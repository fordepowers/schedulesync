import React from 'react';
import About from './About/About';
import CreateNewForm from './CreateNewForm/CreateNewForm';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import SyncOverview from './SyncOverview/SyncOverview';
import UserForm from './UserForm/UserForm';
import Thanks from './Thanks/Thanks';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={About} />
          <Route path='/create-new' component={CreateNewForm} />
          <Route path='/overview/:ownerId' component={SyncOverview} />
          <Route path='/user-form/:formId' component={UserForm} />
          <Route path='/thanks' component={Thanks} />
        </Switch>
      </Router>
    );
  }
}

export default App;
