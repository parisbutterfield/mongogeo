import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';





class AddLocation extends Component {

  constructor() {
    super();
    this.state = {
      locations: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postData = this.postData.bind(this);

  }

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
      .then(response => response.json()) // parses response to JSON
      .catch(error => console.error(`Fetch Error =\n`, error));
  };

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

  handleSubmit(event) {
    event.preventDefault();
    const form = {

        lon: this.state.lon,
        lat: this.state.lat
       }
       this.postData("http://localhost:49160/addLocation", form);

  }

componentDidMount() {
    fetch("http://localhost:49160/getLocations")
    .then(results => {
        return results.json()
    }).then(data => {
        let locations = data.map((location) => {
            return (
                  <tr>
    <td>{location.text}</td>
    <td>{location.loc.coordinates[0]}</td>
    <td>{location.loc.coordinates[1]}</td>

  </tr>


            )
        })
        this.setState({locations: locations})

    })
}



  render() {
    return (<div>
        <h2> Add a manual location </h2>
            <form onSubmit={this.handleSubmit}>
              <label>
                Longitude:
                <input type="text" name="lon" value={this.state.value} onChange={this.handleChange} />
              </label>

            <label>
                Latitude:
                <input type="text" name="lat" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>

</div>

    );
  }
}

export default AddLocation;
