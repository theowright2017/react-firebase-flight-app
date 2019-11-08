import React, {Component} from 'react'
import Banner from '../Components/Banner'
import MatchingResults from '../Components/MatchingResults'

import  {NavItem}  from 'react-bootstrap';

import { Auth0Context } from '../react-auth0-spa.js';

import Modal from 'react-modal';
import ModalContent from '../Components/ModalContent'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '80vw',
    height                : '80vh'
  }
};

Modal.setAppElement('#root')

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




class Account extends Component {
  // used in functional component :
  // const user = useContext(Auth0Context)
  static contextType = Auth0Context;
  static defaultProps = {
      clientID: "zwTGLcqiVpL6HBwXnTmp1y4ERpjUSggI",
      domain: "dev-muwdmw8b.eu.auth0.com"
    }

  constructor(props) {
    super(props);

    this.state = {
      bookedFlights: null,
      dbFlights: null,
      accountName: "",
      bookingNumber: null,

      modalIsOpen: false,
      showRightModal: "modal-return-right",
      moreFlightInfo: null
    }

  }


  componentDidMount() {
    let bookedFlights = firebase.database().ref('savedFlights').child(this.context.user.nickname)
    bookedFlights.on('value', snapshot => {
      let flights = Object.values(snapshot.val().flights)

      this.setState({
        bookedFlights: flights,
        dbFlights: flights
      }, () => {
        console.log(this.state.bookedFlights);
      })

    })
  }

  handleModalAndMoreInfoState = (item) => (event) => {
    this.setState({
      moreFlightInfo: item
    }, () => {
      if (this.state.moreFlightInfo.return === "No") {
        this.setState({
        showRightModal: "modal-return-right hidden"
      })
    } else if  (this.state.moreFlightInfo.return === "Yes") {
      this.setState({
        showRightModal: "modal-return-right"
      })
    }
    })
    this.setState({
      modalIsOpen: true
    })
  }
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }


  setSearchInput = (e) => {
    e.preventDefault();
    this.setState({
      bookingNumber: e.target.value
    })
  }

  searchFlightByBookingInput = (event) => {
    event.preventDefault()
    let flights = this.state.bookedFlights

    flights.forEach(flight => {
      if (flight.id === parseInt(event.target.input.value)) {
        this.setState({
          bookedFlights: [flight]
        })
        }
      }
    )
  }

  resetResults = () => {
    this.setState({
      bookedFlights: this.state.dbFlights
    })
  }




  render(){
    let { bookedFlights } = this.state;
    let account, info;
    /////////////////////
    if (this.context.user !== undefined) {
      account =
          <h3> Welcome {
            <Auth0Context.Consumer>
              {context => (
            <span>{context.user.email}</span>
              )}
            </Auth0Context.Consumer>
          }</h3>

        info =
          <h4>Please see below for booked flights</h4>

      } else {
        account =
            <h3>Please log in to see details of your account</h3>
        info = ""
      }
      ///////////////////////

      let modal = ""
      if (this.state.moreFlightInfo !== null) {
        modal =
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

        <ModalContent flight={this.state.moreFlightInfo}
                      close={this.closeModal}
                      rightModal={this.state.showRightModal}
                      buttonClass="select-option-hidden"/>

        </Modal>
      }


        ///////////return/////////////////
      if (bookedFlights !== null) {
      return(
        <div>
          <Banner title="Click to access account">

            {account}

          </Banner>

            {info}
            <div>
            <form onSubmit={this.searchFlightByBookingInput}>
              <span>Search by your booking number: </span>
              <input onChange={this.setSearchInput} name="input"/>
              <button >submit</button>
            </form>
            <button onClick={this.resetResults}>reset results</button>
          </div>

            <MatchingResults flights={this.state.bookedFlights}
                             onClick={this.handleModalAndMoreInfoState} />


            {modal}


        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }


  }
};

export default Account;
