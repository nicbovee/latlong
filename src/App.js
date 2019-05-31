import React from 'react';
import './App.css';
import styled from 'styled-components';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const compareCoordinates = (coord1, coord2) => {
  fetch("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDJnouqtMzKUzV-TfyR5TblsZcAcGYSjsE")
  .then(x => console.log(x.json()))
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coord1: "",
      coord2: "",
      first: "",
      second: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.coord1.replace(/ /g,"+")},&key=AIzaSyDJnouqtMzKUzV-TfyR5TblsZcAcGYSjsE`)
    .then(x => x.json())
    .then(x => {
      console.log(x)
      this.setState({
        first: x.results[0].geometry.location,
      })
    })
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.coord2.replace(/ /g,"+")},&key=AIzaSyDJnouqtMzKUzV-TfyR5TblsZcAcGYSjsE`)
    .then(x => x.json())
    .then(x => {
      console.log(x)
      this.setState({
        second: x.results[0].geometry.location,
      })
    })
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            LatLong
          </h1>
          <p>Compare two places to get their relative coordinates.</p>
        <main>
          <Wrapper onSubmit={this.handleSubmit}>
            <StyledInput 
            type="text" 
            value={this.state.coord1}
            placeholder="Enter the name of the first place (i.e. 'paris')" 
            onChange={ (event) => this.setState({coord1: event.target.value})}
            />
            <br/>
            <StyledInput 
            type="text" 
            value={this.state.coord2}
            placeholder="Enter the name of the second place (i.e. 'colorado')" 
            onChange={ (event) => this.setState({coord2: event.target.value})}
            />
            <Submit type="submit" value="Submit" />
          </Wrapper>
        </main>
        {this.state.first && this.state.second &&

        <>
          <p>With the latitude from {this.state.coord2.capitalize()} and longitude from {this.state.coord1.capitalize()}: {this.state.first.lat}, {this.state.second.lng}</p>
          <p>With the latitude from {this.state.coord1.capitalize()} and longitude from {this.state.coord2.capitalize()}: {this.state.second.lat}, {this.state.first.lng}</p>
        </>
        }
        </header>
  
      </div>
    );
  }
}

export default App;
const Wrapper = styled.form`
display: flex;
flex-direction: column;
`
const StyledInput = styled.input`
padding: 15px;
padding-left: 0;
margin-bottom: 10px;
min-width: 350px;
background: none;
border: none;
border-bottom: solid 1px #fff;
color: white;
font-size: 18px;

&::placeholder {
  color: #ffffff80;
}
` 
const Submit = styled.input`
background: #1b9660;
padding: 15px;
color: #fff;
font-size: 20px;
border: none;
margin-top: 15px;
cursor: pointer;

&:hover {
  background: #32a975;
}
`
