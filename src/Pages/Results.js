import React, {Component} from 'react'
import Banner from '../Components/Banner'

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    }
  }

  componentDidMount() {
    if (this.props.location.state !== undefined){
    console.log(this.props.location.state.matched)
  }
  }

  handleClick = () => {
    this.setState({
      expand: true
    })
  }


  render(){
    let matchedFlights;
    if (this.props.location.state !== undefined){
      matchedFlights = this.props.location.state.matched

    return(
      <div>

        <hr />
        <ul className="matched-flights">
          {matchedFlights.map((flight, index) => (
            <li key={index}>
              <span><b>Airline:</b> {flight.carrier} | </span>
              <span><b>Departure Date:</b> {flight.outdepartdate} | </span>
              <span><b>Return Date:</b> {flight.outdepartdate} | </span>
              <span><b>Price:</b> {flight.originalprice} | </span>
              <span><b>Class</b> {flight.outflightclass} | </span>
                    <button>choose</button>
               </li>
          ))}
        </ul>
        <hr />
      </div>
    )
  } else {
    return (
      <Banner title="No flights found"
              subtitle="Please go back to Search!"/>
    )
  }
}
};

export default Results;
