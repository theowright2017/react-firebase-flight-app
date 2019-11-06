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
                    depair: flight.depair,
                    destair: flight.destair,
                    reservation: flight.reservation,
                    outdeparttime: flight.outdeparttime,
                    outarrivaltime: flight.outarrivaltime,
                    indeparttime: flight.indeparttime,
                    inarrivaltime: flight.inarrivaltime,
                    outflightno: flight.outflightno,
                    inflightno: flight.inflightno,
                    carrier: flight.carrier,
                    originalprice: flight.originalprice,
                    outdepartdate: flight.outdepartdate,
                    outarrivaldate: flight.outarrivaldate,
                    indepartdate: flight.indepartdate,
                    inarrivaldate: flight.inarrivaldate,
                    outflightclass: flight.outflightclass
                    }

        if (flight.oneway === 0 || flight.return === "Yes") {
          item.return = "Yes"
        } else if (flight.oneway === 1 || flight.return === "No"){
          item.return = "No"
        }



  return <li key={flight.id}>
            <span><b>Depart:</b> {flight.depair} | </span>
            <span><b>Destination:</b> {flight.destair} | </span>
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
