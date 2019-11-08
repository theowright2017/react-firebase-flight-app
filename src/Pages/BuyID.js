import React, {Component} from 'react';
import Banner from '../Components/Banner';
import PaymentInput from '../Components/PaymentInput';


import { Auth0Context } from '../react-auth0-spa.js';

let firebase = require('firebase');




class BuyID extends Component {

  static contextType = Auth0Context;

  constructor(props) {
    super(props);

    this.state = {
      flight: null,

      correctCardInfo: {
        cardNumber: "",
        validFrom: "",
        expiry: "",
        threeDigits: ""
      },

      inputCardInfo: {
        cardNumber: "",
        validFrom: "",
        expiry: "",
        threeDigits: ""
      },

      paymentCorrect: false,
      error: "",

      isSubmitted: false,
      canPay: false

    }
  }

  componentDidMount() {
    this.setState({
      flight: this.props.location.state.flight
    })
    // console.log(this.context.user);
  }

  setCardDetailstFromFirebase = (value) => {
    this.setState({
      correctCardInfo: {
         cardNumber: value.card_number.toString(),
          validFrom: value.valid_from.toString(),
          expiry: value.expires.toString(),
          threeDigits: value.three_digits.toString()
      },
      canPay: true
    })
  }

  payWithCard = (e) => {
    this.setState({
      inputCardInfo: {
        cardNumber: e.target.cardnumber.defaultValue,
        validFrom: e.target.validfrom.defaultValue,
        expiry: e.target.expiry.defaultValue,
        threeDigits: e.target.threedigits.defaultValue
      }
    }, () => {

      this.comparePaymentInfo()
      this.saveFlightToFirebase()
    })
  }

  comparePaymentInfo = () => {
    if ((this.state.correctCardInfo.cardNumber ===
         this.state.inputCardInfo.cardNumber) &&
         (this.state.correctCardInfo.validFrom ===
         this.state.inputCardInfo.validFrom) &&
         (this.state.correctCardInfo.expiry ===
         this.state.inputCardInfo.expiry) &&
         (this.state.correctCardInfo.threeDigits ===
         this.state.inputCardInfo.threeDigits)) {
      this.setState({paymentCorrect: true})
    }
    else if (this.state.correctCardInfo.cardNumber !== this.state.inputCardInfo.cardNumber) {
      this.setState({error: "Card Number Incorrect"})
    }
    else if (this.state.correctCardInfo.validFrom !== this.state.inputCardInfo.validFrom) {
      this.setState({error: "Please Check the Valid From Date"})
    }
    else if (this.state.correctCardInfo.expiry !== this.state.inputCardInfo.expiry) {
      this.setState({error: "Please Check the Expiry Date"})
    }
    else if (this.state.correctCardInfo.threeDigits !== this.state.inputCardInfo.threeDigits) {
      this.setState({error: "Please Check the Three Digit Security Number"})
    }
  }

  saveFlightToFirebase = () => {
    let flight = this.state.flight
    firebase.database().ref('savedFlights')
    .child(this.context.user.nickname)
    .child("flights")
    .child(this.state.flight.id)
    .update({
      'reservation': flight.reservation,
      'outflightno':  flight.outflightno,
      'inflightno':  flight.inflightno,
      'carrier': flight.carrier,
      'outflightclass':  flight.outflightclass,
      'originalprice':  flight.originalprice,
      'return':  flight.return,
      'outdepartdate':  flight.outdepartdate,
      'outdeparttime':  flight.outdeparttime,
      'outarrivaldate':  flight.outarrivaldate,
      'outarrivaltime':  flight.outarrivaltime,
      'indepartdate':  flight.indepartdate,
      'indeparttime':  flight.indeparttime,
      'inarrivaldate':  flight.inarrivaldate,
      'inarrivaltime':  flight.inarrivaltime,
      'id': flight.id,
      'depair': flight.depair,
      'destair': flight.destair

    }, () => {
      this.setState({
        isSubmitted: true
      })
    })
  }




  render(){

    let paid;


    if (this.state.flight !== null && this.state.paymentCorrect === false) {

      paid =
      <div>
        <h4>Total Cost for your flight is {this.state.flight.originalprice}</h4>
        <PaymentInput payWithCard={this.payWithCard}
                      setCardDetailstFromFirebase={this.setCardDetailstFromFirebase}
                      canPay={this.state.canPay}/>
        <h2>{this.state.error}</h2>
      </div>


    } else if (this.state.flight !== null) {

        paid =
        <div>
          <h3>Thank You!  Your Flight has been Booked!</h3>
          <h4>Your reference number is {this.state.flight.id}</h4>
          <h4>Please click Account to see a record of your upcoming flights</h4>
        </div>
    }



    if (this.state.flight !== null && this.context.user !== undefined) {

    return(
      <div>
        <Banner title="Your flight has been selected"
                subtitle="Please proceed below to purchase" >
        </Banner >

        {paid}

      </div>
    )
  // }
  }

  else if (this.context.user === undefined) {
    return(
      <div>
        <Banner title="Please log in before purchasing your flight!"
               >
        </Banner >
      </div>
    )
  }

   else {
    return (
      <div>Loading....</div>
    )
  }
  }
};

export default BuyID;
