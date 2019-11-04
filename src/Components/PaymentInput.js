import React, {Component} from 'react'

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

// firebase.initializeApp(config);



class PaymentInput extends Component {


  componentDidMount() {
    let payment = firebase.database().ref('payment details')

    payment.on('value', snapshot => {
      console.log(snapshot.val());
      this.props.setCardDetailstFromFirebase(snapshot.val())
    })
  }

  handlePaymentInput = (e) => {
    e.preventDefault();
    this.props.payWithCard(e)
    e.target.cardnumber.value = ""
    e.target.validfrom.value = ""
    e.target.expiry.value = ""
    e.target.threedigits.value = ""
  }




  render(){

    let button;
    if (this.props.canPay === true) {
      button =
        <button>Submit</button>
    } else {
      button =
      <button disabled>Please Wait..</button>
    }


    return(
      <div>
        <form onSubmit={this.handlePaymentInput}>
        <h4>Please input payment details: </h4>
         <span>Card Number:  </span>
          <input type="text" name="cardnumber" placeholder="4444555566667777" defaultValue="4444555566667777"/>
          <br />
         <span>Valid From:  </span>
          <input type="text" name="validfrom" placeholder="01/01/2019" defaultValue="01/01/2019"/>
          <br />
         <span>Expiry:  </span>
          <input type="text"  name="expiry" placeholder="01/01/2024" defaultValue="01/01/2024"/>
          <br />
          <span>Three Digits:  </span>
           <input type="text" name="threedigits" placeholder="456" defaultValue="456"/>
           {button}

        </form>
      </div>
    )
  }
};

export default PaymentInput;
