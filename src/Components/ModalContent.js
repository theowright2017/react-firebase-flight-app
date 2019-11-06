import React from "react"

function ModalContent (props) {
  return (
    <div>

    <button onClick={props.close}>close</button>

    <div className="modal-title-container">
      <h4 className="modal-title">
        <mark>Airline:</mark> <span>{props.flight.carrier}</span></h4>
      <h4 className="modal-title">
        <mark>Class: </mark> <span>{props.flight.outflightclass}</span></h4>
      <h4 className="modal-title">
        <mark>Price: </mark>
        <span>{props.flight.originalprice}</span></h4>
      <h4 className="modal-title">
        <mark>Return: </mark>
        <span>{props.flight.return}</span></h4>
    </div>
    <div className="modal-title-container">
      <h4 className="modal-title">
        <mark>DepartureAirport: </mark>
        <span>{props.flight.depair}</span></h4>
      <h4 className="modal-title">
        <mark>Destination Airport: </mark>
        <span>{props.flight.destair}</span></h4>
    </div>

    <div className="modal-container">
      <div className="modal-departure-left">
        <h3>Out</h3>
        <h4>Departure Date: {props.flight.outdepartdate}</h4>
        <h4>Arrival Date: {props.flight.outarrivaldate}</h4>
        <h4>Departure Time: {props.flight.outdeparttime}</h4>
        <h4>Arrival Time: {props.flight.outarrivaltime}</h4>
        <h4>Flight No: {props.flight.outflightno}</h4>
      </div>

      <div className={props.rightModal} >
        <h3>Return</h3>
        <h4>Departure Date: {props.flight.indepartdate}</h4>
        <h4>Arrival Date: {props.flight.inarrivaldate}</h4>
        <h4>Departure Time: {props.flight.indeparttime}</h4>
        <h4>Arrival Time: {props.flight.inarrivaltime}</h4>
        <h4>Flight No: {props.flight.inflightno}</h4>
      </div>
  </div>

  <div className={props.buttonClass}>
      <button className="chooseBtn" onClick={props.pushSelected}>Select Option</button>
  </div>

    </div>
  )
}

export default ModalContent;
