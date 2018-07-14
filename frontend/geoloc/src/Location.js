import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';





class Location extends Component {

  constructor() {
    super();
    this.state = {
      locations: [],
    };

    this.refresh = this.refresh.bind(this);
    this.getFromServer = this.getFromServer.bind(this);


  }

refresh(){
  this.getFromServer();
}

getFromServer() {


  fetch("http://localhost:49160/getLocations")
    .then(results => {
        return results.json()
    }).then(data => {
        let locations = data.map((location, index) => {
            return (
        <tr key={index}>
    <td>{location.text}</td>
    <td>{location.loc.coordinates[0]}</td>
    <td>{location.loc.coordinates[1]}</td>

  </tr>

            )
        })
        this.setState({locations: locations})

    })
}

componentDidMount() {
   this.getFromServer();
}



  render() {
    return (
      <div>
      <h2> Locations List </h2>
        <table>
          <tbody> 
  <tr>
    <th>id</th>
    <th>Longitude</th>
    <th>Latitude</th>
  </tr>

    {this.state.locations}
    </tbody> 
  </table>
</div>


    );
  }
}

export default Location;
