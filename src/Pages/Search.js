import React, {Component, useState} from 'react'
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';

import {Link} from 'react-router-dom';

import SelectOption from '../Components/SelectOption';
import RenderFlight from '../Components/RenderFlight';


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

  firebase.initializeApp(config);



class Search extends Component {
  constructor(props) {
    super(props);

    this.depairRef = React.createRef()
    this.destairRef = React.createRef()
    this.depdayRef = React.createRef()
    this.depmonthRef = React.createRef()
    this.depyearRef = React.createRef()
    this.retdayRef = React.createRef()
    this.retmonthRef = React.createRef()
    this.retyearRef = React.createRef()


    this.state = {
      isLoaded: false,
      flights: [],
      departureAirports: [],
      destinationAirports: [],
      allAirports: [],

      departureDates: [],
      arrivalDates: [],
      allUniqueDates: [],

      dateComponents: {
        day:[],
        month: [],
        year: []
      },

      matchingFlights: [],
      renderFlight: false,
      noMatch: ""

    }
  }

  componentDidMount(){
    let flightsRef = firebase.database().ref('0')

    flightsRef.on('value', snapshot => {
      let allFlights = snapshot.val().flights
      this.setState({
        flights: allFlights
      }, () => {
          console.log(this.state.flights);
      })
    })



  }


  componentDidUpdate(prevProps, prevState) {
    if( this.state.flights !== prevState.flights ) {

    this.setDepartureAirportsToUniqueArray()

    this.setDestinationAirportsToUniqueArray()

    this.setAllAirportToUniqueArray()

    this.setDepartureAndArrivalDatesToUniqueArray()

    this.getAllUniqueDates()

    this.setState({
      isLoaded: true
    })


  }
  }

  setDepartureAirportsToUniqueArray = () => {
    const flights = this.state.flights;
    const depair = flights.map(flight => flight.depair)
    let uniqueArray = [...new Set(depair)]
    this.setState({
      departureAirports: uniqueArray.sort()
    })
  }


  setDestinationAirportsToUniqueArray = () => {
    const flights = this.state.flights;
    const destair = flights.map(flight => flight.destair)
    let uniqueArray = [...new Set(destair)]
    this.setState({
      destinationAirports: uniqueArray.sort()
    })
  }


  // gets all unique airport codes
  setAllAirportToUniqueArray = () => {
    const flights = this.state.flights;
    const depair = flights.map(flight => flight.depair);
    const arrair = flights.map(flight => flight.destair);
    const allDeps = depair.concat(arrair);
    let uniqueArray  = [...new Set(allDeps)];
    this.setState({
      allAirports: uniqueArray.sort()
    })
  }


  // sets unique dep and arr dates to state
  setDepartureAndArrivalDatesToUniqueArray = () => {
    const flights = this.state.flights;

    const depDates = flights.map(flight => flight.outarrivaldate);
    const arrDates = flights.map(flight => flight.inarrivaldate);
    let uniqueArrayDep = [...new Set(depDates)].filter( (date) => {
      return date !== ""
    });
    let uniqueArrayArr = [...new Set(arrDates)].filter( (date) => {
      return date !== ""
    })

    this.setState({
      departureDates: uniqueArrayDep.sort(),
      arrivalDates: uniqueArrayArr.sort()
    })
  }

  // sets all unique dates, combines arr and dep, then calls splitDateStringIntoDMY
  getAllUniqueDates = () => {
    const flights = this.state.flights;

    const depDates = flights.map(flight => flight.outarrivaldate);
    const arrDates = flights.map(flight => flight.inarrivaldate);

    let allDates = depDates.concat(arrDates).filter( (date) => {
      return date !== ""
    })

    let uniqueArray = [...new Set(allDates)]

    this.setState({
      allUniqueDates: uniqueArray.sort()
    }, () => {
        this.splitDateStringIntoDMY()
    })
  }



  splitDateStringIntoDMY = () => {

    let dates = this.state.allUniqueDates

    let eachPart = [];
    let days = [];
    let months = [];
    let years = [];

    for (let i = 0; i < dates.length; i++) {
      let date = dates[i].split('-')
      eachPart.push(date)
      days.push(date[2])

      //collapsed
      switch (date[1].toString()) {
        case '01':
              date.splice(1,1,"Jan")
              break;
        case '02':
              date.splice(1,1,"Feb")
              break;
        case '03':
              date.splice(1,1,"Mar")
              break;
        case '04':
              date.splice(1,1,"Apr")
              break;
        case '05':
              date.splice(1,1,"May")
              break;
        case '06':
              date.splice(1,1,"June")
              break;
        case '07':
              date.splice(1,1,"July")
              break;
        case '08':
              date.splice(1,1,"Aug")
              break;
        case '09':
              date.splice(1,1,"Sep")
              break;
        case '10':
              date.splice(1,1,"Oct")
              break;
        case '11':
              date.splice(1,1,"Nov")
              break;
        case '12':
              date.splice(1,1,"Dec")
              break;
      }

      months.push(date[1])
      years.push(date[0])
    }


    this.setState({
      dateComponents: {
        day: [...new Set(days)].sort(),
        month: [...new Set(months)],
        year: [...new Set(years)].sort()
      }
    })
  }




  searchFlights = (e) => {
    e.preventDefault()
    console.log("now");

    const flights = this.state.flights

    let inputFlight = {
      departureAirport:    this.depairRef.current.value,
      destinationAirport:  this.destairRef.current.value,
      departureDay:        this.depdayRef.current.value,
      departureMonth:      this.depmonthRef.current.value,
      departureYear:       this.depyearRef.current.value,
      returnDay:           this.retdayRef.current.value,
      returnMonth:         this.retmonthRef.current.value,
      returnYear:          this.retyearRef.current.value
    }
    console.log(inputFlight);


    //convert date back to database date match
    let depmonth = this.depmonthRef.current.value;
    let retmonth = this.retmonthRef.current.value;
    let numericalDepMonth = "";
    let numericalRetMonth = "";

    //collapsed
    switch (depmonth, retmonth) {
      case 'Jan':
            numericalDepMonth = "01"
            numericalRetMonth = "01"
            break;
      case 'Feb':
            numericalDepMonth = "02"
            numericalRetMonth = "02"
            break;
      case 'Mar':
            numericalDepMonth = "03"
            numericalRetMonth = "03"
            break;
      case 'Apr':
            numericalDepMonth = "04"
            numericalRetMonth = "04"
            break;
      case 'May':
            numericalDepMonth = "05"
            numericalRetMonth = "05"
            break;
      case 'June':
            numericalDepMonth = "06"
            numericalRetMonth = "06"
            break;
      case 'July':
            numericalDepMonth = "07"
            numericalRetMonth = "07"
            break;
      case 'Aug':
            numericalDepMonth = "08"
            numericalRetMonth = "08"
            break;
      case 'Sep':
            numericalDepMonth = "09"
            numericalRetMonth = "09"
            break;
      case 'Oct':
            numericalDepMonth = "10"
            numericalRetMonth = "10"
            break;
      case 'Nov':
            numericalDepMonth = "11"
            numericalRetMonth = "11"
            break;
      case 'Dec':
            numericalDepMonth = "12"
            numericalRetMonth = "12"
            break;
    }

    let newDepartureDate = this.depyearRef.current.value + "-" +
                           numericalDepMonth + "-" +
                           this.depdayRef.current.value
    let newReturnDate = this.retyearRef.current.value + "-" +
                           numericalRetMonth + "-" +
                           this.retdayRef.current.value
    // end of date conversion

    let matchingFlightsArray = []

    flights.forEach((flight) => {
      if ( inputFlight.departureAirport === flight.depair &&
           inputFlight.destinationAirport === flight.destair) {
        matchingFlightsArray.push(flight)
      }
      })


    this.setState({
      matchingFlights: matchingFlightsArray
    }, () => {
      console.log(this.state.matchingFlights);

      this.passPropsToResultAndRedirect()

      this.renderFlights()
    })

  }

  renderFlights = () => {
    this.setState({
      renderFlight: true
    })
  }

  passPropsToResultAndRedirect = () => {
    if (this.state.matchingFlights.length !== 0) {
    this.props.history.push({
      pathname: "/results",
      state: {
        matched: this.state.matchingFlights
      }
    })
    } else {
      this.setState({
        noMatch: "No Matching Flights, Please Try Again"
      })
    }
    }










  render(){
    let {isLoaded,
        allAirports,
        departureAirports,
        destinationAirports,
        allUniqueDates,
        dateComponents,
        noMatch} = this.state;



    let flightsRendered = ""
    if (this.state.matchingFlights.length !== 0) {
      flightsRendered = <h3>Loading...</h3>
    }




    if (!isLoaded) {
      return(
      <Banner title="Search for Flights below">
        <div>Loading....</div>
      </Banner>
    )
    } else {
    return(
    <Hero>
      <Banner title="Search for Flights below">

        <form >



          <SelectOption name="Departure Airport"
                        selectName="search-airports"
                        selectRef={this.depairRef}
                        mapName={this.state.departureAirports}
                        item="airport"   />

          <SelectOption name="Destination Airport"
                        selectName="search-airports"
                        selectRef={this.destairRef}
                        mapName={this.state.destinationAirports}
                        item="airport"   />


          <br />

            <SelectOption name="Departure Date"
                          selectName="search-dates"
                          selectRef={this.depdayRef}
                          mapName={this.state.dateComponents.day}
                          item="day"   />

            <SelectOption name=""
                          selectName="search-dates"
                          selectRef={this.depmonthRef}
                          mapName={this.state.dateComponents.month}
                          item="month"   />

            <SelectOption name=""
                          selectName="search-dates"
                          selectRef={this.depyearRef}
                          mapName={this.state.dateComponents.year}
                          item="year"   />



            <SelectOption name="Return Date"
                          selectName="search-dates"
                          selectRef={this.retdayRef}
                          mapName={this.state.dateComponents.day}
                          item="day"   />

            <SelectOption name=""
                          selectName="search-dates"
                          selectRef={this.retmonthRef}
                          mapName={this.state.dateComponents.month}
                          item="month"   />

            <SelectOption name=""
                          selectName="search-dates"
                          selectRef={this.retyearRef}
                          mapName={this.state.dateComponents.year}
                          item="year"   />




            <button onClick={this.searchFlights}>Search!</button>




          </form>

      </Banner>

      <h2>{noMatch}</h2>



    </Hero>
    )
  }
  }
};

export default Search;

// let renderFlights = ""
//   this.state.matchingFlights.length !== 0 ?
//   renderFlights = <RenderFlight flights={this.state.matchingFlights}/> :
//   renderFlights = <div>No Matching Flights</div>
