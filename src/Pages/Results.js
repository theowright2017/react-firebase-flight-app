import React, {Component} from 'react'
import Banner from '../Components/Banner'
import MatchingResults from '../Components/MatchingResults'

import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '60vw',
    height                : '60vh'
  }
};

Modal.setAppElement('#root')



class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      modalIsOpen: false,
      flightsForRender: []
    }
  }

  componentDidMount() {
    if (this.props.location.state !== undefined){
    console.log(this.props.location.state.matched)

        // this.mapMatchedFlightsToNewArray()
  }
  }


  openModal = () => {
    this.setState({modalIsOpen: true});
  }
  afterOpenModal = () => {
  // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }



  handleClick = (item) => (event) => {
    this.setState({
      expand: true
    })

    console.log(item);
  }



  ////// TODO: assign modal open to each list item button, render more info in each flight



  render(){
    let matchedFlights;
    if (this.props.location.state !== undefined){
      matchedFlights = this.props.location.state.matched



    return(
      <div>

        <hr />

          <MatchingResults flights={this.props.location.state.matched}
                           onClick={this.handleClick}/>
        <hr />





          <button onClick={this.openModal}>Open Modal</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >

              <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
              <button onClick={this.closeModal}>close</button>
              <div>I am a modal</div>
              <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
              </form>
            </Modal>
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
