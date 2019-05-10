import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

// Axios
import axios from 'axios';

// Route
import { Route, NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  componentDidMount(){
    axios.get('http://localhost:3333/smurfs')
    .then((res) => {
      // console.log(res), 
      this.setState({smurfs: res.data})})
    .catch((err) => {console.log(err)})
  }

  addSmurf = (smurf) => {
    console.log(smurf)
    axios.post('http://localhost:3333/smurfs', smurf)
    .then((res) => {
      // console.log(res)
      this.setState({smurfs: [...res.data]
      });
      this.props.history.push('/')
    })
    .catch((err) => {console.log(err)})

  }

  deleteSmurf = (id) => {
    console.log(id)
    axios.delete(`http://localhost:3333/smurfs/${id}`)
    .then((res) => {
      // console.log(res)
      this.setState({smurfs: [...res.data]
      })})
    .catch((err) => {console.log(err)})
  }

  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <div className="nav-div"> 
          <NavLink exact to="/">Smurfs</NavLink>
          <NavLink to="/smurf-form">Add Smurfs</NavLink>
        </div>
        {/* FORM ROUTE */}
        <Route path="/smurf-form" render={(props) => <SmurfForm {...props} addSmurf={this.addSmurf} />} />
        {/* <SmurfForm addSmurf={this.addSmurf} /> */}

        {/* SMURFS ROUTE */}
        <Route exact path="/" render={(props) => <Smurfs {...props} smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf} />} />
        {/* <Smurfs smurfs={this.state.smurfs} /> */}
      </div>
    );
  }
}

export default App;
