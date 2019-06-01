import React from 'react';
import './App.css';
import styled from 'styled-components';
import Map from './Map';


String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const compareCoordinates = (coord1, coord2) => {
  fetch("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDJnouqtMzKUzV-TfyR5TblsZcAcGYSjsE")
  .then(x => console.log(x.json()))
};

const initial = {
  coord1: "",
  coord2: "",
  first: "",
  second: "",
  mapObjects: [],
  extraLat: "",
  extraLng: "",
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initial;

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    let finalVal = [];
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.coord1.replace(/ /g,"+")},&key=AIzaSyDJnouqtMzKUzV-TfyR5TblsZcAcGYSjsE`)
    .then(x => x.json())
    .then(x => {
      console.log(x)
      this.setState({
        first: x.results[0].geometry.location,
      })
      finalVal.push({name: this.state.coord1.capitalize(), ...x.results[0].geometry.location})
    })

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.coord2.replace(/ /g,"+")},&key=AIzaSyDJnouqtMzKUzV-TfyR5TblsZcAcGYSjsE`)
    .then(x => x.json())
    .then(x => {
      console.log(x)
      finalVal.push({name: this.state.coord2.capitalize(), ...x.results[0].geometry.location})
      this.setState({
        second: x.results[0].geometry.location,
        mapObjects: finalVal,
      })
      this.setState({
        extraLat: this.state.first.lat,
        extraLng: this.state.first.lng,
      })
    })
  }
  render(){
    return (
      <Main>
        <LeftCol>
          <div className="App">
          <header className="App-header">
            <div className="fadeInLeft animated intro">
              <h1>
                LatLong
              </h1>
              <p>Compare two places to get their relative coordinates.</p>
            </div>
          <main>
            <Wrapper onSubmit={this.handleSubmit} className="fadeInLeft animated">
              {!this.state.first && !this.state.second &&
              <>
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
              </>
              }
            </Wrapper>
          </main>
          {this.state.first && this.state.second &&
          <>
            <Results>
            <h2>Results:</h2>
              <Result>
                <strong>
                With the latitude from {this.state.coord1.capitalize()} and longitude from {this.state.coord2.capitalize()}:
                </strong> 
                {this.state.first.lat}, {this.state.second.lng}</Result>
              <Result>
              <strong>
                With the latitude from {this.state.coord2.capitalize()} and longitude from {this.state.coord1.capitalize()}:
              </strong>
              {this.state.second.lat}, {this.state.first.lng}</Result>
            </Results>
            <StartOver onClick={() => {this.setState(initial)}}>Start over</StartOver>
          </>
          }
          <Footer>
            made with ♥ in paris by <a href="https://twitter.com/nicbovee">@nicbovee</a>
          </Footer>
          </header>
        </div>
   
        </LeftCol>
   
        {!this.state.first && !this.state.second &&
          <RightCol>
            <p>Enter a few names of some places.</p>
            
          </RightCol>
        }
        {this.state.first && this.state.second &&
          <div>
            <Map mapObjects={this.state.mapObjects}/>
          </div>
        }

      </Main>
      
    );
  }
}

export default App;

const Main = styled.main`
  display: flex;
  max-width: 100vw;
`
const LeftCol = styled.div`

`
const RightCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #353535;
  flex: 1;
  color: #797171;
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  color: white;
  padding: 5px;
  a {
    color: white;
  }
  font-size: 12px;
`
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
caret-color: #1b9660;
&:focus {
  outline: none;
}
&::placeholder {
  color: #ffffff80;
}
@media screen and (max-width: 400px){
  &::placeholder {
    font-size: 12px;
  }
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
const StartOver = styled.button`
border: 1px solid #1b9660;
padding: 15px;
color: #fff;
font-size: 20px;
margin-top: 15px;
cursor: pointer;
background: none;

&:hover {
  background: #32a975;
}
`

const Results = styled.div`
  margin: 30px 0;
  border: 2px solid #3e3b3b;
  border-radius: 3px;
  padding: 15px 20px;
  background: #252525;
  line-height: .5;
  overflow-x: scroll;
  max-width: 400px;
`

const Result = styled.p`
font-size: 16px;
word-break: break-word;
line-height: 1.3;
text-align: left;
`
