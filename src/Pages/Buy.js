import React, {Component} from 'react'
import Banner from '../Components/Banner';

class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenFlight: null
    }
  }


  componentDidMount() {
    if (this.props.location.state.flightToBook !== undefined) {
    this.setState({
      chosenFlight: this.props.location.state.flightToBook
    }, () => {
      console.log(this.state.chosenFlight);
    })
  }
  }


  render(){


    if (this.state.chosenFlight !== null){

    return(
      <div>

        <Banner title="Please review your flight details"  >

          <div>
            <h3>Airline: {this.state.chosenFlight.airline}</h3>



          </div>
        </Banner>






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
