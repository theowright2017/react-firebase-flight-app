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
                    outdeparttime: flight.outdeparttime,
                    outarrivaltime: flight.outarrivaltime,
                    returndeparttime: flight.indeparttime,
                    returnarrivaltime: flight.inarrivaltime,
                    outflightno: flight.outflightno,
                    returnflightno: flight.inflightno,
                    airline: flight.carrier,
                    price: flight.originalprice,
                    outdepartdate: flight.outdepartdate,
                    outarrivaldate: flight.outarrivaldate,
                    returndepartdate: flight.indepartdate,
                    returnarrivaldate: flight.inarrivaldate,
                    class: flight.outflightclass
                    }

        if (flight.oneway === 0) {
          item.return = "Yes"
        } else {
          item.return = "No"
        }



  return <li key={flight.id}>
            <span><b>Airline:</b> {flight.carrier} | </span>
            <span><b>Return:</b> {item.return}    | </span>
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
