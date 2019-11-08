import React, {Component} from 'react'
import Banner from '../Components/Banner'
import MatchingResults from '../Components/MatchingResults'

import Modal from 'react-modal'
import ModalContent from '../Components/ModalContent'

import SliderRange from '../Components/SliderRange';
import SortBy from '../Components/SortBy';

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



class Results extends Component {
  constructor(props) {
    super(props);

    this.priceValueRef = React.createRef()

    this.state = {
      matchingFlights: null,
      filteredFlights: null,
      expand: false,
      modalIsOpen: false,
      flightsForRender: [],
      moreFlightInfo: null,
      uniqueClasses: null,

      showRightModal: "modal-return-right",
      filterWrap: "filter-wrapper-hidden",
      filterBtn: "filter-btn",

      showFilter: false,

      rangeVal: 0,
      priceValue: 0,


        searchReturn: "",
        searchClass: "",
        searchPrice: 0

    }
  }

  componentDidMount() {
    if (this.props.location.state !== undefined){
    console.log(this.props.location.state.matched)
    this.setState({
      matchingFlights: this.props.location.state.matched
    })
        // this.mapMatchedFlightsToNewArray()
        this.mapUniqueClassElements()
  }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.filteredFlights !== prevState.filteredFlights) {
    this.setState({
      matchingFlights: this.state.filteredFlights
    })
  }
  }

  mapUniqueClassElements = () => {
    let flights = this.props.location.state.matched
    const uniqueClasses = flights.map(flight => flight.outflightclass)
    let uniqueArray = [...new Set(uniqueClasses)]
    this.setState({
      uniqueClasses: uniqueArray
    })
  }



  // afterOpenModal = () => {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = '#f00';
  // }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  handleModalAndMoreInfoState = (item) => (event) => {
    this.setState({
      expand: true,
      moreFlightInfo: item
    }, () => {
      if (this.state.moreFlightInfo.return === "No") {
        this.setState({
          showRightModal: "modal-return-right hidden"
        })
      } else if (this.state.moreFlightInfo.return === "Yes") {
        this.setState({
          showRightModal: "modal-return-right"
        })
      }
    }
    )
    this.setState({modalIsOpen: true});
    console.log(item);
  }

  updateRange = (value) => {
    this.setState({
      rangeVal: value,
      searchPrice: value
    })
  }

  filterResults = () => {
    let obj = {outflightclass: this.state.searchClass,
               originalprice: this.state.searchPrice,
               return: this.state.searchReturn}

    let results = this.state.matchingFlights;
    let filtered = [];



    results.forEach((result) => {
      if ((result.originalprice <= obj.originalprice || obj.originalprice === 0) &&
          (result.outflightclass === obj.outflightclass || obj.outflightclass === "Please choose class" || obj.outflightclass === "") &&
          (result.oneway === parseInt(obj.return) || obj.return === "")) {
            filtered.push(result)
          }

    })
    console.log(filtered);
    filtered.sort((a, b) => {
      return a.originalprice - b.originalprice
    })
    this.setState({
      filteredFlights: filtered,
      searchPrice: "",
      searchReturn: "",
      searchClass: "",
      rangeVal: 0
    })
  }

  /////// PROMISE example \\\\\\\\\\
  // filterResultsByPrice = (e) => {
  //   e.preventDefault();
  //
  //   let results = this.state.matchingFlights;
  //   let filtered = [];
  //
  //   //make setState async return promise, filter flights out by price
  //   const promiseState = async state =>
  //   new Promise(resolve => this.setState(state, resolve));
  //   promiseState({
  //     price: this.priceValueRef.current.value,
  //
  //   })
  //   .then(() => {
  //         let price = this.state.search.price
  //         results.forEach((result) => {
  //             if (result.originalprice <= price) {
  //               filtered.push(result)
  //             }
  //         })
  //         filtered.sort((a, b) => {
  //           return a.originalprice - b.originalprice
  //         })
  //   })
  //   .then(() => {
  //         this.setState({
  //           filteredFlights: filtered
  //         })
  //   })
  // }

  resetResults = () => {
    this.setState({
      matchingFlights: this.props.location.state.matched
    })

  }

  searchByReturnOrOneWay = (event) => {
    event.preventDefault();
    this.setState({
      searchReturn: event.target.value
    })
  }

  searchByClass = (event) => {
    this.setState({
      searchClass: event.target.value
    })
  }

  showFilterOptions = () => {
    let filter = this.state.showFilter

     const promiseState = async state =>
      new Promise(resolve => this.setState(state, resolve));
        promiseState({
        showFilter: !filter
      })
      .then(() => {
        if (this.state.showFilter === true) {
        this.setState({
          filterWrap: "filter-wrapper",
          filterBtn: "filter-btn-hidden"
        })
        console.log(this.state);

      } else if (this.state.showFilter === false) {
        this.setState({
          filterWrap: "filter-wrapper-hidden",
          filterBtn: "filter-btn"
        })
      }
  })
}

  passSelectedFlightDetailsToBuyAndRedirect = () => {
    if (this.state.moreFlightInfo !== null) {
    this.props.history.push({
      pathname: "/buy",
      state: {
        flightToBook: this.state.moreFlightInfo,
        allFlights: this.state.matchingFlights
      }
    })
  }
}

  ////// TODO: assign modal open to each list item button, render more info in each flight



  render(){
    let {moreFlightInfo, showRightModal, rangeVal, uniqueClasses, filterWrap, filterBtn} = this.state;
    let matchedFlights;
    if (this.state.matchingFlights !== null){
      matchedFlights = this.state.matchingFlights


    let modal = ""
      if (this.state.moreFlightInfo !== null ) {
      modal =
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >


      <ModalContent flight={this.state.moreFlightInfo}
                    pushSelected={this.passSelectedFlightDetailsToBuyAndRedirect}
                    close={this.closeModal}
                    rightModal={showRightModal}
                    buttonClass="modal-choose-wrap"/>

      </Modal>
    }





    return(
      <div>

        <hr />

        <div className={filterWrap}>
          <div className="closebtn">
            <button className="filterClose" onClick={this.showFilterOptions}>X</button>
          </div>
              <SliderRange range={rangeVal} updateRange={this.updateRange}
              priceRef={this.priceValueRef}
              resetClick={this.resetResults}
              classes={uniqueClasses}
              radioReturn={this.searchByReturnOrOneWay}
              handleClassChange={this.searchByClass}/>

            <div className="main-btn">
              <button onClick={this.filterResults}>Filter Results</button>
            </div>
            <div className="main-reset-btn">
                <button className='reset' onClick={this.resetResults}>reset all results!</button>
            </div>
        </div>


        <hr />
        <div className='filwrap'>
          <button className={filterBtn} onClick={this.showFilterOptions}>filter results</button>
        </div>

          <MatchingResults flights={this.state.matchingFlights}
                           onClick={this.handleModalAndMoreInfoState}/>
        <hr />



        {modal}

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
