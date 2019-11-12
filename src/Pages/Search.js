import React, {Component} from 'react'
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';


import SelectOption from '../Components/SelectOption';



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
      noMatch: "",

      checked: false,
      monthChecked: false,
      returnNormal: "select-component",
      returnHidden: "select-component-hidden",

      select: false


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
        default:
          console.log("switch error");
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
      departureAirport:    this.depairRef.current.value,
      destinationAirport:  this.destairRef.current.value,
      departureDay:        this.depdayRef.current.value,
      departureMonth:      this.depmonthRef.current.value,
      departureYear:       this.depyearRef.current.value,
      returnDay:           this.retdayRef.current.value,
      returnMonth:         this.retmonthRef.current.value,
      returnYear:          this.retyearRef.current.value
    }



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
            default:
              console.log("switch error");
    }
    // end of date conversion


    inputFlight.departureDate = `${inputFlight.departureYear}-${numericalDepMonth}-${inputFlight.departureDay}`


      inputFlight.returnDate = `${inputFlight.returnYear}-${numericalRetMonth}-${inputFlight.returnDay}`



    let matchingFlightsArray = []
    let month;

     month = inputFlight.returnDate.split('-')[1]


    flights.forEach((flight) => {
      if (  flights.length <= 150 &&
            inputFlight.departureAirport === flight.depair &&
            inputFlight.destinationAirport === flight.destair) {

               matchingFlightsArray.push(flight)

      }
      else
            // if return flight is checked
      if (flights.length > 150 && this.state.checked === true &&
           this.state.monthChecked === false &&
            inputFlight.departureAirport === flight.depair &&
            inputFlight.destinationAirport === flight.destair &&
            inputFlight.departureDate === flight.outdepartdate &&
            inputFlight.returnDate === flight.indepartdate) {

              matchingFlightsArray.push(flight)
            }
            // if return flight unchecked
      else if (flights.length > 150 && this.state.checked === false &&
               this.state.monthChecked === false &&
               inputFlight.departureAirport === flight.depair &&
               inputFlight.destinationAirport === flight.destair &&
               inputFlight.departureDate === flight.outdepartdate &&
               flight.indepartdate === "") {

                 matchingFlightsArray.push(flight)
            }
            // if month only no return is checked
      else if (flights.length > 150 && this.state.monthChecked === true &&
               month === numericalRetMonth && this.state.checked === false &&
               inputFlight.departureAirport === flight.depair &&
               flight.indepartdate === "" ) {

                    matchingFlightsArray.push(flight)
               }
            //month only and return checked
      else if (flights.length > 150 && this.state.monthChecked === true &&
               month === numericalRetMonth && this.state.checked === true &&
               inputFlight.departureAirport === flight.depair &&
               inputFlight.destinationAirport === flight.destair &&
               flight.indepartdate !== ""
               ) {

                   matchingFlightsArray.push(flight)
               }
      })

      if ( month === numericalRetMonth){
        console.log(true);
      }




    this.setState({
      matchingFlights: matchingFlightsArray
    }, () => {
      console.log(this.state.matchingFlights);

      this.passPropsToResultAndRedirect()

      this.renderFlights()
    })

  }

  //////////////////////////////////

  renderFlights = () => {
    this.setState({
      renderFlight: true
    })
  }

    //////////////////////////////////

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


    handleCheckBox = (event) => {
      this.setState({
        checked: !this.state.checked
      })
    }

    handleMonthSearch = () => {
      this.setState({
        monthChecked: !this.state.monthChecked,
        select: !this.state.select

      })
    }










  render(){
    let {isLoaded,
        departureAirports,
        destinationAirports,
        dateComponents,
        noMatch,
        checked,
        monthChecked,
        select} = this.state;

    let disabled;
      if (this.state.checked === false) {
        disabled = "disabled"
      }

    let monthOnly;
      if (this.state.monthChecked === true) {
        monthOnly = "disabled"
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

        <br />

      <div className="hint">
        <p>Popular Destinations: LGW to LAS</p>
        <p>Popular Dates: Dep 01/Jan  Return 20/Jan</p>
        <p>Or just search whole month</p>
      </div>

        <form >



          <SelectOption name="Departure Airport"
                        selectName="search-airports"
                        selectRef={this.depairRef}
                        mapName={departureAirports}
                        item="airport"
                        className="select-component"
                        />

          <SelectOption name="Destination Airport"
                        selectName="search-airports"
                        selectRef={this.destairRef}
                        mapName={destinationAirports}
                        item="airport"
                        className="select-component"/>

                      <div className="tickboxes">
                        <input type="checkbox" onChange={this.handleCheckBox} id="return" name="return" checked={checked}/>
                          <label htmlFor="return">return</label>
                      </div>

                      <div className="tickboxes">
                        <input type="checkbox" onChange={this.handleMonthSearch} id="months" name="months" checked={monthChecked}/>
                          <label htmlFor="months">search whole month</label>
                      </div>


          <br />

            <SelectOption name="Departure Date"
                          selectName="search-dates"
                          selectRef={this.depdayRef}
                          mapName={dateComponents.day}
                          item="day"
                          disabled={monthOnly}
                          className="select-component"/>

            <SelectOption name=""
                          selectName="search-dates"
                          selectRef={this.depmonthRef}
                          mapName={dateComponents.month}
                          item="month"
                          className="select-component"
                          />

            <SelectOption name=""
                          selectName="search-dates"
                          selectRef={this.depyearRef}
                          mapName={dateComponents.year}
                          item="year"
                          disabled={monthOnly}
                          className="select-component"/>



                        <SelectOption name="Return Date"
                          selectName="search-dates"
                          selectRef={this.retdayRef}
                          mapName={dateComponents.day}
                          item="day"
                          disabled="disabled"
                          className={monthChecked ? "select-component" : "select-component-hidden"}/>
                        <SelectOption name="Return Date"
                          selectName="search-dates"
                          selectRef={this.retdayRef}
                          mapName={dateComponents.day}
                          item="day"
                          disabled={disabled}
                          className={monthChecked ? "select-component-hidden" : "select-component"}/>

            <SelectOption name=""
                          selectName="search-dates"
                          selectRef={this.retmonthRef}
                          mapName={dateComponents.month}
                          item="month"
                          disabled={disabled}
                          className="select-component"/>

                        <SelectOption name="" className="return-date"
                          selectName="search-dates"
                          selectRef={this.retyearRef}
                          mapName={dateComponents.year}
                          item="year"
                          disabled="disabled"
                          className={monthChecked ? "select-component" : "select-component-hidden"}/>
                        <SelectOption name="" className="return-date"
                          selectName="search-dates"
                          selectRef={this.retyearRef}
                          mapName={dateComponents.year}
                          item="year"
                          disabled={disabled}
                          className={monthChecked ? "select-component-hidden" : "select-component"}/>




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
