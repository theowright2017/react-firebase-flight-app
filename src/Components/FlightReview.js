import React from "react"

function FlightReview ({flight}) {
  return (
    <div>
        <h3>Airline: {flight.airline}</h3>
        <h3>Class: {flight.class}</h3>
        <h3>Price: {flight.price}</h3>
        <h3>Return: {flight.return}</h3>
          <hr />
          <h4>Flight No: {flight.depFlightNo}</h4>
          <h4>Reservation No: {flight.reservation}</h4>
          <hr />
        <p>Outgoing Departure Date: {flight.outDepDate}</p>
        <p>Outgoing Departure Time: {flight.outDepTime}</p>
        <p>Outgoing Arrival Date: {flight.outArrDate}</p>
        <p>Outgoing Arrival Time: {flight.outArrTime}</p>
        <p>Return Departure Date: {flight.retDepDate}</p>
        <p>Return Departure Time: {flight.returnDepTime}</p>
        <p>Return Arrival Date: {flight.retArrDate}</p>
        <p>Return Arrival Time: {flight.returnArrTime}</p>


    </div>
  )
}

export default FlightReview;
