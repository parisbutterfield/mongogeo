import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import logo from './logo.svg';
import './App.css';
import Location from './Location.js'
import AddLocation from './AddLocation.js'


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))



class App extends Component {

   postData = (url = ``, data = {}) => {
    // Default options are marked with *
      return fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, same-origin, *omit
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => { response.json(); this.location.refresh();}) // parses response to JSON
      .catch(error => console.error(`Fetch Error =\n`, error));
  };
  showPosition(position) {
    const data = {

      lon: position.coords.longitude,
      lat: position.coords.latitude
     }
     this.postData("http://localhost:49160/addLocation", data);
     
 }
 

   getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    } else {
        window.alert("Geolocation is not supported by this browser.");
    }
}


  render() {
    return (
      <div className="App">
<button onClick={this.getLocation.bind(this)}>
  Add My Current Geolocation Location
</button>    
<AddLocation/>  
<Location ref={(ip) => {this.location = ip}}/>

</div>
    );
  }
}

export default App;
