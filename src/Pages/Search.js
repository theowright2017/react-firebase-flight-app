import React, {Component} from 'react'
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
import {Link} from 'react-router-dom'


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

      flight: null
    }
  }

  componentDidMount(){
    let flightsRef = firebase.database().ref('0')

    flightsRef.on('value', snapshot => {
      let allFlights = snapshot.val().flights
      this.setState({
        flights: allFlights
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

    const flights = this.state.flights

    let inputFlight = {
      departureAirport:    this.refs.departure_airport.value,
      destinationAirport:  this.refs.destination_airport.value,
      departureDay:        this.refs.departure_day.value,
      departureMonth:      this.refs.departure_month.value,
      departureYear:       this.refs.departure_year.value,
      returnDay:           this.refs.return_day.value,
      returnMonth:         this.refs.return_month.value,
      returnYear:          this.refs.return_year.value
    }


    //convert date back to database date match
    let depmonth = this.refs.departure_month.value;
    let retmonth = this.refs.return_month.value;
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

    let newDepartureDate = this.refs.departure_year.value + "-" +
                           numericalDepMonth + "-" +
                           this.refs.departure_day.value
    let newReturnDate = this.refs.return_year.value + "-" +
                           numericalRetMonth + "-" +
                           this.refs.return_day.value
    // end of date conversion

    let matchingFlights = []

    flights.forEach((flight) => {
      if ( inputFlight.departureAirport === flight.depair &&
           inputFlight.destinationAirport === flight.destair) {
        matchingFlights.push(flight)
      }
      })

    console.log(matchingFlights);

  // TODO render matching flight , expand match criteria




  }






  render(){
    let {isLoaded,
        allAirports,
        departureAirports,
        destinationAirports,
        allUniqueDates,
        dateComponents} = this.state;

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

        <form onSubmit={this.searchFlights}>

          <span>Departure Airport</span>
          <select name="search-airports" ref="departure_airport">
            {departureAirports.map((airport, index) => (
              <option key={index}>{airport}</option>
            ))}
          </select>

          <span>Destination Airport</span>
          <select name="search-airports" ref="destination_airport">
            {destinationAirports.map((airport, index) => (
              <option key={index}>{airport}</option>
            ))}
          </select>

          <br />

          <span>Departure Date</span>
          <select name="search-dates" ref="departure_day">
            {dateComponents.day.map((day, index) => (
              <option key={index}>{day}</option>
            ))}
          </select>
          <select name="search-dates" ref="departure_month">
            {dateComponents.month.map((month, index) => (
              <option key={index}>{month}</option>
            ))}
          </select>
          <select name="search-dates" ref="departure_year">
            {dateComponents.year.map((year, index) => (
              <option key={index}>{year}</option>
            ))}
          </select>

          <span>Return Date</span>
            <select name="search-dates" ref="return_day">
              {dateComponents.day.map((day, index) => (
                <option key={index}>{day}</option>
              ))}
            </select>
            <select name="search-dates" ref="return_month">
              {dateComponents.month.map((month, index) => (
                <option key={index}>{month}</option>
              ))}
            </select>
            <select name="search-dates" ref="return_year">
              {dateComponents.year.map((year, index) => (
                <option key={index}>{year}</option>
              ))}
            </select>

            <button>Search</button>

          </form>





          <Link to="/results" >
            Search
          </Link>

      </Banner>

      <h3 id="flight"></h3>


    </Hero>
    )
  }
  }
};

export default Search;
