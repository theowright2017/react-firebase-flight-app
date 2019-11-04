import React, {Component} from 'react';
import Banner from '../Components/Banner';
import PaymentInput from '../Components/PaymentInput';


import { Auth0Context } from '../react-auth0-spa.js';

let firebase = require('firebase');

var config = {
  apiKey: "AIzaSyA5nE2t2SY6yHWrL0iduAg70awkOxRFr4g",
  authDomain: "newflights-32f5e.firebaseapp.com",
  databaseURL: "https://newflights-32f5e.firebaseio.com",
  projectId: "newflights-32f5e",
  storageBucket: "newflights-32f5e.appspot.com",
  messagingSenderId: "212819191910",
  appId: "1:212819191910:web:a96fe6557b48480efb25a7"
};


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
      console.log(this.state.inputCardInfo);
      console.log(this.state.correctCardInfo);

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
      'outflightNo':  flight.outflightno,
      'returnflightNo':  flight.returnflightno,
      'airline': flight.airline,
      'class':  flight.class,
      'price':  flight.price,
      'return':  flight.return,
      'outdepartdate':  flight.outdepartdate,
      'outdeparttime':  flight.outdeparttime,
      'outarrivaldate':  flight.outarrivaldate,
      'outarrivaltime':  flight.outarrivaltime,
      'returndepartdate':  flight.returndepartdate,
      'returndeparttime':  flight.returndeparttime,
      'returnarrivaldate':  flight.returnarrivaldate,
      'returnarrivaltime':  flight.returnarrivaltime,

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
        <h4>Total Cost for your flight is {this.state.flight.price}</h4>
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



    if (this.state.flight !== null) {

    return(
      <div>
        <Banner title="Your flight has been selected"
                subtitle="Please proceed below to purchase" >
        </Banner >

        {paid}

      </div>
    )
  } else {
    return (
      <div>Loading....</div>
    )
  }
  }
};

export default BuyID;
