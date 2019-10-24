import React from "react"

function MatchingResults (props) {


  let matchedFlights;
  if (props.flights !== undefined){
    matchedFlights = props.flights


  return (
    <div>

    <ul className="matched-flights">
      {matchedFlights.map(flight => {
        
        let item = {id: flight.id,
                    reservation: flight.reservation,
                    outDepTime: flight.outdeparttime,
                    outArrTime: flight.outarrivaltime,
                    returnDepTime: flight.indeparttime,
                    returnArrTime: flight.inarrivaltime,
                    depFlightNo: flight.outflightno,
                    retFlightNo: flight.inflightno,
                    airline: flight.carrier,
                    price: flight.originalprice,
                    outDepDate: flight.outdepartdate,
                    outArrDate: flight.outarrivaldate,
                    retDepDate: flight.indepartdate,
                    retArrDate: flight.inarrivaldate,
                    class: flight.outflightclass,
                    oneway: flight.oneway}


  return <li key={flight.id}>
            <span><b>Airline:</b> {flight.carrier} | </span>
            <span><b>Departure Date:</b> {flight.outdepartdate} | </span>
            <span><b>Return Date:</b> {flight.indepartdate} | </span>
            <span><b>Price:</b> {flight.originalprice} | </span>
            <span><b>Class</b> {flight.outflightclass} | </span>
            <button onClick={props.onClick(item
            )}>see more</button>
          </li>
      })}

    </ul>

    </div>
  )
}
}
export default MatchingResults;
