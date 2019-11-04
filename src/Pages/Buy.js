import React, {Component} from 'react'
import Banner from '../Components/Banner';

import FlightReview from '../Components/FlightReview'

class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenFlight: null,
      uid: null
    }
  }


  componentDidMount() {
    if (this.props.location.state.flightToBook !== undefined) {
    this.setState({
      chosenFlight: this.props.location.state.flightToBook,
      uid: this.props.location.state.flightToBook.id
    }, () => {
      console.log(this.state.chosenFlight);
    })
  }
  }


  goBackToResults = () => {
    this.props.history.push({
      pathname: "/results",
      state: {
        matched: this.props.location.state.allFlights
      }

    })
  }

  proceedToBuy = () => {
    this.props.history.push({
      pathname: `/buy:${this.state.uid}`,
      state: {
        flight: this.state.chosenFlight
      }
    })


  }


  render(){


    if (this.state.chosenFlight !== null){

    return(
      <div>

        <Banner title="Please review your flight details below"  >
          <div>
            <h3>If you would like to proceed, click OK!</h3>
            <h3>Otherwise click BACK! to go back to results</h3>
          </div>
          <div>
            <button onClick={this.proceedToBuy}>OK!</button>
            <button onClick={this.goBackToResults}>BACK!</button>
          </div>
        </Banner>

        <hr />

        <div>
          <FlightReview flight={this.state.chosenFlight} />
        </div>
      </div>
    )


  } else {
    return (
      <div>Loading...</div>
    )
  }
  }
};

export default Buy;
