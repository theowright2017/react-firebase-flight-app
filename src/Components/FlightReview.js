import React from "react"

function FlightReview ({flight}) {
  return (
    <div>
        <h3>Airline: {flight.carrier}</h3>
        <h3>Departure Airport: {flight.depair}</h3>
        <h3>Destination Airport: {flight.destair}</h3>
        <h3>Class: {flight.outflightclass}</h3>
        <h3>Price: {flight.originalprice}</h3>
        <h3>Return: {flight.return}</h3>
          <hr />
          <h4>Outgoing Flight No: {flight.outflightno}</h4>
          <h4>Reservation No: {flight.reservation}</h4>
          <hr />
        <p>Outgoing Departure Date: {flight.outdepartdate}</p>
        <p>Outgoing Departure Time: {flight.outdeparttime}</p>
        <p>Outgoing Arrival Date: {flight.outarrivaldate}</p>
        <p>Outgoing Arrival Time: {flight.outarrivaltime}</p>
        <p>Return Departure Date: {flight.indepartdate}</p>
        <p>Return Departure Time: {flight.indeparttime}</p>
        <p>Return Arrival Date: {flight.inarrivaldate}</p>
        <p>Return Arrival Time: {flight.inarrivaltime}</p>
        <p>Return Flight No: {flight.inflightno}</p>


    </div>
  )
}

export default FlightReview;
